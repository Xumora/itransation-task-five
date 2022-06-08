import React, { createContext, useContext, useState } from 'react'
const Context = createContext()


const MessageContext = ({ children }) => {
    const [msgFormShow, setMsgFormShow] = useState(false)
    const [messages, setMessages] = useState([])
    const [msgType, setMsgType] = useState('incoming')
    const [isReply, setIsReply] = useState(false)
    const [replyTheme, setReplyTheme] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([])
    const [showSentToUsers, setShowSentToUsers] = useState(false)
    const [sentToUsers, setSentToUsers] = useState([])

    const value = {
        msgFormShow,
        setMsgFormShow,
        messages,
        setMessages,
        msgType,
        setMsgType,
        isReply,
        setIsReply,
        replyTheme,
        setReplyTheme,
        selectedUsers,
        setSelectedUsers,
        showSentToUsers,
        setShowSentToUsers,
        sentToUsers,
        setSentToUsers
    }

    return (
        <Context.Provider value={value}>
            <Context.Consumer>
                {
                    () => children
                }
            </Context.Consumer>
        </Context.Provider>
    )
}

const useMsgFormShow = (setterOnly) => {
    const { msgFormShow, setMsgFormShow } = useContext(Context)
    return setterOnly ? [setMsgFormShow] : [msgFormShow, setMsgFormShow]
}

const useMessages = (setterOnly) => {
    const { messages, setMessages } = useContext(Context)
    return setterOnly ? [setMessages] : [messages, setMessages]
}

const useMsgType = (setterOnly) => {
    const { msgType, setMsgType } = useContext(Context)
    return setterOnly ? [setMsgType] : [msgType, setMsgType]
}

const useIsReply = (setterOnly) => {
    const { isReply, setIsReply } = useContext(Context)
    return setterOnly ? [setIsReply] : [isReply, setIsReply]
}

const useReplyTheme = (setterOnly) => {
    const { replyTheme, setReplyTheme } = useContext(Context)
    return setterOnly ? [setReplyTheme] : [replyTheme, setReplyTheme]
}

const useSelectedUsers = (setterOnly) => {
    const { selectedUsers, setSelectedUsers } = useContext(Context)
    return setterOnly ? [setSelectedUsers] : [selectedUsers, setSelectedUsers]
}

const useShowSentToUsers = (setterOnly) => {
    const { showSentToUsers, setShowSentToUsers } = useContext(Context)
    return setterOnly ? [setShowSentToUsers] : [showSentToUsers, setShowSentToUsers]
}

const useSentToUsers = (setterOnly) => {
    const { sentToUsers, setSentToUsers } = useContext(Context)
    return setterOnly ? [setSentToUsers] : [sentToUsers, setSentToUsers]
}

export {
    MessageContext,
    useMsgFormShow,
    useMessages,
    useMsgType,
    useIsReply,
    useReplyTheme,
    useSelectedUsers,
    useShowSentToUsers,
    useSentToUsers
}