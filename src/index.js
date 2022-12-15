import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import getRefs from './get-refs';

// export { renderCountryList, renderCountryInfo };

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

      Notify.info('🔢 Too many matches found. Please enter a more specific name.');
      
      return;
    }

    if (data.length > 1 && data.length <= 10) {
      renderCountryInfo();

      markup = data.map(makeMarkupCountryList).join('');
      renderCountryList(markup);
    }

    if (data.length === 1) {
      renderCountryList();

      markup = makeMarkupCountryInfo(data);
      renderCountryInfo(markup)
    }
  })
  .catch(error => console.log("Oops, we have a problem: ", error));
};

function makeMarkupCountryList(element) {
  return `<li "country-list__item">
      <img 
        class="country-list__image" 
        src="${element.flags.svg}" 
        alt="Flag of country" 
        width="50" 
        height="50"/>
      <p class="country-list__name">${element.name.official}</p>
    </li>`
};

function makeMarkupCountryInfo(data) {
  let languagesArray = Object.values(data[0].languages);
  let languages = languagesArray.join(',');
  
  return `<li class="country-info__item">
    <div class="country-info__list">
      <img
        class="country-info__image"
        src="${data[0].flags.svg}" 
        alt="Big flag of country"
        width="70" 
        height="70"
      />
      <h2 class="country-info__name">${data[0].name.official}</h2>
      <p><span>Capital:</span>${data[0].capital}</p>
      <p><span>Population:</span> ${data[0].population}</p>
      <p><span>Languages:</span>${Object.values(languages)}</p>
    </div>
  </li>`;
};

export function renderCountryList(markup = '') {
  return (refs.countryListEl.innerHTML = markup);
}

export function renderCountryInfo(markup = '') {
  return (refs.countryInfoEl.innerHTML = markup);
}

// function notifyTooMuch() {
//   Notiflix.Notify.info(
//     'Too many matches found. Please enter a more specific name.'
//   );
// }

// function onFetchError(error) {
//   Notiflix.Notify.failure(`Oops, there is no country with that name`);
// }

