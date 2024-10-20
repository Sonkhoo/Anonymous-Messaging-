import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function MessagePage({ link }) {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/user/${link}/messages`)
        if (response.status === 200) {
          setMessages(response.data)
        }
      } catch (err) {
        setError('Failed to retrieve messages. Please try again later.')
      }
    }

    fetchMessages()
  }, [link])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Messages for User</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {messages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">Message {index + 1}</h3>
              <p className="text-gray-700">{message.content}</p>
              <p className="text-sm text-gray-500 mt-4">Sent on: {new Date(message.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">No messages found for this user.</div>
      )}
    </div>
  )
}
