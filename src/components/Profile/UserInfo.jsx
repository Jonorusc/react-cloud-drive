import React from 'react'
import Avatar from '@mui/material/Avatar'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { UserAccordion } from './UserAccordion'

function UserInfo({ user }) {
    return (
        <div className='user_info'>
            <div className='adjust_desktop'>
                <Avatar
                    className='avatar'
                    alt={user.username}
                    src={user.picture}
                />
                <div className="user_brief">
                    <div className="input">
                        <input type="text" placeholder={`${user.first_name} ${user.last_name}`} />
                        <CheckRoundedIcon className='input_icon' />
                    </div>
                    <div className="input">
                        <input type="text" placeholder={user.username} />
                        <CheckRoundedIcon className='input_icon' />
                    </div>
                </div>
            </div>
            <div className="user_info_accordion">
                <span className='user_title'>Account Settings</span>
                <div className="accordion">
                    <UserAccordion
                        title='Email'
                    >
                        <div className="accordion_body">
                            <div className="body">
                                <div className="body_item">
                                    <span className='body_text'>Email: </span>
                                    <div className="body_input">
                                        <input type="text" placeholder={user.email?.replace(/(?<=.).(?=[^@]?.@)/gm, '*')}/>
                                    </div>
                                </div>
                            </div>
                            <button 
                                className="body_button"
                                onClick={() => {console.log('update')}}
                            >
                                Update
                            </button>
                        </div>
                    </UserAccordion>
                    <UserAccordion
                        title='Security'
                    >
                        <div className="accordion_body">
                            <div className="body">
                                <div className="body_item">
                                    <span className='body_text'>Old password: </span>
                                    <div className="body_input">
                                        <input type="text" placeholder="********"/>
                                    </div>
                                </div>
                                <div className="body_item">
                                    <span className='body_text'>New password: </span>
                                    <div className="body_input">
                                        <input type="text" placeholder="********"/>
                                    </div>
                                </div>
                            </div>
                            <button 
                                className="body_button"
                                onClick={() => {console.log('update')}}
                            >
                                Update
                            </button>
                        </div>
                    </UserAccordion>
                </div>
            </div>
        </div>
    )
}

export default UserInfo