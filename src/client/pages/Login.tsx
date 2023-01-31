import React, { useState } from 'react'
import { FaGithub, FaRegEnvelope, FaUserLock} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleGitHubLogin() {
    console.log('Will Login From Github Auth')
  }
  const navigate = useNavigate()

  function handleLogin() {
    // make fetch call
    // email and password captured in stateful variables to be passed to proxy server for auth purposes
    console.log(email, password)
    navigate('/homepage', {replace: true})
  }

  

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200'>
      <div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <div className='bg-white rounded-xl shadow-2xl flex w-2/3 max-w-4xl'>
          <div className='w-3/5 p-5 '>
            <div className=' text-left font-bold'>
              <span className='text-blue-300'>The Hangout Spot</span>
            </div>
            <div className='py-10'>
              <h2 className=' text-3xl font-bold text-blue-300 mb-1'>Sign In</h2>
              <div className='border-2 w-10 border-blue-300 inline-block mb-2'></div>
              <div className='flex justify-center my-2'>
                <a href="#" className='border-2 border-gray-300 rounded-full p-3 mx-1' 
                  onClick={handleGitHubLogin}>  
                  <FaGithub className=' text-2xl' />
                </a>
              </div>
              <p className='text-gray-400 my-3'>Use your email instead</p>
              <div className='flex flex-col items-center'>
                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md'>
                  <FaRegEnvelope className='text-gray-400 m-2'/>
                  <input type="text" name='email' placeholder='Email' className='bg-gray-100 outline-none text-sm text-gray-600 flex-1'
                  onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md'>
                  <FaUserLock className='text-gray-400 m-2'/>
                  <input type="password" name='password' placeholder='Password' className='bg-gray-100 outline-none text-sm text-gray-600 flex-1'
                  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                  <button className='border-2 w-13 border-gray-300 rounded-full text-gray-400 px-12 py-1 inline-block font-semibold hover:bg-gray-100 hover:text-gray-400'
                  onClick={handleLogin}>
                    Sign In
                  </button>
              </div>
            </div>
          </div>
          <div className='w-2/5 py-36 px-12 bg-blue-300 text-white rounded-tr-xl rounded-br-xl'>
            <h2 className='text-3xl font-bold mb-2'>Hey Alumn!</h2>
            <div className='border-2 w-10 border-white inline-block mb-2'></div>
            <p className='mb-7'> Lets get you signed up so you can begin to Collaborate.</p>
            <button className='border-2 border-white rounded-full px-12 py-1 inline-block font-semibold hover:bg-blue-100 hover:text-blue-300'>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login