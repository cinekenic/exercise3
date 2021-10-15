import { fetchData } from "./fetchData";
import { ICountry } from "./types";
import { currencies } from "./types";
import { regBlocs } from "./types";
import { objectCountries } from "./objectCountries";
const countriesFromRegions = ["EU", "AU", "NAFTA", "other"];

export function getNativeName(countries: ICountry[]) {
  console.log(countries);

  for (let el of countries) {
    if (el.regionalBlocs != undefined) {
      for (let elem of el.regionalBlocs) {
        if (elem.acronym === "EU") {
          objectCountries.EU.countries.push(el.nativeName);

          for (let EUcurrencies of el.currencies) {
            if (objectCountries.EU.currencies.indexOf(EUcurrencies.name)) {
              objectCountries.EU.currencies.push(EUcurrencies.name);
            }
          }
        } else if (elem.acronym === "AU") {
          objectCountries.AU.countries.push(el.nativeName);

          for (let AUCurrency of el.currencies) {
            if (objectCountries.AU.currencies.indexOf(AUCurrency.name)) {
              objectCountries.AU.currencies.push(AUCurrency.name);
            }
          }
        } else if (elem.acronym === "NAFTA") {
          objectCountries.NAFTA.countries.push(el.nativeName);

          for (let NAFTACurrency of el.currencies) {
            if (objectCountries.NAFTA.currencies.indexOf(NAFTACurrency.name)) {
              objectCountries.NAFTA.currencies.push(NAFTACurrency.name);
            }
          }
        } else if (
          elem.acronym !== "NAFTA" &&
          elem.acronym !== "AU" &&
          elem.acronym !== "EU" &&
          objectCountries.other.countries.indexOf(el.nativeName) === -1
        ) {
          objectCountries.other.countries.push(el.nativeName);

          for (let OtherCurrency of el.currencies) {
            if (objectCountries.other.currencies.indexOf(OtherCurrency.name)) {
              objectCountries.other.currencies.push(OtherCurrency.name);
            }
          }
        }
      }
    } else {
      if (objectCountries.other.countries.indexOf(el.nativeName) === -1) {
        objectCountries.other.countries.push(el.nativeName);
      }
    }
  }

  return countries;

  // const organisations = ["EU", "AU", "NAFTA"];

  // for (let el of countries) {
  //   if (el.regionalBlocs != undefined) {
  //     if (
  //       el.regionalBlocs.length === 0 &&
  //       objectCountries.other.countries.indexOf(el.nativeName) === -1
  //     ) {
  //       objectCountries.other.countries.push(el.nativeName);
  //     } else if (
  //       el.regionalBlocs.every(
  //         (block: { acronym: string }) =>
  //           organisations.indexOf(block.acronym) === -1
  //       ) &&
  //       objectCountries.other.countries.indexOf(el.nativeName) === -1
  //     ) {
  //       for (let otherCurrencies in el.currencies) {
  //         if (
  //           objectCountries.other.currencies.indexOf(
  //             el.currencies[otherCurrencies].name
  //           ) === -1
  //         ) {
  //           objectCountries.other.currencies.push(
  //             el.currencies[otherCurrencies].name
  //           );
  //         }
  //       }
  //     } else {
  //       for (let elem of el.regionalBlocs) {
  //         organisations.forEach((organisation) => {
  //           if (organisation.indexOf(elem.acronym)) {
  //             objectCountries[organisation].countries.push(el.nativeName);

  //             for (let currencies in el.currencies) {
  //               if (
  //                 objectCountries[organisation].currencies.indexOf(
  //                   el.currencies[currencies].name
  //                 ) === -1
  //               ) {
  //                 objectCountries[organisation].currencies.push(
  //                   el.currencies[currencies].name
  //                 );
  //               }
  //             }
  //           }
  //         });
  //       }
  //     }
  //   }
  // }
}

// organisation: RegBlocs
const makeNewObj = (langCode, organizCode, country) => {
  if (!objectCountries[organizCode].languages[langCode]) {
    objectCountries[organizCode].languages[langCode] = {
      countries: [],
      population: 0,
      area: 0,
      name: "",
    };
  }
  // else {
  //   // console.log(objectCountries[organizCode].languages[langCode]);
  //   objectCountries[organizCode].languages[langCode] = {
  //     countries: [],
  //     population: 0,
  //     area: 0,
  //     name: "",
  //   };
  // }
  objectCountries[organizCode].languages[langCode].countries.push(
    country.alpha3Code
  );
  objectCountries[organizCode].languages[langCode].population +=
    country.population;
  if (typeof country.area !== "undefined") {
    objectCountries[organizCode].languages[langCode].area += country.area;
  }
  objectCountries[organizCode].languages[langCode].name = country.nativeName;
};

export const findLang = (countries) => {
  const acronims = ["EU", "AU", "NAFTA"];

  acronims.forEach((el) => {
    const euCountries = countries.filter((country) => {
      return country.regionalBlocs?.some((region) => region.acronym === el);
    });

    euCountries.forEach((country) =>
      makeNewObj(country.languages[0].iso639_1, el, country)
    );
  });

  const otherCountries = countries.filter((country) => {
    return country.regionalBlocs?.some(
      (region) => acronims.indexOf(region.acronym) === -1
    );
  });

  otherCountries.forEach((country) =>
    makeNewObj(country.languages[0].iso639_1, "other", country)
  );
};

console.log(objectCountries);

const sortCountriesName = (obj, region) => {
  for (let country in obj) {
    obj[country].countries.sort((a, b) => b.localeCompare(a));
    console.log(obj[country].countries);
  }
};

//puste tablice w konsoli
const init = async () => {
  await fetchData();
  sortCountriesName(objectCountries, countriesFromRegions);
};

init();
