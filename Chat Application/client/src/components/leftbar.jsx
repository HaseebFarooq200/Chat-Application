import React from 'react'
import userimg from './userimage.png'
import { useEffect, useState } from 'react'

export default function Leftbar({ userroom }) {

  const [users, setuser] = useState([])

  const getData = async () => {
    const res = await fetch('/join', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })

    const data = await res.json()
    setuser(data)
  }
  useEffect(() => {
    getData();
  },[users])

  return (
    <div className="col-md-4 col-xl-3 chat ">
      <div className="card mb-sm-3 mb-md-0 contacts_card">
        <div className="card-header">
          <h4 className='text-white'>Online Users</h4>
        </div>
        <div className="card-body contacts_body scrollbar scrollbar-primary">
          {
            users.map((user) => {
              if (user.chatroom === userroom) {
                return (
                  <ul className="contacts">
                    <li className="active">
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img src={userimg} className="rounded-circle user_img" alt="" />
                          <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                          <span>{user.username}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                )
              }
              else{
                return 0;
              }
            })
          }
        </div>
      </div>
    </div>






    // <div id="plist" classNameName="people-list">
    //   <div classNameName="input-group">
    //     <h5>Connected Users</h5>
    //   </div>
    //   <ul classNameName="list-unstyled chat-list mt-2 mb-0">
    //     <div classNameName="about">
    //       {
    //         users.map((user) => {
    //           if(user.room===userroom){
    //             return (
    //               <li key={user.id}>
    //               <div classNameName="name">{user.username}</div>
    //               <div classNameName="status"> <i classNameName="fa fa-circle online"></i> online </div>
    //             </li>
    //           )
    //         }
    //         })
    //       }
    //     </div>
    //   </ul>
    // </div>
  )
}

