// declare all global variables
const flexContainer = document.querySelector('.flex-container')
const numOfCountries = document.querySelector('#counterSpan')
const searchByName = document.querySelector('.btn__searchByName')
const searchByCapital = document.querySelector('.btn__searchByCapital')
const searchByPop = document.querySelector('.btn__searchByPop')
const searchField = document.querySelector('.filter__searchField')

// Fetch method to be used in production

// ? fields = name; capital; languages; flag

const url = "https://restcountries.eu/rest/v2/all"

fetch(url)
    .then(response => response.json())
    .then(countryData =>
    {
        const countries = [...countryData]
        countryBuilder(countries)

        const sortByName = () =>
        {
            searchTerm = searchField.value
            countriesList = countries.filter((country) =>
            {
                return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            })
            countryBuilder(countriesList)
        }


        searchByName.addEventListener('click', sortByName)
    })

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
        // block.style.border = '3px solid #e9e9e9'
        // block.style.color = '#5e6161'
    }

    // display total number of countries

    numOfCountries.textContent = countries.length;
    numOfCountries.style.color = 'green'
    numOfCountries.style.backgroundColor = 'whitesmoke'
    numOfCountries.style.margin = '2px'
    numOfCountries.style.padding = '1px'

}



/* function for event listener on FIRST LETTER search button */

            // const sortByName = () =>
            // {
            //     flexContainer.textContent = ''
            //     countries = searchField.value
            //     copiedCountries = countries.filter((country) =>
            //     {
            //         return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            //     })

            // }


            // countryCounter.textContent = `The number of country names starting with - ${searchTerm.toUpperCase()} - is: ${copiedCountries.length}.`
            // countryCounter.style.marginBottom = '20px'
            // countryCounter.style.color = '#434544'
            // countryCounter.style.backgroundColor = '#f2f7f4'





            // searchByName.addEventListener('click', sortByName)

/* event listener for dynamic search on input */




// searchByCapital.addEventListener('click', sortByCapital)
// searchByPop.addEventListener('click', sortByPop)



/* function for event listener on sort button */

// const sortByName = () =>
// {
//     // flexContainer.innerHTML = ''

//     // fetchCountries(country.reverse())

//     console.log(countries.length)

// }



// searchField.addEventListener('input', (e) =>
// {
//     flexContainer.textContent = ''
//     let searchTerm = e.target.value

//     let copiedCountries = countries.filter((country) =>
//     {
//         country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
//     })
//     fetchCountries(copiedCountries)
//     console.log(copiedCountries)
// })