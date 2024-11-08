import express from 'express';
import { parseNumber } from './utils';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const height = parseNumber(String(req.query.height));
    const weight = parseNumber(String(req.query.weight));

    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi });
  } catch (error) {
    if (error instanceof Error && error.name === 'ParsingError') {
      res.status(400).send({
        error: 'malformatted parameters',
      });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
