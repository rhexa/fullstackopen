import { parseNumber, ParsingError } from './utils';

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: 1 | 2 | 3
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (
  hours: number[],
  target: number
): ExerciseResult => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((h) => h > 0).length;
  const average = hours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= target;
  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  if (average < target * 0.5) {
    rating = 1;
    ratingDescription = 'you should exercise more';
  } else if (average < target * 0.9) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'you are doing great';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const main = (): void => {
  if (process.argv.length < 4) {
    console.error('Usage: node exerciseCalculator.js <target> <hours>');
    process.exit(1);
  }

  try {
    const target = parseNumber(process.argv[2]);
    const hours = process.argv.slice(3).map((h) => {
      return parseNumber(h);
    });
    console.log(calculateExercises(hours, target));
  } catch (error) {
    if (error instanceof ParsingError && error.name === 'ParsingError') {
      console.error('Input values must be numbers');
      process.exit(1);
    }
  }
};

if (require.main === module) {
  main();
}