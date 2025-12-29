import React from "react";
import { siteContent } from "../content";

export default function Footer() {
  const { texto } = siteContent.footer;
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          {texto}
        </p>
      </div>
    </footer>
  );
}