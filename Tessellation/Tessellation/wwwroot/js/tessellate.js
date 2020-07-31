




let tessellationWidth = document.getElementById('tWidth').value;
let tessellationHeigth = document.getElementById('tHeight').value;

function drawforSave() {
    let diagram = voronoi(sites),
        polygons = diagram.polygons();

    context.clearRect(0, 0, width, height);

    context.beginPath();
    for (let i = 0, n = polygons.length; i < n; ++i) drawCell(polygons[i]);
    context.strokeStyle = "#000";
    context.stroke();
}

//infiniteeeeeee----------------------------------------------------------------------------------------------
//canvas size 500 x 500
//points in the sites list
//TODOS:

//flip points
//save png

// this function needs refactor!
function makeInfiniteTessellation() {
    let tessellationWidth = document.getElementById('tWidth').value;
    let tessellationHeigth = document.getElementById('tHeight').value;

    let tessellationConteiner = document.getElementById('pictureContainer');
    //drawforSave();
    let pDiv = document.createElement('div');
    pDiv.id = 'picture';

    let canvasToSave = document.createElement('canvas');
    canvasToSave.id = "tessellationCanvas"
    canvasToSave.width = 500 * tessellationWidth;
    canvasToSave.height = 500 * tessellationHeigth;
    pDiv.appendChild(canvasToSave);
    tessellationConteiner.appendChild(pDiv);

    //make new canvas with all the points
    var tessellationCanvas = d3.select("tessellationCanvas").on("touchmove mousemove", mouseMoved).node(),
        tessellationContext = tessellationCanvas.getContext("2d");
        tessellationWidth1 = canvasToSave.width,
        tessellationHeight1 = canvasToSave.height;

    //starting points
    var tessellationSites = [[100, 100], [200, 200], [200, 100], [300, 200]];

    var tessellationVoronoi = d3.voronoi()
        .extent([[-1, -1], [tessellationWidth1 + 1, tessellationHeight1 + 1]]);

    redraw(0, tessellationSites, tessellationVoronoi, tessellationContext);



    //for (let i = 0; i < tessellationWidth * tessellationHeigth; i++) {
    //    let canvas = document.getElementById("canvas");
    //    let innerImg = document.createElement('img');
    //    innerImg.id = 'theimage' + i;
    //    innerImg.src = canvas.toDataURL();
    //    pDiv.appendChild(innerImg);
    //}
    ////// from-
    ////let imagesToFlipdownFrom
    ////// -to
    ////let imagesToFlipdownTo


    //document.getElementById('pictureContainer').appendChild(pDiv);


    ////convert pictures
    ////document.getElementById("theimagel").src = canvas.toDataURL();
    ////document.getElementById("theimagebr").src = canvas.toDataURL();
    ////document.getElementById("theimagebl").src = canvas.toDataURL();
    ////redraw(0);
    ////flipImages();
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