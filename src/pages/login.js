import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './login.module.css';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const onEmailChange = e => {
        setEmail(e.target.value)
    }

    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    const formSubmit = (e) => {

    }

    return (
        <form className={styles.formWrap} onSubmit={formSubmit}>
            <h3 className={styles.formTitle}>Вход</h3>
            <EmailInput 
                onChange={onEmailChange}
                value={email}
                name={'email'}
                placeholder="E-mail"
                isIcon={false}
                extraClass="mb-6"
            />
            <PasswordInput 
                onChange={onPasswordChange}
                value={password}
                name={''}
                extraClass="mb-6"
            />
            <Button 
                htmlType="submit"
                type="primary"
                size="large"
                //onClick={() => {}}
                >
                Войти
            </Button>

            <div className={styles.formFooter}>
                <div className={styles.formFooterLinkWrap}>
                    <span>Вы — новый пользователь?</span>
                    <Link
                        to='/register'
                        className={styles.formFooterLink}
                    >
                        Зарегистрироваться
                    </Link>
                </div>
                
                <div className={styles.formFooterLinkWrap}>
                    <span>Забыли пароль?</span>
                    <Link 
                        to='/forgot-password'
                        className={styles.formFooterLink}
                    >
                        Восстановить пароль
                    </Link>
                </div>
            </div>
        </form>
    );
}