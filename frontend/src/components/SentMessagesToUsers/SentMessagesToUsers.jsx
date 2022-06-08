import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelectedUsers, useSentToUsers } from '../../contexts/MessageContext'
import Message from '../Message/Message'
import MessageShimmer from '../MessageShimmer/MessageShimmer'
import './SentMessagesToUsers.scss'

const SentMessagesToUsers = () => {
    const [selectedUsers] = useSelectedUsers()
    const [idOfUsers, setIdOfUsers] = useState([])
    const id = JSON.parse(localStorage.getItem('userInfo')).id
    const [sentToUsers, setSentToUsers] = useSentToUsers()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const idFunc = () => {
            let newArray = []
            selectedUsers.map(v => newArray.push(v._id))
            return newArray
        }
        setIdOfUsers(idFunc())
    }, [selectedUsers])

    useEffect(() => {
        const getSentMsg = async () => {
            setIsLoading(true)
            try {
                await axios.get('https://taskmailapp.herokuapp.com/api/message/sentToUsers', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: { users: idOfUsers, id }
                })
                    .then(res => {
                        if (res?.data) {
                            console.log(res.data);
                            setSentToUsers(res.data)
                        }
                        setIsLoading(false)
                    })
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        }

        if (idOfUsers.length > 0) {
            getSentMsg()
        } else {
            setSentToUsers([])
        }
    }, [id, idOfUsers, setSentToUsers])

    return (
        <div className='sentToUsers bg-white p-5'>{
            !isLoading ? sentToUsers.map(v => {
                return <Message key={v._id} message={v} />
            }) : <>
                <MessageShimmer />
                <MessageShimmer />
                <MessageShimmer />
                <MessageShimmer />
                <MessageShimmer />
                <MessageShimmer />
            </>
        }</div>
    )
}

export default SentMessagesToUsers