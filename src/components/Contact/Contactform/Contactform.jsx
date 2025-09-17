import React, { useRef, useState } from "react";
import "./Contactform.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          form.current.reset();
        },
        () => {
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
        <form ref={form} onSubmit={sendEmail} className="contact-form-ui">
          <div className="name-container">
            <div className="input-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Enter First Name"
                required
                autoComplete="given-name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Enter Last Name"
                required
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              placeholder="Enter Email"
              required
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows={5}
              placeholder="Enter Message"
              required
            ></textarea>
          </div>
          <button disabled={loading} className="send-btn">
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};