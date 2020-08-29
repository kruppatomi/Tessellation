
var tessellationWidth;
var tessellationHeight;
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


//gagyi --> 2x2 es
//továbbfejleszteni vegtelenre
//function calculateMirroredPoints() {
//    tessellationSites = [];
//    for (let i = 0; i < sites.length; i++) {
//        tessellationSites.push(sites[i]);
//        tessellationSites.push([sites[i][0], canvasToSave.height - sites[i][1]]);
//        tessellationSites.push([canvasToSave.width - sites[i][0], sites[i][1]]);
//        tessellationSites.push([canvasToSave.width - sites[i][0], canvasToSave.height - sites[i][1]]);
//    }
//}

//start again with vscode
function calculateMirroredPoints() {

    let bf;
    let jf;
    let ba;
    let ja;

    //nem jó a képek
    if (tessellationWidth % 2 == 0 && tessellationHeight % 2 == 0) {
        bf = (tessellationWidth / 2) * (tessellationHeight / 2);
        jf = bf;
        ba = bf;
        ja = bf;

    }
    //itt romlik el
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
    //bal alsó száma nem megfelelő
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
        //azt az esete nem kezelem amikor túl kicsi a tessaláció pl 1x1!!!!!!!!!!!!!!!!!!!!!!!!!!
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

    console.log("bf:" + bf + " bfRows:" + bfRows + " ppr:" + bfppr);
    console.log("jf:" + jf + " jfRows:" + jfRows + " ppr:" + jfppr);
    console.log("ba:" + ba + " baRows:" + baRows + " ppr:" + bappr);
    console.log("ja:" + ja + " jaRows:" + jaRows + " ppr:" + jappr);
    console.log("--------");

    //EDDIG JÓ!----------------------------A KÉP KOCKÁK SZÁMA MEGFELELŐ------------------------------------
    tessellationSites = [];


    //forgatás-------------------------------------------------------------------------------------------------
    //mostmár tudom hogy egy sorban hány kép van tehát ha új sor következik akkor kell növelni a számokat
    let counter = 0;

    for (let i = bf; i > 0; i--) {
        if(i%bfppr == 0){ counter++ }
        for (let j = 0; j < sites.length; j++) {
            // if(bfRows)
            // if(i>1){
                //     tessellationSites.push([500 * i + sites[j][0], sites[j][1]]);
                //     continue;
                // }
                tessellationSites.push([500 * (counter - 1) + sites[j][0], sites[j][1]]);
            }
        }
    
    counter = 0;
    //a második kép 500 al el van csúszva
    for (let i = jf; i > 0; i--) {
        if(i%jfppr == 0){ counter++ }
        for (let j = 0; j < sites.length; j++) {
            
            // if(i>1){
            //     tessellationSites.push([500 * (i*2) - sites[j][0], sites[j][1]]);
            //     continue;
            // }
            // // tessellationSites.push([500 * (i+1) - sites[j][0], sites[j][1]]);
            tessellationSites.push([500 * (counter + 1) - sites[j][0], sites[j][1]]);
        }
    }
    counter = 0;
    for (let i = ba; i > 0; i--) {
        if(i%bappr == 0){ counter++ }
        for (let j = 0; j < sites.length; j++) {
            // if(i>1){
            //     tessellationSites.push([500 * i + sites[j][0], 500 * i - sites[j][1]]);
            //     continue;
            // }
            //helyén van
            // tessellationSites.push([500 * (i-1) + sites[j][0], 500 * (i+1) - sites[j][1]]);
            tessellationSites.push([500 * (counter-1) + sites[j][0], 500 * (counter + 1) - sites[j][1]]);
        }
    }
    counter = 0;
    //itt komoly bajok vannak 1900,900 helyett 1400,1400--kicsiben megoldva nagyban nem
    for (let i = ja; i > 0; i--) {
        if(i%jappr == 0){ counter++ }
        for (let j = 0; j < sites.length; j++) {
            // if(i>1){
            //     tessellationSites.push([500 * (i*2) - sites[j][0], 500 * i - sites[j][1]]);
            //     continue;
            // }
            //helyén van
            // tessellationSites.push([500 * (i+1) - sites[j][0], 500 * (i+1) - sites[j][1]]);
            tessellationSites.push([500 * (counter + 1) - sites[j][0], 500 * (counter + 1) - sites[j][1]]);
        }
    }
}
    //forgatás-------------------------------------------------------------------------------------------------




    //for (let i = 0; i < sites.length; i++) {
    //    //Sima
    //    tessellationSites.push(sites[i]);
    //    //balalso
    //    tessellationSites.push([sites[i][0], canvasToSave.height - sites[i][1]]);
    //    //jobb
    //    tessellationSites.push([canvasToSave.width - sites[i][0], sites[i][1]]);
    //    //jobbalso
    //    tessellationSites.push([canvasToSave.width - sites[i][0], canvasToSave.height - sites[i][1]]);
    //}

    //ha osztható 2 vel akkor... nezzuk meg mi lenne ha 4x4 lenne
    //width
    //for (let j = tessellationWidth; j > 0; j--) {
    //    if (j % 2 == 0) {
    //        //jobb
    //        tessellationSites.push([tessellationWidth * j - sites[i][0], sites[i][1]]);
    //    }
    //    if (j == 1) {
    //        for (let i = 0; i < sites.length; i++) {
    //            //Sima
    //            tessellationSites.push(sites[i]);
    //        }
    //    }
    //    if (j % 2 != 0 && j != 1) {
    //        for (let i = 0; i < sites.length; i++) {
    //            //Sima
    //            tessellationSites.push((tessellationWidth * (j-1)) + sites[i][0], sites[i][1]);
    //        }
    //    }
    //}

    ////height
    //for (let k = tessellationHeight; k > 0; k--) {
    //    if (k % 2 == 0) {

    //    }
    //    if (k % 2 != 0) {
    //        //balalso
    //        tessellationSites.push([sites[i][0], tessellationHeigth - sites[i][1]]);
    //    }






