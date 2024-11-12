import { z } from 'zod';

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export const newDiaryEntrySchema = z.object({
  date: z.string(),
  // weather: z.nativeEnum(Weather),
  weather: z.string(),
  visibility: z.nativeEnum(Visibility),
  comment: z.string().optional(),
});

export type NewDiaryEntry = z.infer<typeof newDiaryEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: string
}

export type Message = {
  value: string,
  type: 'success' | 'error'
}