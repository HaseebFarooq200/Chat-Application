import React from 'react'
import userimg from './userimage.png'
// import { useState,useEffect } from 'react'
export default function Chatmessages({ message, username }) {
    const RenderMesaage = () => {
        if (message.name === username) {
            return (
                <>
                    <div className="d-flex justify-content-end mb-5">
                        <div className='d-flex flex-column msg_box'>
                            <div className="msg_name_send text-end">
                                <span>{message.name}</span>
                            </div>
                            <div className="msg_cotainer_send">
                                <span>{message.text}</span>
                            </div>
                            <div className="msg_time_send text-end">
                                <span>{message.time}</span>
                            </div>
                        </div>

                        <div className="img_cont_msg">
                            <img src={userimg} className="rounded-circle user_img_msg" alt="" />

                        </div>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="d-flex justify-content-start mb-5 comp">
                        <div className="img_cont_msg">
                            <img src={userimg} className="rounded-circle user_img_msg" alt="" />
                        </div>
                        <div className='d-flex flex-column msg_box'>
                            <div className="msg_name text-start">
                                <span >{message.name}</span>
                            </div>
                            <div className="msg_cotainer">
                                <span>{message.text}</span>
                            </div>
                            <div className="msg_time text-start">
                                <span >{message.time}</span>
                            </div>
                        </div>
                    </div>

                </>

            )
        }
    }
    return (
        <ul className="m-b-0">
            <RenderMesaage />
        </ul>
    )
}
