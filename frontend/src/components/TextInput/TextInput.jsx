import React from 'react'

const TextInput = ({ placeholder = "", name = "", onChangeFunction = null, defaultValue = null, label = "", className = "" }) => {
    return (
        <div className="form-floating">
            <input type="text" className={`form-control shadow-none ${className}`} id="textInput" name={name} placeholder={placeholder} onChange={onChangeFunction} value={defaultValue} />
            <label htmlFor="textInput">{label}</label>
        </div>
    )
}

export default TextInput