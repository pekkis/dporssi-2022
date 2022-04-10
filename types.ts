// import { IGatsbyImageData } from "gatsby-plugin-image";

export type StaticImageData = {
  src: string;
  bludDataUrl?: string;
  width: number;
  height: number;
};

export type ContentfulImageData = {
  title: string;
  url: string;
  width: number;
  height: number;
};

export type Dictator = {
  sys: {
    id: string;
  };

  name: string;
  aka?: string[];
  sortName: string;
  slug: string;
  canonicalRanking: number | null;
  primaryImage: ContentfulImageData;

  podcast?: string;

  reignsCollection: {
    items: DateRange[];
  };

  lifespan?: DateRange;

  listedAt?: string;
  majorStoryUpdateAt?: string;

  synopsis?: string;

  story?: string;

  taxonomyCollection: {
    items: Tag[];
  };

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

export type FakeNewsItem = {
  title: string;
  date: string;
  slug: string;
  description: string;
  article: string;
  image?: {
    title: string;
    url: string;
    width: number;
    height: number;
  };
};
