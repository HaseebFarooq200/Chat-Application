import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Leftbar from './leftbar';
import Chatheader from './chatheader';
import Chatinput from './chatinput';
import './chat.css'
let socket;

export default function Chat() {

	const [usermessage, setusermessage] = useState('')
	const [messages, setMessages] = useState([])
	
	const location = useLocation();

	let username = location.state.username;
	let userroom = location.state.room;

	window.addEventListener("beforeunload", (ev) => {
		ev.preventDefault();
		socket.emit('left', ({ username, userroom }))
	});

	const socket_connection = () => {
		let ENDPOINT = 'http://localhost:8000'
		socket = io.connect(ENDPOINT)
		socket.emit('join', ({ username, userroom }))
	}

	const Send_Message = async (e) => {
		e.preventDefault();
		const msgdata = {
			text: usermessage,
			name: username,
			room: userroom,
			time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
		}
		socket.emit('send_message', msgdata)
				
		const response = await fetch('/sendmessage', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ usermessage,username,userroom})
		})

		const mymessage = await response.json()

		if (response.status === 400 || !mymessage) {
			console.log("NULL value")
		}
		else {
			console.log("Message Saved Successfully")
		}
	}
	
	useEffect(() => {
		socket_connection()
	},[])
	useEffect(() => {
		socket.on('receive_message', (msg) => {
			setusermessage('')
			setMessages((messages) => [...messages, msg])
		})

	}, [])

	return (
		<div className="container-fluid h-100 main-cont">
			<div className="row justify-content-center h-100">
				{/* Online Users  */}
				<Leftbar userroom={userroom} />
				{/* Chat Box */}
				<div className="col-md-8 col-xl-6 chat">
					<div className="card">
						<Chatheader userroom={userroom} />
						<Chatinput usermessage={usermessage} send_message={Send_Message} setusermessage={setusermessage}
							messages={messages} username={username} setMessages={setMessages} userroom={userroom} />
					</div>
				</div>
			</div>
		</div>
	)
}