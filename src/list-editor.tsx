import { Stack } from "@mui/material";
import { Control, useFieldArray } from "react-hook-form";
import React, { ComponentType, useCallback, useMemo } from "react";
import { FormInput } from "./FormInput";
import { uniqueId } from "lodash";

export type ListEditorOptions = {
  deletable?: boolean;
  onAppend?: (value: any) => boolean | Promise<boolean>;
  onUpdate?: (value: any) => boolean | Promise<boolean>;
  onDelete?: (value: any) => boolean | Promise<Boolean>;
};
export type ListEditorProps = {
  name: string;
  control: Control<any>;
  ItemComponent: ComponentType<any>;
  ItemComponentProps?: any;
  itemGenerator?: (index: number) => any;
  ListComponent?: ComponentType<any>;
  ListComponentProps?: any;
  options?: ListEditorOptions;
};
export function ListEditor({
  name,
  control,
  ItemComponent,
  ItemComponentProps = {},
  itemGenerator = () => ({ id: `draft-${uniqueId()}` }),
  ListComponent = Stack,
  ListComponentProps = {},
  options: _options = {},
}: ListEditorProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fields, append, remove } = useFieldArray({ control, name });
  const options: ListEditorOptions = useMemo(
    () => ({ deletable: false, ..._options }),
    [_options]
  );

  const finishEditTemp = async (e: any) => {
    const rs = (await options.onAppend?.(e.target.value)) ?? true;
    if (rs) append(e.target.value);
  };

  const doDelete = useCallback(
    async (index: any, value: any) => {
      if (!options.deletable) return;
      if (value && options.onDelete) await options.onDelete(value);
      remove(index);
    },
    [options, remove]
  );

  return (
    <ListComponent {...ListComponentProps}>
      {fields.map((field, index) => (
        <FormInput
          name={`${name}.${index}`}
          key={field.id}
          control={control}
          component={ItemComponent}
          onDelete={(value: any) => doDelete(index, value)}
          onUpdate={options.onUpdate}
          {...ItemComponentProps}
        />
      ))}
      <ItemComponent
        key={`new-${fields.length}`}
        value={itemGenerator(fields.length)}
        onChange={finishEditTemp}
        {...ItemComponentProps}
      />
    </ListComponent>
  );
}
