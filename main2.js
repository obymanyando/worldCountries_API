// declare all global variables
const flexContainer = document.querySelector('.flex-container')
const numOfCountries = document.querySelector('#counterSpan')
const countryCounter = document.querySelector('.filteredCountries')
const searchByName = document.querySelector('.btn__searchByName')
const searchByCapital = document.querySelector('.btn__searchByCapital')
const searchByPop = document.querySelector('.btn__searchByPop')
const searchField = document.querySelector('.filter__searchField')

// Fetch method to be used in production



const url = "https://restcountries.eu/rest/v2/all?fields=name;capital;languages;flag"

fetch(url)
    .then(response => response.json())
    .then(countriesData =>
    {
        /*..... Note to self: this space is too crowded. Globalise all functions possible.... */
        const countries = [...countriesData]
        countryBuilder(countries)

        searchField.addEventListener('input', (e) =>
        {
            searchTerm = searchField.value
            countriesList = countries.filter((country) =>
            {
                return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            })
            countryBuilder(countriesList)
            console.log(countriesList)
        })

        const sortByName = () =>
        {
            searchTerm = searchField.value
            countriesList = countries.filter((country) =>
            {
                return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            })

            countryCounter.textContent = `The names of countries starting with - ${searchTerm.toUpperCase()} - are: ${countriesList.length}.`
            countryCounter.style.marginBottom = '20px'
            countryCounter.style.color = '#434544'
            countryCounter.style.backgroundColor = '#f2f7f4'
            countryCounter.style.padding = '5px'

            countryBuilder(countriesList.reverse())

        }

        const sortByCapital = () =>
        {
            searchTerm = searchField.value
            countriesList = countries.filter((country) =>
            {
                return country.capital.toLowerCase().startsWith(searchTerm.toLowerCase())
            })
            countryBuilder(countriesList)


            countryCounter.textContent = `The number of capital cities starting with - ${searchTerm.toUpperCase()} - is: ${countriesList.length}.`
            countryCounter.style.marginBottom = '20px'
            countryCounter.style.color = '#434544'
            countryCounter.style.backgroundColor = '#f2f7f4'
            countryCounter.style.padding = '5px'
        }

        const sortByPop = () =>
        {
            countriesList = countries.filter((country) =>
            {
                return country.population
            })
            countryBuilder(countriesList)
        }


        searchByName.addEventListener('click', sortByName)
        searchByCapital.addEventListener('click', sortByCapital)
        searchByPop.addEventListener('click', sortByPop)
    })

/* Function to build HTML */

countryBuilder = (countries) =>
{
    flexContainer.innerHTML = ''

    for (const country of countries) {
        let block = document.createElement('div')
        let flag = document.createElement('img')
        let name = document.createElement('h1')
        let capital = document.createElement('p')
        let population = document.createElement('p')

        flag.src = country.flag
        name.textContent = country.name
        capital.textContent = `Capital: ${country.capital}`
        population.textContent = `Population: ${country.population}`

        block.appendChild(flag)
        block.appendChild(name)
        block.appendChild(capital)
        block.appendChild(population)
        flexContainer.appendChild(block)


        flag.className = 'country__flag'
        capital.className = 'country__capital'
        block.className = 'country__block'
        population.className = 'country__pop'
    }

    // display total number of countries
    const totalCountries = (countries) =>
    {
        numOfCountries.textContent = countries.length;
        numOfCountries.style.color = 'green'
        numOfCountries.style.backgroundColor = 'whitesmoke'
        numOfCountries.style.margin = '2px'
        numOfCountries.style.padding = '1px'
    }
    totalCountries(countries)


}



