
interface Props {
  children: string;
  hwt: string
}

function Icon(props: Props) {
  const { children, hwt } = props;

  return (
    <div className={`${hwt} rounded-full box-border border-black flex items-center justify-center font-serif bg-green-700 text-white`}>
      {children[0].toUpperCase()}
    </div>
  );
}

export default Icon;
