import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p><i>{part.description}</i></p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p><i>{part.description}</i></p>
          <p>Submit to {part.backgroundMaterial}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>Project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p><i>{part.description}</i></p>
          <p>Required skills: {part.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(part);
  }
};

export default Part;