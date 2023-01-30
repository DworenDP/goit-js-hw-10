import "./css/styles.css";

import debounce from "lodash.debounce";
import { Notify } from "notiflix";

import { getCountries } from "./src/js/fetch-script";

const DEBOUNCE_DELAY = 300;

const searchRef = document.querySelector("#search-box");
const countryListRef = document.querySelector("country-list");
const countryInfoRef = document.querySelector("country-info");

searchRef.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));
