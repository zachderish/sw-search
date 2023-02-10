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
    // get movie and create header with title
    console.log(input.value)
    const movie = data.result[input.value-1].properties
    console.log(movie)
    let row1 = table.insertRow(rowCount)
    rowCount+=1
    let header = document.createElement("th")
    header.innerHTML = movie.title
    row1.appendChild(header)

    // get movie characters
    let row2 = table.insertRow(rowCount)
    rowCount+=1
    let nameHeader = document.createElement("th")
    nameHeader.innerHTML = "name"
    row2.appendChild(nameHeader)
    let speciesHeader = document.createElement("th")
    speciesHeader.innerHTML = "species"
    row2.appendChild(speciesHeader)
    for(let i = 0; i < movie.characters.length; i++){
        fetch(movie.characters[i])
            .then(res=>res.json())
            .then(data=>renderChar(data))
    }


}

function renderChar(data){
    let char = data.result.properties
    let row = table.insertRow(rowCount)
    rowCount+=1
    let nameData = document.createElement("td")
    nameData.innerHTML = char.name
    row.appendChild(nameData)
    
}