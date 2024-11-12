import React, { useState } from 'react';
import { NewDiaryEntry, newDiaryEntrySchema } from '../types';

const DiaryForm = ({ onSubmit }: { onSubmit: (entry: NewDiaryEntry) => Promise<void> }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const reset = () => {
    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = newDiaryEntrySchema.parse({
      date,
      weather,
      visibility,
      comment
    })

    try {
      await onSubmit(newEntry)
      reset();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // ignore
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="text" value={date} onChange={(event) => setDate(event.target.value)} />
      </label>
      <br />
      <label>
        Visibility:
        <input type="text" value={visibility} onChange={(event) => setVisibility(event.target.value)} />
      </label>
      <br />
      <label>
        Weather:
        <input type="text" value={weather} onChange={(event) => setWeather(event.target.value)} />
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