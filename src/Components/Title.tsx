import { ReactNode } from "react";
import styles from "../Styles/Title.module.css";

interface ITitle {
  children: ReactNode;
  className?: string; // Corrected prop name
}

const Title: React.FC<ITitle> = ({ className, children }) => {
  // Corrected prop name
  return <h2 className={`${styles.title} ${className}`}>{children}:</h2>; // Wrapped children inside curly braces
};

export default Title;
