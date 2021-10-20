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
const organizationList = ["EU", "AU", "NAFTA"];

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
  // console.log(country);
  objectCountries[organizCode].languages[langCode].countries.push(
    country.alpha3Code
  );
  objectCountries[organizCode].languages[langCode].population +=
    country.population;
  if (typeof country.area !== "undefined") {
    objectCountries[organizCode].languages[langCode].area += country.area;
  }
  objectCountries[organizCode].languages[langCode].name = langNativeName;
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

      ell.languages.forEach(lang => makeNewObj(lang.iso639_1, el, ell, lang.nativeName))
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
  otherCountries.forEach((country: ICountry) =>{
    country.languages.forEach(lang =>  makeNewObj(lang.iso639_1, "other", country, lang.nativeName))
  }

   
  );


};

const sortCountriesName = (obj: regBlocs, region: string[]) => {

  const objLeast = Object.entries(obj);
  
  const leastCountries = []
    objLeast.forEach(item =>{
      let least = Object.keys(item[1].countries)
      if(item[0] !== 'other'){

        leastCountries.push([item[0], least.length])
        leastCountries.sort((a , b) => a[1] - b[1]);
       
      }
    })

console.log(`Nazwa organizacji posiadającej najmniejszą liczbę państw członkowskich,
${leastCountries[0][0]}`);



  //-------------------------------------------
  const objCurrency= Object.entries(obj);
 
 const currencyArray = []
  objCurrency.forEach(item=>{
    let currency = Object.keys(item[1].currencies);
    if(item[0] !== 'other'){
    currencyArray.push([item[0], currency.length])
    currencyArray.sort((a , b) => b[1] - a[1]);
    }
  })
  console.log(`Nazwa organizacji wykorzystującej największą liczbę walut ${currencyArray[0][0]}`);


  //------------------------------------------

  const objLang= Object.entries(obj);

  const languagesArray: Array<[string, number ]> = [];

  objLang.forEach( item => {
   
   if(item[0] !== 'other'){

     if( item[1].languages !== undefined) {
    
       let lang = Object.keys(item[1].languages);
   
   
     
       languagesArray.push([item[0], lang.length ]);
       languagesArray.sort((a , b) => b[1] - a[1]);
     }
  
   }
  });
  console.log(`Nazwy organizacji o największej ${languagesArray[0][0]} i najmniejszej ${languagesArray [languagesArray.length -1 ][0] } przypisanej do nich liczbie języków`);
//-------------------------------------------------
 
  
  let populationArray = []
  for (let country in obj) {
    //--------------------------------------
    obj[country].countries.sort((a: string, b: string) => b.localeCompare(a));
    
    
    //-----------------------------------
    const objekt = Object.values(obj[country])
    if(country !== 'other'){
      populationArray.push([country, objekt[1]])  
      populationArray.sort((a: any, b: any) => b[1] - a[1]);
    }  
  } 
  console.log(`${populationArray[0][0]} : organizacja o największej populacji`);
};

//-------------------------------------------

const getOrganisationsArea = (countries, organizations) => {
  return organizations.map(organization => {
    return [organization, Object.entries(countries[organization].languages).reduce((area, item) => item[1]['area'] + area, 0)]
  })
}
//-------------------------------------

const getAreas = (countries, organizations) => {
  const areas = getOrganisationsArea(countries, organizations);
  areas.sort((a, b) => b[1] - a[1])
  console.log('areas', areas[2][0]);
}
//-----------------------------------------------------

const densityByOrganisation = (countries, organizations) => {
    const areas = getOrganisationsArea(countries, organizations);
  
    const densitys = areas.map(item => [item[0], countries[item[0]].population / item[1]])

    densitys.sort((a,b) => b[1] - a[1]);

    console.log('densitys', densitys[1][0])

    return densitys[1][0];
}

//-----------------------------------------------------------

//Natywna nazwa języka wykorzystywanego w największej liczbie krajów,
const getMostUsefullLanguage = (countries, regions) => {
 
  let languages = [];

  regions.forEach(region => {
    Object.entries(countries[region].languages).forEach(lang => {
   
      if(lang[0] !== 'undefined'){
        if(!languages.find(el => el[lang[1].name])){
          const obj = {};
          obj[lang[1].name] = lang[1].countries.length;
          languages.push(obj)
        }
        else{
          const index = languages.findIndex(el => el[lang[1].name]);
          languages[index][lang[1].name] += lang[1].countries.length;
        }
      }
    })
  })

 

  languages.sort((a,b) => Object.values(b)[0] - Object.values(a)[0])


  console.log('Natywną nazwę języka wykorzystywanego w największej liczbie krajów:', Object.keys(languages[0])[0])
 
}

//-----------------------------------------------------------------

//Natywna nazwa języka wykorzystywanego przez najmniejszą liczbę ludzi

const getLessUsefullLanguage = (countries, regions) =>{
  let languages = [];
  const arrCheckedValue = []
  regions.forEach(region => {

  Object.entries(countries[region].languages).forEach(lang =>{
    
    if(lang[0] !== 'undefined'){
     if(!languages.find(el => el[lang[1].population])){
 
        const obj = {}
       obj[lang[1].population] = lang[1].name

  languages.indexOf(obj)=== -1? languages.push(obj): console.log('nic');
  //  languages.push(obj)

   
     } 
     else{
       const index = languages.findIndex(el => el[lang[1].population])
      
   
       languages[index][lang[1].population] += lang[1].population
      }
    }
  })
  
})
languages.sort((a,b) => Object.keys(a)[0] - Object.keys(b)[0])
console.log('Natywna nazwa języka wykorzystywanego przez najmniejszą liczbę ludzi',  Object.values(languages[0])[0])
console.log(languages);

}

//------------------------------------------------------------
//Natywne nazwy języków wykorzystywanych na największym i najmniejszym obszarze.


const useOfLanguage = (countries: regBlocs, regions: string[])=>{
  let languages = [];
  regions.forEach(region =>{
    Object.entries(countries[region].languages).forEach(lang=>{
      if(lang[0] !== 'undefined'){
        // console.log(lang[1].area, lang[1].name);
        if(!languages.find(el => el[lang[1].name])){
       
          const obj = {}
          obj[lang[1].area] = lang[1].name
          languages.push(obj)
          
       
        } else{
          const index = languages.findIndex(el => el[lang[1].area])
         
          languages[index][lang[1].area] += lang[1].area
        
         }
      }
    })
  })
  languages.sort((a,b) => Object.keys(b)[0] - Object.keys(a)[0])
//  console.log(languages);
}


//puste tablice w konsoli
const init = async () => {
  await fetchData();
  sortCountriesName(objectCountries, countriesFromRegions);
  densityByOrganisation(objectCountries, organizationList);
  getAreas(objectCountries, organizationList);
  getMostUsefullLanguage(objectCountries, countriesFromRegions);
  getLessUsefullLanguage(objectCountries, countriesFromRegions)
  useOfLanguage(objectCountries, countriesFromRegions)
};

init();

console.log(objectCountries);




