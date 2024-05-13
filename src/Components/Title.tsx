import { ReactNode } from "react";
import styles from "../Styles/Title.module.css";

interface ITitle {
  children: ReactNode;
  className?: string;
}

const Title: React.FC<ITitle> = ({ className, children }) => {
  return <h2 className={`${styles.title} ${className}`}>{children}</h2>;
};

export default Title;
