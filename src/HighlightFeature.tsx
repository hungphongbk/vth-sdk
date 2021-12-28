import React, { EventHandler, SyntheticEvent, useState } from "react";
import { AspectRatio } from "./AspectRatio";
import {
  sxFlexCenter,
  sxFullSize,
  sxFullSizeAbsolute,
} from "./utils/predefinedSx";
import {
  Box,
  Button,
  DialogContent,
  DialogProps,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { PlusIcon } from "./assets/PlusIcon";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { useVthTheme } from "./VthThemeProvider";
import LoadingButton from "@mui/lab/LoadingButton";
import { ImageUploader, MediaBase } from "./ImageUploader";
import { get, set } from "lodash";

export interface ShowcaseHighlightFeatureBase {
  description: string;
  id: string;
  image: MediaBase;
  name: string;
}

interface Change<T = Element> extends SyntheticEvent<T> {
  target: EventTarget &
    Omit<T, "value"> & {
      value: ShowcaseHighlightFeatureBase;
    };
}
type ChangeEventHandler<T = Element> = EventHandler<Change<T>>;

export type HighlightFeatureProps = {
  name: string;
  value: ShowcaseHighlightFeatureBase;
  onChange: ChangeEventHandler;
  onUpdate?: (value: any) => boolean | Promise<boolean>;
  DialogProps?: Partial<DialogProps>;
};
export function HighlightFeature({
  name,
  value,
  onChange,
  onUpdate,
  DialogProps: _DialogProps = {},
}: HighlightFeatureProps): JSX.Element {
  const {
    components: { Dialog, TextField, MultilineTextField },
  } = useVthTheme();
  const [open, setOpen] = useState(false),
    form = useForm({
      defaultValues: value ?? {},
    }),
    { control, handleSubmit, formState } = form,
    isUpdate = typeof value !== "undefined";

  const submitUpdate = async (formValues: any) => {
    const payload = Object.keys(formState.dirtyFields).reduce((obj, key) => {
      const newObj = { ...obj };
      set(newObj, key, get(formValues, key));
      return newObj;
    }, {});

    console.log(payload);
    await onUpdate!(payload);
  };
  const handleChange = async (values: any, event: any) => {
    if (onChange) {
      const nativeEvent = event.nativeEvent || event;
      // @ts-ignore
      const clonedEvent = new nativeEvent.constructor(
        nativeEvent.type,
        nativeEvent
      );

      Object.defineProperty(clonedEvent, "target", {
        writable: true,
        value: {
          value: values,
          name,
        },
      });
      onChange(clonedEvent);
      if (isUpdate) await submitUpdate(values);
      setOpen(false);
    }
  };

  return (
    <>
      {value && value.image ? (
        <>
          <AspectRatio
            ratio={"307/160"}
            sx={{ borderRadius: 4, overflow: "hidden" }}
          >
            <Box
              sx={[
                sxFullSize,
                sxFlexCenter,
                {
                  position: "relative",
                  "& img": {
                    ...sxFullSizeAbsolute,
                    ...sxFullSize,
                    objectFit: "cover",
                  },
                },
              ]}
            >
              <img src={value.image.path} alt={`feature ${value.name}`} />
              <Button
                variant={"outlined"}
                sx={{
                  borderColor: "white",
                  color: "white",
                  bgcolor: "rgba(0 0 0 /60%)",
                }}
                onClick={() => setOpen(true)}
              >
                CHỈNH SỬA
              </Button>
            </Box>
          </AspectRatio>
          <Typography
            sx={{ fontSize: 15, fontWeight: 600, textTransform: "uppercase" }}
          >
            {value.name}
          </Typography>
        </>
      ) : (
        <AspectRatio
          ratio={"307/160"}
          sx={{ border: 1, borderStyle: "dashed", borderColor: "divider" }}
        >
          <Box sx={[sxFullSize, sxFlexCenter]} onClick={() => setOpen(true)}>
            <Stack direction={"column"} alignItems={"center"}>
              <PlusIcon
                sx={{ color: "black", height: 26, width: 26, mb: 0.5 }}
              />
              <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                Thêm tính năng
              </Typography>
            </Stack>
          </Box>
        </AspectRatio>
      )}
      <Dialog open={open} onClose={() => setOpen(false)} {..._DialogProps}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInput
                name={"name"}
                control={control}
                variant={"standard"}
                placeholder={"Tính năng"}
                component={TextField}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <FormInput
                name={"description"}
                control={control}
                variant={"standard"}
                placeholder={"Mô tả tính năng"}
                component={MultilineTextField}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <FormInput
                name={"image"}
                control={control}
                component={ImageUploader}
                ratio={"130/63"}
              >
                <Stack direction={"column"} alignItems={"center"}>
                  <PlusIcon
                    sx={{ color: "black", height: 26, width: 26, mb: 0.5 }}
                  />
                  <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                    Hình ảnh minh hoạ
                  </Typography>
                  <Typography>JPEG, JPG - 1300x630px</Typography>
                  <Typography>Tối đa 1MB</Typography>
                </Stack>
              </FormInput>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LoadingButton
                variant={"contained"}
                color={"primary"}
                onClick={handleSubmit(handleChange)}
                fullWidth
                loading={formState.isSubmitting}
              >
                Lưu
              </LoadingButton>
            </Grid>
            {isUpdate && (
              <Grid item xs={12} sm={6}>
                <Button variant={"text"} fullWidth color={"error"}>
                  Xoá
                </Button>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
