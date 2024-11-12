import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const apiEndpoint = '/api/diaries';

const fetchDiaries = async (): Promise<DiaryEntry[]> => {
  try {
    const response = await axios.get(apiEndpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addDiary = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  try {
    const response = await axios.post(apiEndpoint, entry);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default { fetchDiaries, addDiary };