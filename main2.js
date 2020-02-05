// declare all global variables
const flexContainer = document.querySelector('.flex-container')
const numOfCountries = document.querySelector('#counterSpan')
const countryCounter = document.querySelector('.filteredCountries')
const searchByName = document.querySelector('.btn__searchByName')
const searchByCapital = document.querySelector('.btn__searchByCapital')
const searchByPop = document.querySelector('.btn__searchByPop')
const searchField = document.querySelector('.filter__searchField')

const url = "https://restcountries.eu/rest/v2/all?fields=name;capital;languages;flag;population"

fetch(url)
    .then(response => response.json())
    .then(countriesData =>
    {
        /*..... Note to self: this space is too crowded. Globalise all functions possible.... */
        const countries = [...countriesData]
        displayCountries(countries)

        /* Function to filter in real time */
        searchField.addEventListener('input', (e) =>
        {
            searchTerm = searchField.value.toLowerCase()
            countriesList = countries.filter((country) => country.name.toLowerCase().startsWith(searchTerm))
            displayCountries(countriesList)
        })

        /* Function to filter by name */
        const sortByName = (arr) =>
        {
            searchTerm = searchField.value.toLowerCase()
            countriesList = arr.filter((country) => country.name.toLowerCase().startsWith(searchTerm))

            countryCounter.textContent = `The names of countries starting with - ${searchTerm.toUpperCase()} - are: ${countriesList.length}.`
            countryCounter.style.marginBottom = '20px'
            countryCounter.style.color = '#434544'
            countryCounter.style.backgroundColor = '#f2f7f4'
            countryCounter.style.padding = '5px'

            displayCountries(countriesList)

        }

        /* Function to filter by capital city */
        const sortByCapital = () =>
        {
            searchTerm = searchField.value
            countriesList = countries.filter((country) =>
            {
                return country.capital.toLowerCase().startsWith(searchTerm.toLowerCase())
            })
            displayCountries(countriesList)

            countryCounter.textContent = `The number of capital cities starting with - ${searchTerm.toUpperCase()} - is: ${countriesList.length}.`
            countryCounter.style.marginBottom = '20px'
            countryCounter.style.color = '#434544'
            countryCounter.style.backgroundColor = '#f2f7f4'
            countryCounter.style.padding = '5px'
        }

        /* Function to sort by population */
        function sortByPop()
        {
            countries.sort(function sorter(a, b)
            {
                return b.population - a.population;
            });
            displayCountries(countries);
        }

        /* event listeners */
        // element.addEventListener('click', (e) => {})

        searchByName.addEventListener('click', (e) =>
        {
            sortByName(countries)
        })
        searchByCapital.addEventListener('click', sortByCapital)

        searchByPop.addEventListener('click', (e) =>
        {
            const sortedStuff = sortByPop
            sortedStuff(countries)
        })
    })

/* Function to build HTML */

const displayCountries = (countries) =>
{
    flexContainer.innerHTML = ''
    /* iterate through object */
    for (const country of countries) {

        /* build html elements */
        let block = document.createElement('div')
        let flag = document.createElement('img')
        let name = document.createElement('h1')
        let capital = document.createElement('p')
        let population = document.createElement('p')

        /* add text content/ innerHTML to elements */
        flag.src = country.flag
        name.textContent = country.name
        capital.textContent = `Capital: ${country.capital}`
        population.textContent = `Population: ${country.population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`

        /* append all elements */
        block.appendChild(flag)
        block.appendChild(name)
        block.appendChild(capital)
        block.appendChild(population)
        flexContainer.appendChild(block)

        /* attributes for styling */
        flag.className = 'country__flag'
        capital.className = 'country__capital'
        block.className = 'country__block'
        population.className = 'country__pop'
    }
    console.log('Country count: ' + countries.length)

    /* display total number of countries */
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





