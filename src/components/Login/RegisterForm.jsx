import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import RegisterInput from './RegisterInput'
import { useMediaQuery } from "react-responsive"

function RegisterForm({ setVisible }) {
    const userInfo = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    },
    [user, setUser] = useState(userInfo),
    {
        first_name,
        last_name,
        email,
        password,
    } = user,
    handleRegister = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    },
    validateRegister = Yup.object({
        first_name: Yup.string()
            .required('your first name is necessary!')
            .min(2, 'First name must be between 2 and 16 characters.')
            .max(16, 'First name must be between 2 and 16 characters.'),
        last_name: Yup.string()
            .required('your surname is necessary!')
            .min(2, 'First name must be between 2 and 16 characters.')
            .max(16, 'First name must be between 2 and 16 characters.'),
        email: Yup.string()
            .required("You'll need this when you log in and if you ever need to reset your password.")
            .email('Enter a valid email'),
        password: Yup.string()
            .required("You must type a password")
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "Password can't be more than 36 characters"),
    }),
    registerSubimit = async () => {
        console.log('register submit')
    },
    mobile = useMediaQuery({
        query: "(max-width: 820px)",
    })
    return (
        <div className='register_page'>
            <div className="register">
                <div className="register_header">
                    <h2 className='header_text'>Sign-up</h2>
                    <div 
                        className="register_close"
                        onClick={() => {setVisible(false)}}
                    >
                        <CloseRoundedIcon />
                        </div>
                </div>
                <Formik 
                    enableReinitialize
                    initialValues={{
                        first_name,
                        last_name,
                        email,
                        password,
                    }}
                    validationSchema = {validateRegister}
                    onSubmit = {() => {
                        registerSubimit()
                    }}
                >
                    {(formik) => (
                        <Form className='register_form'>
                            <RegisterInput 
                                type = "text"
                                name = "first_name"
                                placeholder = "enter your first name"
                                onChange = {handleRegister}
                                errorPosition = { !mobile ? "left" : "" }
                            />
                            <RegisterInput 
                                type = "text"
                                name = "last_name"
                                placeholder = "enter your surname"
                                onChange = {handleRegister}
                                errorPosition = { !mobile ? "right" : "bottom" }
                            />
                            <RegisterInput 
                                type = "text"
                                name = "email"
                                placeholder = "enter your email"
                                onChange = {handleRegister}
                                errorPosition = { !mobile ? "left" : "bottom" }
                            />
                            <RegisterInput 
                                type = "password"
                                name = "password"
                                placeholder = "type a password"
                                onChange = {handleRegister}
                                errorPosition = { !mobile ? "right" : "bottom" }
                            />
                            <button type="submit" className='btn-primary'>
                                register
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RegisterForm