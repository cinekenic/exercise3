import { getPopulation } from "./getPopulation";
import { getNativeName } from "./script";
import { findLeng } from "./script";

export const fetchData = async () => {
  const url = "https://restcountries.com/v2/all";
  const res = await fetch(url);
  const data = await res.json();
  getNativeName(data);
  getPopulation(data);
  findLeng(data);

  // getLanguages(data);

  return data;
};
