import { Heading } from "@/components/styled/Heading";

const SectionHeading = ({ children }) => {
  return (
    <Heading as="h2" mb="3" mt="0">
      {children}
    </Heading>
  );
};

export default SectionHeading;
