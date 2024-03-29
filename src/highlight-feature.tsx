import React, {
  EventHandler,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";
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
  generateUtilityClass,
  generateUtilityClasses,
  Grid,
  Stack,
  styled,
  Theme,
  Typography,
  unstable_composeClasses,
  useThemeProps,
} from "@mui/material";
import { PlusIcon } from "./assets/PlusIcon";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { useVthTheme } from "./VthThemeProvider";
import LoadingButton from "@mui/lab/LoadingButton";
import { ImageUploader, MediaBase } from "./image-uploader";
import { diff } from "deep-object-diff";

export interface HighlightFeatureClasses {
  root: string;
  thumbnail: string;
  name: string;
}
export type HighlightFeatureClassKey = keyof HighlightFeatureClasses;

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
  classes?: Partial<HighlightFeatureClasses>;
  name: string;
  value: ShowcaseHighlightFeatureBase;
  onChange: ChangeEventHandler;
  onUpdate?: (value: any) => boolean | Promise<boolean>;
  DialogProps?: Partial<DialogProps>;
};

export const getHighlightFeatureClass = (slot: string) =>
  generateUtilityClass("HighlightFeature", slot);
export const highlightFeatureClasses: HighlightFeatureClasses =
  generateUtilityClasses("HighlightFeature", ["root", "thumbnail", "name"]);
const useUtilityClasses = (props: HighlightFeatureProps) => {
  const { classes } = props,
    slots = {
      root: ["root"],
      thumbnail: ["thumbnail"],
      name: ["name"],
    };
  return unstable_composeClasses(slots, getHighlightFeatureClass, classes);
};

const HighlightFeatureThumbnail = styled(AspectRatio, {
  name: "HighlightFeature",
  slot: "thumbnail",
  overridesResolver: (props, styles) => styles.thumbnail,
})`
  border-radius: 16px;
  overflow: hidden;
`;

export function HighlightFeature(inProps: HighlightFeatureProps): JSX.Element {
  const props = useThemeProps<Theme, HighlightFeatureProps, "HighlightFeature">(
      {
        props: inProps,
        name: "HighlightFeature",
      }
    ),
    { name, value, onChange, onUpdate, DialogProps: _DialogProps = {} } = props;
  const {
    components: { Dialog, TextField, MultilineTextField },
  } = useVthTheme();
  const [open, setOpen] = useState(false),
    form = useForm({
      defaultValues: value ?? {},
    }),
    { control, handleSubmit, formState } = form,
    isUpdate = typeof value !== "undefined" && !/^draft/.test(value.id);

  const submitUpdate = useCallback(
    async (formValues: any) => {
      const payload: any = diff(value, formValues);
      payload.id = value.id;

      await onUpdate!(payload);
    },
    [onUpdate, value]
  );
  const handleChange = useCallback(
    async (values: any, event: any) => {
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
        if (isUpdate) await submitUpdate(values);
        onChange(clonedEvent);
        setOpen(false);
      }
    },
    [isUpdate, name, onChange, submitUpdate]
  );

  const classes = useUtilityClasses(props);

  return (
    <>
      {value && value.image ? (
        <>
          <HighlightFeatureThumbnail
            className={classes.thumbnail}
            ratio={"307/160"}
          >
            <Box
              className="h-full w-full relative flex items-center justify-center"
              sx={{
                "& img": {
                  ...sxFullSizeAbsolute,
                  ...sxFullSize,
                  objectFit: "cover",
                },
              }}
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
          </HighlightFeatureThumbnail>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 600,
              textTransform: "uppercase",
              mt: 1,
            }}
            className={classes.name}
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
