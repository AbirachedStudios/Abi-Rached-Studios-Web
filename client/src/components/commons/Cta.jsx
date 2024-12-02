
import styles from "./styles.module.css";
export const Cta = ({
  onClick,
  href,
  children,
  role = "button",
  className = "",
}) => {
  // Si se pasa href, se utiliza una etiqueta <a>, de lo contrario, se usa un <button>
  const Tag = href ? "a" : "button";

  return (
    <Tag
      onClick={onClick}
      href={href}
      role={role}
      tabIndex="0"
      className={`cta ${className} bg-gold py-2 px-6 text-headline-small rounded-[5px] hover:bg-primary-60 transition duration-300 my-4 ${styles.fullWidth}`} 
      style={{ cursor: "pointer" }}
      aria-pressed={role === "button" ? "false" : undefined}
    >
      {children}
    </Tag>
  );
};
