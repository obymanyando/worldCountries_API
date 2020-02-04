// declare all global variables
const flexContainer = document.querySelector('.flex-container')
const totalCountries = document.querySelector('#counterSpan')
const searchByName = document.querySelector('.searchByName')
const searchByCapital = document.querySelector('.searchByCapital')
const searchByPopulation = document.querySelector('.searchByPop')
// const inputField = document.getElementsByName('searchField')
const searchField = document.querySelector('.form__searchField')


// Fetch method to be used in production

// ? fields = name; capital; languages; flag

const url = "https://restcountries.eu/rest/v2/all"
const fetchCountries = (arr) =>
{
    fetch(url)
        .then(response => response.json())
        .then(countries =>
        {
            let countryList = ''
            for (const country of countries) {

                let {
                    name,
                    capital,
                    population,
                    languages,
                    flag
                } = country

                // const langs = []

                // for (const language of languages) {
                //     langs.push(language.name)
                // }

                const langs = languages.map((language) => language.name)

                countryList += `<div>
                                <img src=${flag}>
                                <h3>${name.toUpperCase()}</h3>
                                <p>Capital: ${capital}</p>
                                <p>Languages: ${langs.join(', ')}</p>
                                <p>Population: ${population}</p>
                                </div>`

            }

            flexContainer.innerHTML = countryList
        }
        )

    //total number of countries
    function numOfCountries()
    {
        totalCountries.textContent = country.name.length;
        totalCountries.style.color = 'green'
        totalCountries.style.fontSize = '20px'
    }
    // numOfCountries()
    console.log(totalCountries.value)
}
fetchCountries()

// .toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')






const filterName = () =>
{
    flexContainer.innerHTML = ''
    fetchCountries(countries.reverse())
}

searchByName.addEventListener('click', filterName)

searchByPopulation.addEventListener('click', filterPop =>
{
    const population = countries.filter(country =>
    {
        return country.population;
    });
    console.log(population);
    console.log(searchByPopulation)
})

// window.onload = fetchCountries(countries)