import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Note = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleEdit = () => {
    onEdit(note.id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="note relative border border-gray-300 p-2.5 my-2.5 rounded w-full flex flex-col justify-between">
    <div onClick={() => onEdit(note.id, editedContent)}>
      <div className='p-2 text-sm' >
      <span> {note.date}</span>
      <span> Timestamp: {note.timestamp}s</span>
      </div>
      <br></br>
    </div>
    {isEditing ? (
      <ReactQuill value={editedContent} onChange={setEditedContent} />
    ) : (
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    )}
    <div className="absolute bottom-2 right-2 flex space-x-2">
      <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 pt-2 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' onClick={() => onDelete(note.id)}>Delete</button>
      {isEditing ? (
        <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 pt-2 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'onClick={handleEdit}>Save</button>
      ) : (
        <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 pt-2 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  </div>
  
  );
};

export default Note;
