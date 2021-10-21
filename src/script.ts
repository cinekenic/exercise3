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
const organizationList: organization[] = ["EU", "AU", "NAFTA"];
let otherCountries: ICountry[] = [];

const makeNewObj = (
  langCode: string,
  organizCode: organization,
  country: ICountry,
  langNativeName: string
) => {
  if (!objectCountries[organizCode].languages[langCode]) {
    objectCountries[organizCode].languages[langCode] = {
      countries: [],
      population: 0,
      area: 0,
      name: "",
    };
  }
  const newInstance = objectCountries[organizCode].languages[langCode];
  // console.log(country);
  newInstance.countries.push(country.alpha3Code);
  newInstance.population += country.population;
  if (typeof country.area !== "undefined") {
    newInstance.area += country.area;
  }
  newInstance.name = langNativeName;
};

export const findLang = (countries) => {
  organizationList.forEach((el) => {
    const countriesItems: ICountry[] = countries.filter((country) => {
      return country.regionalBlocs?.some((region) => region.acronym === el);
    });
    //-------------------------------------------------------------------

    //dodawanie do pierwszej tablicy

    countriesItems.forEach((item) => {
      objectCountries[el].countries.push(item.name);
      objectCountries[el].population += item.population;

      if (item.currencies !== undefined) {
        for (let currency of item.currencies) {
          if (objectCountries[el].currencies.indexOf(currency.name)) {
            objectCountries[el].currencies.push(currency.name);
          }
        }
      }

      item.languages.forEach((lang) =>
        makeNewObj(lang.iso639_1, el, item, lang.nativeName)
      );

      otherCountries = countries.filter((country) => {
        return (
          country.regionalBlocs?.some(
            (region) => organizationList.indexOf(region.acronym) === -1
          ) || country.regionalBlocs == undefined
        );
      });
    });
  });

  //------------------------------------------------------------

  //dodawanie other

  otherCountries.forEach((item: ICountry) => {
    objectCountries["other"].countries.push(item.name);
    objectCountries["other"].population += item.population;
    if (item.currencies !== undefined) {
      for (let AUCurrency of item.currencies) {
        if (objectCountries.other.currencies.indexOf(AUCurrency.name) == -1) {
          objectCountries["other"].currencies.push(AUCurrency.name);
        }
      }
    }
  });

  //----------------------------------------------------------

  //wywoływanie funkcji makeNewObj w celu uzyskania danych w languages
  otherCountries.forEach((country: ICountry) => {
    country.languages.forEach((lang) =>
      makeNewObj(lang.iso639_1, "other", country, lang.nativeName)
    );
  });
};

const sortCountriesName = (obj: regBlocs, region: string[]) => {
  const objLeast = Object.entries(obj);

  const leastCountries = [];
  objLeast.forEach((item) => {
    let least = Object.keys(item[1].countries);
    if (item[0] !== "other") {
      leastCountries.push([item[0], least.length]);
      leastCountries.sort((a, b) => a[1] - b[1]);
    }
  });

  console.log(`Nazwa organizacji posiadającej najmniejszą liczbę państw członkowskich,
${leastCountries[0][0]}`);

  //-------------------------------------------
  const objCurrency = Object.entries(obj);

  const currencyArray = [];
  objCurrency.forEach((item) => {
    let currency = Object.keys(item[1].currencies);
    if (item[0] !== "other") {
      currencyArray.push([item[0], currency.length]);
      currencyArray.sort((a, b) => b[1] - a[1]);
    }
  });
  console.log(
    `Nazwa organizacji wykorzystującej największą liczbę walut ${currencyArray[0][0]}`
  );

  //------------------------------------------

  const objLang = Object.entries(obj);

  const languagesArray: Array<[string, number]> = [];

  objLang.forEach((item) => {
    if (item[0] !== "other") {
      if (item[1].languages !== undefined) {
        let lang = Object.keys(item[1].languages);

        languagesArray.push([item[0], lang.length]);
        languagesArray.sort((a, b) => b[1] - a[1]);
      }
    }
  });
  console.log(
    `Nazwy organizacji o największej ${languagesArray[0][0]} i najmniejszej ${
      languagesArray[languagesArray.length - 1][0]
    } przypisanej do nich liczbie języków`
  );
  //-------------------------------------------------

  let populationArray = [];
  for (let country in obj) {
    //--------------------------------------
    obj[country].countries.sort((a: string, b: string) => b.localeCompare(a));

    //-----------------------------------
    const objekt = Object.values(obj[country]);

    if (country !== "other") {
      populationArray.push([country, objekt[1]]);
      populationArray.sort((a: any, b: any) => b[1] - a[1]);
    }
  }
  console.log(`${populationArray[0][0]} : organizacja o największej populacji`);
};

