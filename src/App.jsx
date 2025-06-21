import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [lenght, setLenght] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)
  
const generatePassword = useCallback(() => {
  let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  if (numberAllow) charSet += '0123456789'
  if (charAllow) charSet += '!@#$%&*~'
  let password = ''
  for (let i = 1; i < lenght; i++) {
    let randomIndex = Math.floor(Math.random() * charSet.length +1)
    password += charSet.charAt(randomIndex)
  }
  setPassword(password)
}, [lenght, numberAllow, charAllow])

const copyPasswordToClipboard = () => {
  window.navigator.clipboard.writeText(password)
  passwordRef.current?.select()
}

useEffect(()=>{
  generatePassword()
}, [lenght, numberAllow, charAllow])
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🔐 Password Generator</h1>

          <div className="flex mb-4 gap-2">
          <input
            type="text"
            value={password}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200">
            Copy
          </button>
        </div>

        <div className="space-y-4">
          {/* Length Slider */}
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-gray-700 font-medium">Length: {lenght}</label>
            <input
              type="range"
              min={8}
              max={40}
              value={lenght}
              onChange={(e) => setLenght(e.target.value)}
              className="w-2/3 accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Include Numbers */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              onChange={() => setNumberAllow(prev => !prev)}
              className="accent-indigo-600"
            />
            <label htmlFor="number" className="text-gray-700">Include Numbers</label>
          </div>

          {/* Include Characters */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              onChange={() => setCharAllow(prev => !prev)}
              className="accent-indigo-600"
            />
            <label htmlFor="character" className="text-gray-700">Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>

  </>
)
}

export default App
