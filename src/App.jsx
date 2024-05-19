import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import NoteList from './components/NoteList';
import { v4 as uuidv4 } from 'uuid';
import styles from "../postcss.config"


const App = () => {
  const [videoId, setVideoId] = useState('M7lc1UVf-VE'); // default video ID
  const [videoTitle, setVideoTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [noteContent, setNoteContent] = useState('');
  const [description,setDescription]= useState("");

  const API_KEY = 'AIzaSyA7X4YoCy7Kh3mWch4N9i-LL6G3xoI3K8U';

  useEffect(() => {
    fetchVideoDetails(videoId);
    const savedNotes = JSON.parse(localStorage.getItem(videoId));
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes([]);
    }
  }, [videoId]);

  useEffect(() => {
    localStorage.setItem(videoId, JSON.stringify(notes));
  }, [notes, videoId]);

  const fetchVideoDetails = async (videoId) => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      console.log(data.items)
      setVideoTitle(data.items[0].snippet.title);
      setDescription(data.items[0].snippet.description)
    } else {
      setVideoTitle('Video not found');
    }
  };

  const handleAddNote = () => {
    const newNote = {
      id: uuidv4(),
      timestamp: currentTime,
      content: noteContent,
      date: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setNoteContent('');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id, newContent) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, content: newContent } : note)));
  };

  const handleVideoReady = (event) => {
    const player = event.target;
    player.addEventListener('timeupdate', () => {
      setCurrentTime(Math.floor(player.getCurrentTime()));
    });
  };

  const handleVideoChange = (event) => {
    setVideoId(event.target.value);
  };

  const opts = {
    height: '774',
    width: '1376',
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
    },
  };

  return (
    <div>

    <div className="font-sans max-w-[1376px] m-2.5 mx-auto p-5 flex flex-col items-center justify-center min-h-[38px]" >
      <input className='w-full my-2.5 p-2.5 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gradient-to-r from-[#A5C0EE] to-[#FBC5EC]'
        type="text"
        value={videoId}
        onChange={handleVideoChange}
        placeholder="Enter YouTube Video ID"
      />
        
        <div className="youtube-container w-full h-[200px] max-w-[1376px] m-2.5 bg-gradient-to-b from-[#A5C0EE] to-[#FBC5EC]">
          <YouTube videoId={videoId} opts={opts} onReady={handleVideoReady} />
          <br></br>
          
          <div></div>
          <div className='shadow-[0_0_24px_rgba(0,0,0,0.15)] rounded-lg pt-1 pr-4 pb-6 pl-8'>
        <div className="titleBox">
          <h2 className="my-5 text-2xl text-left font-semibold">{videoTitle}</h2>
          <p className='desc text-left text-grey-500'>{description}</p>
          <br></br>
        </div>
        <div>
      </div>
      </div>



        <div>
          <br></br>
          <div className="shadow-[0_0_24px_rgba(0,0,0,0.15)] rounded-lg pr-4 pb-6 pl-8 pt-4">
            <div style={{display:"flex"}}>
          <textarea
          className='w-full h-[100px] my-2.5  text-base bg-gray-200'
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Add a note..."
          />
          <br></br>
          
          
          <button onClick={handleAddNote} type="button" className="py-1.5 px-3 me-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >Add Note</button>
          </div>
         </div>
        </div>
        <NoteList notes={notes} onDeleteNote={handleDeleteNote} onEditNote={handleEditNote} />
      </div>
    </div>
    </div>
  );
};

export default App;
