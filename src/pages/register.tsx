import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { FormInfo } from "../components/form-info/form-info";
import { fetchRegister } from "../store/actions/auth";
import { authSelector } from "../store/selectors";
import styles from './register.module.css';
import { useForm } from "../hooks/useForm";
import { FormInfoTypes } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/store";

export const RegisterPage: FC = () => {
    const { form, handleChange, } = useForm({
        name: '',
        email: '',
        password: '',
    })
    const {registerRequest, registerFailed} = useAppSelector(authSelector);
    const nameRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const onNameIconClick = () => {
        setTimeout(() => {
            nameRef.current && nameRef.current.focus()
        }, 0)
    }

    const formSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (form.password.length < 6 || form.email === '' || form.name === '') {
            return false;
        }

        dispatch(fetchRegister(form))
    }

    const isButtonDisabled: boolean = registerRequest;
    const btnText = 'Зарегистрироваться' + (registerRequest ? '...' : '');
    const formErrorDefaultText = 'Не удалось зарегистрироваться';

    return (
        <form className={styles.formWrap} onSubmit={formSubmit}>
            <h3 className={styles.formTitle}>Регистрация</h3>

            {registerFailed && <FormInfo text={formErrorDefaultText} type={FormInfoTypes.Error}/>}

            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                value={form.name}
                name={'name'}
                error={false}
                ref={nameRef}
                onIconClick={onNameIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <EmailInput 
                onChange={handleChange}
                value={form.email}
                name={'email'}
                placeholder="E-mail"
                isIcon={false}
                extraClass="mb-6"

            />
            <PasswordInput 
                onChange={handleChange}
                value={form.password}
                name={'password'}
                extraClass="mb-6"
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
                    <span>Уже зарегистрированы?</span>
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