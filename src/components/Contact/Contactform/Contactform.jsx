import React, { useRef, useState } from "react";
import "./Contactform.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import your loader image
const loaderImg = process.env.PUBLIC_URL + "/assets/images/Loader.png";

export const Contactform = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm("service_b2kobwd", "template_6aj4f45", form.current, {
        publicKey: "PiuldxkokUNi2N_rt",
      })
      .then(
        () => {
          setLoading(false);
          toast("Thanks For Contacting us !");
          form.current.reset(); // Clear the form
        },
        (error) => {
          setLoading(false);
          toast("Failed to send. Please try again.");
        }
      );
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader-content">
            <img src={loaderImg} alt="Loading..." className="loader-img" />
            <div>Loading...</div>
          </div>
        </div>
      )}
      <div className="contact-form-container">
        <form action="" ref={form} onSubmit={sendEmail}>
          <div className="name-container">
            <input
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Enter Last Name"
              required
            />
          </div>
          <input
            type="email"
            name="user_email"
            placeholder="Enter Email"
            required
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Enter Message"
            required
          ></textarea>
          <button disabled={loading}>Send</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};