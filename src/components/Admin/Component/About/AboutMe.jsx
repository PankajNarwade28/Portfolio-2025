import { useState, useEffect } from "react";
import axios from "axios";
import "./AboutMe.css";
const ManageAboutMe = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    current_role: "",
    projects_built: 0,
    current_cgpa: 0,
    passionate_summary: "",
    profile_pic_url: "",
    years_learning: 0,
    drivers: [],
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load current data on mount
    axios
      .get("http://localhost:5000/api/about-me")
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Error loading profile:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDriverChange = (index, value) => {
    const updatedDrivers = [...formData.drivers];
    updatedDrivers[index] = value;
    setFormData((prev) => ({ ...prev, drivers: updatedDrivers }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.profile_pic_url;

      // If a new file is selected, upload it first
      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload/image",
          uploadData,
        );
        imageUrl = uploadRes.data.url;
      }

      const finalData = { ...formData, profile_pic_url: imageUrl };
      await axios.put("http://localhost:5000/api/about-me", finalData);

      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-container">
      <h2>Edit Portfolio Profile</h2>
      <form onSubmit={handleSubmit} className="manage-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>CGPA</label>
          <input
            type="number"
            step="0.01"
            name="current_cgpa"
            value={formData.current_cgpa}
            onChange={handleInputChange}
          />
        </div>

        {/* For full width items */}
        <div className="form-group full-width">
          <label>Summary</label>
          <textarea
            name="passionate_summary"
            value={formData.passionate_summary}
            onChange={handleInputChange}
          />
        </div>  

        <label>Projects Completed</label>
        <input
          type="number"
          name="projects_built"
          value={formData.projects_built}
          onChange={handleInputChange}
        />
 

        <label>Drivers (Comma separated)</label>
        <input
          value={formData.drivers.join(", ")}
          onChange={(e) =>
            setFormData({ ...formData, drivers: e.target.value.split(", ") })
          }
        />

        <label>Profile Image</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ManageAboutMe;
