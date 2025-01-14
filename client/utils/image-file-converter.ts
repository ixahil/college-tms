function dataUrlToFile(dataUrl, filename) {
  const arr = dataUrl.split(","); // Split into type and base64 data
  const mime = arr[0].match(/:(.*?);/)[1]; // Extract the mime type
  const bstr = atob(arr[1]); // Decode base64 string
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  // Create a byte array
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  // Create a Blob or File object from the byte array
  return new File([u8arr], filename, { type: mime });
}

export function convertImages(images) {
  return images
    .map((image) => {
      if (typeof image === "string" && image.startsWith("data:image")) {
        // If image is a data URL, convert it to a File object
        return dataUrlToFile(image, "image.png"); // You can adjust filename and format as needed
      } else if (image instanceof File) {
        // If it's already a File object, just return it
        return image;
      }
      return null;
    })
    .filter(Boolean); // Remove any null values
}
