import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { fetchCountries } from './fetchCountries';
import getRefs from './get-refs';

export { renderCountryList, renderCountryInfo };

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = getRefs();


refs.searchBoxEl.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(e) {
  const name = e.target.value.trim();
  console.log(name);
  let markup = '';

    if (!name) {
      renderCountryList();
      renderCountryInfo();

      return;
  }

  fetchCountries(name)
  .then(data => {
    if (data.length > 10) {
      renderCountryList();
      renderCountryInfo();
      notifyAddLetters();
      refs.searchBoxEl.classList.add(`warning`);
      return;
    }

    if (data.length > 1 && data.length <= 10) {
      renderCountryInfo();
      refs.searchBoxEl.classList.remove(`warning`);

      markup = data.map(makeMarkupCountryList).join('');
      renderCountryList(markup);
    }

    if (data.length === 1) {
      renderCountryList();
      refs.searchBoxEl.classList.remove(`warning`);

      markup = makeMarkupCountryInfo(data);
      renderCountryInfo(markup)
    }
  })
  .catch(error => console.log("There is a problem: ", error));
};

function makeMarkupCountryList(element) {
  return `<li "country-list__item">
      <img 
        class="country-list__image" 
        src="${element.flags.svg}" 
        alt="Flag of country" 
        width="45" 
        height="30"/>
      <p class="country-list__name">${element.name.common}</p>
    </li>`
};

function makeMarkupCountryInfo(data) {
  return `<li class="country-info__item">
    <div class="country-info__list">
      <div class="country-info__main">
        <img
          class="country-info__image"
          src="${data[0].flags.svg}" 
          alt="Big flag of country"
          width="45" 
          height="30"
        />
        <h2 class="country-info__name">${data[0].name.official}</h2>
      </div>  
        <p class="country-info__desc"><span class="country-info__option" >Capital: </span>${data[0].capital}</p>
        <p class="country-info__desc"><span class="country-info__option" >Population: </span> ${data[0].population}</p>
        <p class="country-info__desc"><span class="country-info__option" >Languages: </span>${Object.values(data[0].languages)}</p>
    </div>
  </li>`;
};

function renderCountryList(markup = '') {
  return (refs.countryListEl.innerHTML = markup);
}

function renderCountryInfo(markup = '') {
  return (refs.countryInfoEl.innerHTML = markup);
}

function notifyAddLetters() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}


