import React, { useState } from 'react'
import axios from 'axios'

export default function AnonymousPage() {
  const [link, setLink] = useState('') // for storing the unique link
  const [message, setMessage] = useState('') // for storing the message
  const [feedback, setFeedback] = useState({ type: '', content: '' }) // for storing feedback

  const handleSubmit = async (e) => {
    e.preventDefault()

    setFeedback({ type: '', content: '' }) // Reset feedback before submission

    // Validate if both fields are filled
    if (!link.trim() || !message.trim()) {
      setFeedback({ type: 'error', content: 'Please provide both a link and a message.' })
      return
    }

    try {
      // Sending POST request to the backend to send the message
      const response = await axios.post(`/user/${link}`, { message })
      if (response.status === 200) {
        setFeedback({ type: 'success', content: 'Message sent successfully!' })
        setMessage('') // Clear the message field on successful submission
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setFeedback({ type: 'error', content: 'User not found.' })
      } else {
        setFeedback({ type: 'error', content: 'An error occurred. Please try again.' })
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Message a User</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="link" className="block text-gray-700 font-medium mb-2">User Link</label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter user link"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Send Message
          </button>
        </form>

        {feedback.content && (
          <div
            className={`mt-4 p-3 rounded-md ${
              feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {feedback.content}
          </div>
        )}
      </div>
    </div>
  )
}
