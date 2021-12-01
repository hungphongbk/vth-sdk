import { Stack } from "@mui/material";
import { Control, useFieldArray } from "react-hook-form";
import React, { ComponentType } from "react";
import FormInput from "./FormInput";
import { uniqueId } from "lodash";

export type ListEditorOptions = { deletable?: boolean };
export type ListEditorProps = {
  name: string;
  control: Control<any>;
  ItemComponent: ComponentType<any>;
  itemGenerator?: (index: number) => any;
  ListComponent?: ComponentType<any>;
  ListComponentProps?: any;
  options?: { deletable?: boolean };
};
export default function ListEditor({
  name,
  control,
  ItemComponent,
  itemGenerator = () => ({ id: uniqueId() }),
  ListComponent = Stack,
  ListComponentProps = {},
  options: _options = {},
}: ListEditorProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fields, append, remove } = useFieldArray({ control, name });
  const options: ListEditorOptions = { deletable: false, ..._options };

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
          onDelete={() => options.deletable && remove(index)}
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
