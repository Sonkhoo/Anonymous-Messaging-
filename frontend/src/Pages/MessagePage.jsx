import React, { useState } from 'react'
import axios from 'axios'

export default function MessagePage() {
  const [link, setLink] = useState('')
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!link) {
      setError('Please enter a valid link.')
      return
    }

    setError('')
    setIsFetching(true)
    
    try {
      const response = await axios.get(`/user/${link}/messages`)
      if (response.status === 200) {
        setMessages(response.data)
      } else {
        setError('Failed to retrieve messages. Please try again later.')
      }
    } catch (err) {
      setError('Failed to retrieve messages. Please try again later.')
    }

    setIsFetching(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Messages for User</h1>

      {/* Link Input Dialog */}
      <form onSubmit={handleSubmit} className="mb-6 w-full max-w-sm">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
          Enter User Link:
        </label>
        <input
          type="text"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter user link"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          disabled={isFetching}
        >
          {isFetching ? 'Fetching Messages...' : 'Submit'}
        </button>
      </form>

      {/* Error Handling */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Display Messages */}
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
