import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import Paragraph from "@/components/Paragraph";
import SectionHeading from "@/components/SectionHeading";
import SubHeading from "@/components/SubHeading";

const replaceableDomains = [
  { from: /^https?:\/\/(www|beta)\.?diktaattoriporssi.com/, to: "" }
];

const getTo = (href?: string): string => {
  const to = replaceableDomains.reduce(
    (a, r) => a.replace(r.from, r.to),
    href ?? ""
  );
  return to;
};

const isExternalLink = (to: string) => {
  if (to.includes("diktaattoriporssi")) {
    return false;
  }

  const externalRegex = /^https?/;
  return externalRegex.test(to);
};

export const components = {
  h3: ({ children }: { children?: React.ReactNode }) => {
    return <SubHeading>{children}</SubHeading>;
  },

  h2: ({ children }: { children?: React.ReactNode }) => {
    return <SectionHeading>{children}</SectionHeading>;
  },

  p: ({ children }: { children?: React.ReactNode }) => {
    return <Paragraph>{children}</Paragraph>;
  },

  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    const to = getTo(href);
    if (isExternalLink(to)) {
      return <ExternalLink to={to}>{children}</ExternalLink>;
    }
    return <InternalLink to={to}>{children}</InternalLink>;
  }
};
