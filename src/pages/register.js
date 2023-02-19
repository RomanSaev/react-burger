import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormInfo } from "../components/form-info/form-info";
import { fetchRegister } from "../store/actions/auth";
import { authSelector } from "../store/selectors";
import styles from './register.module.css';

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const {registerRequest, registerFailed} = useSelector(authSelector);

    const nameRef = useRef(null)
    const dispatch = useDispatch();

    const onEmailChange = e => {
        setEmail(e.target.value)
    }

    const onPasswordChange = e => {
        setPassword(e.target.value)
    }

    const onNameChange = e => {
        setName(e.target.value)
    }

    const onNameIconClick = () => {
        setTimeout(() => nameRef.current.focus(), 0)
    }

    const formSubmit = (e) => {
        e.preventDefault();

        if (password.length < 6 || email === '' || name === '') {
            return false;
        }

        dispatch(fetchRegister({ email, password, name }))
            .then(() => {
                navigate('/');
            })
            .catch(err => {}); 
    }

    const isButtonDisabled = registerRequest;
    const btnText = 'Зарегистрироваться' + (registerRequest ? '...' : '');
    const formErrorDefaultText = 'Не удалось зарегистрироваться';

    return (
        <form className={styles.formWrap} onSubmit={formSubmit}>
            <h3 className={styles.formTitle}>Регистрация</h3>

            {registerFailed && <FormInfo text={formErrorDefaultText} type='error'/>}

            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onNameChange}
                icon={false}
                value={name}
                name={'name'}
                error={false}
                ref={nameRef}
                onIconClick={onNameIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
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