export default function getRefs() {
  return {
    searchBoxEl: document.querySelector(`#search-box`),
    countryListEl: document.querySelector(`.country-list`),
    countryInfoEl: document.querySelector(`.country-info`),
  }  
};