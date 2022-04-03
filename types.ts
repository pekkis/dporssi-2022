import { IGatsbyImageData } from "gatsby-plugin-image";

export type Dictator = {
  id: string;
  name: string;
  aka?: string[];
  sortName: string;
  slug: string;
  canonicalRanking: number | null;
  primaryImage: {
    title: string;
    gatsbyImageData: IGatsbyImageData;
  };

  podcast?: string;

  reigns: DateRange[];

  lifespan?: DateRange;

  listedAt?: string;
  majorStoryUpdateAt?: string;

  synopsis?: {
    synopsis: string;
  };

  story?: {
    story: string;
  };

  taxonomy: Tag[];
  country: Country;

  titles?: string[];

  wikipedia?: string;
};

export type Continent = {
  name: string;
  slug: string;
  description?: { description: string };
};

export type Country = {
  name: string;
  slug: string;
  continent: Continent;
  description?: { description: string };
};

export type Tag = {
  slug: string;
  name: string;
  description?: { description: string };
};

export type DateRange = {
  start: string;
  end?: string;
};

export type FakeNews = {
  date: string;
  slug: string;
};
