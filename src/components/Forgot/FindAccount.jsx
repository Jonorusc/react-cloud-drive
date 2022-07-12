import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import DotLoader from 'react-spinners/DotLoader'
import axios from 'axios'

function FindAccount({
    setStep,
    email,
    setEmail,
    error,
    setError,
    loading,
    setLoading,
    setUserInfo
}) {
    const validateEmail = Yup.object().shape({
            email: Yup.string()
                .required('You must enter an email!')
                .email('Must be a valid email address!')
                .max(50, 'Email address must be a maximum of 50 characters!'),
        }),
        formOptions = { resolver: yupResolver(validateEmail) },
        { register, handleSubmit, formState } = useForm(formOptions),
        { errors } = formState

    async function onSubmit(res) {
        try {
            setLoading(true)
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND}/finduser`,
                {email: res.email.toString()}
            )
            setUserInfo(data)
            setTimeout(() => {
                setLoading(false)
                setStep(1)
                setError('')
            }, 1000);
        } catch (err) {
            setLoading(false)
            setError(err.response.data.message)
        }
    }

    useEffect(() => {
        setError(errors.email?.message)
        setLoading(false)
    }, [errors, setError, setLoading])

    return (
        <div className="content">
            <h4 className="text">First we have to find your account</h4>
            <div className="box">
                <h5 className="box_text">Please enter your email:</h5>
                <form onSubmit={handleSubmit(onSubmit)} className="input">
                    <input
                        name="email"
                        type="text"
                        className="_input"
                        placeholder="Type here"
                        onChange={(e) => setEmail(e.target.value)}
                        {...register('email')}
                    />
                    <button type="submit" className="_button">
                        Find
                    </button>
                </form>
                {loading && <br />}
                <DotLoader color="#6986A5" loading={loading} size={20} />
                {error && <span className="error">{error}</span>}
            </div>
        </div>
    )
}

export default FindAccount
