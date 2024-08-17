type Props = {
  index: number;
};

const Badge = (props: Props) => {
  const { index } = props;

  return (
    <div className="relative mr-1 mt-2">
      <div className="badge">{index + 1}</div>
    </div>
  );
};

export default Badge;
