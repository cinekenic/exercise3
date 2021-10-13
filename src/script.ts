import { fetchData } from "./fetchData";
import { ICountry } from "./types";
import { currencies } from "./types";
import { regBlocs } from "./types";

const obj: regBlocs = {
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

  return countries;
}

getNativeName();

const getCurrencies = async () => {
  let countries: ICountry[] = await fetchData();
  console.log(countries);

  for (let el of countries) {
    if (
      el.regionalBlocs &&
      el.regionalBlocs.find((findEl) =>
        findEl.acronym.includes("EU" || "AU")
      ) &&
      el.regionalBlocs !== undefined
    ) {
      el.currencies.forEach((elCurr, index, self) => {
        if (obj.EU.currencies.indexOf(elCurr.name) === -1) {
          obj.EU.currencies.push(elCurr.name);
        }
      });
    }
  }
};
console.log(obj);

getCurrencies();
