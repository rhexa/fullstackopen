import { parseNumber } from './utils'

/**
 * Calculates the Body Mass Index (BMI) based on the given height and weight.
 *
 * @param height The height in centimeters.
 * @param weight The weight in kilograms.
 * @returns A string indicating the BMI category (e.g. "Normal range").
 */
export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  if (bmi < 18.5) {
    return 'Underweight range'
  } else if (bmi < 25) {
    return 'Normal range'
  } else if (bmi < 30) {
    return 'Overweight range'
  } else {
    return 'Obese range'
  }
}

const main = (): void => {
  if (process.argv.length !== 4) {
    console.error('Usage: node bmiCalculator.js <height> <weight>')
    process.exit(1)
  }

  try {
    const height: number = parseNumber(process.argv[2])
    const weight: number = parseNumber(process.argv[3])

    console.log(calculateBmi(Number(height), Number(weight)))
  } catch (error) {
    console.error(error.message)
  }
}

if (require.main === module) {
  main()
}
