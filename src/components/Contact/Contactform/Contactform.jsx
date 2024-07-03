import React, { useRef } from "react";
import "./Contactform.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Contactform = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_b2kobwd", "template_6aj4f45", form.current, {
        publicKey: "PiuldxkokUNi2N_rt",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast("Thanks For Contacting us !");
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast("Thanks For Contacting us !");
        }
      );
  };
  return (
    <>
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
            id=""
            placeholder="Enter Email"
            required
          />
          <textarea
            name="message"
            id=""
            rows={5}
            placeholder="Enter Message"
            required
          ></textarea>

          <button>Send</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
