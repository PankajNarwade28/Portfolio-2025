import { Routes, Route,Navigate } from "react-router-dom"; 
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
const AppRoutes = () => {
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
        <Route path="my-education" element={<MyEducation   />} />
        <Route path="my-achievements" element={<MyAchievements />} />
        <Route path="my-certificates" element={<ManageCertificates />} />
        {/* Add more admin routes here */}
      </Route>
    </Routes>
    );  
};

export default AppRoutes;