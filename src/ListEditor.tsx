import { Stack } from "@mui/material";
import { Control, useFieldArray } from "react-hook-form";
import { ComponentType } from "react";
import FormInput from "./FormInput";
import { uniqueId } from "lodash";
import React from "react";

type ListEditorProps = {
  name: string;
  control: Control<any>;
  ItemComponent: ComponentType<any>;
  itemGenerator?: (index: number) => any;
  ListComponent?: ComponentType<any>;
  ListComponentProps?: any;
};
export default function ListEditor({
  name,
  control,
  ItemComponent,
  itemGenerator = () => ({ id: uniqueId() }),
  ListComponent = Stack,
  ListComponentProps = {},
}: ListEditorProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fields, append } = useFieldArray({ control, name });

  const finishEditTemp = (e: any) => {
    append(e.target.value);
  };

  return (
    <ListComponent {...ListComponentProps}>
      {fields.map((field, index) => (
        <FormInput
          name={`${name}.${index}`}
          key={field.id}
          control={control}
          component={ItemComponent}
        />
      ))}
      <ItemComponent
        key={`new-${fields.length}`}
        value={itemGenerator(fields.length)}
        onChange={finishEditTemp}
      />
    </ListComponent>
  );
}
