import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface SingleImageUploaderProps {
  name: string;
  label: string;
  required: boolean;
}

const SingleImageUploader = ({
  name,
  label,
  required,
}: SingleImageUploaderProps) => {
  const [image, setImage] = useState<File | null>(null);
  const { control } = useFormContext(); // useFormContext to access control and other methods

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setImage(file);
  };

  return (
    <div className="image-uploader">
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <>
            <div
              className="upload-box"
              onClick={() =>
                document.querySelector('input[type="file"]')?.click()
              }
            >
              <input
                {...field}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  field.onChange(e.target.files ? e.target.files[0] : null);
                  handleChange(e);
                }}
                style={{ display: "none" }}
              />
              <div className="upload-text">Click or Drag to Upload</div>
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="preview-image"
                />
              )}
            </div>
            {required && <span className="required">*</span>}
          </>
        )}
      />
    </div>
  );
};

export default SingleImageUploader;
