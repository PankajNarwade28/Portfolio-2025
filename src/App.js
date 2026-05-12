import React, { useEffect } from "react"; 
import AppRoutes from "./AppRoutes";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Toaster } from "sonner";   
import { toast } from "react-toastify";



function App() {
  useEffect(() => { AOS.init(); }, []);
  
useEffect(() => { 
  toast.info("Welcome to Pankaj's Portfolio!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </>
  );
}
 
export default App;
