import { Stack } from "@mui/material";
import { Control, useFieldArray } from "react-hook-form";
import React, { ComponentType } from "react";
import { FormInput } from "./FormInput";
import { uniqueId } from "lodash";

export type ListEditorOptions = {
  deletable?: boolean;
  onAppend?: (value: any) => boolean | Promise<boolean>;
  onUpdate?: (value: any) => boolean | Promise<boolean>;
};
export type ListEditorProps = {
  name: string;
  control: Control<any>;
  ItemComponent: ComponentType<any>;
  itemGenerator?: (index: number) => any;
  ListComponent?: ComponentType<any>;
  ListComponentProps?: any;
  options?: ListEditorOptions;
};
export function ListEditor({
  name,
  control,
  ItemComponent,
  itemGenerator = () => ({ id: `draft-${uniqueId()}` }),
  ListComponent = Stack,
  ListComponentProps = {},
  options: _options = {},
}: ListEditorProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fields, append, remove } = useFieldArray({ control, name });
  const options: ListEditorOptions = { deletable: false, ..._options };

  const finishEditTemp = async (e: any) => {
    const rs = (await options.onAppend?.(e.target.value)) ?? true;
    if (rs) append(e.target.value);
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
          onUpdate={options.onUpdate}
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
