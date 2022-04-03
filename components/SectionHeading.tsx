/** @jsxImportSource theme-ui */
import { Heading } from "theme-ui";

const SectionHeading = ({ children }) => {
  return (
    <Heading as="h2" mb={3}>
      {children}
    </Heading>
  );
};

export default SectionHeading;
