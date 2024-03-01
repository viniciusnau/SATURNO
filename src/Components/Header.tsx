import React, { useState, useEffect } from "react";
import styles from "../Styles/Header.module.css";
import image from "../Assets/logo_saturno.png";
import { HiBars3 } from "react-icons/hi2";
import { isLoggedIn, logout } from "../Auth/Auth";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isResponsive, setIsResponsive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleNav, setToggleNav] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 940);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.greenContainer} />
      <div className={styles.container}>
        <img
          src={image}
          className={styles.logo}
          alt="Logo"
          onClick={() => navigate("/saturno/vote/")}
        />
        <div
          className={isResponsive ? styles.buttonContainer : styles.navigation}
        >
          {isResponsive ? (
            <div>
              <button
                className={styles.responsiveButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <HiBars3 size={24} />
              </button>
              {isDropdownOpen && (
                <div className={styles.modal}>
                  <ul>
                    {isLoggedIn() && (
                      <>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            setToggleNav(!toggleNav);
                            navigate("saturno/vote/");
                          }}
                        >
                          <span
                            className={`${styles.route} ${styles.modalItem}`}
                          >
                            Votação
                          </span>
                        </li>
                        <li
                          onClick={() => {
                            setToggleNav(!toggleNav);
                            navigate("saturno/list-voting-persons");
                          }}
                        >
                          <span className={`${styles.route} ${styles.logout}`}>
                            Confirmação de votos
                          </span>
                        </li>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            setToggleNav(!toggleNav);
                            navigate("saturno/elections");
                          }}
                        >
                          <span
                            className={`${styles.route} ${styles.modalItem}`}
                          >
                            Eleições
                          </span>
                        </li>
                        <li
                          onClick={() => {
                            setToggleNav(!toggleNav);
                            navigate("saturno/confirm-hash");
                          }}
                        >
                          <span className={`${styles.route} ${styles.logout}`}>
                            Confirmação de hash
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.navigation}>
              <span
                onClick={() => {
                  setToggleNav(!toggleNav);
                  navigate("saturno/");
                }}
                className={`${styles.route} ${styles.logout}`}
              >
                Votação
              </span>
              {isLoggedIn() && (
                <>
                  <span
                    onClick={() => {
                      setToggleNav(!toggleNav);
                      navigate("saturno/elections");
                    }}
                    className={`${styles.route} ${styles.logout}`}
                  >
                    Eleições
                  </span>
                  <span
                    onClick={() => {
                      setToggleNav(!toggleNav);
                      navigate("saturno/confirm-hash");
                    }}
                    className={`${styles.route} ${styles.logout}`}
                  >
                    Confirmação de hash
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
