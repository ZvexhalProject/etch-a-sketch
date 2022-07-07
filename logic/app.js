let sketchGrid = document.querySelector(".sketchpad");
let slider = document.querySelector(".slider");
let sliderValue = document.querySelector(".sliderValue");
let applyButton = document.querySelector(".applyButton");
let clearButton = document.querySelector(".clearButton");
let theInput = document.getElementById("kb_selected_color");
let colorCircle = document.querySelector(".colorCircle");
let applyDarkeningColorButton = document.querySelector(".applyDarkeningColorButton");
let applyDarkeningWhiteButton = document.querySelector(".applyDarkeningWhiteButton");
let applyRandomColorButton = document.querySelector(".applyRandomColorButton");
let slideContainer = document.querySelector(".slideContainer")



let rainbowColor = false;
let darkeningColor = false;
let darkeningWhite = false;
let theColor = theInput.value;
let hoveredGridfields;
let mouseclickInField = false;
let penColor = "#0000FF";
colorCircle.style.backgroundColor = penColor;



window.onload = loadGrid(slider.value);

function loadGrid(gridSize) {
    sketchGrid.innerHTML = ''
    for (let i = 0; i < (gridSize ** 2); i++) {
        sketchGrid.setAttribute("style", `grid-template-columns: repeat(${gridSize}, 1fr);grid-template-rows: repeat(${gridSize}, 1fr); `)
        let sketchGridField = document.createElement("div");
        sketchGridField.classList.add("colorChangeable");
        sketchGridField.style.border = "1px solid #D4D4D4";
        sketchGridField.style.backgroundColor = "#FFFFFF";
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

slideContainer.addEventListener("click", () => {
    (darkeningColor) ? applyDarkeningColorButton.style.borderColor = "red": applyDarkeningColorButton.style.borderColor = "black";
    (darkeningWhite) ? applyDarkeningWhiteButton.style.borderColor = "red": applyDarkeningWhiteButton.style.borderColor = "black";
    (rainbowColor) ? applyRandomColorButton.style.borderColor = "red": applyRandomColorButton.style.borderColor ="black";

})

clearButton.addEventListener("click", () => {
    darkeningWhite = false;
    darkeningColor = false;
    rainbowColor=false;
    hoveredGridfields.forEach((field) => {
        field.style.backgroundColor = "rgb(255, 255, 255)";
    })
})

applyDarkeningColorButton.addEventListener("click", () => {
    darkeningColor = !darkeningColor;
    darkeningWhite = false;
    rainbowColor = false;
})

applyDarkeningWhiteButton.addEventListener("click", () => {
    darkeningWhite = !darkeningWhite;
    darkeningColor = false;
    rainbowColor = false;
})

applyRandomColorButton.addEventListener("click", () => {
    rainbowColor = !rainbowColor;
    darkeningWhite = false;
    darkeningColor = false;
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
        (mouseclickInField) ? field.addEventListener("mouseover", eventHandler): field.removeEventListener("mouseover", eventHandler);
    })
}

theInput.addEventListener("input", function () {
    document.getElementById("hex").textContent = theInput.value.toUpperCase();
    penColor = theInput.value;
    colorCircle.style.backgroundColor = penColor;
    applyDarkeningColorButton.style.background = `linear-gradient(90deg, ${penColor} 0%, #000000 80%)`


}, false);


function eventHandler(e) {
    (darkeningColor && e.target.style.backgroundColor != "rgb(255, 255, 255)") ? (e.target.style.backgroundColor = `${shadeColor(e.target.style.backgroundColor)}`) : (darkeningWhite) ? (e.target.style.backgroundColor = `${shadeColor(e.target.style.backgroundColor)}`) : (rainbowColor)? (e.target.style.backgroundColor = makeRandomColor()):(!darkeningColor && !darkeningWhite && !rainbowColor) ? e.target.style.backgroundColor = penColor: "";
}


function shadeColor(color) {
    let colorToBeShaded = hexToRGBArray(color)
    let R = (parseInt(colorToBeShaded[0] - 26) <= 0 ? 0 : parseInt(colorToBeShaded[0] - 26));
    let G = (parseInt(colorToBeShaded[1] - 26) <= 0 ? 0 : parseInt(colorToBeShaded[1] - 26));
    let B = (parseInt(colorToBeShaded[2] - 26) <= 0 ? 0 : parseInt(colorToBeShaded[2] - 26));

    return RGBToHex(`rgb(${R}, ${G}, ${B})`);
}

function hexToRGBArray(hex) {
    rgbArray = hex.substring(4, hex.length - 1)
        .replace(/ /g, '')
        .split(',');

    return (rgbArray);
}

function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    return "#" + r + g + b;
}

function makeRandomColor() {
    var c = '';
    while (c.length < 6) {
        c += (Math.random()).toString(16).substr(-6).substr(-1)
    }
    return '#' + c;
}