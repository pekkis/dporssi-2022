import React, { FC } from "react";
import InternalLink from "../InternalLink";

type Props = {
  country: {
    name: string;
    slug: string;
    continent: {
      slug: string;
    };
  };
};

const CountryLink: FC<Props> = ({ country }) => {
  const to = `/diktaattorit/${country.continent.slug}/${country.slug}`;

  return <InternalLink to={to}>{country.name}</InternalLink>;
};

export default CountryLink;
