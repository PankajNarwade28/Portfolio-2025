import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Project } from "./components/Project/Project";
import { Certifications } from "./components/Certifications/Certifications";
import { Contact } from "./components/Contact/Contact";
import SecretAdminTrigger from "./components/Admin/SecretAdminTrigger";
import { Footer } from "./components/Footer/Footer";
import Admin from "./components/Admin/Admin";
import Test from "./components/Test/Test";
import Dashboard from "./components/Admin/Component/Dashboard/MyDashboard";
import ManageSkills from "./components/Admin/Component/Skills/MySkills";
import ManageCertificates from "./components/Admin/Component/Certificates/MyCertificates";
import ManageProjects from "./components/Admin/Component/Projects/MyProjects";
import ManageAboutMe from "./components/Admin/Component/About/MyAboutMe";
import MyEducation from "./components/Admin/Component/Education/MyEducation";
import MyAchievements from "./components/Admin/Component/Achievements/MyAchievements";
import MyTech from "./components/Admin/Component/Tech/MyTech";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import { use } from "react";

const API_BASE = process.env.REACT_APP_API_URL;
const AppRoutes = () => {
  const [data, setData] = useState(null);   
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  let interval;
  let attempts = 0;
  const maxAttempts = 5;

  const pollBackend = async () => {
    attempts++; // Increment immediately when the function runs
    
    try {
      const response = await fetch(`${API_BASE}/api/status/backend`);
      
      if (response.ok) {
        const result = await response.json();
        console.log("Backend is healthy");
        setData(result);
        setLoading(false);
        clearInterval(interval); // Stop polling on success
        return; // Exit function
      }
    } catch (error) {
      console.error(`Attempt ${attempts}: Error connecting to backend`, error);
    }

    // If we've reached max attempts and still haven't succeeded
    if (attempts >= maxAttempts) {
      console.log("Max attempts reached. Stopping poll.");
      setLoading(false);
      clearInterval(interval);
    }
  };

  // 1. First call immediately
  pollBackend();

  // 2. Set interval for subsequent calls
  interval = setInterval(pollBackend, 10000);

  // 3. Cleanup on unmount
  return () => clearInterval(interval);
}, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <Routes>
      {/* HOME ROUTE */}
      <Route
        path="/"
        element={
          <div className="data-scroll-container">
            <Navbar />
            <div>
              <Hero />
              <About />
              <Project />
              <Certifications />
              <Contact />
              <SecretAdminTrigger />
            </div>
            <Footer />
          </div>
        }
      />

      {/* TEST ROUTE (NO NAVBAR / FOOTER) */}
      <Route path="/test" element={<Test />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-projects" element={<ManageProjects />} />
        <Route path="my-skills" element={<ManageSkills />} />
        <Route path="my-about" element={<ManageAboutMe />} />
        <Route path="my-education" element={<MyEducation />} />
        <Route path="my-achievements" element={<MyAchievements />} />
        <Route path="my-tech" element={<MyTech />} />
        <Route path="my-certificates" element={<ManageCertificates />} />
        {/* Add more admin routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
