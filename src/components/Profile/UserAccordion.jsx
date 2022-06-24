import React, { useState, useEffect } from 'react'
import { useMediaQuery } from "react-responsive"

// import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

export function UserAccordion(props) {
    const [accordion, setAccordion] = useState(false),
    mobile = useMediaQuery({
        query: "(max-width: 820px)",
    })
    
    useEffect(() => {
        !mobile ? setAccordion(true) : setAccordion(false) 
        // eslint-disable-next-line
    }, [])
    

    return (
        <div className="accordion_item">
            <div
                onClick={() => {
                    setAccordion((accordion) => !accordion)
                }}
                className={
                    accordion ? 'accordion_header active' : 'accordion_header'
                }
            >
                <span>{props.title}</span>
                <div>
                    <KeyboardArrowDownRoundedIcon
                        className={
                            accordion
                                ? 'accordion_header_icon active'
                                : 'accordion_header_icon'
                        }
                    />
                </div>
            </div>
            {accordion && props.children}
        </div>
    )
}