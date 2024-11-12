const Content = ({ parts }: { parts: {
  name: string;
  exerciseCount: number;
}[] }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;