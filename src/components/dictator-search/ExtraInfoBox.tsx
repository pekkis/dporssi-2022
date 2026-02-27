type Props = { children: React.ReactNode };

const ExtraInfoBox = ({ children }: Props) => {
  return (
    <div className="italic mt-1 text-sm">
      {children}
    </div>
  );
};

export default ExtraInfoBox;
