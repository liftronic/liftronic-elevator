"use client";

import { Card, Flex, Grid, Switch, Text } from "@sanity/ui";
import { set } from "sanity";
import type { ObjectInputProps } from "sanity";

const SECTIONS = [
  { name: "legacy", label: "Our Legacy" },
  { name: "stiltzExperience", label: "Stiltz Experience" },
  { name: "whyChoose", label: "Why Choose Us" },
  { name: "specializedEngineering", label: "Specialized Engineering" },
  { name: "consultant", label: "Consultant / Contact Person" },
  { name: "stiltzProducts", label: "Stiltz Collection" },
  { name: "team", label: "Branch Team" },
  { name: "media", label: "Highlights / Media Gallery" },
] as const;

type SectionName = (typeof SECTIONS)[number]["name"];

export function SectionVisibilityInput(props: ObjectInputProps) {
  const { value, onChange, readOnly } = props;

  const handleToggle = (name: SectionName, checked: boolean) => {
    onChange(set(checked, [name]));
  };

  return (
    <Grid columns={2} gap={2}>
      {SECTIONS.map(({ name, label }) => {
        const isVisible =
          (value as Record<string, boolean> | undefined)?.[name] !== false;

        return (
          <Card
            key={name}
            padding={3}
            radius={2}
            tone={isVisible ? "positive" : "default"}
            border
            style={{ cursor: readOnly ? "default" : "pointer" }}
          >
            <Flex align="center" justify="space-between" gap={3}>
              <Text size={1} weight="semibold" style={{ userSelect: "none" }}>
                {label}
              </Text>
              <Switch
                checked={isVisible}
                disabled={readOnly}
                onChange={(e) =>
                  handleToggle(
                    name,
                    (e.target as HTMLInputElement).checked,
                  )
                }
              />
            </Flex>
          </Card>
        );
      })}
    </Grid>
  );
}
