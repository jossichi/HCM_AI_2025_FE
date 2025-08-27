import { useState } from "react";

const FileUploader = ({ label, accept, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleUpload = () => {
    if (file) onSubmit(file);
  };

  const isImage = accept?.startsWith("image");
  const isVideo = accept?.startsWith("video");

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 text-center hover:border-blue-400 transition w-full">
      <label className="text-base font-medium text-gray-700 cursor-pointer w-full">
        {label}
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {previewUrl && (
        <div className="mt-4 w-full">
          {isImage && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto rounded shadow"
            />
          )}
          {isVideo && (
            <video
              src={previewUrl}
              controls
              className="w-full h-auto rounded shadow"
            />
          )}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file}
        className={`mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition ${
          !file ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        🚀 Gửi file
      </button>
    </div>
  );
};

export default FileUploader;
