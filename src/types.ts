export interface regionalBlocs {
  acronym: string;
}

export interface ICountry {
  name: string;
  population: number;
  regionalBlocs: Array<regionalBlocs>;
  area: number;
}

export interface ICountries {
  countries: [];
  population: number;
  languages: {};
  currencies: [];
}

export interface RegBloc {
  EU: { countries: string[]; population: 0; languages: {}; currencies: [] };
  NAFTA: { countries: string[]; population: 0; languages: {}; currencies: [] };
  AU: { countries: string[]; population: 0; languages: {}; currencies: [] };
  other: { countries: string[]; population: 0; languages: {}; currencies: [] };
}
