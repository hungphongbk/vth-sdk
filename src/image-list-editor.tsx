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
import { Control, useController, useForm } from "react-hook-form";
import { ImageUploader, ImageUploaderProps } from "./image-uploader";
import { MutationHooks } from "./types";

export interface ImageListEditorClasses {
  root: string;
  thumbnail: string;
}

export type ImageListEditorClassKey = keyof ImageListEditorClasses;

export interface ImageListEditorPropsInner
  extends Pick<ListEditorProps, "options"> {
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
    addMutation: MutationHooks;
    deleteMutation: MutationHooks;
  };
};
const withImageListEditorWrapper = (
  Component: ComponentType<ImageListEditorPropsInner>
) => {
  function Wrapper({ control, mode, hooks, ...props }: ImageListEditorProps) {
    const form = useForm({
        defaultValues: {
          images: [],
        },
      }),
      _control = mode === "add" ? control : form.control,
      {
        field: { value },
      } = useController({ name: props.name, control: _control });

    const options = useMemo<ListEditorProps["options"]>(() => {
      if (mode === "add") return { deletable: true };
      const { id } = value;
      return {
        deletable: true,
        onAppend: async (value) => {
          return true;
        },
        onUpdate: async (value) => {
          return true;
        },
      };
    }, [mode, value]);

    return <Component control={_control} options={options} {...props} />;
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
      { name, control, options, ImageUploaderProps = {} } = props;

    const classes = useUtilityClasses(props);

    return (
      <ListEditor
        name={name}
        control={control}
        options={options}
        ItemComponent={ImageUploader}
        ItemComponentProps={{
          ...ImageUploaderProps,
          classes: {
            root: classes.thumbnail,
          },
        }}
      />
    );
  }
);
