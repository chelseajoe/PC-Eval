import React, { useEffect, useState } from "react";
import ProsodyViewer from "../components/ProsodyViewer";
import { fetchProsodyFiles, fetchResultFile } from "../services/api";

const ProsodyPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      try {
        const data = await fetchProsodyFiles();
        setFiles(data);

        if (data.length > 0) {
          const firstFile = data[0];
          setSelectedFile(firstFile);
          const initialData = await fetchResultFile(firstFile);
          setEntries(initialData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadFiles();
  }, []);

  const handleFileChange = async (e) => {
    const filename = e.target.value;
    setSelectedFile(filename);
    setLoading(true);
    try {
      const fileData = await fetchResultFile(filename);
      setEntries(fileData);
      setError(null);
    } catch (err) {
      setError(err);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      {/* File selector */}
      <div className="card mb-4 bg-light border shadow-sm">
        <div className="card-header fw-medium">
          Choose Prosody Evaluation File
        </div>
        <div className="card-body">
          <select
            className="form-select"
            value={selectedFile}
            onChange={handleFileChange}
            style={{ maxWidth: "400px" }}
          >
            <option value="">-- Select a JSON file --</option>
            {files.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          {loading && <p className="mt-2 text-muted">Loading prosody analysis...</p>}
          {error && <p className="mt-2 text-danger">{error.message}</p>}
        </div>
      </div>

      {/* Prosody viewer */}
      <div style={{ minHeight: "600px" }}>
        {entries && entries.length > 0 ? (
          <ProsodyViewer entries={entries} />
        ) : (
          !loading && <div className="text-muted">No prosody data available.</div>
        )}
      </div>

    </div>
  );
};

export default ProsodyPage;
