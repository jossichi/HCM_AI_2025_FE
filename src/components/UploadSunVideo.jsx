import { useState } from "react";
import { uploadSunVideo } from "../services/videoService";

export default function UploadSunVideo() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await uploadSunVideo(file);
      setResult(res.video);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <h1 className="text-2xl font-bold mb-6">Upload CCTV Video</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96 space-y-4">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 disabled:opacity-50">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {error && <div className="mt-4 text-red-600 font-medium">❌ {error}</div>}

      {result && (
        <div className="mt-6 bg-yellow-100 border border-yellow-200 p-4 rounded-md text-sm w-96">
          <p>
            <strong>Video ID:</strong> {result.video_id}
          </p>
          <p>
            <strong>Video Name:</strong> {result.video_name}
          </p>
          <p>
            <strong>Domain:</strong> {result.domain}
          </p>
        </div>
      )}
    </div>
  );
}
