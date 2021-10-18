import { fetchData } from "./fetchData";

import {
  ICountry,
  organization,
  ICountries,
  regBlocs,
  ILanguage,
} from "./types";

import { objectCountries } from "./objectCountries";
const countriesFromRegions = ["EU", "AU", "NAFTA", "other"];

const makeNewObj = (
  langCode: string,
  organizCode: organization,
  country: ICountry
) => {
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

export const findLang = (countries) => {
  const acronims: organization[] = ["EU", "AU", "NAFTA"];

  acronims.forEach((el) => {
    const euCountries: ICountry[] = countries.filter((country) => {
      return country.regionalBlocs?.some((region) => region.acronym === el);
    });
    //-------------------------------------------------------------------

    //dodawanie do pierwszej tablicy

    euCountries.forEach((ell) => {
      objectCountries[el].countries.push(ell.name);
      objectCountries[el].population += ell.population;

      if (ell.currencies !== undefined) {
        for (let AUCurrency of ell.currencies) {
          if (objectCountries[el].currencies.indexOf(AUCurrency.name)) {
            objectCountries[el].currencies.push(AUCurrency.name);
          }
        }
      }

      makeNewObj(ell.languages[0].iso639_1, el, ell);
    });
  });

  const otherCountries: ICountry[] = countries.filter((country) => {
    return (
      country.regionalBlocs?.some(
        (region) => acronims.indexOf(region.acronym) === -1
      ) || country.regionalBlocs == undefined
    );
  });

  //------------------------------------------------------------

  //dodawanie other

  otherCountries.forEach((ell: ICountry) => {
    objectCountries["other"].countries.push(ell.name);
    objectCountries["other"].population += ell.population;
    if (ell.currencies !== undefined) {
      for (let AUCurrency of ell.currencies) {
        if (objectCountries.other.currencies.indexOf(AUCurrency.name) == -1) {
          objectCountries["other"].currencies.push(AUCurrency.name);
        }
      }
    }
  });

  //----------------------------------------------------------

  //wywoływanie funkcji makeNewObj w celu uzyskania danych w languages
  otherCountries.forEach((country: ICountry) =>
    makeNewObj(country.languages[0].iso639_1, "other", country)
  );
};

const sortCountriesName = (obj: regBlocs, region: string[]) => {
  for (let country in obj) {
    obj[country].countries.sort((a: string, b: string) => b.localeCompare(a));
  }
};

//puste tablice w konsoli
const init = async () => {
  await fetchData();
  sortCountriesName(objectCountries, countriesFromRegions);
};

init();

console.log(objectCountries);
