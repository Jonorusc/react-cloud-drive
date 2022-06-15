import { Formik, Form } from 'formik'
import { Link } from "react-router-dom"
import * as Yup from "yup"
import DotLoader from "react-spinners/DotLoader"
import { useMediaQuery } from "react-responsive"
import React, { useState } from 'react'
import LoginInput from './LoginInput'
import Cookies from 'js-cookie'
import axios from 'axios'
// redux
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const loginInfo = {
    email: '',
    passowrd: '',
}

function LoginForm() {
    const dispatch = useDispatch(),
    navigate = useNavigate(),
    [login, setLogin] = useState(loginInfo),
    { email, password } = login,
    handleLogin = e => {
        const { name, value } = e.target 
        setLogin({...login, [name] : value})
    },
    validateLogin = Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('Must be a valid email')
            .max(100),
        password: Yup.string().required('Password is required')
    }),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false),
    loginSubmit = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(
                `${process.env.BACKEND_URL}/login`,
                { email, password,}
            )
            dispatch({type: 'LOGIN', payload: data})
            Cookies.set('user', JSON.stringify(data))
            navigate('/')
        } catch(err) {
            setLoading(false)
            setError(err.response.data.message)
        }
    },
    mobile = useMediaQuery({
        query: "(max-width: 820px)",
    })
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    email,
                    password,
                }}
                validationSchema={validateLogin}
                onSubmit={() => {
                    loginSubmit()
                }}
            >
                {(formik) => (
                    <Form>
                        <LoginInput 
                            type = "text"
                            name = "email"
                            placeholder = "enter your email"
                            onChange = {handleLogin}
                            errorPosition = { !mobile ? "left" : "" }
                        />
                        <LoginInput 
                            type = "password"
                            name = "password"
                            placeholder = "type your password"
                            onChange = {handleLogin}
                            errorPosition = { !mobile ? "left" : "bottom" }
                        />
                        <Link to="/forgot" className="forgot_password">
                            forgot password?
                        </Link>
                        <button type="submit" className="btn-primary">
                            <DotLoader color="#6986A5" loading={loading} size={30} />
                            Log In
                        </button>
                    </Form>
                )}
            </Formik>
            <div className="error">
                {error && <span className="err">{error}</span>}
            </div>
        </>
    )
}

export default LoginForm