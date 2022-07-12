import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import RegisterInput from './RegisterInput'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'
import DotLoader from 'react-spinners/DotLoader'
import Cookies from 'js-cookie'
import Registered from './Registered'

function RegisterForm({ setVisible }) {
    // const dispatch = useDispatch(),
    let user_data = null

    // constants
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
        // use yup to validate the inputs
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
        [error, setError] = useState(''),
        [success, setSuccess] = useState(''),
        [loading, setLoading] = useState(''),
        registerSubimit = async () => {
            try {
                setLoading(true)
                const { data } = await axios.post(
                    `${process.env.REACT_APP_BACKEND}/register`,{
                        first_name,
                        last_name,
                        email,
                        password
                    }
                )
                setError('')
                setSuccess(data.message)
                // storing the data in cookies for us to use in redux, even after the page refresh
                const { message, ...rest } = data
                user_data = rest
                // saving user data to use for activation 
                Cookies.set('user', JSON.stringify(rest))
            } catch(err) {
                setLoading(false)
                setSuccess('')
                setError(err.response.data.message)
            }
        },
        mobile = useMediaQuery({
            query: "(max-width: 820px)",
        })

    // end constants

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
                                <DotLoader color="#fff" loading={loading} size={30} />
                                {!loading && <span>sign-up</span>}
                            </button>
                        </Form>
                    )}
                </Formik>
                {success && <Registered email={email} rest={user_data} />}
                <div className="error">
                    {error && <span className="err">{error}</span>}
                </div>
            </div>
        </div>
    )
}

export default RegisterForm