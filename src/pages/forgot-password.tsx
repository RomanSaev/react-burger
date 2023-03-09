import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInfo } from "../components/form-info/form-info";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { fetchForgotPassword } from "../store/actions/reset-password";
import { resetPasswordSelector } from "../store/selectors";
import { FormInfoTypes } from "../types";
import styles from './forgot-password.module.css'

export const ForgotPasswordPage: FC = () => {
    const [email, setEmail] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { forgotPasswordRequest, forgotPasswordFailed } = useAppSelector(resetPasswordSelector)

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const navigateToResetPswrd = () => {
        navigate('/reset-password', {state: {resetPassword: true}});
    }

    const formSubmit = (e: FormEvent) => {
        e.preventDefault();

        (dispatch(fetchForgotPassword(email)) as any)
            .then(() => { 
                navigateToResetPswrd()
            })
            .catch(() => {});
    }

    const isButtonDisabled: boolean = forgotPasswordRequest;
    const btnText = 'Восстановить' + (forgotPasswordRequest ? '...' : '');
    const formErrorDefaultText = 'Не удалось восстановить пароль. Попробуйте ещё раз';

    return (
        <form className={styles.formWrap} onSubmit={formSubmit}>
            <h3 className={styles.formTitle}>Восстановление пароля</h3>

            {forgotPasswordFailed && <FormInfo text={formErrorDefaultText} type={FormInfoTypes.Error}/>}

            <EmailInput
                onChange={onEmailChange}
                value={email}
                name={'email'}
                placeholder="Укажите e-mail"
                isIcon={false}
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