import React from 'react'
import userimg from './userimage.png'

export default function Oldmsgs({ index, username }) {
    const RenderOldMesaage = () => {
        if (index.username === username) {
            return (
                <>
                    <ul className="m-b-0">
                        <div className="d-flex justify-content-end mb-5">
                            <div className='d-flex flex-column msg_box'>
                                <div className="msg_name_send text-end">
                                    <span>{index.username}</span>
                                </div>
                                <div className="msg_cotainer_send">
                                    <span>{index.mymessage}</span>
                                </div>
                                <div className="msg_time_send text-end">
                                    <span>{index.time}</span>
                                </div>
                            </div>

                            <div className="img_cont_msg">
                                <img src={userimg} className="rounded-circle user_img_msg" alt="" />
                            </div>
                        </div>
                    </ul>

                </>
            )
        }
        else {
            return (
                <>
                    <ul className="m-b-0">
                        <div className="d-flex justify-content-start mb-5 comp">
                            <div className="img_cont_msg">
                                <img src={userimg} className="rounded-circle user_img_msg" alt="" />
                            </div>
                            <div className='d-flex flex-column msg_box'>
                                <div className="msg_name text-start">
                                    <span >{index.username}</span>
                                </div>
                                <div className="msg_cotainer">
                                    <span>{index.mymessage}</span>
                                </div>
                                <div className="msg_time text-start">
                                    <span >{index.time}</span>
                                </div>
                            </div>
                        </div>
                    </ul>
                </>
            )
        }
    }
    return (
            <RenderOldMesaage />
    )
}
