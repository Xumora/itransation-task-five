import React from 'react'
import MessageForm from '../../components/MessageForm/MessageForm'
import SentMessagesToUsers from '../../components/SentMessagesToUsers/SentMessagesToUsers'
import { useShowSentToUsers } from '../../contexts/MessageContext'
import MainPageHeader from './components/MainPageHeader/MainPageHeader'
import MainPageMessages from './components/MainPageMessages/MainPageMessages'
import MainPageNavbar from './components/MainPageNavbar/MainPageNavbar'
import './MainPage.scss'

const MainPage = () => {
    const [showSentToUsers] = useShowSentToUsers()

    return (
        <div className='mainPage'>
            <MainPageHeader />
            <div className="mainPage-main d-flex">
                <div className="mainPage-main-left border-end">
                    <MainPageNavbar />
                </div>
                <div className="mainPage-main-right">
                    <MessageForm />
                    <MainPageMessages />
                    {showSentToUsers ? <SentMessagesToUsers /> : ''}
                </div>
            </div>
        </div>
    )
}

export default MainPage