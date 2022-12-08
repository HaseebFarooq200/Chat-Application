import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './join.css'

export default function Join() {

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [room, setroom] = useState('')

  const CreateRoom = async (e) => {
    e.preventDefault();

    const response = await fetch('/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, room })
    })

    const UserData = await response.json()
    console.log(UserData)

    if (response.status === 400 || !UserData) {
      window.alert("Invalid Entry")
      console.log("Invalid Entry")
    }
    else {
      console.log("Successfully Created")
      navigate('/Chat', { state: { username, room } })
    }
  }

  const JoinRoom = async (e) => {
    e.preventDefault();

    const response = await fetch('/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, room })
    })

    const UserData = await response.json()
    console.log(UserData)

    if (response.status === 400 || !UserData) {
      window.alert("Invalid Entry")
      console.log("Invalid Entry")
    }
    else {
      console.log("Successfully Joined")
      navigate('/Chat', { state: { username, room } })
    }
  }

  return (
    <>
      <div className="background-wrap">
        <div className="background"></div>
        <form id="accesspanel" action="login" method="post">
          <h1 id="litheader">CHAT</h1>
          <div className="inset">
            <input type="text" name="username" id="username" placeholder="User name" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            <input type="text" name="room" id="room" placeholder="Room name" value={room} onChange={(e) => { setroom(e.target.value) }} />
            <div className='submitbtns'>
              <input type="submit" id='join-submit' value="JOIN ROOM" method='POST' onClick={JoinRoom} />
              <input type="submit" id='join-submit' value="CREATE ROOM" method='POST' onClick={CreateRoom} />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

