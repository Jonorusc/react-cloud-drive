import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

function ChangePassword({
    setStep,
    setPassword,
    error,
    setError,
    userInfo,
}) {
    const dispatch = useDispatch(),
    [visible, setVisible] = useState(false),
        validatePassword = Yup.object().shape({
            password: Yup.string()
                .required('The password is required!')
                .min(8, 'Password must be atleast 8 characters!')
                .max(16, 'Password must be a maximum of 16 characters!'),
        }),
        formOptions = { resolver: yupResolver(validatePassword) },
        { register, handleSubmit, formState } = useForm(formOptions),
        { errors } = formState

    async function onSubmit(res) {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND}/changepassword`, {
                email: userInfo.email,
                password: res.password.toString(),
            })
            setError('')
            setVisible(true)
            setTimeout(() => {
                // quit user
                Cookies.set('user', '')
                dispatch({
                    type: 'LOGOUT',
                })
                window.location.href = '/login'
            }, 5000);
        } catch (err) {
            setVisible(false)
            setError(err.response.data.message)
        }
    }

    useEffect(() => {
        setError(errors.password?.message)
    }, [errors, setError])

    return (
        <div className="content">
            {visible && (
                <h4 className="text">
                    your password has been successfully reset, you will be
                    redirected to the login page
                </h4>
            )}
            {!visible && (
                <div className="box start">
                    <h5 className="box_text">Change your password</h5>
                    <p>For security type a strong password</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="input">
                        <input
                            type="password"
                            className="_input"
                            placeholder="Type your new password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            {...register('password')}
                        />
                        <button className="_button">Change</button>
                    </form>
                    {error && <span className="error">{error}</span>}
                    <span
                        className="re-send"
                        onClick={() => {
                            setStep(1)
                        }}
                    >
                        come back
                    </span>
                </div>
            )}
        </div>
    )
}

export default ChangePassword
