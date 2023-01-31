import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const Homepage = (props: any) => {
  // useState to hold the value that is the quill editor
  const [value, setValue] = useState('');

  // function handleCompile to send the values from quill to the Judge0 API to be compiled and result handed to us
  
  function handleCompile() {
    // change inner html of compiler side to 'Compiling your code...'
    // post to judgeAPI and get result
    // upon getting result, change inner html of compiler to the output
    // do whateva
    
  }

  return (
    <div className="min-h-screen flex flex-col">
    <header className="bg-red-50 h-9 flex items-center p-3">
      NEED TO CHOSE A MENU
    </header>

    <div className="flex-1 flex flex-col sm:flex-row">
      <div className=" flex-1 w-1/2 bg-indigo-100 p-3">
        Code or Whiteboarding here
        {/* <div id='quillContainer'></div> */}
        <ReactQuill className='pb-3' 
        theme='snow' 
        value={value} 
        onChange={setValue} 
        />
        <button className='border-2 w-13 border-gray-300 rounded-full text-gray-400 px-12 py-1 inline-block font-semibold hover:bg-gray-100 hover:text-gray-400'
        onClick={handleCompile}
        >
          Run Code</button>
      </div>
  
      <nav className="order-first sm:w-32 bg-purple-200 p-3">
        Side-menu
      </nav>
  
      <div className=" w-1/3 bg-yellow-100 p-3">
        Compiler
      </div>
    </div>
  </div>
  )
}

export default Homepage