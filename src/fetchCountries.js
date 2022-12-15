import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import getRefs from './get-refs';
import {  renderCountryList, renderCountryInfo } from './index';

export { fetchCountries };

const refs = getRefs();
const BASE_URL = 'https://restcountries.com/v3.1/name';
let fields = [`name,capital,population,flags,languages`];

function fetchCountries(name) {
  
  const url = `${BASE_URL}/${name}?fields=${fields}`; 
  
  return fetch(url)
  .then(response => {
    if (!response.ok) {
      renderCountryList();
      renderCountryInfo();
      throw new Error(errorNotFoud());
    }

    return response.json();
  });
}

function errorNotFoud() {
  Notiflix.Notify.failure(`Oops, there is no country with that name`);
  refs.searchBoxEl.classList.add(`warning`);
}