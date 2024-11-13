import { Params } from "react-router-dom";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const parseId = (params: Readonly<Params<string>>): string => {
  if ('id' in params && typeof params.id === 'string') {
    return params.id;
  } else {
    throw new Error('Invalid route parameters: id is missing or not a string');
  }
};