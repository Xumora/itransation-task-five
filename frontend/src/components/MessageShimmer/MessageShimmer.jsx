import React from 'react'
import './MessageShimmer.scss'

const MessageShimmer = () => {
    return (
        <div className="msgShimmer-wrapper bg-light border rounded px-4 py-2 d-flex mb-2">
            <div className="msgShimmer-wrapper-left">
                <div className="stroke animate mb-2"></div>
                <div className="stroke animate"></div>
            </div>
            <div className="msgShimmer-wrapper-right ms-5">
                <div className="bigStroke animate"></div>
            </div>
        </div>
    )
}

export default MessageShimmer