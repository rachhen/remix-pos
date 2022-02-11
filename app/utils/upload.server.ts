import type { Readable } from "stream";
import { UploadHandler } from "@remix-run/node/formData";
import ImageKit from "imagekit";
import { db } from "./db.server";
import { unstable_createFileUploadHandler } from "remix";
import { join } from "path";

if (!process.env.IMAGE_KIT_PUBLIC_KEY) {
  throw new Error("IMAGE_KIT_PUBLIC_KEY must be define!");
}
if (!process.env.IMAGE_KIT_PRIVATE_KEY) {
  throw new Error("IMAGE_KIT_PRIVATE_KEY must be define!");
}
if (!process.env.IMAGE_KIT_URL_ENDPOINT) {
  throw new Error("IMAGE_KIT_URL_ENDPOINT must be define!");
}

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

export type UploadHandlerArgs = {
  name: string;
  filename: string;
  encoding: string;
  mimetype: string;
};

export type ImageKitUploadHandlerOptions = {
  folder?: string;
  file?: (args: UploadHandlerArgs) => string;
  filter?: (args: UploadHandlerArgs) => boolean | Promise<boolean>;
};

export function createImageKitUploadHandler(
  options: ImageKitUploadHandlerOptions
): UploadHandler {
  return async (args) => {
    const { file, filter, folder = "pos" } = options;
    const { stream, filename } = args;
    const fileName = file ? file(args) : filename;

    if (filter && !(await filter(args))) {
      stream.resume();
      return;
    }

    if (!fileName) {
      stream.resume();
      return;
    }

    const chunks: Buffer[] = [];
    for await (let chunk of stream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    const res = await imagekit.upload({ file: buffer, fileName, folder });
    const uploadedFile = await db.uploadedFile.create({
      data: {
        name: res.name,
        fileId: res.fileId,
        url: res.url,
        thumbnailUrl: res.thumbnailUrl,
        height: res.height,
        width: res.width,
        size: res.size,
        fileType: res.fileType,
        filePath: res.filePath,
        isPrivateFile: !!res.isPrivateFile,
        mimetype: args.mimetype,
      },
    });

    return `${uploadedFile.id}`;
  };
}

export const uploadHandler = createImageKitUploadHandler({
  filter: ({ name }) => name === "file",
});

// const uploadDir = join(__dirname, "..", "public", "uploads");
// export const uploadHandler = unstable_createFileUploadHandler({
//   maxFileSize: 5_000_000,
//   directory: uploadDir,
//   file: ({ filename }) => filename,
// });

export const deleteUploadedFileById = async (id: number) => {
  const uploadedFile = await db.uploadedFile.findUnique({ where: { id } });
  if (!uploadedFile) return;

  await deleteFile(uploadedFile.fileId);
  return db.uploadedFile.delete({ where: { id } });
};

export const deleteFile = async (fileId: string) => {
  return await imagekit.deleteFile(fileId);
};
