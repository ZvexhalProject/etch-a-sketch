let sketchGrid = document.querySelector(".sketchpad");
let slider = document.querySelector(".slider");
let sliderValue = document.querySelector(".sliderValue");
let applyButton = document.querySelector(".applyButton");
let clearButton = document.querySelector(".clearButton");
let theInput = document.getElementById("kb_selected_color");
let colorCircle = document.querySelector(".colorCircle");
let darkening = true;
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
    colorCircle.style.backgroundColor = penColor;
}, false);


function eventHandler(e) {
    if (!(e.target.style.backgroundColor == "white") && darkening) {
      e.target.style.backgroundColor=`${shadeColor(e.target.style.backgroundColor)}`;
       
    } else {
        e.target.style.backgroundColor = penColor
    }

}


function shadeColor(color) {
    color = color.substring(4, color.length-1)
         .replace(/ /g, '')
         .split(',');
         let R = (parseInt(color[0]-26)<=0?0:parseInt(color[0]-26));
         let G = (parseInt(color[1]-26)<=0?0:parseInt(color[1]-26));
         let B = (parseInt(color[2]-26)<=0?0:parseInt(color[2]-26));
    return RGBToHex(`rgb(${R}, ${G}, ${B})`);
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


