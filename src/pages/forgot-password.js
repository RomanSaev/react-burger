import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './forgot-password.module.css'

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const onEmailChange = e => {
        setEmail(e.target.value)
    }

    const formSubmit = (e) => {

    }

    return (
        <form className={styles.formWrap} onSubmit={formSubmit}>
            <h3 className={styles.formTitle}>Восстановление пароля</h3>
            <EmailInput
                onChange={onEmailChange}
                value={email}
                name={'email'}
                placeholder="Укажите e-mail"
                isIcon={false}
                extraClass="mb-6"
            />

            <Button 
                htmlType="button"
                type="primary"
                size="large"
                onClick={() => {}}
                >
                Восстановить
            </Button>

            <div className={styles.formFooter}>
                <div className={styles.formFooterLinkWrap}>
                    <span>Вспомнили пароль?</span>
                    <Link
                        to='/login'
                        className={styles.formFooterLink}
                    >
                        Войти
                    </Link>
                </div>
            </div>
        </form>
    );
}