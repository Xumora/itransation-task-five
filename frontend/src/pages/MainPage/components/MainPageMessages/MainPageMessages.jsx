import React, { useEffect, useState } from 'react'
import Message from '../../../../components/Message/Message'
import { useMessages, useMsgType } from '../../../../contexts/MessageContext'
import { getMessages } from '../../../../api/getMessages'
import MessageShimmer from '../../../../components/MessageShimmer/MessageShimmer'
import io from 'socket.io-client'
const ENDPOINT = 'https://taskmailapp.herokuapp.com/';
var socket = io(ENDPOINT)

const MainPageMessages = () => {
    const [messages, setMessages] = useMessages()
    const [newMessages, setNewMessages] = useState(messages)
    const [msgType] = useMsgType()
    const [isLoading, setIsLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('userInfo'))

    useEffect(() => {
        getMessages(setMessages, msgType, setIsLoading)
    }, [msgType, setMessages])

    useEffect(() => {
        setNewMessages(messages)
    }, [messages])

    useEffect(() => {
        if (msgType === 'incoming') {
            socket.on("recieve_message", (data) => {
                setNewMessages([data.data, ...newMessages])
            })
        }
        if (msgType === 'sent') {
            socket.on("recieve_sent_message", (data) => {
                setNewMessages([data.data, ...newMessages])
            })
        }
        if (msgType === 'all') {
            socket.on("recieve_message", (data) => {
                setNewMessages([data.data, ...newMessages])
            })
            socket.on("recieve_sent_message", (data) => {
                let isMatch = [];
                isMatch = newMessages.filter(v => v._id === data.data._id)
                if (isMatch.length === 0) {
                    setNewMessages([data.data, ...newMessages])
                }
            })
        }
    }, [msgType, newMessages])

    useEffect(() => {
        socket.emit('setup', user)
        socket.emit('join_room', user.id)
    }, [user])


    return (
        <div className='p-3'>
            {
                !isLoading ? newMessages.map(v => {
                    return <Message key={v._id} message={v} />
                }) : <>
                    <MessageShimmer />
                    <MessageShimmer />
                    <MessageShimmer />
                    <MessageShimmer />
                    <MessageShimmer />
                    <MessageShimmer />
                </>
            }
        </div>
    )
}

export default MainPageMessages