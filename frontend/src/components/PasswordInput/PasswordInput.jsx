import React, { useState } from 'react'
import { Eye, ClosedEye } from '../../assets/Icons/Icons'

const PasswordInput = ({ onChangeFunction = null, defaultValue = null }) => {
    const [isPassword, setIsPassword] = useState(true)
    return (
        <div className='d-flex bg-white rounded border align-items-center my-2'>
            <div className="form-floating w-100">
                <input type={isPassword ? "password" : "text"} className="form-control border-0 shadow-none" id="passwordInput" name='password' placeholder="Password" autoComplete="new-password" onChange={onChangeFunction} value={defaultValue} />
                <label htmlFor="passwordInput">Password</label>
            </div>
            <button className='btn btn-light shadow-none me-2 rounded' onClick={() => setIsPassword(!isPassword)}>
                {isPassword ? <Eye /> : <ClosedEye />}
            </button>
        </div>
    )
}

export default PasswordInput