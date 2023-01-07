// Function to search for a country by the name

export function fetchCountries(name) {
  const url = 'https://restcountries.com/v3.1/name/';

  const params =
    '?fields=name,capital,population,flags,languages,currencies,area,cca3';

  return fetch(`${url}${name}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// Function to search for a country by the name of the capital

export function fetchCountriesCapital(capital) {
  const url = 'https://restcountries.com/v3.1/capital/';

  const params =
    '?fields=name,capital,population,flags,languages,currencies,area,cca3';

  return fetch(`${url}${capital}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
