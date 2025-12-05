"use server";

import sharp from "sharp";

export async function convertAndUploadWebP(file: File) {
  const arrayBuffer = await file.arrayBuffer();

  // Convert to WebP
  const webpBuffer = await sharp(Buffer.from(arrayBuffer))
    .webp({ quality: 80 })
    .toBuffer();

  // Convert Buffer -> Uint8Array -> Blob
  const webpBlob = new Blob([new Uint8Array(webpBuffer)], { type: "image/webp" });

  const cloudinaryPreset = process.env.CLOUDINARY_PRESET!;
  const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`;

  const formData = new FormData();
  formData.append("file", webpBlob, `${file.name.split(".")[0]}.webp`);
  formData.append("upload_preset", cloudinaryPreset);

  const res = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Cloudinary upload failed: " + text);
  }

  const data = await res.json();
  return data.secure_url;
}
