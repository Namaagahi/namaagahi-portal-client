type Props = {
  status?: string;
  bgColor: string;
  textColor: string;
  w?: string;
  size?: string;
};

const Status = (props: Props) => {
  const { status, bgColor, textColor, w, size } = props;

  return (
    <span
      style={{
        background: bgColor,
        color: textColor,
        width: w,
        fontSize: size,
      }}
      className="text-center font-semibold inline-block py-1 px-2  rounded-md last:mr-0 mr-1"
    >
      {status}
    </span>
  );
};

export default Status;
