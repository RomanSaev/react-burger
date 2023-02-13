
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './profile-settings.module.css'

export const ProfileSettings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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


        console.log('profileSubmit')
    }

    const onCancelClick = () => {
        console.log('cancelClick');
    }

    return (
        <form className={styles.profileForm} onSubmit={submitForm}>
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
                >
                    Отмена
                </Button>

                <Button 
                    htmlType="submit"
                    type="primary"
                    size="large"
                    disabled={false}
                    >
                    Сохранить
                </Button>
            </div>



        </form>
    );

}