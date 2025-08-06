import { useState } from "react";

const FileUploader = ({ onSubmit, label, accept }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) onSubmit(file);
  };

  return (
    <div className="file-upload">
      <label>{label}</label>
      <input type="file" onChange={handleChange} accept={accept} />
      <button onClick={handleUpload} disabled={!file}>
        Gửi file
      </button>
    </div>
  );
};

export default FileUploader;
