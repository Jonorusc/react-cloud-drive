import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import axios from 'axios'


function SendCode({ setStep, setCode, error, setError, userInfo }) {
    const validateCode = Yup.object().shape({
        code: Yup.string()
        .required('The code is required')
        .min(6, 'Code must be 6 characters')
        .max(6, 'Code must be 6 characters')
    }),
    formOptions = { resolver: yupResolver(validateCode)},
    { register, handleSubmit, formState } = useForm(formOptions),
    { errors } = formState

    async function onSubmit(res) {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND}/validateresetcode`, {
                email: userInfo.email,
                code: res.code.toString()
            })
            setError('')
            setStep(3) 
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    useEffect(() => {
        setError(errors.code?.message)
    }, [errors, setError])

    return (
        <div className="content">
            <div className="box start">
                <h5 className="box_text">Hello! {userInfo.first_name}</h5>
                <p>
                We just sent the verification code to your email check it and enter the code down below
                </p>
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="input"
                >
                    <input
                        type="text"
                        className="_input"
                        placeholder="Type here"
                        onChange={(e) => {setCode(e.target.value)}}
                        {...register('code')}
                    />
                    <button className="_button">Check</button>
                </form>
                {error && <span className='error'>{error}</span>}
                <span
                    className="re-send"
                    onClick={() => {
                        setStep(1)
                    }}
                >
                    Send another
                </span>
            </div>
        </div>
    )
}

export default SendCode
