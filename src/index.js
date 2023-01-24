// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const inputEl = document.querySelector('#search-box');
inputEl.addEventListener('input', debounce(handleInputEl, 300))

function handleInputEl(event) {
    if (event.target.value.trim() === '') {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return 
    }
    fetchCountries(event.target.value.trim())
    .then(response => {
            if (!response.ok) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                throw new Error(response.statusText);
                
            }
            return response.json();
        })
        .then(data => { console.log(data)
            if (data.length === 1) {

            const markup = data.map(
                (country) => {
                  return  `<img class="flag" src="${country.flags.svg}" alt="" />
          <p class="country-name">${country.name.official}</p>
          <p class="capital">${country.capital}</p>
          <p class="population">${country.population}</p>
          <p class="languages">${Object.values(country.languages)}</p>`
                })
                .join('')
            countryInfo.innerHTML = markup;
            countryList.innerHTML = '';
                
            } else if (data.length >= 2 && data.length < 10) {
                const markup = data.map(
                    (country) => {
                   return `<li>
          <img class="flag" src="${country.flags.svg}" alt="" />
          <p class="country-name">${country.name.official}</p> 
                    </li>`
                })
                .join('')
            countryInfo.innerHTML = '';
            countryList.innerHTML = markup;
                
            } else if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

                const info = document.querySelector('.country-info');
                info.innerHTML = '';

                 const ul = document.querySelector('.country-list');
                ul.innerHTML = '';
            } else {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                countryInfo.innerHTML = '';
                countryList.innerHTML = '';
        }
            
        })
        .catch(error => console.log(error))
    
}




    