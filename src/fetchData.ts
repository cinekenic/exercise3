import { findLang } from "./script";
import { mockValues } from "./restCoutries";

export const fetchData = async () => {
  // const url = "https://restcountries.com/v2/all";
  // const res = await fetch(url);
  // const data = await res.json();

  const data = mockValues;

  findLang(data);

  return data;
};
