import "./css/styles.css";

import debounce from "lodash.debounce";
import { Notify } from "notiflix";

import { getCountries } from "./src/js/fetch-script";

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
        choseMarkup(data);
      })
      .catch((error) => {
        Notify.failure("Oops, there is no country with that name");
      });
  }

  countryInfoRef.innerHTML = "";
  countryListRef.innerHTML = "";
}

countryListRef.style.listStyle = "none";
countryListRef.style.margin = "0";
countryListRef.style.padding = "10px";
