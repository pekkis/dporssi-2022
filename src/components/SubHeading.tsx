import type { ReactNode } from "react";
import { Heading } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";

const SubHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as="h3" className={sprinkles({ mb: 3, mt: 3 })}>
      {children}
    </Heading>
  );
};

export default SubHeading;
