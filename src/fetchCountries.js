import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import {  renderCountryList, renderCountryInfo } from './index';
import { renderCountryList } from './index';
import { renderCountryInfo } from './index';

export { fetchCountries };

const END_POINT_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
  const url = `${END_POINT_URL}/name/${name}?fields=name,capital,population,flags,languages`; 
  
  return fetch(url)
  .then(response => {
    if (!response.ok) {
      renderCountryList();
      renderCountryInfo();

      throw new Error(Notify.failure('⛔Oops, there is no country with that name'));
    }

    return response.json();
  });
}