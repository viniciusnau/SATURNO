import React, { useState, useEffect } from 'react';
import styles from '../Styles/Header.module.css';
import { HiBars3 } from 'react-icons/hi2';
import { isLoggedIn, logout } from '../Auth/Auth';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isResponsive, setIsResponsive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [toggleNav, setToggleNav] = useState<boolean>(true);

    useEffect(() => {
        const handleResize = () => {
            setIsResponsive(window.innerWidth <= 940);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.greenContainer} />
            <div className={styles.container}>
                <img
                    className={styles.logo}
                    alt="Logo"
                    onClick={() => navigate('/saturno/')}
                />
                <div
                    className={
                        isResponsive
                            ? styles.buttonContainer
                            : styles.navigation
                    }
                >
                    {isResponsive ? (
                        <div>
                            <button
                                className={styles.responsiveButton}
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                            >
                                <HiBars3 size={24} />
                            </button>
                            {isDropdownOpen && (
                                <div className={styles.modal}>
                                    <ul>
                                        <li
                                            onClick={() => {
                                                setIsDropdownOpen(
                                                    !isDropdownOpen
                                                );
                                                setToggleNav(!toggleNav);
                                                navigate('saturno/');
                                            }}
                                        >
                                            <span
                                                className={`${styles.route} ${styles.modalItem}`}
                                            >
                                                Votação
                                            </span>
                                        </li>
                                        {isLoggedIn() && (
                                            <>
                                                <li
                                                    onClick={() => {
                                                        setIsDropdownOpen(
                                                            !isDropdownOpen
                                                        );
                                                        setToggleNav(
                                                            !toggleNav
                                                        );
                                                        navigate(
                                                            'saturno/elections'
                                                        );
                                                    }}
                                                >
                                                    <span
                                                        className={`${styles.route} ${styles.modalItem}`}
                                                    >
                                                        Eleições
                                                    </span>
                                                </li>
                                                <span
                                                    onClick={() => {
                                                        setToggleNav(
                                                            !toggleNav
                                                        );
                                                        navigate(
                                                            'saturno/confirm-hash'
                                                        );
                                                    }}
                                                    className={`${styles.route} ${styles.logout}`}
                                                >
                                                    Confirmação de hash
                                                </span>
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
                                    navigate('saturno/');
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
                                            navigate('saturno/elections');
                                        }}
                                        className={`${styles.route} ${styles.logout}`}
                                    >
                                        Eleições
                                    </span>
                                    <span
                                        onClick={() => {
                                            setToggleNav(!toggleNav);
                                            navigate('saturno/confirm-hash');
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
