import { fileDeleter, fileUploader } from "../lib/cloudinary.js";

export const handleNewImages = async (images, dir) => {
  if (images) {
    const uploadResults = await fileUploader(images, dir, `tours/${dir}`);
    return uploadResults;
  }
};
