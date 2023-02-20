import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormInfo } from "../components/form-info/form-info";
import { useForm } from "../hooks/useForm";
import { fetchResetPassword } from "../store/actions/reset-password";
import { resetPasswordSelector } from "../store/selectors";
import styles from './reset-password.module.css'

export const ResetPasswordPage = () => {
    const {form, handleChange, setForm} = useForm({
        password: '',
        emailCode: '',
    })
    const [resultSuccess, setResultSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { resetPasswordRequest, resetPasswordFailed } = useSelector(resetPasswordSelector)

    useEffect(() => {
        if (!location.state || !location.state.resetPassword) {
            navigate('/forgot-password')
        }

    }, [location.state, navigate])

    const formSubmit = (e) => {
        e.preventDefault();

        setResultSuccess(false);
        if (form.password.length < 6) {
            return false;
        }

        dispatch(fetchResetPassword(form))
            .then(() => {
                setResultSuccess(true);
            })
            .catch((err) => {})
    }

    const isButtonDisabled = resetPasswordRequest;
    const defaultSuccessText = 'Пароль успешно изменён'
    const formErrorDefaultText = 'Не удалось восстановить пароль. Попробуйте ещё раз';

    return (
        <form className={styles.formWrap} onSubmit={formSubmit}>
            <h3 className={styles.formTitle}>Восстановление пароля</h3>

            {resetPasswordFailed && <FormInfo text={formErrorDefaultText} type='error'/>}

            {resultSuccess && <FormInfo type='success' text={defaultSuccessText}/>}

            {!resultSuccess && (
                <>
                <PasswordInput
                    onChange={handleChange}
                    value={form.password}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Введите новый пароль"
                    required={true}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    icon={false}
                    value={form.emailCode}
                    name={'emailCode'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                    required={true}
                />

                <Button 
                    htmlType="submit"
                    type="primary"
                    size="large"
                    disabled={isButtonDisabled}
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
                </>
            )}
        </form>
    );
}