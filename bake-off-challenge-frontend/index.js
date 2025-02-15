// your code here!
console.log("🥧");

// Structure to start/general set-up
// make a fetch request, get the data, put it somewhere on the page:

// DOM elements
// Event listeners
// Render helpers
// Initialize


// DOM ELEMENTS
const bakesContainer = document.querySelector("#bakes-container")
// console.log(bakesContainer)
const bakeDetail = document.querySelector("#detail")
// console.log(bakeDetail)
const newBakeForm = document.querySelector("#new-bake-form")
console.log(newBakeForm)


// EVENT LISTENERS
newBakeForm.addEventListener("submit", event => {
    event.preventDefault()
    // console.log(event.target)

    // Get the input values from the form
    // if add id to input => const imageInput = document.querySelector("#image-input")

    // const name = newBakeForm.name.value
    // const image = newBakeForm.image_url.value
    // const description = newBakeForm.description.value

    // console.log(imageInput.value)

    const newBakeObj = {
        name: newBakeForm.name.value,
        image_url: newBakeForm.image_url.value,
        description: newBakeForm.description.value
    }

    fetch('http://localhost:3000/bakes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newBakeObj),
    })
    .then(r => r.json())
    // .then(console.log)
    .then(bakeObj => {
        renderBakeInSidebar(bakeObj)
    })

    // console.log(newBakeObj)
})

// Event delegation approach:
// bakesContainer.addEventListener("click", event => {
    // if (event.target.matches(".item")) {
        // const bakeId = event.target.dataset.id
        // fetch('http://localhost:3000/bakes/${bakeId}')
        // .then(r => r.json())
        // .then(bakeObj => renderBakeDetail(bakeObj))
    // }
// })


// RENDER HELPERS
function renderBakeDetail(bakeObj){
    bakeDetail.innerHTML = `
    <img src="${bakeObj.image_url}" alt="${bakeObj.name}">
    <h1>${bakeObj.name}</h1>
    <p class="description">
        ${bakeObj.description}
    </p>
    <form id="score-form" data-id="${bakeObj.id}">
    <input value="${bakeObj.score}" type="number" name="score" min="0" max="10" step="1">
    <input type="submit" value="Rate">
    </form>
    `

    const scoreForm = document.querySelector("#score-form")
    scoreForm.addEventListener("submit", e => {
        e.preventDefault()
        // console.log(bakeObj)
        // console.log(scoreForm.score.value)
        bakeObj.score = scoreForm.score.value
        console.log("after form submit", bakeObj)
    })
    // scoreForm.removeEventListener()

    // <img src="[bake image]" alt="[bake name]">
    // <h1>[bake name]</h1>
    // <p class="description">
    // [bake description]
    // </p>
    // <form id="score-form" data-id="[bake id]">
    // <input value="[bake score]" type="number" name="score" min="0" max="10" step="1">
    // <input type="submit" value="Rate">
    // </form>

}



function renderBakeInSidebar(bakeObj){
    // console.log(bakeObj)
    // <li class="item" data-id="1">Rahul’s Chocolate-dipped Orange Madeleines</li>
    const bakeLi = document.createElement('li')
    bakeLi.className = "item"
    bakeLi.dataset.id = bakeObj.id
    bakeLi.textContent = bakeObj.name

    // Nested event listener approach(here: inner/callback function creates closure)
    bakeLi.addEventListener("click", () => {
        console.log("on click", bakeObj)
        renderBakeDetail(bakeObj)
    })
    // console.log(bakeLi)
    bakesContainer.append(bakeLi)
}


//INITIALIZE
fetch('http://localhost:3000/bakes')
    .then(r => r.json())
    //.then(data => console.log(data))
    .then(bakesArray => {
        // bakesArray.forEach(renderBakeInSidebar)
        bakesArray.forEach(bakeObj => {
            renderBakeInSidebar(bakeObj)
        })

        renderBakeDetail(bakesArray[0])

    })
