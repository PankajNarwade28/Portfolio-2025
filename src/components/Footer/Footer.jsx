import React from "react";
import "./Footer.css";
import { FaRegCopyright, FaRegSmile } from "react-icons/fa";

export const Footer = () => {
  return (
    <>
      <div className="footer">
        <p>
          <FaRegCopyright /> 2024 Pankaj Digambar Narwade Thanks for visiting!
          <FaRegSmile />
        </p>
      </div>
    </>
  );
};
