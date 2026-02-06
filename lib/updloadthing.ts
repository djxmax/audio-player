// lib/uploadthing.ts
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

// Si tu n'as pas accès au type du backend, on définit le strict minimum ici
// Les clés doivent être les mêmes que dans ton src/uploadthing.ts du backend
export type OurFileRouter = {
  audioUploader: any;
  imageUploader: any;
};

export const UploadButton = generateUploadButton<OurFileRouter>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/uploadthing`,
});
export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/uploadthing`,
});