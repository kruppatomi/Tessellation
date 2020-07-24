var isSelect = false;
var isGrab = false;
var isAdd = false;
var isDelete = false;

var newPointWasAdded = false;

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 83) {
        if (isSelect) {
            isSelect = false;

            context.beginPath();
            for (let i = 0, n = sites.length; i < n; ++i) drawSite(sites[i]);
            context.fillStyle = "#000";
            context.fill();
            context.strokeStyle = "#fff";
            context.stroke();
        }
        else {
            isSelect = true;
        }
    }
    else if (event.keyCode == 71) {
        if (isGrab) {
            isGrab = false;
        }
        else {
            isGrab = true;
        }
    }
    else if (event.keyCode == 65) {
        if (isAdd) {
            isAdd = false;
            newPointWasAdded = false;
        }
        else {
            isAdd = true;
        }
    }
    else if (event.keyCode == 68) {
        isDelete = true;
    }
});