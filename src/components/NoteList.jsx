import React from 'react';
import Note from './Note';

const NoteList = ({ notes, onDeleteNote, onEditNote }) => {
  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} note={note} onDelete={onDeleteNote} onEdit={onEditNote} />
      ))}
    </div>
  );
};

export default NoteList;
