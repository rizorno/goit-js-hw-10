export class CountryAPI {
  #BASE_URL = 'https://restcountries.com/v2/';
  #params = `name,
    capital,
    population,
    flags,
    languages,
    currencies,
    area,
    alpha3Code,
    callingCodes,
    topLevelDomain`;

  //? Function to search for a country by the name
  fetchCountries(nameCountry) {
    return fetch(
      `${this.#BASE_URL}name/${nameCountry}?fullText=${this.#params}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  //? Function to search for a country by the name of the capital
  fetchCountriesCapital(capitalCountry) {
    return fetch(
      `${this.#BASE_URL}capital/${capitalCountry}?fullText=${this.#params}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
