/// test requestAnimationFrame
//var footprint = 42;
//var footer = document.querySelector(".footer");
//window.requestAnimationFrame((timestamp) => {
//    footprint = timestamp;
//    footer.innerText = footprint;
//});

//document.addEventListener("keydown", function (event) {
//    header = document.getElementsByClassName("header")[0];
//    header.innerText = event.key;
//});

/// remove after move
//var rows = document.querySelectorAll(".grid-row");
//var cells = rows[0].querySelector(".grid-cell");
//cells.addEventListener("animationend", (event) => {
//    event.target.remove();
//});

window.requestAnimationFrame(() => {
    var rows = document.querySelectorAll(".grid-row");
    var cell = rows[0].querySelectorAll(".grid-cell")[0];
    var tile = document.createElement("div");
    var classlist = "tile";
    tile.setAttribute("class", classlist);
    //tile.style.animation = "move-right-3 300ms ease 100ms";
    //tile.style.animationFillMode = "forwards";
    tile.textContent = "2";
    cell.appendChild(tile);

    window.requestAnimationFrame(() => {
        classlist += " tile-0-3";
        tile.setAttribute("class", classlist);
    });
    //    cell = rows[0].querySelectorAll(".grid-cell")[2];
    //    tile = document.createElement("div");
    //    tile.setAttribute("class", classlist);
    //    tile.style.animation = "move-right-1 300ms ease 100ms";
    //    tile.style.animationFillMode = "forwards";
    //    tile.textContent = "2";
    //    cell.appendChild(tile);
    //
    //    window.requestAnimationFrame(() => {
    //        cell = rows[0].querySelectorAll(".grid-cell")[3];
    //        tile = document.createElement("div");
    //        tile.setAttribute("class", classlist);
    //        tile.style.animation = "pop 300ms ease 100ms";
    //        tile.style.background = "#0aabcd";
    //        tile.textContent = "4";
    //        cell.appendChild(tile);
    //    });
});
