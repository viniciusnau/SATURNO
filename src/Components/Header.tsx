import React, { useState, useEffect } from "react";
import styles from "../Styles/Header.module.css";
import image from "../Assets/logo_saturno.png";
import { HiBars3 } from "react-icons/hi2";
import { isLoggedIn, logout as frontendLogout } from "../Auth/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as backendLogout } from "../Services/Slices/logoutSlice";
import { useSelector } from "react-redux";
import { fetchmeId } from "../Services/Slices/meId";
import AutoLogoutTimer from "./AutoLogoutTimer";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const [isResponsive, setIsResponsive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleNav, setToggleNav] = useState<boolean>(true);
  const { data } = useSelector((state: any) => state.loginSlice);
  const meIdData = useSelector((state: any) => state.meId);
  let position = "";

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

  useEffect(() => {
    if (location.pathname !== "/saturno/login" || "/saturno/register") {
      console.log(location.pathname);
      dispatch(fetchmeId());
    }
  }, [dispatch, location.pathname]);

  if (meIdData.data && meIdData.data.length !== 0) {
    position = meIdData.data.position;
  }

  const handleLogout = async () => {
    await dispatch(backendLogout());
    frontendLogout(navigate);
  };

  const [showAutoLogoutTimer, setShowAutoLogoutTimer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAutoLogoutTimer(true);
    }, 15000);

    return () => clearTimeout(timer);
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
                        {position !== "public defender" && (
                          <>
                            <li
                              onClick={() => {
                                setToggleNav(!toggleNav);
                                navigate("saturno/elections-results/");
                              }}
                            >
                              <span
                                className={`${styles.route} ${styles.logout}`}
                              >
                                Resultado das Eleições
                              </span>
                            </li>
                            <li
                              onClick={() => {
                                setToggleNav(!toggleNav);
                                navigate("saturno/vote-report/");
                              }}
                            >
                              <span
                                className={`${styles.route} ${styles.logout}`}
                              >
                                Relatórios
                              </span>
                            </li>
                          </>
                        )}
                        <li
                          onClick={() => {
                            setToggleNav(!toggleNav);
                            navigate("saturno/confirm-hash/");
                          }}
                        >
                          <span className={`${styles.route} ${styles.logout}`}>
                            Validação de voto
                          </span>
                        </li>
                        <li onClick={handleLogout}>
                          <span className={`${styles.route} ${styles.logout}`}>
                            Logout
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
              {isLoggedIn() && (
                <>
                  <span
                    onClick={() => {
                      setToggleNav(!toggleNav);
                      navigate("saturno/vote/");
                    }}
                    className={`${styles.route} ${styles.logout}`}
                  >
                    Votação
                  </span>
                  {position !== "public defender" && (
                    <>
                      <span
                        onClick={() => {
                          setToggleNav(!toggleNav);
                          navigate("saturno/elections-results/");
                        }}
                        className={`${styles.route} ${styles.logout}`}
                      >
                        Resultado das Eleições
                      </span>
                      <span
                        onClick={() => {
                          setToggleNav(!toggleNav);
                          navigate("saturno/vote-report/");
                        }}
                        className={`${styles.route} ${styles.logout}`}
                      >
                        Relatórios
                      </span>
                    </>
                  )}
                  <span
                    onClick={() => {
                      setToggleNav(!toggleNav);
                      navigate("saturno/confirm-hash/");
                    }}
                    className={`${styles.route} ${styles.logout}`}
                  >
                    Validação de Hash
                  </span>
                </>
              )}
              {isLoggedIn() && (
                <span
                  onClick={handleLogout}
                  className={`${styles.route} ${styles.logout}`}
                >
                  Sair
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {isLoggedIn() && showAutoLogoutTimer && <AutoLogoutTimer />}{" "}
    </header>
  );
};

export default Header;
