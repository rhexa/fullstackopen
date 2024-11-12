import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import diaryService from "./services/diary";
import DiaryForm from './components/DiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const initDiaries = async () => {
    const diaries = await diaryService.fetchDiaries();
    setDiaries(diaries);
  }

  const addDiary = async (entry: NewDiaryEntry) => {
    const newDiary = await diaryService.addDiary(entry);
    setDiaries(diaries.concat(newDiary));
  }

  useEffect(() => {
    initDiaries();
  }, []);

  return (
    <div>
      <h1>Flight Diary</h1>
      <DiaryForm onSubmit={addDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;