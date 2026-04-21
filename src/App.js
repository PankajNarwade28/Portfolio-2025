import React, { useEffect } from "react"; 
import AppRoutes from "./AppRoutes";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Toaster } from "sonner";  



function App() {
  useEffect(() => { AOS.init(); }, []);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </>
  );
}
 
export default App;
