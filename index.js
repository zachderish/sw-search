// button element
const charBtn = document.getElementById("char-btn")
// entry element
const input = document.getElementById("input")
// table element
const table = document.getElementById("table")


charBtn.addEventListener("click", function(){
    // clear table on click and reset rowCount
    table.innerText = ""
    rowCount = 0
    
    link = `https://www.swapi.tech/api/films`
    fetch(link)
        .then(res=>res.json())
        .then(data=>getChar(data))
})

// global row tracker
let rowCount = 0

function getChar(data){
    // get movie and create header with movie title
    console.log(input.value)
    const movie = data.result[input.value-1].properties
    console.log(movie)
    let row1 = table.insertRow(rowCount)
    rowCount+=1
    let header = document.createElement("th")
    header.innerHTML = movie.title
    row1.appendChild(header)

    // create table headers for name, birth year and homeworld
    let row2 = table.insertRow(rowCount)
    rowCount+=1
    let nameHeader = document.createElement("th")
    nameHeader.innerHTML = "name"
    row2.appendChild(nameHeader)
    let birthHeader = document.createElement("th")
    birthHeader.innerHTML = "birth year"
    row2.appendChild(birthHeader)
    let homeHeader = document.createElement("th")
    homeHeader.innerHTML = "homeworld"
    row2.appendChild(homeHeader)
    // loop through characters in movie
    for(let i = 0; i < movie.characters.length; i++){
        // promise to SW API
        fetch(movie.characters[i])
            .then(res=>res.json())
            .then(data=>renderChar(data))
    }


}

// render character names, birth year and homeworld in cells
function renderChar(data){
    // insert name
    let char = data.result.properties
    let row = table.insertRow(rowCount)
    let nameData = row.insertCell(0)
    nameData.innerHTML = char.name
    
    // insert birth year
    let birthData = row.insertCell(1)
    birthData.innerHTML = char.birth_year
    rowCount+=1

    // promise to API for homeworld
    fetch(char.homeworld)
        .then(res=>res.json())
        .then(data=>renderHome(row, data))
    
}

// render homeworld from promise
function renderHome(row, data){
    let planet = data.result.properties.name
    let homeData = row.insertCell(2)
    homeData.innerHTML = planet
    
}