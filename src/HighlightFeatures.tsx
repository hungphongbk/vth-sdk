import React, { useEffect } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Stack } from "@mui/material";
import { uniqueId } from "lodash";
import FormInput from "../../FormInput";
import HighlightFeature from "./HighlightFeature";

type HighlightFeaturesProps = {
  control: Control<any>;
};
export default function HighlightFeatures({
  control,
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
    <Stack direction={"column"} alignItems={"stretch"} gap={1}>
      {fields.map((field, index) => (
        <FormInput
          key={field.cid}
          name={`highlightFeatures.${index}`}
          control={control}
          component={HighlightFeature}
        />
      ))}
    </Stack>
  );
}
