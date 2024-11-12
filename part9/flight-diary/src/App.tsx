import { useEffect, useState } from 'react';
import axios from "axios";
import { DiaryEntry, Message, NewDiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import diaryService from "./services/diary";
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState<Message>({ value: '', type: 'success' });

  const initDiaries = async () => {
    const diaries = await diaryService.fetchDiaries();
    setDiaries(diaries);
  }

  const addDiary = async (entry: NewDiaryEntry) => {
    try {
      const newDiary = await diaryService.addDiary(entry);
      setDiaries(diaries.concat(newDiary));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage({ value: error.response?.data, type: 'error' });
        throw error;
      }    
    }
  }

  useEffect(() => {
    initDiaries();
  }, []);

  return (
    <div>
      <h1>Flight Diary</h1>
      <Notification message={message} setMessage={setMessage} />
      <DiaryForm onSubmit={addDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;