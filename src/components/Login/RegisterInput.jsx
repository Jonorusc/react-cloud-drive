import React from 'react'
import { useField, ErrorMessage } from "formik"
import { useMediaQuery } from "react-responsive"

function RegisterInput({ placeholder, errorPosition, ...props }) {
    const [field, meta] = useField(props),
        mobile = useMediaQuery({
            query: "(max-width: 820px)",
        })
    return (
        <div className='input_wrap'>
            {meta.touched && meta.error && !errorPosition && (
                <div 
                    className={
                        !mobile ? 'input_error desktop_error' : 'input_error'
                    }
                >
                    <ErrorMessage name={field.name} />
                </div>
            )}
            <input 
                className={ meta.error ? 'register_input error' : 'register_input' }
                type={field.type}
                name={field.name}
                placeholder={placeholder}
                {...field}
                {...props}
            />
            {meta.touched && meta.error && errorPosition  && (
                <div 
                    className={
                        !mobile ? `input_error_${errorPosition} desktop_error` : `input_error_${errorPosition}`
                    }
                >
                    <ErrorMessage name={field.name} />
                </div>
            )}
        </div>
    )
}

export default RegisterInput