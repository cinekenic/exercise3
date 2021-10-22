import { convertToObject } from "typescript";
import { mockValues } from "./restCoutries";
import {
  findLang,
  useOfLanguage,
  getLessUsefullLanguage,
  getMostUsefullLanguage,
  densityByOrganisation,
  organizationList,
  getAreas,
  sortCountries,
} from "./script";

const mockObjectCounrties = findLang(mockValues);

test(`Check if there is data in the countries object`, () => {
  expect(findLang(mockValues).EU.countries.length).toBeGreaterThan(0);
  expect(findLang(mockValues).NAFTA.countries.length).toBeGreaterThan(0);
  expect(findLang(mockValues).NAFTA.countries).not.toContain("Mexico?");
  expect(findLang(mockValues).AU.countries.length).toBeGreaterThan(0);
  expect(findLang(mockValues).other.countries.length).toBeGreaterThan(0);
});

test(`Check if there is data in the population object`, () => {
  expect(findLang(mockValues).EU.population).toBeGreaterThan(0);
  expect(findLang(mockValues).NAFTA.population).toBeGreaterThan(0);
  expect(findLang(mockValues).AU.population).toBeGreaterThan(0);
  expect(findLang(mockValues).other.population).toBeGreaterThan(0);
});

test(`Check if there is data in the languages object`, () => {
  expect(findLang(mockValues)).not.toBeUndefined();
  expect(findLang(mockValues)).toHaveProperty("NAFTA");
  expect(findLang(mockValues)).not.toHaveProperty("NAFTA?");
  expect(findLang(mockValues).NAFTA).toHaveProperty("languages");
  expect(findLang(mockValues).NAFTA.languages).toHaveProperty("en");
  expect(findLang(mockValues).NAFTA.languages.en).toHaveProperty(
    "name",
    "English"
  );
});

test(`Check if there is data in the currencies object`, () => {
  expect(findLang(mockValues).EU.currencies.length).toBeGreaterThan(0);
  expect(findLang(mockValues).NAFTA.currencies.length).toBeGreaterThan(0);
  expect(findLang(mockValues).AU.currencies.length).toBeGreaterThan(0);
  expect(findLang(mockValues).other.currencies.length).toBeGreaterThan(0);
});

test("Check if the function returns an array with two values", () => {
  const lang = ["English", "latine"];

  expect(useOfLanguage(mockObjectCounrties)).toBeDefined();
  expect(useOfLanguage(mockObjectCounrties)).toMatchObject(lang);
  expect(useOfLanguage(mockObjectCounrties)).toEqual(
    expect.arrayContaining(lang)
  );
});

test("Check if function returns the name of the language used by the smallest number of people", () => {
  expect(getLessUsefullLanguage(mockObjectCounrties)).toBeDefined();
  expect(getLessUsefullLanguage(mockObjectCounrties)).toMatch("latine");
  expect(getLessUsefullLanguage(mockObjectCounrties)).toBe("latine");
});

test("Check if function returns the  name of the language used in the greatest number of countries,", () => {
  expect(getMostUsefullLanguage(mockObjectCounrties)).toBeDefined();
  expect(getMostUsefullLanguage(mockObjectCounrties)).toBe("English");
});

test("Check name of the organization with the second highest population density", () => {
  expect(
    densityByOrganisation(mockObjectCounrties, organizationList)
  ).toBeDefined();
  expect(densityByOrganisation(mockObjectCounrties, organizationList)).toBe(
    "AU"
  );
});

test("Check the name of the organization occupying the third largest area", () => {
  expect(getAreas(mockObjectCounrties, organizationList)).toBeDefined();
  expect(getAreas(mockObjectCounrties, organizationList)).toBe("EU");
});

test("Check sort by population, population density and area", () => {
  const sortNames = ["NAFTA", "AU", "AU", "NAFTA", "AU"];
  console.log(sortCountries(mockObjectCounrties));
  expect(sortCountries(mockObjectCounrties)).toBeDefined();
  expect(sortCountries(mockObjectCounrties)).toMatchObject(sortNames);
  expect(sortCountries(mockObjectCounrties)).toEqual(
    expect.arrayContaining(sortNames)
  );
  expect(sortCountries(mockObjectCounrties)[0]).toBe("NAFTA");
});