//-------------------------------------------

const getOrganisationsArea = (countries: regBlocs, organizations) => {
  return organizations.map((organization) => {
    return [
      organization,
      Object.entries(countries[organization].languages).reduce(
        (area, item) => item[1]["area"] + area,
        0
      ),
    ];
  });
};
//-------------------------------------

const getAreas = (countries, organizations) => {
  const areas = getOrganisationsArea(countries, organizations);
  areas.sort((a, b) => b[1] - a[1]);
  console.log("areas", areas[2][0]);
};
//-----------------------------------------------------

const densityByOrganisation = (countries, organizations) => {
  const areas = getOrganisationsArea(countries, organizations);

  const densitys = areas.map((item) => [
    item[0],
    countries[item[0]].population / item[1],
  ]);

  densitys.sort((a, b) => b[1] - a[1]);

  console.log("densitys", densitys[1][0]);

  return densitys[1][0];
};

//-----------------------------------------------------------

//Natywna nazwa języka wykorzystywanego w największej liczbie krajów,
const getMostUsefullLanguage = (countries: regBlocs, regions: string[]) => {
  let languages = [];

  regions.forEach((region) => {
    Object.entries(countries[region].languages).forEach((lang) => {
      if (lang[0] !== "undefined") {
        if (!languages.find((el) => el[lang[1].name])) {
          const obj = {};
          obj[lang[1].name] = lang[1].countries.length;
          languages.push(obj);
          console.log(languages);
        } else {
          const index = languages.findIndex((el) => el[lang[1].name]);

          languages[index][lang[1].name] += lang[1].countries.length;
        }
      }
    });
  });

  languages.sort(
    (a: number, b: number) => Object.values(b)[0] - Object.values(a)[0]
  );

  console.log(
    "Natywną nazwę języka wykorzystywanego w największej liczbie krajów:",
    Object.keys(languages[0])[0]
  );
  return languages;
};

//-----------------------------------------------------------------

//Natywna nazwa języka wykorzystywanego przez najmniejszą liczbę ludzi

const getLessUsefullLanguage = (countries) => {
  const result = {};
  for (let country in countries) {
    for (let language in countries[country].languages) {
      console.log(countries[country].languages);
      if (!result[countries[country].languages[language].name]) {
        result[countries[country].languages[language].name] = 0;
      }
      result[countries[country].languages[language].name] +=
        countries[country].languages[language].population;
    }
  }

  const languages = Object.entries(result);
  languages.sort((a, b) => a[1] - b[1]);

  console.log(
    "Natywna nazwa języka wykorzystywanego przez najmniejszą liczbę ludzi",
    languages[0][0]
  );
};

//------------------------------------------------------------
//Natywne nazwy języków wykorzystywanych na największym i najmniejszym obszarze.

const useOfLanguage = (countries: regBlocs) => {
  const result = {};

  for (let country in countries) {
    const languages = countries[country].languages;
    for (let language in countries[country].languages) {
      if (!result[countries[country].languages[language].name]) {
        result[countries[country].languages[language].name] = 0;
      }
      result[countries[country].languages[language].name] +=
        countries[country].languages[language].area;
    }
  }

  const languages = Object.entries(result);
  languages.sort((a, b) => b[1] - a[1]);

  console.log(
    `Natywne nazwy języków wykorzystywanych na największym ${languages.at(
      0
    )} i najmniejszym ${languages.at(-1)} obszarze.`
  );
};

const compare = (language) => {
  if (language.at(0) == language.at(1)) {
    console.log(
      language.at(0),
      language.at(1),
      "są wykożystywanie na równym obszarze."
    );
  }
};

//puste tablice w konsoli
const init = async () => {
  const data = await fetchData();

  findLang(data);
  sortCountriesName(objectCountries, countriesFromRegions);
  densityByOrganisation(objectCountries, organizationList);
  getAreas(objectCountries, organizationList);
  getMostUsefullLanguage(objectCountries, countriesFromRegions);
  getLessUsefullLanguage(objectCountries);
  useOfLanguage(objectCountries);
};

init();

console.log(objectCountries);
