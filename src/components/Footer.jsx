import React from "react";
import "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ Matan Ben Zahav {year}</p>
    </footer>
  );
}

export default Footer;
