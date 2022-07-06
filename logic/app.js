let sketchGrid = document.querySelector(".sketchpad");
let slider = document.querySelector(".slider");
let sliderValue = document.querySelector(".sliderValue");
let applyButton = document.querySelector(".applyButton");
let clearButton = document.querySelector(".clearButton");
let theInput = document.getElementById("kb_selected_color");
let colorCircle=document.querySelector(".colorCircle");
let theColor = theInput.value;
let hoveredGridfields;
let mouseclickInField = false;
let penColor = "blue";
colorCircle.style.backgroundColor=penColor;


window.onload = loadGrid(slider.value);

function loadGrid(gridSize) {
    sketchGrid.innerHTML = ''
    for (let i = 0; i < (gridSize ** 2); i++) {
        sketchGrid.setAttribute("style", `grid-template-columns: repeat(${gridSize}, 1fr);grid-template-rows: repeat(${gridSize}, 1fr); `)
        let sketchGridField = document.createElement("div");
        sketchGridField.classList.add("colorChangeable");
        sketchGridField.style.border = "1px solid #D4D4D4";
        sketchGridField.style.backgroundColor = "white";
        sketchGrid.appendChild(sketchGridField)
    }
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

hoveredGridfields = document.querySelectorAll(".colorChangeable");

sketchGrid.addEventListener("click", () => {
    mouseclickInField = !mouseclickInField;
    enableColoring(hoveredGridfields, mouseclickInField);
    console.log("Status " + mouseclickInField)
});



function enableColoring(hoveredGridfields, mouseclickInField) {
    console.log(mouseclickInField)
    hoveredGridfields.forEach((field) => {
        if (mouseclickInField) {
            field.addEventListener("mouseover", eventHandler)
        } else {
            field.removeEventListener("mouseover", eventHandler)
        }

    })
}

// Farbe aus ColorPicker auslesen

theInput.addEventListener("input", function () {
    document.getElementById("hex").innerHTML = theInput.value;
    penColor = theInput.value;
    colorCircle.style.backgroundColor=penColor;
}, false);


function eventHandler(e) {
    e.target.style.backgroundColor = penColor;
}





/**https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors */