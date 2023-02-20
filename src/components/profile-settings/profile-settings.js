import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/actions/auth';
import { authSelector } from '../../store/selectors';
import { FormInfo } from '../form-info/form-info';
import styles from './profile-settings.module.css'

export const ProfileSettings = () => {
    const {
        user, 
        patchUserRequest, 
        patchUserSuccess, 
        patchUserFailed,
    } = useSelector(authSelector);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [dataChanged, setDataChanged] = useState(false)
    const dispatch = useDispatch();

    const checkDataChange = () => {
        const isChanged = name !== user.name 
            || email !== user.email 
            || password !== '';
        setDataChanged(isChanged);
    }

    useEffect(() => {
        checkDataChange();
    }, [name, email, password])

    const onNameChange = e => {
        setName(e.target.value)
    }

    const onEmailChange= e => {
        setEmail(e.target.value)
    }

    const onPasswordChange= e => {
        setPassword(e.target.value)
    }

    const submitForm = e => {
        e.preventDefault();

        if (!dataChanged || (password !== '' && password.length < 6) || email === '' || name === '') {
            return false;
        }

        const patchData = {};
        if (name !== user.name) patchData.name = name;
        if (email !== user.email) patchData.email = email;
        if (password !== '') patchData.password = password;

        dispatch(updateUser(patchData))
            .then(() => {
                setDataChanged(false);
            })
            .catch(err => {})

    }

    const onCancelClick = () => {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
    }

    const isButtonDisabled = !dataChanged || patchUserRequest;
    const btnText = 'Сохранить' + (patchUserRequest ? '...' : '');
    const formErrorDefaultText = 'Не удалось изменить данные';
    const formSuccessDefaultText = 'Данные успешно изменены';

    return (
        <form className={styles.profileForm} onSubmit={submitForm}>

            {patchUserFailed && <FormInfo text={formErrorDefaultText} type='error'/>}

            {patchUserSuccess && <FormInfo text={formSuccessDefaultText} type='success'/>}

            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onNameChange}
                icon="EditIcon"
                value={name}
                name={'name'}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
                required={false}
            />

            <EmailInput
                onChange={onEmailChange}
                value={email}
                name={'email'}
                placeholder="Логин"
                isIcon={true}
                extraClass="mb-6"
                required={true}
            />

            <PasswordInput
                onChange={onPasswordChange}
                value={password}
                name={''}
                extraClass="mb-6"
                placeholder="Пароль"
                required={true}
                icon="EditIcon"
            />

            <div className={styles.formBtnPanel}>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={onCancelClick}
                    disabled={isButtonDisabled}
                >
                    Отмена
                </Button>

                <Button 
                    htmlType="submit"
                    type="primary"
                    size="large"
                    disabled={isButtonDisabled}
                    >
                    {btnText}
                </Button>
            </div>

        </form>
    );

}