import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

let refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

function onInputCountry() {
  const countryName = refs.searchBox.value;

  if (countryName === '') {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(countrys => {
      if (countrys.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        return;
      }

      if (countrys.length <= 10) {
        const listMarkup = countrys.map(country =>
          countryListTemplate(country)
        );
        refs.countryList.innerHTML = listMarkup.join('');
        refs.countryInfo.innerHTML = '';
      }

      if (countrys.length === 1) {
        const markup = countrys.map(country => countryСardTeemplate(country));
        refs.countryInfo.innerHTML = markup.join('');
        refs.countryList.innerHTML = '';
      }
    })

    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.countryInfo.innerHTML = '';
      refs.countryList.innerHTML = '';
      return error;
    });
}

function countryСardTeemplate({
  flags,
  name,
  capital,
  population,
  languages,
  currencies,
  area,
}) {
  // Population:  Separation of thousandths
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

  // Languages:  Separating commas with a space
  let language = Object.values(languages).join(', ');

  // Currencies:
  let obj = Object.values(currencies);
  let currency = obj.map(current => `${current.name}, [ ${current.symbol} ]`);

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
    <div class="country-info__wrapper">
        <img class="country-info__flags" src="${flags.svg}" alt="${name.official}" width="50" />
        <h1 class="country-info__name">${name.official}</h1>
    </div>
      <ul class="country__list">
      <li class="country__text"><span class="country__text--weight">Capital:</span> ${capital}</li>
      <li class="country__text"><span class="country__text--weight">Population:</span> ${population}</li>
      <li class="country__text"><span class="country__text--weight">Languages:</span> ${language}</>
      <li class="country__text"><span class="country__text--weight">Currency:</span> ${currency}</li>
      <li class="country__text"><span class="country__text--weight">Area:</span> ${area} km<sup>2<sup></li>
      </ul>
  `;
}

function countryListTemplate({ flags, name }) {
  return `
  <li class="country-list__item">
    <img src="${flags.svg}" alt="${name.official}" width="30" />
    <p class="country-list__name">${name.official}</p>
  </li>
  `;
}
