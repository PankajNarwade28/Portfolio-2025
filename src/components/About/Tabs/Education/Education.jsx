import React, { useEffect, useState } from "react"; 
import "./Education.css";
import Loading from "../LoadingEmpty/Loading";
import Empty from "../LoadingEmpty/Empty";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL;

const EducationSection = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    setLoading(true);
    try { 
      const format = await axios.get(`${API_BASE}/api/education`);

      // 🔁 Transform DB → UI format
      const formatted = format.data.map((edu) => ({
        id: edu.id,
        degree: edu.degree,
        institution: edu.college_name,
        field_of_study: edu.field_of_study,
        location: edu.location,
        duration: `${edu.start_year}-${edu.end_year || "Present"}`,
        grade: `${edu.grade_type || ""}: ${edu.grade_value || ""} ${edu.grade_extra ? `(${edu.grade_extra})` : ""}`,
        status: edu.is_current ? "current" : "completed",
        description: edu.specialization,
      }));

      setEducation(formatted);
    } catch (err) {
      console.error("Error fetching education:", err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading message="Loading Education..." />;
  }

  if (!education.length) {
    return (
      <Empty
        title="No education records found."
        description="Check Backend on Hosting Platform or Database."
        onRetry={fetchEducation}
      />
    );
  }
  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Educational Journey</h2>
        <div className="title-underline"></div>
      </div>

      <div className="education-timeline">
        {education.map((edu, index) => (
          <div key={edu.id} className={`timeline-item ${edu.status}`}>
            <div className="timeline-connector">
              <div className="timeline-dot"></div>
              {index < education.length - 1 && (
                <div className="timeline-line"></div>
              )}
            </div>

            <div className="education-card">
              <div className="card-header">
                <div className="duration-badge">{edu.duration}</div>

                {edu.status === "current" && (
                  <div className="current-badge">
                    <div className="pulse-dot"></div>
                    <span>Current</span>
                  </div>
                )}
              </div>

              <div className="card-content">
                <h3 className="degree-title flex items-center gap-2">
                  {edu.degree}
                  <span className="text-sm text-purple-400 font-medium">
                    • {edu.field_of_study}
                  </span>
                </h3>

                <p className="institution">
                  {edu.institution}
                  <span className="location">📍 {edu.location}</span>
                </p>

                <p className="description">{edu.description}</p>
              </div>

              <div className="card-footer">
                <div className="grade-display">
                  <span className="grade-value">{edu.grade}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EducationSection;
