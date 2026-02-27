interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Paragraph = ({ children, className }: Props) => {
  return (
    <p className={["my-4", className].filter(Boolean).join(" ")}>
      {children}
    </p>
  );
};

export default Paragraph;
