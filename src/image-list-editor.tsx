import React, { ComponentType, useMemo } from "react";
import {
  generateUtilityClass,
  generateUtilityClasses,
  Theme,
  unstable_composeClasses,
  useThemeProps,
} from "@mui/material";
import { IMAGE_LIST_EDITOR } from "./constants";
import { ListEditor, ListEditorProps } from "./list-editor";
import { Control, useController, useWatch } from "react-hook-form";
import { ImageUploader, ImageUploaderProps } from "./image-uploader";
import { MutationHooks, RefetchQueryHooks } from "./types";
import { omit } from "lodash";
import { MutationHookOptions } from "@apollo/client/react/types/types";

export interface ImageListEditorClasses {
  root: string;
  thumbnail: string;
}

export type ImageListEditorClassKey = keyof ImageListEditorClasses;

export interface ImageListEditorPropsInner
  extends Pick<
    ListEditorProps<unknown>,
    "options" | "ListComponent" | "ListComponentProps"
  > {
  control: Control<any>;
  classes?: Partial<ImageListEditorClasses>;
  name: string;
  onUpdate?: (value: any) => boolean | Promise<boolean>;
  ImageUploaderProps?: Partial<ImageUploaderProps>;
}

export const getImageListEditorClass = (slot: string) =>
  generateUtilityClass(IMAGE_LIST_EDITOR, slot);
export const imageListEditorClasses: ImageListEditorClasses =
  generateUtilityClasses(IMAGE_LIST_EDITOR, ["root", "thumbnail"]);
const useUtilityClasses = (props: ImageListEditorPropsInner) => {
  const { classes } = props,
    slots = {
      root: ["root"],
      thumbnail: ["thumbnail"],
    };
  return unstable_composeClasses(slots, getImageListEditorClass, classes);
};

type ImageListEditorProps = Omit<ImageListEditorPropsInner, "options"> & {
  mode: "add" | "edit";
  hooks: {
    refetchQuery: RefetchQueryHooks;
    createNewMutation: MutationHooks;
    createNewMutationArgs: MutationHookOptions;
    addMutation: MutationHooks;
    deleteMutation: MutationHooks;
  };
};
const withImageListEditorWrapper = (
  Component: ComponentType<ImageListEditorPropsInner>
) => {
  function Wrapper({ control, mode, hooks, ...props }: ImageListEditorProps) {
    const {
      field: { value },
    } = useController({ name: props.name, control });
    useWatch({ name: props.name, control });
    const [addMutation] = hooks.addMutation({
        refetchQueries: [hooks.refetchQuery],
      }),
      [deleteMutation] = hooks.deleteMutation({
        refetchQueries: [hooks.refetchQuery],
      }),
      [createNewMutation] = hooks.createNewMutation({
        ...hooks.createNewMutationArgs,
        refetchQueries: [hooks.refetchQuery],
      });

    const options = useMemo<ListEditorProps<unknown>["options"]>(() => {
      if (mode === "add") return { deletable: true };
      return {
        deletable: true,
        onAppend: async (val) => {
          let id = value?.[0]?.id;
          if (!id) {
            const {
              data: { createOneImageList: imageList },
            } = await createNewMutation();
            id = imageList.id;
          }
          await addMutation({
            variables: { id, input: omit(val, ["__typename", "id"]) },
          });
          return true;
        },
        onDelete: async (val) => {
          const id = value![0]!.id;
          await deleteMutation({
            variables: { id, mediaId: val.id },
          });
          return true;
        },
      };
    }, [mode, value, addMutation, createNewMutation, deleteMutation]);

    return <Component control={control} options={options} {...props} />;
  }

  return Wrapper;
};

export const ImageListEditor = withImageListEditorWrapper(
  function ImageListEditor(inProps) {
    const props = useThemeProps<
        Theme,
        ImageListEditorPropsInner,
        typeof IMAGE_LIST_EDITOR
      >({
        props: inProps,
        name: IMAGE_LIST_EDITOR,
      }),
      {
        name,
        control,
        options,
        ImageUploaderProps = {},
        ListComponent,
        ListComponentProps,
      } = props;

    const classes = useUtilityClasses(props);

    return (
      <ListEditor
        name={`${name}.0.images`}
        control={control}
        options={options}
        ItemComponent={ImageUploader}
        ItemComponentProps={{
          ...ImageUploaderProps,
          classes: {
            root: classes.thumbnail,
          },
        }}
        ListComponent={ListComponent}
        ListComponentProps={ListComponentProps}
      />
    );
  }
);
