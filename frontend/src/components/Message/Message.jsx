import React, { useState } from 'react'
import { Reply } from '../../assets/Icons/Icons'
import MDEditor from '@uiw/react-md-editor';
import moment from 'moment'
import './Message.scss'
import { useIsReply, useMsgFormShow, useReplyTheme, useSelectedUsers } from '../../contexts/MessageContext';

const Message = ({ message }) => {
    const [msgShow, setMsgShow] = useState(false)
    const [setMsgFormShow] = useMsgFormShow(true)
    const [setIsReply] = useIsReply(true)
    const [setSelectedUsers] = useSelectedUsers(true)
    const [setReplyTheme] = useReplyTheme(true)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const getShortTheme = (theme) => {
        if (theme.length > 110) {
            let shortTheme = theme.slice(0, 110) + '...'
            return shortTheme
        } else {
            return theme
        }
    }

    const getShortName = (name) => {
        if (name.length > 22) {
            let shortName = name.slice(0, 22) + '...'
            return shortName
        } else {
            return name
        }
    }

    const replyMsg = () => {
        setIsReply(true)
        setReplyTheme(message.theme)
        setSelectedUsers([message.sender])
        setMsgFormShow(true)
    }

    return (
        <div className={`message border rounded mb-2 overflow-hidden ${msgShow ? 'show' : ''}`}>
            <div className="message-top d-flex bg-light px-3 py-1 align-items-top">
                <div className="message-top-left fw-bolder">
                    <p>From:</p>
                    <p>To:</p>
                </div>
                <div className="message-top-users">
                    <p>{getShortName(message?.sender?.username)}</p>
                    <p>{message?.recipient?.username}</p>
                </div>
                <div className="message-top-theme">
                    <span className='fw-bolder'>Theme:</span><button className='btn p-0 ms-3' onClick={() => setMsgShow(!msgShow)}>{getShortTheme(message?.theme)}</button>
                </div>
                <div className="message-top-right text-muted text-end">
                    <p>{moment.utc(message?.createdAt).local().format('DD.MM.YYYY HH:MM')}</p>
                </div>
            </div>
            <div className="message-dropdown border-top d-flex">
                <div className="message-dropdown-text p-3">
                    <MDEditor.Markdown source={message?.content} />
                </div>
                {
                    message.recipient._id === userInfo.id && message.sender._id !== userInfo.id ? <div className="message-dropdown-toolbar border-start d-flex flex-column justify-content-center align-items-center">
                        <button className="btn bg-light" onClick={replyMsg}><Reply /></button>
                    </div> : ''
                }
            </div>
        </div>
    )
}

export default Message