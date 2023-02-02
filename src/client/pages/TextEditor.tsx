// import { wrap } from 'module'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { v1 } from 'uuid';
import toast from 'react-hot-toast';

const SAVE_INTERVAL_MS = 3000;
const TOOLBAR_OPTIONS: any = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];
const username = v1();
type Props = { roomId: string; id: string };

function TextEditor(props: Props) {
  const roomId = 'the ultimate web socket hub :D';
  const [quill, setQuill] = useState<Quill>();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const s = io('http://localhost:3000');
    setSocket(s);
    return () => {
      socket.emit('disconnecting');
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit('join', { username, roomId });
    toast.success(`Joined ${roomId}`);

    socket.on('joined', (name) => {
      toast.success(`${name.username} joined your room!`);
    });
  }, [socket, quill, roomId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', {
        roomId: roomId,
        data: quill.getContents(),
      });
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta: any) => {
      quill.updateContents(delta);
    };
    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta: any, oldDelta: any, source: any) => {
      if (source !== 'user') return;
      socket.emit('send-changes', { roomId, delta });
    };
    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText(`console.log('hello world');`);
    setQuill(q);
  }, []);

  return (
    <>
      <p>Your current room: {roomId}</p>
      <div id='container' ref={wrapperRef}></div>
    </>
  );
}

export default TextEditor;
