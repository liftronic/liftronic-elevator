"use client";

import {useCallback, useRef, useState, type ChangeEvent} from "react";
import Compressor from "compressorjs";
import {Button, Card, Flex, Stack, Text} from "@sanity/ui";
import type {
  AssetFromSource,
  AssetSource,
  AssetSourceComponentProps,
} from "sanity";
import {definePlugin} from "sanity";

const MAX_SIZE_BYTES = 300 * 1024;

async function compressIfNeeded(file: File): Promise<File> {
  if (file.size <= MAX_SIZE_BYTES) {
    return file;
  }

  return new Promise((resolve, reject) => {
    // Start with quality 0.8, then reduce if needed
    const attemptCompression = (currentQuality: number) => {
      new Compressor(file, {
        quality: currentQuality,
        mimeType: "image/jpeg", // Convert to JPEG for better compression
        convertSize: 0, // Always convert to JPEG if needed
        success(result: File | Blob) {
          const compressedFile = new File([result], file.name.replace(/\.[^.]+$/, ".jpg"), {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          // If still too large and we can reduce quality further, try again
          if (compressedFile.size > MAX_SIZE_BYTES && currentQuality > 0.3) {
            attemptCompression(currentQuality - 0.1);
          } else if (compressedFile.size > MAX_SIZE_BYTES) {
            // If we've tried our best and it's still too large, try with maxWidth/maxHeight
            new Compressor(file, {
              quality: 0.6,
              mimeType: "image/jpeg",
              maxWidth: 1920,
              maxHeight: 1920,
              convertSize: 0,
              success(resizedResult: File | Blob) {
                const finalFile = new File([resizedResult], file.name.replace(/\.[^.]+$/, ".jpg"), {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                
                if (finalFile.size > MAX_SIZE_BYTES) {
                  reject(new Error("Unable to shrink image below 300 KB. Please choose a smaller file or lower resolution image."));
                } else {
                  resolve(finalFile);
                }
              },
              error(err: Error) {
                reject(err);
              },
            });
          } else {
            resolve(compressedFile);
          }
        },
        error(err: Error) {
          reject(err);
        },
      });
    };

    attemptCompression(0.8);
  });
}

function CompressedUploadAssetSource(props: AssetSourceComponentProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      setError(null);
      setIsProcessing(true);

      try {
        const processedFile = await compressIfNeeded(file);

        type FileSelection = Extract<AssetFromSource, {kind: "file"}>;

        const selection: AssetFromSource[] = [
          {
            kind: "file",
            value: processedFile as FileSelection["value"],
          },
        ];

        props.onSelect(selection);
        props.onClose();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to process the selected image.";
        setError(message);
      } finally {
        setIsProcessing(false);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    },
    [props],
  );

  return (
    <Card padding={4} radius={2} shadow={1} tone="primary">
      <Stack space={4}>
        <Text size={2} weight="semibold">
          Upload with auto-compression
        </Text>
        <Text muted>
          Images larger than 300 KB are automatically compressed before they are sent to Sanity so your assets stay lightweight.
        </Text>
        <Flex gap={3} align="center">
          <Button
            text={isProcessing ? "Processing" : "Choose image"}
            tone="primary"
            onClick={() => inputRef.current?.click()}
            disabled={isProcessing}
            loading={isProcessing}
          />
          <Button text="Cancel" mode="ghost" onClick={props.onClose} disabled={isProcessing} />
        </Flex>
        <input
          ref={inputRef}
          type="file"
          accept={props.accept || "image/*"}
          style={{display: "none"}}
          onChange={handleFiles}
        />
        {error && (
          <Card padding={3} radius={2} tone="critical">
            <Text size={1}>{error}</Text>
          </Card>
        )}
      </Stack>
    </Card>
  );
}

const compressedUploadAssetSource: AssetSource = {
  name: "compressed-upload",
  title: "Compressed Upload (≤300 KB)",
  component: CompressedUploadAssetSource,
};

export const compressedImageAssetSourcePlugin = definePlugin({
  name: "compressed-image-asset-source",
  form: {
    image: {
      assetSources: (prev) => [compressedUploadAssetSource, ...prev],
    },
  },
});
