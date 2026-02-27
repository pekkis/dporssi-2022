const BlockQuote = (props) => {
  const { children } = props;

  return (
    <blockquote className="italic rounded-sm bg-super-light border-l-4 border-very-light my-4 mx-0 p-4">
      {children}
    </blockquote>
  );
};

export default BlockQuote;
