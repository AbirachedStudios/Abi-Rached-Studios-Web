import React from "react";

const Button = ({ text, textEs, lang = "default", onClick }) => {
  const buttonText = lang === "es" ? textEs : text;

  return (
    <button
      onClick={onClick}
      className="text-black bg-gold hover:bg-primary-60 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-title-small text-title-small transition duration-300 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-bold cursor-pointer md:w-72 md:mx-2 w-full"
      style={{ height: "48px" }}
    >
      {buttonText}
    </button>
  );
};

export default Button;
