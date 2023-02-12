import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './reset-password.module.css'

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [emailCode, setEmailCode] = useState('');

    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    const onEmailCodeChange = e => {
        setEmailCode(e.target.value)
    }

    const formSubmit = (e) => {

    }

    return (
        <form className={styles.formWrap} onSubmit={formSubmit}>
            <h3 className={styles.formTitle}>Восстановление пароля</h3>
            <PasswordInput
                onChange={onPasswordChange}
                value={password}
                name={''}
                extraClass="mb-6"
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={onEmailCodeChange}
                icon={false}
                value={emailCode}
                name={'emailCode'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />

            <Button 
                htmlType="button"
                type="primary"
                size="large"
                onClick={() => {}}
                >
                Сохранить
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