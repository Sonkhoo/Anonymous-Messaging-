import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function HomePage() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [feedback, setFeedback] = useState({ type: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', content: '' });
    setLink('');

    if (!name.trim()) {
      setFeedback({ type: 'error', content: 'Please enter a name' });
      return;
    }

    try {
      const response = await axios.post('/user', { name });
      if (response.status === 201) {
        setFeedback({ type: 'success', content: 'User created successfully' });
        generateLink();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setFeedback({ type: 'error', content: err.response.data });
      } else {
        setFeedback({ type: 'error', content: 'An error occurred. Please try again.' });
      }
    }
  };

  const generateLink = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    const newLink = `https://yourdomain.com/message/${randomString}`;
    setLink(newLink);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">Create a New User</h1>
          <p className="text-center text-gray-600 mt-2">Enter your name to join and get a message link</p>
        </div>
        <div className="p-6 bg-gray-50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Create User and Generate Link
            </motion.button>
          </form>
        </div>
        <div className="p-6">
          {feedback.content && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`w-full p-3 rounded-md mb-4 ${
                feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <div className="flex items-center">
                {feedback.type === 'success' ? (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                <p>{feedback.content}</p>
              </div>
            </motion.div>
          )}
          {link && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-medium text-gray-500 mb-2">Your generated message link:</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={link}
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Copy
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
