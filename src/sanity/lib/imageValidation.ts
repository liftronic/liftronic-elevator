import type { SanityClient } from "sanity";

/**
 * Image validation utilities for Sanity schemas
 * Enforces 300KB maximum file size across all image uploads
 */

/**
 * Maximum allowed file size for images (300KB)
 */
export const MAX_FILE_SIZE = 300 * 1024; // 300KB in bytes

/**
 * Custom validation function for image fields
 * Validates that uploaded images do not exceed 300KB
 * This validation runs after the image is uploaded and checks the asset's actual size
 */
export const validateImageSize = async (
  value: unknown,
  context: { getClient: (config: { apiVersion: string }) => SanityClient }
) => {
  // Allow empty images (optional fields)
  if (!value) {
    return true;
  }

  // Type guard to check if value has the expected structure
  const imageValue = value as { asset?: { _ref?: string } };

  // If the field has a value with an asset reference
  if (imageValue?.asset?._ref) {
    // Query the asset's metadata document
    const client = context.getClient({ apiVersion: "2025-01-01" });

    try {
      // Filesize is returned in bytes
      const size = await client.fetch<number | null>(`*[_id == $id][0].size`, {
        id: imageValue.asset._ref,
      });

      // Check if size exceeds 300KB (307200 bytes)
      if (size && size > MAX_FILE_SIZE) {
        const sizeInKB = Math.round(size / 1024);
        return `Image file size (${sizeInKB}KB) exceeds maximum allowed size of 300KB. Please compress the image before uploading.`;
      }
    } catch (error) {
      console.error("Error validating image size:", error);
      // Allow the image if we can't validate (don't block on validation errors)
      return true;
    }
  }

  return true;
};

/**
 * Validation function for required image fields
 * Same as validateImageSize but also requires the image to be present
 */
export const validateRequiredImageSize = async (
  value: unknown,
  context: { getClient: (config: { apiVersion: string }) => SanityClient }
) => {
  // Require the image to be present
  if (!value) {
    return "Image is required";
  }

  // Run the size validation
  return validateImageSize(value, context);
};

/**
 * Helper text for image field descriptions
 */
export const IMAGE_SIZE_DESCRIPTION =
  "Max file size: 300KB. Please compress images before uploading.";

/**
 * Validation message for file size errors
 */
export const getFileSizeErrorMessage = (sizeInBytes: number): string => {
  const sizeInKB = Math.round(sizeInBytes / 1024);
  return `Image file size (${sizeInKB}KB) exceeds maximum allowed size of 300KB. Please compress the image before uploading.`;
};
