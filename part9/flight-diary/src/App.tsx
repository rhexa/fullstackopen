import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import diaryService from "./services/diary";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const initDiaries = async () => {
    const diaries = await diaryService.fetchDiaries();
    setDiaries(diaries);
  }
  
  useEffect(() => {
    initDiaries();
  }, []);

  return (
    <div>
      <h1>Flight Diary</h1>
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;