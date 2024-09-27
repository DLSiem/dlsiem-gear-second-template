import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <p className="text-sm">Gear Second © {year}</p>
      </div>
    </div>
  );
};

export default Footer;
