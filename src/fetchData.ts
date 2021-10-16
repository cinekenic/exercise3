// import { getPopulation } from "./getPopulation";
import { getNativeName } from "./script";
import { findLang } from "./script";

export const fetchData = async () => {
  const url = "https://restcountries.com/v2/all";
  const res = await fetch(url);
  const data = await res.json();
  getNativeName(data);
  // getPopulation(data);
  findLang(data);

  // getLanguages(data);

  return data;
};
