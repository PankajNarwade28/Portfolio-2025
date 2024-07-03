import React, { useRef } from "react";
import "./Contactform.css";
import emailjs from "@emailjs/browser";
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
          alert("Thanks For Contacting us !");
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Thanks For Contacting us !");
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
            />
            <input type="text" name="last_name" placeholder="Enter Last Name" />
          </div>
          <input
            type="email"
            name="user_email"
            id=""
            placeholder="Enter Email"
          />
          <textarea
            name="message"
            id=""
            rows={5}
            placeholder="Enter Message"
          ></textarea>

          <button>Send</button>
        </form>
      </div>
    </>
  );
};
