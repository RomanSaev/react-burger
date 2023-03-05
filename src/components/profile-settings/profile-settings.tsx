import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { updateUser } from '../../store/actions/auth';
import { authSelector } from '../../store/selectors';
import { FormInfoTypes, TUserUpdateData } from '../../types';
import { FormInfo } from '../form-info/form-info';
import styles from './profile-settings.module.css'

export const ProfileSettings: FC = () => {
    const {
        user, 
        patchUserRequest, 
        patchUserSuccess, 
        patchUserFailed,
    } = useSelector(authSelector);

    const [name, setName] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);
    const [password, setPassword] = useState<string>(user.password);
    const [dataChanged, setDataChanged] = useState<boolean>(false)
    const dispatch: Dispatch<any> = useDispatch();

    const checkDataChange = () => {
        const isChanged: boolean = name !== user.name 
            || email !== user.email 
            || password !== '';
        setDataChanged(isChanged);
    }

    useEffect(() => {
        checkDataChange();
    }, [name, email, password])

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const submitForm = (e: FormEvent) => {
        e.preventDefault();

        if (!dataChanged || (password !== '' && password.length < 6) || email === '' || name === '') {
            return false;
        }

        const patchData: TUserUpdateData = {};
        if (name !== user.name) patchData.name = name;
        if (email !== user.email) patchData.email = email;
        if (password !== '') patchData.password = password;

        (dispatch(updateUser(patchData)) as any)
            .then(() => {
                setDataChanged(false);
            })
            .catch(() => {})
    }

    const onCancelClick = () => {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
    }

    const isButtonDisabled: boolean = !dataChanged || patchUserRequest;
    const btnText = 'Сохранить' + (patchUserRequest ? '...' : '');
    const formErrorDefaultText = 'Не удалось изменить данные';
    const formSuccessDefaultText = 'Данные успешно изменены';

    return (
        <form className={styles.profileForm} onSubmit={submitForm}>

            {patchUserFailed && <FormInfo text={formErrorDefaultText} type={FormInfoTypes.Error}/>}

            {patchUserSuccess && <FormInfo text={formSuccessDefaultText} type={FormInfoTypes.Success}/>}

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