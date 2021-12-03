import React, { ComponentType, ReactElement, useEffect } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Stack } from "@mui/material";
import { uniqueId } from "lodash";
import FormInput from "./FormInput";
import HighlightFeature, { HighlightFeatureProps } from "./HighlightFeature";

type HighlightFeaturesProps = {
  control: Control<any>;
  ListComponent?: ComponentType<any>;
  ListComponentProps?: any;
  renderItem?: (props: HighlightFeatureProps) => ReactElement;
};
export default function HighlightFeatures({
  control,
  ListComponent = Stack,
  ListComponentProps = {
    direction: "column",
    alignItems: "stretch",
    gap: 1,
  },
  renderItem: ItemComponent = (props: HighlightFeatureProps) => (
    <HighlightFeature {...props} />
  ),
}: HighlightFeaturesProps): JSX.Element {
  const { fields, append } = useFieldArray<any, any, "cid">({
    control,
    keyName: "cid",
    name: "highlightFeatures",
  });

  useEffect(() => {
    append({ cid: uniqueId(), name: "", description: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListComponent {...ListComponentProps}>
      {fields.map((field, index) => (
        <FormInput
          key={field.cid}
          name={`highlightFeatures.${index}`}
          control={control}
          component={ItemComponent!}
        />
      ))}
    </ListComponent>
  );
}
