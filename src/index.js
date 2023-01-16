import './css/styles.css';

import { CountryAPI } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// Create a new example of Class
const countryApi = new CountryAPI();

const { searchBox, countryList, countryInfo } = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

// Add attribute 'autofocus'
searchBox.setAttribute('autofocus', 'autofocus');

// Add attribute 'placeholder'
searchBox.setAttribute('placeholder', 'Enter the name of the country');

// Add Event Listener on 'input'
searchBox.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

// section 'Search country by' : create box for 'label, input and buttons'
document
  .querySelector('body')
  .insertAdjacentHTML('afterbegin', "<div class='box'></div>");
let divBox = document.querySelector('.box');
divBox.prepend(searchBox);

// section 'Search country by' : create 'label'
searchBox.insertAdjacentHTML(
  'afterend',
  "<label class='label'>Search country by:</label >"
);
const labelSearch = document.querySelector('.label');

// section 'Search country by' : create button 'Name'
labelSearch.insertAdjacentHTML(
  'beforeend',
  "<div><button type='button' class='btn-name'>Name</button></div>"
);
const nameBtn = document.querySelector('.btn-name');
nameBtn.disabled = true;

// section 'Search country by' : create button 'Capital'
nameBtn.insertAdjacentHTML(
  'afterend',
  " <button type='button' class='btn-capital'>Capital</button>"
);
const capitalBtn = document.querySelector('.btn-capital');
capitalBtn.classList.toggle('js-bg');

// section 'Search country by' : add Event Listener on button 'Capital'
capitalBtn.addEventListener('click', e => {
  searchBox.setAttribute('placeholder', 'Enter the name of the capital');
  searchBox.focus();
  // add or remove disabled for buttons
  nameBtn.disabled = false;
  capitalBtn.disabled = true;
  // add or remove class 'js-bg'
  nameBtn.classList.toggle('js-bg');
  capitalBtn.classList.toggle('js-bg');

  searchBox.value = '';

  if (document.querySelector('.country-box')) {
    document.querySelector('.country-box').remove();
    return;
  }
  if (document.querySelectorAll('.country-list__item')) {
    document.querySelectorAll('.country-list__item').forEach(element => {
      element.remove();
    });
    return;
  }
});

// section 'Search country by' : add Event listener on button "Name"
nameBtn.addEventListener('click', e => {
  searchBox.setAttribute('placeholder', 'Enter the name of the country');
  searchBox.focus();
  // add or remove disabled for buttons
  nameBtn.disabled = true;
  capitalBtn.disabled = false;
  // add or remove class 'js-bg'
  nameBtn.classList.toggle('js-bg');
  capitalBtn.classList.toggle('js-bg');

  searchBox.value = '';

  if (document.querySelector('.country-box')) {
    document.querySelector('.country-box').remove();
    return;
  }
  if (document.querySelectorAll('.country-list__item')) {
    document.querySelectorAll('.country-list__item').forEach(element => {
      element.remove();
    });
    return;
  }
});

// Function of processing server response to a request
function onInputCountry() {
  const countryName = searchBox.value;

  if (countryName === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }

  // Search country by name
  if (nameBtn.disabled) {
    countryApi
      .fetchCountries(countryName)
      .then(countrys => {
        if (countrys.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
          return;
        }
        if (countrys.length <= 10) {
          const listMarkup = countrys.map(country =>
            countryListTemplate(country)
          );
          countryList.innerHTML = listMarkup.join('');
          countryInfo.innerHTML = '';
          // return not use
        }
        if (countrys.length === 1) {
          const markup = countrys.map(country => countryСardTeemplate(country));
          countryInfo.innerHTML = markup.join('');
          countryList.innerHTML = '';
          return;
        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return error;
      });
  }
  // Search country by capital
  else {
    countryApi
      .fetchCountriesCapital(countryName)
      .then(countrys => {
        if (countrys.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
          return;
        }
        if (countrys.length <= 10) {
          const listMarkup = countrys.map(country =>
            countryListTemplate(country)
          );
          countryList.innerHTML = listMarkup.join('');
          countryInfo.innerHTML = '';
          // return not use
        }
        if (countrys.length === 1) {
          const markup = countrys.map(country => countryСardTeemplate(country));
          countryInfo.innerHTML = markup.join('');
          countryList.innerHTML = '';
          return;
        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return error;
      });
  }
}

// Function for creating card template
function countryСardTeemplate({
  name,
  capital,
  population,
  flags,
  languages,
  currencies,
  area,
  alpha3Code,
  callingCodes,
  topLevelDomain,
}) {
  // Population:  separation of thousandths
  let x = String(population);
  let s = x.split('');
  let index = x.length - 1;
  let w = Math.floor(index / 3);

  for (let i = 1; i <= w; i += 1) {
    index = index - 1 - i;
    s.splice(index, 0, ' ');
    let r = s.join('');
    population = r;
  }

  // Languages:  separating commas with a space
  let lang = Object.values(languages);
  let language = lang.map(lan => `${lan.name}`).join(', ');

  // Currencies:
  let obj = Object.values(currencies);
  let currency = obj.map(current => `${current.name} [ ${current.code} ]`);

  // Area:
  let m = String(area);
  let n = m.split('');
  let ind = n.length - 1;
  let k = Math.floor(ind / 3);

  for (let i = 1; i <= k; i += 1) {
    ind = ind - 1 - i;
    n.splice(ind, 0, ' ');
    let d = n.join('');
    area = d;
  }

  return `
    <div class="country-box">
    <div class="country-info__wrapper">
        <img class="country-info__flags" src="${flags.svg}" alt="${name}" width="50" />
        <h1 class="country-info__name">${name} [ ${alpha3Code} ]</h1>
    </div>
      <ul class="country__list">
      <li class="country__text"><span class="country__text--weight">Area:</span> ${area} km<sup>2<sup></li>
      <li class="country__text"><span class="country__text--weight">Capital:</span> ${capital}</li>
      <li class="country__text"><span class="country__text--weight">Population:</span> ${population}</li>
      <li class="country__text"><span class="country__text--weight">Languages:</span> ${language}</>
      <li class="country__text"><span class="country__text--weight">Currency:</span> ${currency}</li>
      <li class="country__text"><span class="country__text--weight">Phone code:</span> [ +${callingCodes} ]</li>
      <li class="country__text"><span class="country__text--weight">Domain:</span> ${topLevelDomain}</li>
      </ul>
    </div>
  `;
}

// Function for creating card template
function countryListTemplate({ flags, name }) {
  return `
  <li class="country-list__item">
    <img src="${flags.svg}" alt="${name}" width="30" />
    <p class="country-list__name">${name}</p>
  </li>
  `;
}
