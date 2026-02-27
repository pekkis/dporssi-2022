type Props = { children: React.ReactNode };

const SectionHeading = ({ children }: Props) => {
  return (
    <h2 className="text-2xl font-bold mb-4 mt-0">{children}</h2>
  );
};

export default SectionHeading;
