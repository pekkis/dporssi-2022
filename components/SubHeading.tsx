/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import { Heading } from "theme-ui";

const SubHeading = ({ children }) => {
  return (
    <Heading as="h3" mb={3}>
      {children}
    </Heading>
  );
};

export default SubHeading;
