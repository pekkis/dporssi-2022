import type { ComponentPropsWithoutRef } from "react";
import type { Components } from "react-markdown";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import Paragraph from "@/components/Paragraph";
import SectionHeading from "@/components/SectionHeading";
import SubHeading from "@/components/SubHeading";

const replaceableDomains = [
  { from: /^https?:\/\/(www|beta)\.?diktaattoriporssi.com/, to: "" }
];

const getTo = (data: ComponentPropsWithoutRef<"a">): string =>
  replaceableDomains.reduce((a, r) => a.replace(r.from, r.to), data.href ?? "");

const isExternalLink = (to: string) => {
  if (to.includes("diktaattoriporssi")) {
    return false;
  }

  const externalRegex = /^https?/;
  return externalRegex.test(to);
};

export const components: Components = {
  h3: (data) => {
    return <SubHeading>{data.children}</SubHeading>;
  },

  h2: (data) => {
    return <SectionHeading>{data.children}</SectionHeading>;
  },

  p: (data) => {
    return <Paragraph>{data.children}</Paragraph>;
  },

  a: (data) => {
    const to = getTo(data);
    if (isExternalLink(to)) {
      return <ExternalLink to={to}>{data.children}</ExternalLink>;
    }
    return <InternalLink to={to}>{data.children}</InternalLink>;
  }
};
