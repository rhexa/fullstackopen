interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: 1 | 2 | 3
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (
  hours: number[],
  target: number
): ExerciseResult => {
  const periodLength = hours.length
  const trainingDays = hours.filter((h) => h > 0).length
  const average = hours.reduce((sum, h) => sum + h, 0) / periodLength
  const success = average >= target
  let rating: 1 | 2 | 3
  let ratingDescription: string

  if (average < target * 0.5) {
    rating = 1
    ratingDescription = 'you should exercise more'
  } else if (average < target * 0.9) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'you are doing great'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

// Example usage:
const hours = [3, 0, 2, 4.5, 0, 3, 1]
const target = 2
const result = calculateExercises(hours, target)
console.log(result)
