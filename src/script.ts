import { fetchData } from "./fetchData";

const obj = {
  EU: {
    countries: [],
    population: 0,
    languages: {},
    currencies: [],
  },
  NAFTA: {
    countries: [],
    population: 0,
    languages: {},
    currencies: [],
  },
  AU: {
    countries: [],
    population: 0,
    languages: {},
    currencies: [],
  },
  other: {
    countries: [],
    population: 0,
    languages: {},
    currencies: [],
  },
};

export interface regionalBlocs {
  acronym: string;
}

export interface ICountry {
  name: string;
  population: number;
  regionalBlocs: Array<regionalBlocs>;
  area: number;
}

interface ICountries {
  countries: [];
  population: number;
  languages: {};
  currencies: [];
}

async function getData() {
  const countries = await fetchData();
  console.log(countries);
  const filterCountries = countries.filter(
    (el: ICountry) =>
      el.regionalBlocs &&
      el.regionalBlocs.find((findEl: regionalBlocs) =>
        findEl.acronym.includes("EU")
      )
  );

  console.log(filterCountries);
}
getData();
