import React, { useEffect, useState } from 'react'
import { Fullscreen, MiniScreen, Times, MailSend } from '../../assets/Icons/Icons'
import SearchInput from '../SearchInput/SearchInput'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { useIsReply, useMsgFormShow, useReplyTheme, useSelectedUsers, useShowSentToUsers } from '../../contexts/MessageContext'
import { useSnackbar } from 'notistack'
import MDEditor from '@uiw/react-md-editor';
import './MessageForm.scss'
import io from 'socket.io-client'
const ENDPOINT = 'https://taskmailapp.herokuapp.com/';
var socket = io(ENDPOINT)

const MessageForm = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [theme, setTheme] = useState("")
    const [searchedUsers, setSearchedUsers] = useState([])
    const [inputUser, setInputUser] = useState("")
    const [selectedUsers, setSelectedUsers] = useSelectedUsers()
    const [text, setText] = useState("")

    const [isReply, setIsReply] = useIsReply()
    const [replyTheme, setReplyTheme] = useReplyTheme()

    const [msgFormShow, setMsgFormShow] = useMsgFormShow()
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false)
    const [showSentToUsers, setShowSentToUsers] = useShowSentToUsers()

    const getResults = async (txt) => {
        try {
            await axios.get(`https://taskmailapp.herokuapp.com/api/user/searchUsers?search=${txt}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setSearchedUsers(res?.data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (inputUser.length > 1) {
            getResults(inputUser)
        }
    }, [inputUser])

    const sendMessage = async () => {
        setShowSentToUsers(false)
        if (isReply) {
            try {
                await axios.post('https://taskmailapp.herokuapp.com/api/message/sendMessage', { sender: userInfo, theme: replyTheme, text, recipient: selectedUsers[0] }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    enqueueSnackbar(`Message to ${res?.data?.recipient?.username} is sent`, {
                        variant: 'success'
                    })
                    socket.emit("send_message", { data: res?.data })
                })
            } catch (error) {
                enqueueSnackbar('Something went wrong! Please try again', {
                    variant: 'error'
                })
                console.log(error);
            }
            setIsReply(false)
            setSelectedUsers([])
            setReplyTheme("")
            setText("")
            setIsLoading(true)
            setTimeout(() => setIsLoading(false), 2000)
        } else {
            if (userInfo && text !== "" && selectedUsers.length > 0) {
                selectedUsers.map(async v => {
                    try {
                        await axios.post('https://taskmailapp.herokuapp.com/api/message/sendMessage', { sender: userInfo, theme, text, recipient: v }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => {
                            enqueueSnackbar(`Message to ${res?.data?.recipient?.username} is sent`, {
                                variant: 'success'
                            })
                            socket.emit("send_message", { data: res?.data })
                        })
                    } catch (error) {
                        enqueueSnackbar('Something went wrong! Please try again', {
                            variant: 'error'
                        })
                        console.log(error);
                    }
                })
                setSelectedUsers([])
                setTheme("")
                setInputUser("")
                setText("")
                setIsLoading(true)
                setTimeout(() => setIsLoading(false), 2000)
            } else if (text === "") {
                enqueueSnackbar('Message can not be empty', {
                    variant: 'error'
                })
            } else if (selectedUsers.length === 0) {
                enqueueSnackbar('Please select the recipient', {
                    variant: 'error'
                })
            }
        }
    }

    const closeForm = () => {
        setIsReply(false)
        setSelectedUsers([])
        setReplyTheme("")
        setText("")
        setMsgFormShow(false)
        setShowSentToUsers(false)
    }

    return (
        <div className={`border rounded bg-white messageForm p-3 ${isFullScreen ? 'fullScreen' : ''} ${msgFormShow ? 'isShow' : ''}`}>
            <div className="messageForm-top d-flex justify-content-end">
                <button className="btn px-2" onClick={() => setIsFullScreen(!isFullScreen)}>{
                    isFullScreen ? <MiniScreen /> : <Fullscreen />
                }</button>
                <button className="btn px-2" onClick={closeForm}><Times /></button>
            </div>
            <div className="messageForm-selectUser mb-2">
                {
                    isReply ? <div>{selectedUsers[0].username}</div> : <SearchInput value={selectedUsers} items={searchedUsers} setInputValue={setInputUser} setValue={setSelectedUsers} setItems={setSearchedUsers} />
                }
            </div>
            <div className="messageForm-theme mb-1">
                {
                    isReply ? <div>{replyTheme}</div> : <TextField id="themeInput" label="Theme" fullWidth variant="standard" value={theme} onChange={(e) => setTheme(e.target.value)} />
                }
            </div>
            <div className="messageForm-text mb-3">
                <MDEditor
                    value={text}
                    onChange={setText}
                />
            </div>
            <div className="messageForm-bottom d-flex justify-content-end">
                <button className='btn bg-light fw-bolder me-3' onClick={() => setShowSentToUsers(!showSentToUsers)}>{showSentToUsers ? 'Hide' : 'Show'} sent messages to these users</button>
                <button className="btn btn-light d-flex sendBtn d-flex align-items-center justify-content-center" onClick={sendMessage} disabled={isLoading}>
                    {
                        isLoading ? <div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> : <span className='fw-bolder me-2'>Send <MailSend /></span>
                    }
                </button>
            </div>
        </div>
    )
}

export default MessageForm