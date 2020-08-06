
var tessellationWidth;
var tessellationHeigth;
var tessellationContext;
var tessellationSites = [];
var tessellationVoronoi;
var canvasToSave;

function drawforSave() {
    let tessellationDiagram = tessellationVoronoi(tessellationSites),
        tessellationPolygons = tessellationDiagram.polygons();

    tessellationContext.clearRect(0, 0, canvasToSave.width, canvasToSave.height);

    tessellationContext.beginPath();
    for (let i = 0, n = tessellationPolygons.length; i < n; ++i) drawCell(tessellationPolygons[i], tessellationContext);
    tessellationContext.strokeStyle = "#000";
    tessellationContext.stroke();
}

//infiniteeeeeee----------------------------------------------------------------------------------------------
//canvas size 500 x 500
//points in the sites list
//TODOS:

//flip points
//save png

function calculateMirroredPoints() {
    tessellationSites = [];
    for (let i = 0; i < sites.length; i++) {
        tessellationSites.push(sites[i]);
        tessellationSites.push([sites[i][0], canvasToSave.height - sites[i][1]]);
        tessellationSites.push([canvasToSave.width - sites[i][0], sites[i][1]]);
        tessellationSites.push([canvasToSave.width - sites[i][0], canvasToSave.height - sites[i][1]]);
    }
}


function initialise() {
    tessellationWidth = document.getElementById('tWidth').value;
    tessellationHeigth = document.getElementById('tHeight').value;

    let tessellationConteiner = document.getElementById('pictureContainer');
    if (document.getElementById('picture') == null) {
    
}
    let pDiv = document.createElement('div');
    pDiv.id = 'picture';

    //declare and initialise canvas
    canvasToSave = document.createElement('canvas');
    canvasToSave.id = "tessellationCanvas"
    canvasToSave.width = 500 * tessellationWidth;
    canvasToSave.height = 500 * tessellationHeigth;
    pDiv.appendChild(canvasToSave);
    tessellationConteiner.appendChild(pDiv);

    //make new canvas with all the points
    var tessellationCanvas = document.getElementById("tessellationCanvas");
    tessellationContext = tessellationCanvas.getContext("2d");


    //starting points
    //initialise tessellation sites
    calculateMirroredPoints();

    tessellationVoronoi = d3.voronoi()
        .extent([[-1, -1], [canvasToSave.width+1, canvasToSave.height+1]]);

}

// this function needs refactor!
function makeInfiniteTessellation() {
    initialise()
    //redraw(0, tessellationSites, tessellationVoronoi, tessellationContext);
    drawforSave();
}


function makeTessellation() {
    document.getElementById('pictureContainer').textContent = '';
    drawforSave();
    let pDiv = document.createElement('div');
    pDiv.id = 'picture';

    let innerImg1 = document.createElement('img');
    innerImg1.id = 'theimager';

    let innerImg2 = document.createElement('img');
    innerImg2.id = 'theimagel';

    let innerImg3 = document.createElement('img');
    innerImg3.id = 'theimagebr';

    let innerImg4 = document.createElement('img');
    innerImg4.id = 'theimagebl';

    pDiv.appendChild(innerImg1);
    pDiv.appendChild(innerImg2);
    pDiv.appendChild(innerImg3);
    pDiv.appendChild(innerImg4);
    document.getElementById('pictureContainer').appendChild(pDiv);


    //convert pictures
    let canvas = document.getElementById("canvas");
    document.getElementById("theimager").src = canvas.toDataURL();
    document.getElementById("theimagel").src = canvas.toDataURL();
    document.getElementById("theimagebr").src = canvas.toDataURL();
    document.getElementById("theimagebl").src = canvas.toDataURL();
    redraw(0);
    flipImages();
}

function flipImages() {
    //l
    document.getElementById('theimagel').style.webkitTransform = "scaleX(-1)";
    document.getElementById('theimagel').style.transform = "scaleX(-1)";
    //br
    document.getElementById('theimagebr').style.webkitTransform = "scaleY(-1)";
    document.getElementById('theimagebr').style.transform = "scaleY(-1)";
    //bl
    document.getElementById('theimagebl').style.transform = "rotateX(180deg) rotateY(180deg)";
};