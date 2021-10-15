export interface regionalBlocs {
  acronym: string;
}

export interface ICountry {
  name: string;
  population: number;
  regionalBlocs: Array<regionalBlocs>;
  area: number;
  nativeName: string;
  currencies: [
    {
      code: string;
      name: string;
      symbol: string;
    }
  ];
}

export interface ICountries {
  countries: [];
  population: number;
  languages: {};
  currencies: [];
}

export interface regBlocs {
  EU: {
    countries: string[];
    population: 0;
    languages: {};
    currencies: string[];
  };
  NAFTA: {
    countries: string[];
    population: 0;
    languages: {};
    currencies: string[];
  };
  AU: {
    countries: string[];
    population: 0;
    languages: {};
    currencies: string[];
  };
  other: {
    countries: string[];
    population: 0;
    languages: {};
    currencies: string[];
  };
}

export interface currencies {
  name: string;
}
