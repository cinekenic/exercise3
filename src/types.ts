export interface regionalBlocs {
  acronym: string;
}

export interface ICountry {
  name: string;
  population: number;
  regionalBlocs: Array<regionalBlocs>;
  area: number;
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
    currencies: [];
  };
  NAFTA: { countries: string[]; population: 0; languages: {}; currencies: [] };
  AU: { countries: string[]; population: 0; languages: {}; currencies: [] };
  other: { countries: string[]; population: 0; languages: {}; currencies: [] };
}

export interface currencies {
  currencies: [
    {
      name: string;
    }
  ];
}
