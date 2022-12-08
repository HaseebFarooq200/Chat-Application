import React from 'react'
import Chatmessages from './chatmessages';
import Oldmsgs from './oldmsgs';
import { useEffect, useRef, useState } from 'react';

export default function Chatinput({ usermessage, send_message, setusermessage, messages, username, userroom }) {
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const [msg, setmsg] = useState([])

    const getMessages = async () => {
        const res = await fetch('/showmessages', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        const data = await res.json()
        setmsg(data)
    }

    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {
        scrollToBottom()	      
    }, [messages]);

    return (
        <>
            <div className="card-body msg_card_body scrollbar scrollbar-primary">
                {
                    msg.map((index) => {
                        if (index.chatroom === userroom) {

                            return (
                                <div key={index}> <Oldmsgs index={index} username={username} /> </div>
                            )
                        }
                        else {
                            return 0;
                        }
                    })
                }
                <div ref={messagesEndRef} />
                {
                    messages.map((message) => {
                        return (
                            <div> <Chatmessages message={message} username={username} /> </div>
                        )
                    })
                }
                <div ref={messagesEndRef} />
            </div>

            <div className="card-footer">
                <div className="input-group">
                    <div className="input-group-append">
                        <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                    </div>
                    <textarea name="" className="form-control type_msg" placeholder="Type your message..."
                        value={usermessage} onChange={(e) => { setusermessage(e.target.value) }}
                        onKeyPress={event => event.key === 'Enter' ? send_message(event) : null}>
                    </textarea>
                    <div className="input-group-append">
                        <span className="input-group-text send_btn">
                            <i className="fas fa-location-arrow" onClick={send_message}>
                            </i>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}