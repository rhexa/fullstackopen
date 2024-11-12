import React, { useState } from 'react';
import { NewDiaryEntry, newDiaryEntrySchema } from '../types';

const DiaryForm = ({ onSubmit }: { onSubmit: (entry: NewDiaryEntry) => void }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = newDiaryEntrySchema.parse({
      date,
      weather,
      visibility,
      comment
    })
    onSubmit(newEntry);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="text" value={date} onChange={(event) => setDate(event.target.value)} />
      </label>
      <br />
      <label>
        Weather:
        <input type="text" value={weather} onChange={(event) => setWeather(event.target.value)} />
      </label>
      <br />
      <label>
        Visibility:
        <input type="text" value={visibility} onChange={(event) => setVisibility(event.target.value)} />
      </label>
      <br />
      <label>
        Comment:
        <textarea value={comment} onChange={(event) => setComment(event.target.value)} />
      </label>
      <br />
      <button type="submit">Add entry</button>
    </form>
  );
};

export default DiaryForm;