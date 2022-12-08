import React from 'react'
import groupimg from './groupimage.png'

export default function Chatheader({ userroom }) {
  return (
    <div className="card-header msg_head">
      <div className="d-flex bd-highlight">
        <div className="img_cont">
          <img src={groupimg} className="rounded-circle user_img" alt="" />
          <span className="online_icon"></span>
        </div>
        <div className="user_info">
          <span>{userroom}</span>
        </div>
      </div>
    </div>
  )
}
