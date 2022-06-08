import React from 'react'
import { Incoming, Mail, Sent } from '../../../../assets/Icons/Icons'
import { useMsgType } from '../../../../contexts/MessageContext'
import './MainPageNavbar.scss'

const MainPageNavbar = () => {
    const [msgType, setMsgType] = useMsgType()
    return (
        <div className='mainPageNavbar pe-4 pt-4'>
            <button className={`btn d-block w-100 text-muted text-start ps-5 ${msgType === 'incoming' ? 'active' : ''}`} onClick={() => setMsgType('incoming')}><Incoming /> Incoming</button>
            <button className={`btn d-block w-100 text-muted my-3 text-start ps-5 ${msgType === 'sent' ? 'active' : ''}`} onClick={() => setMsgType('sent')}><Sent /> Sent</button>
            <button className={`btn d-block w-100 text-muted text-start ps-5 ${msgType === 'all' ? 'active' : ''}`} onClick={() => setMsgType('all')}><Mail /> All</button>
        </div>
    )
}

export default MainPageNavbar