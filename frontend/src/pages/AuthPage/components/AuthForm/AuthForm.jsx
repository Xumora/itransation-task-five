import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import axios from 'axios'
import TextInput from '../../../../components/TextInput/TextInput'
import PasswordInput from '../../../../components/PasswordInput/PasswordInput'
import AuthButton from '../../../../components/AuthButton/AuthButton'
import './AuthForm.scss'

const AuthForm = ({ type }) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const authHandler = async (path) => {
        if (form.username !== "" && form.password !== "") {
            try {
                setIsLoading(true)
                await axios.post(`https://taskmailapp.herokuapp.com/api/user/${path}`, { ...form }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if (res?.data?.success) {
                        localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                        navigate('/main')
                    }
                    if (!res?.data?.success) {
                        enqueueSnackbar(res?.data?.message, {
                            variant: 'error'
                        })
                    }
                    setIsLoading(false)
                })
                setForm({
                    username: "",
                    password: ""
                })
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        } else {
            enqueueSnackbar('Fill in all the fields', {
                variant: 'error'
            })
        }
    }

    const onChangeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className='authForm'>
            <div className="bg-white mb-3 rounded py-2 text-center fs-2">{type === 'login' ? "Sign in" : "Sign up"}</div>
            <div className="bg-white rounded p-3">
                <form onSubmit={(e) => e.preventDefault()}>
                    <TextInput placeholder="Username" name="username" onChangeFunction={onChangeHandler} defaultValue={form.username} label="Username" />
                    <PasswordInput onChangeFunction={onChangeHandler} defaultValue={form.password} />
                    <AuthButton isLoading={isLoading} text={type === 'login' ? "Sign in" : "Sign up"} onClickFunction={() => authHandler(type === 'login' ? 'login' : 'registration')} />
                </form>
                <p className='text-center'>{type === 'login' ? "Do not have an account?" : "Already have an account?"} <Link to={type === 'login' ? "/registration" : "/"} onClick={() => setForm({ username: "", password: "" })}>{type === 'login' ? "Sign up" : "Sign in"}</Link></p>
            </div>
        </div>
    )
}

export default AuthForm