import type { ReactNode } from "react";
import { Container as UiContainer } from "@/components/ui";

const Container = ({ children }: { children: ReactNode }) => {
  return <UiContainer>{children}</UiContainer>;
};

export default Container;
