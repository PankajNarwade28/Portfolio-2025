import { Routes, Route } from "react-router-dom";
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

function App() {
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
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
