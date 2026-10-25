import type { ReactNode } from "react";
import { Heading } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";

const SectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as="h2" className={sprinkles({ mb: 3, mt: 0 })}>
      {children}
    </Heading>
  );
};

export default SectionHeading;
