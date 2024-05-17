import { useLocation } from "react-router-dom";
import styles from "../Styles/Footer.module.css";

const Footer = () => {
  const location = useLocation();
  const isPublicPage = location.pathname === "/login/";

  if (isPublicPage) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.topics}>
        <p className={styles.description}>
          <strong>Objetivo:</strong> Fornecer uma plataforma capaz de gerir as
          eleições vinculadas a Defensoria Pública de maneira organizada e
          prática.
        </p>
        <p className={styles.copyright}>
          &copy; Desenvolvido pela Gerência de Tecnologia da Informação da
          Defensoria Pública do Estado de Santa Catarina.
        </p>
        <p className={styles.description}>
          <strong>Endereço:</strong> Av. Rio Branco, nº 919, Ed. Centro
          Executivo Rio Branco, Centro, Florianópolis/SC, 88015-205
          <br />
          <strong>Contato:</strong> (48) 3665-6370 / (48) 3665-6589 / (48)
          3665-6654
        </p>
      </div>
    </footer>
  );
};

export default Footer;
