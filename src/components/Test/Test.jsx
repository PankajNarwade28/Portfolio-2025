import { useEffect, useState } from "react";

const Test = () => {
  const [status, setStatus] = useState("Checking...");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/status")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Backend not reachable");
        }
        return res.json();
      })
      .then((data) => {
        setStatus(data.message);
      })
      .catch(() => {
        setError("Backend is DOWN ❌");
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Backend Status</h1>

      {error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      ) : (
        <p style={{ color: "green", fontWeight: "bold" }}>{status}</p>
      )}
    </div>
  );
};

export default Test;
