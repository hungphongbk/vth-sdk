import { UploadResponse } from "../VthThemeProvider";

type UploadServiceGeneratorProps = {
  uploadHost: string;
  token: string;
};
export const UploadServiceGenerator = (opts: UploadServiceGeneratorProps) => {
  const generateUrl = (body: string) =>
    `${opts.uploadHost}${body}?token=${opts.token}`;
  return async (file: File): Promise<UploadResponse> => {
    const form = new FormData();
    form.append("file", file);
    const response = await fetch(generateUrl("/upload"), {
        method: "POST",
        body: form,
      }),
      json: UploadResponse = await response.json();

    json.path = generateUrl(json.path);

    return json;
  };
};
