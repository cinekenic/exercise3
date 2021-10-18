export interface regionalBlocs {
  acronym: string;
}

export interface ICountry {
  name: string;
  population: number;
  regionalBlocs: Array<regionalBlocs>;
  area: number;
  nativeName: string;
  alpha3Code: string;
  languages: {
    [key: string]: ILanguages;
  };
  currencies: [
    {
      code: string;
      name: string;
      symbol: string;
    }
  ];
}

interface ILanguages {
  iso639_1: string;
}

export interface ICountries {
  countries: string[];
  population: number;
  languages: {
    [key: string]: ILanguage;
  };
  currencies: string[];
}

export interface regBlocs {
  EU: ICountries;
  // [key: organization]:ICountries
  NAFTA: ICountries;
  AU: ICountries;
  other: ICountries;
}

export interface currencies {
  name: string;
}

export interface ILanguage {
  countries: string[];
  population: number;
  area: number;
  name: string;
}

export type organization = "EU" | "AU" | "NAFTA" | "other";
