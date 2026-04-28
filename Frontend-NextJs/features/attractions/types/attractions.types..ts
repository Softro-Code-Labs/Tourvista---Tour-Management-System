export type Place = {
  title: string;
  description: string;
  image: string;
  images?: string[];
};

export type Section = {
  section: string;
  description: string;
  places: Place[];
};
