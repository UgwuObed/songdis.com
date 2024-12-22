"use server";

import { v2 as cloud } from "cloudinary";
import streamifier from "streamifier";

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryResponse {
  duration: any;
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  original_filename: string;
}

export const uploadFile = async (formData: FormData): Promise<CloudinaryResponse> => {
  const file = formData.get("file");

  if (file instanceof File) {

    console.log("Uploading file of type:", file.type);

    if (!file.size) {
      throw new Error("File is empty");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const stream = cloud.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          console.error("Error uploading file:", error);
          reject(error);
        } else {
          console.log("File uploaded successfully:", result);
          resolve(result as unknown as CloudinaryResponse);
        }
      });

      streamifier.createReadStream(buffer).pipe(stream);
    });
  }

  throw new Error("Invalid file provided");
};
