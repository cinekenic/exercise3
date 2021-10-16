// import { objectCountries } from "./objectCountries";

// export function getPopulation(data) {
//   for (let el of data) {
//     if (el.regionalBlocs !== undefined) {
//       el.regionalBlocs.forEach((elm) => {
//         if (elm.acronym === "EU") {
//           objectCountries.EU.population += el.population;
//         } else if (elm.acronym === "AU") {
//           objectCountries.AU.population += el.population;
//         } else if (elm.acronym === "NAFTA") {
//           objectCountries.NAFTA.population += el.population;
//         } else objectCountries.other.population += el.population;
//       });
//     } else objectCountries.other.population += el.population;
//   }

//   return objectCountries;
// }
