import React, { useEffect, useState } from 'react';
import styles from '../Styles/Login.module.css';
import icon from '../Assets/google-icon.png';
import { fetchLogin } from '../Services/Slices/getLogin';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../PATH';
import Input from '../Components/Input';
import Snackbar from '../Components/Snackbar';
import Loading from '../Components/Loading';
import { handleKeyPress } from '../Components/Helper';
import Button from '../Components/Button';
import { Link } from '@mui/material';
import Title from '../Components/Title';
import { fetchTokenTimeInfo } from '../Services/Slices/authState';
import { deadline } from '../Components/Consts';

const Login = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { data, loading, error, status } = useSelector(
        (state: any) => state.loginSlice
    );
    const [isDispatched, setIsDispatched] = useState<boolean>(false);
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [finalVoteTime, setFinalVoteTime] = useState<boolean>(false);

    useEffect(() => {
        const currentDateTime = new Date();
        if (currentDateTime <= deadline.finalLoginTime) {
            setFinalVoteTime(false);
        }
    }, [finalVoteTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDateTime = new Date();
            if (currentDateTime > deadline.finalLoginTime) {
                setFinalVoteTime(true);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [finalVoteTime]);

    const handleGoogleLogin = () => {
        const googleLoginUrl = `${PATH.base}/user/google-redirect`;
        window.location.href = googleLoginUrl;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target;
        setForm((prev: any) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = () => {
        if (finalVoteTime) {
            setShowSnackbar(true);
            return;
        }
        const formatted = { ...form, username: form.email };
        dispatch(fetchLogin(formatted));
        setIsDispatched(true);
        <div className={styles.formGroup}>
            <div className={styles.password}>
                <Input
                    className={styles.input}
                    fieldType="outlined"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                    placeholder="exemplo@defensoria.sc.gov.br"
                />
            </div>
        </div>;
    };

    useEffect(() => {
        if (isDispatched && status === 200) {
            dispatch(fetchTokenTimeInfo());
            navigate('/saturno/vote/');
        }
    }, [data, isDispatched, navigate]);

    useEffect(() => {
        if (isDispatched) {
            setTimeout(() => {
                setIsDispatched(false);
            }, 3000);
        }
    }, [isDispatched]);

    return (
        <div className={styles.container}>
            {showSnackbar && (
                <Snackbar
                    type="errorLoginExpired"
                    setShowSnackbar={setShowSnackbar}
                />
            )}
            {error && status !== 403 && isDispatched && (
                <Snackbar type="errorLogin" setShowSnackbar={setIsDispatched} />
            )}
            {error && status === 403 && isDispatched && (
                <Snackbar
                    type="unauthorizedLogin"
                    setShowSnackbar={setIsDispatched}
                />
            )}
            <div
                className={styles.loginForm}
                onKeyUp={(e) => handleKeyPress(e, handleSubmit, 'Enter')}
            >
                <Title>Bem Vindo(a)</Title>
                <div className={styles.formGroup}>
                    <div className={styles.password}>
                        <Input
                            className={styles.input}
                            fieldType="outlined"
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                            placeholder="exemplo@defensoria.sc.gov.br"
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.password}>
                        <Input
                            className={styles.input}
                            fieldType="password"
                            label="Senha"
                            name="password"
                            onChange={handleChange}
                            value={form.password}
                            placeholder="********"
                        />
                    </div>
                </div>
                <div className={styles.linkContainer}>
                    <Link
                        href="/saturno/register/"
                        underline="hover"
                        className={styles.link}
                    >
                        Registre-se
                    </Link>
                    <Link
                        href="/saturno/password-reset/"
                        underline="hover"
                        className={styles.link}
                    >
                        Esqueceu a senha?
                    </Link>
                </div>

                <div className={styles.lineContainer}>
                    <hr className={styles.line} />
                    <div className={styles.text}>Após registrar-se</div>
                    <hr className={styles.line} />
                </div>

                <Button className={styles.google} onClick={handleGoogleLogin}>
                    <img
                        alt="Ícone do Google"
                        src={icon}
                        className={styles.icon}
                    />
                    <p className={styles.login}>Acessar com Google</p>
                </Button>

                <div className={styles.formButton}>
                    <Button className={styles.button} onClick={handleSubmit}>
                        {loading ? (
                            <div style={{ position: 'relative', top: '-3rem' }}>
                                <Loading size="1.5rem" type="spin" />
                            </div>
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
