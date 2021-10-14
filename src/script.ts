import { fetchData } from "./fetchData";
import { ICountry } from "./types";
import { currencies } from "./types";
import { regBlocs } from "./types";
import { objectCountries } from "./objectCountries";
const countriesFromRegions = ["EU", "AU", "NAFTA", "other"];

export function getNativeName(countries) {
  console.log(countries);

  for (let el of countries) {
    if (el.regionalBlocs != undefined) {
      for (let elem of el.regionalBlocs) {
        if (elem.acronym === "EU") {
          objectCountries.EU.countries.push(el.nativeName);
          for (let EUcurrencies in el.currencies) {
            if (
              objectCountries.EU.currencies.indexOf(
                el.currencies[EUcurrencies].name
              ) === -1
            ) {
              objectCountries.EU.currencies.push(
                el.currencies[EUcurrencies].name
              );
            }
          }
        } else if (elem.acronym === "AU") {
          objectCountries.AU.countries.push(el.nativeName);
          for (let AUcurrencies in el.currencies) {
            if (
              objectCountries.AU.currencies.indexOf(
                el.currencies[AUcurrencies].name
              ) === -1
            ) {
              objectCountries.AU.currencies.push(
                el.currencies[AUcurrencies].name
              );
            }
          }
        } else if (elem.acronym === "NAFTA") {
          objectCountries.NAFTA.countries.push(el.nativeName);
          for (let NAFTAcurrencies in el.currencies) {
            if (
              objectCountries.NAFTA.currencies.indexOf(
                el.currencies[NAFTAcurrencies].name
              ) === -1
            ) {
              objectCountries.NAFTA.currencies.push(
                el.currencies[NAFTAcurrencies].name
              );
            }
          }
        } else if (
          elem.acronym !== "NAFTA" &&
          elem.acronym !== "AU" &&
          elem.acronym !== "EU" &&
          objectCountries.other.countries.indexOf(el.nativeName) === -1
        ) {
          objectCountries.other.countries.push(el.nativeName);
          for (let otherCurrencies in el.currencies) {
            if (
              objectCountries.other.currencies.indexOf(
                el.currencies[otherCurrencies].name
              ) === -1
            ) {
              objectCountries.other.currencies.push(
                el.currencies[otherCurrencies].name
              );
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
console.log(objectCountries);

export const findLeng = (countries) => {
  let euCountries = countries.filter((country) => {
    return country.regionalBlocs?.some((region) => region.acronym === "EU");
  });

  euCountries.forEach((country) =>
    makeNewObj(country.languages[0].iso639_1, "EU", country)
  );

  euCountries = countries.filter((country) => {
    return country.regionalBlocs?.some((region) => region.acronym === "AU");
  });

  euCountries.forEach((country) =>
    makeNewObj(country.languages[0].iso639_1, "AU", country)
  );
  euCountries = countries.filter((country) => {
    return country.regionalBlocs?.some((region) => region.acronym === "NAFTA");
  });

  euCountries.forEach((country) =>
    makeNewObj(country.languages[0].iso639_1, "NAFTA", country)
  );
  euCountries = countries.filter((country) => {
    return country.regionalBlocs?.some((region) => region.acronym === "other");
  });

  euCountries.forEach((country) =>
    makeNewObj(country.languages[0].iso639_1, "other", country)
  );
};

fetchData();
