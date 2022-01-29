import { TextField } from "@mui/material";
import React, { ElementType } from "react";
import { Controller, UseControllerProps } from "react-hook-form";
import {
  BaseProps,
  OverridableTypeMap,
} from "@mui/material/OverridableComponent";
import { DistributiveOmit } from "@mui/types";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { FieldPath } from "react-hook-form/dist/types";

/**
 * @see @mui/material/OverridableComponent.d.ts
 */
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ElementType
> = BaseProps<M> &
  // we must omit value & onChange properties on passed component
  // due to <FormInput /> doesn't need them anymore
  DistributiveOmit<
    React.ComponentPropsWithRef<C>,
    keyof BaseProps<M> | "value" | "onChange"
  >;

interface FormInputTypeMap<
  P = unknown,
  D extends ElementType = typeof TextField,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  props: P &
    Pick<
      UseControllerProps<TFieldValues, TName>,
      "name" | "defaultValue" | "control" | "rules"
    > & {
      allowUndefined?: boolean;
    };
  defaultComponent: D;
}

export type FormInputProps<
  D extends React.ElementType = FormInputTypeMap["defaultComponent"],
  P = unknown,
  TFieldValues extends FieldValues = FieldValues
> = OverrideProps<FormInputTypeMap<P, D, TFieldValues>, D>;

interface FieldProcessCb {
  (fields: any, fieldStates: any): any;
}

type GenericFormInputProps<
  C extends ElementType,
  TFieldValues extends FieldValues = FieldValues
> = FormInputProps<C, { component?: C }, TFieldValues>;

const transformNumberChange = (e: any) => {
  const output = parseInt(e.target.value, 10);
  return isNaN(output) ? 0 : output;
};

function FormInput<
  C extends ElementType = typeof TextField,
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  defaultValue,
  component,
  allowUndefined,
  rules = undefined,
  ...rest
}: GenericFormInputProps<C, TFieldValues>): JSX.Element {
  const Component = component ?? TextField;
  const processInputNumber: FieldProcessCb = (fields, _) => {
    if (rest.type !== "number") return fields;
    const { name, value, onChange, ...others } = fields;
    return {
      ...others,
      name,
      value: isNaN(value) || value === 0 ? "" : value?.toString() ?? "",
      onChange: (e: any) => onChange(transformNumberChange(e)),
    };
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={
        (typeof defaultValue !== "undefined" || allowUndefined === true
          ? defaultValue
          : "") as any
      }
      render={({ field, fieldState }) => (
        <Component
          {...rest}
          // defaultValue={defaultValue}
          {...processInputNumber(field, fieldState)}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? rest.helperText ?? undefined}
        />
      )}
    />
  );
}

export { FormInput };
