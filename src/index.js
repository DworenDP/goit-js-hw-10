import "./css/styles.css";

import debounce from "lodash.debounce";
import { Notify } from "notiflix";

import { getCountries } from "./js/fetch-script";

const DEBOUNCE_DELAY = 300;

const searchRef = document.querySelector("#search-box");
const countryListRef = document.querySelector("country-list");
const countryInfoRef = document.querySelector("country-info");

searchRef.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  let inputCountry = event.target.value.trim();

  if (inputCountry) {
    return getCountries(inputCountry)
      .then((data) => {
        choiceMarkup(data);
      })
      .catch((error) => {
        Notify.failure("Oops, there is no country with that name");
      });
  }
  console.log(inputCountry);

  countryInfoRef.innerHTML = "";
  countryListRef.innerHTML = "";
}

// countryListRef.style.listStyle = "none";
// countryListRef.style.margin = "0";
// countryListRef.style.padding = "10px";

function choiceMarkup(countryArray) {
  if (countryArray.length === 1) {
    countryListRef.innerHTML = "";
    return markupCountry(countryArray);
  }
  if (countryArray.length >= 2 && countryArray.length <= 10) {
    countryInfoRef.innerHTML = "";
    return markupCountryItem(countryArray);
  }
  return Notify.info(
    "Too many matches found. Please enter a more specific name."
  );
}

function markupCountryItem(data) {
  const markup = data
    .map((element) => {
      return `<li class="country-item">
        <img src="${element.flags.svg}" alt="${element.name.official}" width="50" height="25" />
        <p>${element.name.official}</p>
        </li>`;
    })
    .join("");

  countryListRef.innerHTML = markup;
}

function markupCountry(data) {
  const markup = data
    .map((element) => {
      return `<h1>
        <img src="${element.flags.svg}" alt="${
        element.name.official
      }" width="50" height="25"/>
        ${element.name.official}</h1>
        <ul class="country-info_list">
        <li class="country-info_item">
        <h2>Capital:</h2>
        <p>${element.capital}</p>
        </li>
        <li class="country-info_item">
        <h2>Population:</h2>
        <p>${element.population}</p>
        </li>
        <li class="country-info_item">
        <h2>Languages:</h2>
        <p>${Object.values(element.languages).join(", ")}</p>
        </li>
        </ul>`;
    })
    .join("");

  countryInfoRef.innerHTML = markup;
}
