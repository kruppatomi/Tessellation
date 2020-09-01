var tessellationWidth;
var tessellationHeight;
var tessellationContext;
var tessellationSites = [];
var tessellationVoronoi;
var canvasToSave;
var tessellationCanvas

function drawforSave() {
    let tessellationDiagram = tessellationVoronoi(tessellationSites),
        tessellationPolygons = tessellationDiagram.polygons();

    tessellationContext.clearRect(0, 0, canvasToSave.width, canvasToSave.height);

    tessellationContext.beginPath();
    for (let i = 0, n = tessellationPolygons.length; i < n; ++i) drawCell(tessellationPolygons[i], tessellationContext);
    tessellationContext.strokeStyle = "#000";
    tessellationContext.stroke();
}

function calculateMirroredPoints() {

    let bf;
    let jf;
    let ba;
    let ja;

    if (tessellationWidth % 2 == 0 && tessellationHeight % 2 == 0) {
        bf = (tessellationWidth / 2) * (tessellationHeight / 2);
        jf = bf;
        ba = bf;
        ja = bf;

    }
    if (tessellationWidth % 2 != 0 && tessellationHeight % 2 == 0) {
        bf = ((Math.floor(tessellationWidth / 2) + 1) * tessellationHeight / 2);
        jf = (Math.floor(tessellationWidth / 2) * tessellationHeight / 2);
        ba = ((Math.floor(tessellationWidth / 2) + 1) * tessellationHeight / 2);
        ja = ((Math.floor(tessellationWidth / 2)) * tessellationHeight / 2);
    }
    if (tessellationWidth % 2 != 0 && tessellationHeight % 2 != 0) {
        bf = ((Math.floor(tessellationWidth / 2) + 1) * (Math.floor(tessellationHeight / 2) + 1));
        jf = (Math.floor(tessellationWidth / 2) * (Math.floor(tessellationHeight / 2) + 1));
        ba = ((Math.floor(tessellationWidth / 2) + 1) * (Math.floor(tessellationHeight / 2)));
        ja = (Math.floor(tessellationWidth / 2) * (Math.floor(tessellationHeight / 2)));
    }
    if (tessellationWidth % 2 == 0 && tessellationHeight % 2 != 0) {
        bf = (tessellationWidth / 2) * (Math.floor(tessellationHeight / 2) + 1);
        jf = (tessellationWidth / 2) * (Math.floor(tessellationHeight / 2) + 1);
        ba = (tessellationWidth / 2) * (Math.floor(tessellationHeight / 2));
        ja = (tessellationWidth / 2) * (Math.floor(tessellationHeight / 2));
    }

    let bfRows;
    let jfRows;
    let baRows;
    let jaRows;

    //set rows number
    if(tessellationHeight %2 == 0){
        bfRows = tessellationHeight/2;
        jfRows = bfRows;
        baRows = bfRows;
        jaRows = bfRows;
    }
    if(tessellationHeight %2 != 0){
        bfRows = Math.floor(tessellationHeight/2)+1;
        jfRows = bfRows;
        baRows = Math.floor(tessellationHeight/2);
        jaRows = baRows;
    }

    let bfppr = bf/bfRows;
    let jfppr = jf/jfRows;
    let bappr = ba/baRows;
    let jappr = ja/jaRows;

    tessellationSites = [];

    calculateVoronoiPointsPlace(bf, bfppr, "bf");
    calculateVoronoiPointsPlace(jf, jfppr, "jf");
    calculateVoronoiPointsPlace(ba, bappr, "ba");
    calculateVoronoiPointsPlace(ja, jappr, "ja");
}

function calculateVoronoiPointsPlace(picturePart, ppr, name){
    let rCounter = 0;
    let cCounter = 1;
    for (let i = picturePart; i > 0; i--) {
        if(i%ppr == 0){ rCounter++ }
        if(cCounter%(ppr+1) == 0){ cCounter = 1;}
        for (let j = 0; j < sites.length; j++) {
            if(name == "ja"){tessellationSites.push([500 * (cCounter*2) - sites[j][0], (500 * (rCounter*2) - sites[j][1])]);}
            if(name == "ba"){tessellationSites.push([1000 * (cCounter-1) + sites[j][0], (500 * (rCounter*2) - sites[j][1])]);}
            if(name == "jf"){tessellationSites.push([500 * (cCounter*2) - sites[j][0], sites[j][1] + 1000*(rCounter-1)]);}
            if(name == "bf"){tessellationSites.push([1000 * (cCounter-1) + sites[j][0], sites[j][1]  + 1000*(rCounter-1)]);}
        }
        cCounter++;
    }
}

function initialise() {
    if(document.getElementById("picture")){
        var elem = document.getElementById("picture");
        elem.parentElement.removeChild(elem);
    }
    
    tessellationWidth = document.getElementById('tWidth').value;
    tessellationHeight = document.getElementById('tHeight').value;

    let tessellationConteiner = document.getElementById('pictureContainer');
    if (document.getElementById('picture') == null) {

    }
    let pDiv = document.createElement('div');
    pDiv.id = 'picture';
    //declare and initialise canvas
    canvasToSave = document.createElement('canvas');
    canvasToSave.id = "tessellationCanvas"
    canvasToSave.width = 500 * tessellationWidth;
    canvasToSave.height = 500 * tessellationHeight;
    pDiv.appendChild(canvasToSave);
    tessellationConteiner.appendChild(pDiv);
    //make new canvas with all the points
    tessellationCanvas = document.getElementById("tessellationCanvas");
    tessellationContext = tessellationCanvas.getContext("2d");
    //starting points
    //initialise tessellation sites
    calculateMirroredPoints();

    tessellationVoronoi = d3.voronoi()
        .extent([[-1, -1], [canvasToSave.width + 1, canvasToSave.height + 1]]);
}

function makeInfiniteTessellation() {
    initialise();
    drawforSave();
    addDownloadOption();
}

function addDownloadOption(){
    let tessellationConteiner = document.getElementById('pictureContainer');
    let dForm = document.createElement("form");
    dForm.id = "download-form"
    tessellationConteiner.appendChild(dForm);

    let fileName = document.createElement("input");
    fileName.placeholder = "enter your filename";
    fileName.setAttribute("required", "");
    fileName.id = "fileName";
    document.getElementById("download-form").appendChild(fileName);
    
    let dButton = document.createElement("input");
    dButton.id = "dButton";
    dButton.value = "Download";
    dButton.type = "submit";
    document.getElementById("download-form").appendChild(dButton);
    
    downloadPicture();
}


function downloadPicture(){
    document.getElementById("dButton").onclick = function(){
        // const a = document.createElement("a");
        // document.body.appendChild(a);
        // a.href = tessellationCanvas.toDataURL();
        // a.download = document.getElementById("fileName").value + ".png";
        // a.click();
        // document.body.removeChild(a);
    };
}
