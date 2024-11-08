enum ParsingErrorType {
  INVALID_NUMBER = 'INVALID_NUMBER',
}

export class ParsingError extends Error {
  type: ParsingErrorType;

  constructor(message: string, type: ParsingErrorType) {
    super(message);
    this.name = 'ParsingError';
    this.message = message;
    this.type = type;
  }
}

export const parseNumber = (input: string): number => {
  if (isNaN(Number(input))) {
    throw new ParsingError(
      'Provided value is not a number',
      ParsingErrorType.INVALID_NUMBER
    );
  }
  return Number(input);
};
