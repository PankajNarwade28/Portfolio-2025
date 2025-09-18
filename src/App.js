import "./App.css"; 
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About"; 
import { Project } from "./components/Project/Project";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer"; 
function App() {

  return (
    <>
    <div className="data-scroll-container" id="root">
      <Navbar />
      <div className="">
        <Hero />
        <About /> 
        <Project />
        <Contact />
      </div>
      <Footer />
      </div>
    </>
  );
}

export default App;
