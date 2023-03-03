import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormInfo } from "../components/form-info/form-info";
import { useForm } from "../hooks/useForm";
import { fetchLogin } from "../store/actions/auth";
import { authSelector } from "../store/selectors";
import styles from './login.module.css';

export const LoginPage = () => {
    const {form, handleChange, setForm} = useForm({
        email: '',
        password: '',
    })
    const { loginRequest, loginFailed } = useSelector(authSelector);
    const dispatch = useDispatch();

    const formSubmit = (e) => {
        e.preventDefault();

        if (form.password.length < 6 || form.email === '') {
            return false;
        }

        dispatch(fetchLogin(form))
    }

    const isButtonDisabled = loginRequest;
    const btnText = 'Войти' + (loginRequest ? '...' : '');
    const formErrorDefaultText = 'Не удалось авторизироваться';

    return (
        <form className={styles.formWrap} onSubmit={formSubmit}>
            <h3 className={styles.formTitle}>Вход</h3>

            {loginFailed && <FormInfo text={formErrorDefaultText} type='error'/>}

            <EmailInput 
                onChange={handleChange}
                value={form.email}
                name={'email'}
                placeholder="E-mail"
                isIcon={false}
                extraClass="mb-6"
                required={true}
            />
            <PasswordInput 
                onChange={handleChange}
                value={form.password}
                name={'password'}
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