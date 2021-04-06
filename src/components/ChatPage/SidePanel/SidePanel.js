import React from 'react'
import UserPanel from './UserPanel';
import ChatRoom from './ChatRooms';
import DirectMessages from './DirectMessages';
import Favorited from './Favorited';
function SidePanel() {
    return (
        <div
            style={{
                backgroundColor:"#7B83EB",
                padding:'2rem',
                minHeight:'100vh',
                color:'white',
                minWidth:'275px'
            }}
        >
            <UserPanel/>

            <Favorited/>

            <ChatRoom/>

            <DirectMessages/>

        </div>
    )
}

export default SidePanel
