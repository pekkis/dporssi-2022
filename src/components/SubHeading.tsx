type Props = { children: React.ReactNode };

const SubHeading = ({ children }: Props) => {
  return (
    <h3 className="text-xl font-bold mb-4 mt-4">{children}</h3>
  );
};

export default SubHeading;
