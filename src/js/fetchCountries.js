export class CountryAPI {
  #BASE_URL = 'https://restcountries.com/v3.1/';
  #params = `?fields=name,capital,population,flags,languages,currencies,area,cca3`;

  //? Function to search for a country by the name
  fetchCountries(name) {
    return fetch(`${this.#BASE_URL}name/${name}${this.#params}`).then(
      response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
  }

  //? Function to search for a country by the name of the capital
  fetchCountriesCapital(capital) {
    return fetch(`${this.#BASE_URL}capital/${capital}${this.#params}`).then(
      response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      }
    );
  }
}
