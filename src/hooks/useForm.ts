import { ChangeEvent, useState } from "react";

type TUseForm = {
    [key: string]: string;
}

export const useForm = (initialForm: TUseForm) => {
    const [form, setForm] = useState<TUseForm>(initialForm)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm({ 
            ...form,
            [name]: value 
        })
    }

    return { form, handleChange, setForm }
}