import React, { useEffect } from "react";
import { ListEditor, ListEditorProps } from "./list-editor";
import { useForm } from "react-hook-form";
import { cloneDeep, get, omit } from "lodash";
import { MutationHooks, QueryHooks } from "./types";
import { FieldValues } from "react-hook-form/dist/types/fields";

type ShowcaseContentCrudAdapterProps<T> = ListEditorProps<T> & {
  mode: "add" | "edit";
  hooks: {
    getAll: [QueryHooks, any];
    getAllPath: string;
    refetchAll: any;
    getOneFn?: any;
    refetchOneFn: any;
    create: [MutationHooks, any];
    update: [MutationHooks, any];
    del?: any;
  };
};

/**
 * Assume passed mode is edit
 * @param name
 * @param hooks
 * @param control
 * @param props
 * @constructor
 */
function InnerAdapter({
  name,
  hooks,
  control: _,
  options,
  ...props
}: Omit<ShowcaseContentCrudAdapterProps<FieldValues>, "mode">) {
  const form = useForm({
      defaultValues: {
        [name]: [],
      },
    }),
    { setValue, control } = form;
  const [getAllHookFn, getAllHookArg] = hooks.getAll;

  const [createMutationHookFn, createMutationHookArgs] = hooks.create,
    [createMutation] = createMutationHookFn({
      ...createMutationHookArgs,
      refetchQueries: [hooks.refetchAll],
    });

  const [updateMutationHookFn, updateMutationHookArg] = hooks.update,
    [updateMutation] = updateMutationHookFn({
      ...updateMutationHookArg,
    });

  const { data, loading: fetchingAll } = getAllHookFn(getAllHookArg);
  useEffect(() => {
    if (data && !fetchingAll)
      setValue(name, cloneDeep(get(data, hooks.getAllPath)));
  });

  return (
    <ListEditor
      name={name}
      control={control}
      options={{
        ...options,
        onAppend: async (value) => {
          await createMutation({ variables: { input: omit(value, ["id"]) } });
          return false;
        },
        onUpdate: async (value) => {
          await updateMutation({
            variables: {
              id: value.id,
              input: omit(value, ["__typename", "id"]),
            },
            refetchQueries: [hooks.refetchOneFn({ id: value.id })],
          });
          return false;
        },
      }}
      {...props}
    />
  );
}

export function ContentCrudAdapter<T>(
  props: ShowcaseContentCrudAdapterProps<T>
): JSX.Element;
export function ContentCrudAdapter({
  mode,
  hooks,
  ...props
}: ShowcaseContentCrudAdapterProps<FieldValues>): JSX.Element {
  if (mode === "add") return <ListEditor {...props} />;
  return <InnerAdapter hooks={hooks} {...props} />;
}
