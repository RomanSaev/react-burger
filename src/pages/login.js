import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormInfo } from "../components/form-info/form-info";
import { fetchLogin } from "../store/actions/auth";
import { authSelector } from "../store/selectors";
import styles from './login.module.css';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { loginRequest, loginFailed } = useSelector(authSelector);

    const dispatch = useDispatch();

    const onEmailChange = e => {
        setEmail(e.target.value)
    }

    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    const formSubmit = (e) => {
        e.preventDefault();

        if (password.length < 6 || email === '') {
            return false;
        }

        dispatch(fetchLogin({ email, password }))
    }

    const isButtonDisabled = loginRequest;
    const btnText = 'Войти' + (loginRequest ? '...' : '');
    const formErrorDefaultText = 'Не удалось авторизироваться';

    return (
        <form className={styles.formWrap} onSubmit={formSubmit}>
            <h3 className={styles.formTitle}>Вход</h3>

            {loginFailed && <FormInfo text={formErrorDefaultText} type='error'/>}

            <EmailInput 
                onChange={onEmailChange}
                value={email}
                name={'email'}
                placeholder="E-mail"
                isIcon={false}
                extraClass="mb-6"
                required={true}
            />
            <PasswordInput 
                onChange={onPasswordChange}
                value={password}
                name={''}
                extraClass="mb-6"
                required={true}
            />
            <Button 
                htmlType="submit"
                type="primary"
                size="large"
                disabled={isButtonDisabled}
                >
                {btnText}
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