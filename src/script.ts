import { fetchData } from "./fetchData";
import { ICountry } from "./types";
import { RegBloc } from "./types";

const obj: RegBloc = {
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

console.log(obj);

async function getNativeName(): Promise<ICountry[]> {
  let countries = await fetchData();
  console.log(countries);

  for (let el of countries) {
    if (el.regionalBlocs != undefined) {
      for (let elem of el.regionalBlocs) {
        if (elem.acronym === "EU") {
          obj.EU.countries.push(el.nativeName);
        } else if (elem.acronym === "AU") {
          obj.AU.countries.push(el.nativeName);
        } else if (elem.acronym === "NAFTA") {
          obj.NAFTA.countries.push(el.nativeName);
        } else if (
          elem.acronym !== "NAFTA" &&
          elem.acronym !== "AU" &&
          elem.acronym !== "EU" &&
          obj.other.countries.indexOf(el.nativeName) === -1
        ) {
          obj.other.countries.push(el.nativeName);
        }
      }
    } else {
      if (obj.other.countries.indexOf(el.nativeName) === -1) {
        obj.other.countries.push(el.nativeName);
      }
    }
  }

  // [
  //   ...obj.EU.countries,
  //   ...obj.NAFTA.countries,
  //   ...obj.AU.countries,
  //   ...obj.other.countries,
  // ].forEach((el, index, self) => {
  //   if (self.indexOf(el) !== self.lastIndexOf(el)) {
  //     console.log(el);
  //   }
  // });

  console.log(obj);
  return countries;
}

getNativeName();
