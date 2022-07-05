let sketchgrid = document.querySelector(".sketchpad");
let slider = document.querySelector(".slider");
let sliderValue = document.querySelector(".sliderValue");
let applyButton = document.querySelector(".applyButton");
let clearButton = document.querySelector(".clearButton");
let hoveredGridfields;



window.onload = loadGrid(slider.value);

function loadGrid(gridSize) {
    sketchgrid.innerHTML = ''
    for (let i = 0; i < (gridSize ** 2); i++) {
        sketchgrid.setAttribute("style", `grid-template-columns: repeat(${gridSize}, 1fr);grid-template-rows: repeat(${gridSize}, 1fr); `)
        let sketchgridfield = document.createElement("div");
        sketchgridfield.classList.add("colorChangeable");
        sketchgridfield.style.border = "1px solid #D4D4D4";
        sketchgridfield.style.backgroundColor = "white";
        sketchgrid.appendChild(sketchgridfield)
    }
    hoveredGridfields = document.querySelectorAll(".colorChangeable");
    enableColoring(hoveredGridfields);
}


sliderValue.textContent = `${slider.value}x${slider.value} Field`
slider.oninput = function () {
    sliderValue.textContent = `${this.value}x${this.value} Field`
}

applyButton.addEventListener("click", () => {
    loadGrid(slider.value)
})

clearButton.addEventListener("click", () => {
    hoveredGridfields.forEach((field) => {
            field.style.backgroundColor = "white";
        })
})


console.log(hoveredGridfields);

function enableColoring(hoveredGridfields) {
    hoveredGridfields.forEach((field) => {
        field.addEventListener("mouseover", (e) => {
            field.style.backgroundColor = "blue";
        })
    })
}