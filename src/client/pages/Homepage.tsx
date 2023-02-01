import React, { useEffect, useState, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import TextEditor from './TextEditor';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { v4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';

const Homepage = () => {
  const newRoomRef: any = useRef();
  const [value, setValue] = useState('');
  let { roomId } = useParams();
  if (!roomId) roomId = v4();
  // const navigate = useNavigate();

  // function handleCompile to send the values from quill to the Judge0 API to be compiled and result handed to us
  async function handleCompile(e: any) {
    // grabs
    const editor = document.getElementsByClassName('ql-editor');
    console.log(editor);

    // make a request to the back end, that will then grab data
    // e.preventDefault();
    // let outputText = document.getElementById('output');
    // outputText.innerHTML = '';
    // outputText.innerHTML += 'Creating Submission ...\n';
    // const response = await fetch(
    //   'https://judge0-ce.p.rapidapi.com/submissions',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json',
    //       'Content-Type': 'application/json',
    //       'X-RapidAPI-Key':
    //         'dd8078a767msha7ff426162ca349p180220jsn9fd030be701c',
    //       'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    //     },
    //     body: JSON.stringify({
    //       // NEED TO EXTRACT CODE OR SUM
    //       source_code: this.state.input,
    //       stdin: this.state.user_input,
    //       language_id: '52',
    //     }),
    //   }
    // );

    // outputText.innerHTML += 'Submission Created ...\n';
    // const jsonResponse = await response.json();
    // let jsonGetSolution: any = {
    //   status: { description: 'Queue' },
    //   stderr: null,
    //   compile_output: null,
    // };
    // while (
    //   jsonGetSolution.status.description !== 'Accepted' &&
    //   jsonGetSolution.stderr == null &&
    //   jsonGetSolution.compile_output == null
    // ) {
    //   outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
    //   if (jsonResponse.token) {
    //     let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
    //     const getSolution = await fetch(url, {
    //       method: 'GET',
    //       headers: {
    //         'X-RapidAPI-Key':
    //           'dd8078a767msha7ff426162ca349p180220jsn9fd030be701c',
    //         'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    //         'content-type': 'application/json',
    //       },
    //     });
    //     jsonGetSolution = await getSolution.json();
    //   }
    // }

    // if (jsonGetSolution.stdout) {
    //   const output = atob(jsonGetSolution.stdout);
    //   outputText.innerHTML = '';
    //   outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
    // } else if (jsonGetSolution.stderr) {
    //   const error = atob(jsonGetSolution.stderr);
    //   outputText.innerHTML = '';
    //   outputText.innerHTML += `\n Error :${error}`;
    // } else {
    //   const compilation_error = atob(jsonGetSolution.compile_output);
    //   outputText.innerHTML = '';
    //   outputText.innerHTML += `\n Error :${compilation_error}`;
    // }
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-red-50 h-9 flex items-center p-3'>
        NEED TO CHOSE A MENU
      </header>
      <Toaster />
      <div className='flex-1 flex flex-col sm:flex-row'>
        <div className=' flex-1 w-1/2 bg-indigo-100 p-3'>
          <form
            onSubmit={() => {
              // setRoomId(newRoomRef.current.value);
              // navigate(`/${newRoomRef.current.value}`);
              <Navigate to={`/${newRoomRef.current.value}`} />;
            }}
          >
            <input
              ref={newRoomRef}
              type='text'
              placeholder='pizza'
              className='p-3'
            />
            <input type='submit' value='Join Room' />
          </form>
          <TextEditor id='textEditor' roomId={roomId} />
          <button
            className='border-2 w-13 border-gray-300 rounded-full text-gray-400 px-12 py-1 inline-block font-semibold hover:bg-gray-100 hover:text-gray-400'
            onClick={handleCompile}
          >
            Run Code
          </button>
        </div>
        <nav className='order-first sm:w-32 bg-purple-200 p-3'>Side-menu</nav>
        <div className=' w-1/3 bg-yellow-100 p-3'>
          Compiler
          <div id='output'></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
