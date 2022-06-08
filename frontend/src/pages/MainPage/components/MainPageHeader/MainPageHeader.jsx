import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Logout, Plus } from '../../../../assets/Icons/Icons'
import { useIsReply, useMessages, useMsgFormShow, useMsgType, useReplyTheme, useSelectedUsers, useSentToUsers, useShowSentToUsers } from '../../../../contexts/MessageContext'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Message from '../../../../components/Message/Message';
import './MainPageHeader.scss'

const MainPageHeader = () => {
    const [msgFormShow, setMsgFormShow] = useMsgFormShow()
    const navigate = useNavigate()
    const [messages, setMessages] = useMessages()
    const [setMsgType] = useMsgType(true)
    const [setIsReply] = useIsReply(true)
    const [setReplyTheme] = useReplyTheme(true)
    const [setSelectedUsers] = useSelectedUsers(true)
    const [setShowSentToUsers] = useShowSentToUsers(true)
    const [setSentToUsers] = useSentToUsers(true)

    const logout = () => {
        setMsgFormShow(false)
        setMessages([])
        setMsgType('incoming')
        setIsReply(false)
        setReplyTheme("")
        setSelectedUsers([])
        setShowSentToUsers(false)
        setSentToUsers([])
        localStorage.removeItem('userInfo')
        navigate('/')
    }
    return (
        <div className='mainPage-header bg-light d-flex align-items-center justify-content-between px-4 py-2'>
            <div className="mainPage-header-logo fs-2">Chats</div>
            <div className="mainPage-header-search">
                <Autocomplete
                    id="msgSearchInput"
                    options={messages}
                    getOptionLabel={(option) => option.theme}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    renderInput={(params) => <TextField {...params} style={{ backgroundColor: 'white' }} label="Search a message by theme..." />}
                    multiple
                    renderOption={(props, option) => {
                        return (
                            <Message {...props} message={option} key={option._id} />
                        )
                    }}
                />
            </div>
            <div className="mainPage-header-right d-flex justify-content-end">
                <button className='btn bg-white' onClick={() => setMsgFormShow(!msgFormShow)}><Plus /> Send</button>
                <button className='btn bg-white ms-4' onClick={logout}><Logout /></button>
            </div>
        </div>
    )
}

export default MainPageHeader