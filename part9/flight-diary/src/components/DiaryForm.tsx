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
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <br />
      <label>
        Visibility:
        <input
          type="radio"
          value="great"
          checked={visibility === 'great'}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <label>Great</label>
        <input
          type="radio"
          value="good"
          checked={visibility === 'good'}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <label>Good</label>
        <input
          type="radio"
          value="ok"
          checked={visibility === 'ok'}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <label>Ok</label>
        <input
          type="radio"
          value="poor"
          checked={visibility === 'poor'}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <label>Poor</label>
      </label>
      <br />
      <label>
        Weather:
        <input
          type="radio"
          value="sunny"
          checked={weather === 'sunny'}
          onChange={(event) => setWeather(event.target.value)}
        />
        <label>Sunny</label>
        <input
          type="radio"
          value="rainy"
          checked={weather === 'rainy'}
          onChange={(event) => setWeather(event.target.value)}
        />
        <label>Rainy</label>
        <input
          type="radio"
          value="cloudy"
          checked={weather === 'cloudy'}
          onChange={(event) => setWeather(event.target.value)}
        />
        <label>Cloudy</label>
        <input
          type="radio"
          value="stormy"
          checked={weather === 'stormy'}
          onChange={(event) => setWeather(event.target.value)}
        />
        <label>Stormy</label>
        <input
          type="radio"
          value="windy"
          checked={weather === 'windy'}
          onChange={(event) => setWeather(event.target.value)}
        />
        <label>Windy</label>
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