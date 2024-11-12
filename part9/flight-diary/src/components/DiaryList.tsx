import { DiaryEntry } from '../types';

const DiaryList = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </div>
      ))}
    </>
  );
};

export default DiaryList;