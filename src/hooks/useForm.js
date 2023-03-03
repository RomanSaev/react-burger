import { useState } from "react";

export const useForm = (initialForm) => {
    const [form, setForm] = useState(initialForm)

    const handleChange = (event) => {
        const { value, name } = event.target;
        setForm({ 
            ...form,
            [name]: value 
        })
    }

    return { form, handleChange, setForm }
}