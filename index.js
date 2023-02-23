// button element
const charBtn = document.getElementById("char-btn")
// table element
const table = document.getElementById("table")
// films drop down element
let films = document.getElementById("films")
// character qualities drop down element
let charQualDrop = document.getElementById("char-qual")
// character quality input
let charQualInput = document.getElementById("input1")


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
    console.log(films.value)
    const movie = data.result[films.value-1].properties
    console.log(movie)
    let row1 = table.insertRow(rowCount)
    rowCount+=1
    let header = document.createElement("th")
    header.innerHTML = movie.title
    row1.appendChild(header)

    // create table headers for selected character quality
    let row2 = table.insertRow(rowCount)
    rowCount+=1
    
    let nameHeader = document.createElement("th")
    nameHeader.innerHTML = "name"
    row2.appendChild(nameHeader)

    // if birth year selected, create header
    if(charQualDrop.value=="birth-year"){
        let birthHeader = document.createElement("th")
        birthHeader.innerHTML = "birth year"
        row2.appendChild(birthHeader)
    }

    // if bair selected, create header
    else if(charQualDrop.value=="hair-color"){
        let hairHeader = document.createElement("th")
        hairHeader.innerHTML = "hair color"
        row2.appendChild(hairHeader)
    }

    // if skin color selected, create header
    else{
        let skinHeader = document.createElement("th")
        skinHeader.innerHTML = "skin color"
        row2.appendChild(skinHeader)
    }

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
    let char = data.result.properties
    // insert name
    let hit = false
    let text = ""
    // check for birth year
    if(charQualDrop.value=="birth-year" && char.birth_year==charQualInput.value){
        hit=true
        text=charQualInput.value
    }
    // check for hair color
    else if(charQualDrop.value=="hair-color" && char.hair_color==charQualInput.value){
        hit=true
        text=charQualInput.value
    }
    // check for skin color
    else if(charQualDrop.value=="skin-color" && char.skin_color==charQualInput.value){
        hit=true
        text=charQualInput.value
    }
    // if the value for a characteristic was found, insert given characteristic
    if(hit == true){
        let row = table.insertRow(rowCount)
        let nameData = row.insertCell(0)
        nameData.innerHTML = char.name
        let data = row.insertCell(1)
        data.innerHTML = text
        rowCount+=1
    }
    // promise to API for homeworld
    /*fetch(char.homeworld)
        .then(res=>res.json())
        .then(data=>renderHome(row, data))*/

    
}

// render homeworld from promise
function renderHome(row, data){
    let planet = data.result.properties.name
    let homeData = row.insertCell(4)
    homeData.innerHTML = planet
    
}