function initialise() {
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
    var tessellationCanvas = document.getElementById("tessellationCanvas");
    tessellationContext = tessellationCanvas.getContext("2d");


    //starting points
    //initialise tessellation sites
    calculateMirroredPoints();

    tessellationVoronoi = d3.voronoi()
        .extent([[-1, -1], [canvasToSave.width + 1, canvasToSave.height + 1]]);

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






//   1 2  1 2 
//   3 4  3 4
//   1 2  1 2
//   3 4  3 4

// 4 x 4
// mindenből 4 van


// 3 x 4

//   1 2  1
//   3 4  3
//   1 2  1
//   3 4  3

// 1 2 3 4
//paros paros
// tessellationWidth % 2 == 0  &&  tessellationHeight % 2 == 0--->(tessellationWidth / 2 * tessellationHeight / 2)

// 1 es
// tessellationWidth % 2 != 0  &&  tessellationHeight % 2 == 0--->((Math.floor(tessellationWidth / 2) + 1) * tessellationHeight / 2)
// tessellationWidth % 2 != 0  &&  tessellationHeight % 2 != 0--->(Math.floor(tessellationWidth / 2) + 1)*(Math.floor(tessellationHeight / 2) + 1))
// tessellationWidth % 2 == 0  &&  tessellationHeight % 2 != 0--->(tessellationWidth / 2) * (Math.floor(tessellationHeight / 2) + 1 )

// 2 es
// tessellationWidth % 2 != 0  &&  tessellationHeight % 2 == 0--->(Math.floor(tessellationWidth / 2) * tessellationHeight / 2)
// tessellationWidth % 2 != 0  &&  tessellationHeight % 2 != 0--->(Math.floor(tessellationWidth / 2)*(Math.floor(tessellationHeight / 2) + 1))
// tessellationWidth % 2 == 0  &&  tessellationHeight % 2 != 0--->(tessellationWidth / 2) * (Math.floor(tessellationHeight / 2) + 1 )

// 3 as
// tessellationWidth % 2 != 0  &&  tessellationHeight % 2 == 0--->((Math.floor(tessellationWidth / 2)+1) * tessellationHeight / 2)
// tessellationWidth % 2 != 0  &&  tessellationHeight % 2 != 0--->((Math.floor(tessellationWidth / 2)+1)*(Math.floor(tessellationHeight / 2))
// tessellationWidth % 2 == 0  &&  tessellationHeight % 2 != 0--->((Math.floor(tessellationWidth / 2)+1) * (Math.floor(tessellationHeight / 2))

// 4 es
// tessellationWidth % 2 != 0  &&  tessellationHeight % 2 == 0--->((Math.floor(tessellationWidth / 2)) * tessellationHeight / 2)
// tessellationWidth % 2 != 0  &&  tessellationHeight % 2 != 0--->((Math.floor(tessellationWidth / 2)+1)*(Math.floor(tessellationHeight / 2))
// tessellationWidth % 2 == 0  &&  tessellationHeight % 2 != 0--->(tessellationWidth / 2) * (Math.floor(tessellationHeight / 2))


