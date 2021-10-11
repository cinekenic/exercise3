export const fetchData = async () => {
  const url = "https://restcountries.com/v2/all";
  const res = await fetch(url);
  const json = await res.json();
  return json;
};
