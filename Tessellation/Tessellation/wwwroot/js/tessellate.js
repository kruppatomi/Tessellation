var tessellationWidth;
var tessellationHeight;
var tessellationContext;
var tessellationSites = [];
var tessellationVoronoi;
var canvasToSave;
var tessellationCanvas;
var ox,oy,px,py,scx,scy;

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
    
    //add modal
    handleModal();
}

function makeInfiniteTessellation() {
    initialise();
    addDownloadOption();
    drawforSave();
    //zoom and pan
    // ox=0;
    // oy=0;
    // px=0;
    // py=0;
    // scx=1;
    // scy=1;

    // tessellationCanvas.onmousedown=(e)=>{px=e.x;py=e.y;tessellationCanvas.onmousemove=(e)=>{ox-=(e.x-px);oy-=(e.y-py);px=e.x;py=e.y;} } 

    // tessellationCanvas.onmouseup=()=>{tessellationCanvas.onmousemove=null;}
    // tessellationCanvas.onwheel =(e)=>{let bfzx,bfzy,afzx,afzy;[bfzx,bfzy]=StoW(e.x,e.y);scx-=10*scx/e.deltaY;scy-=10*scy/e.deltaY;
    // [afzx,afzy]=StoW(e.x,e.y);
    // ox+=(bfzx-afzx);
    // oy+=(bfzy-afzy);
    // }
    // draw();
}

function addDownloadOption(){
    downloadPicture();
}


function downloadPicture(){
    document.getElementById("true-download-button").onclick = function(){
        if(document.getElementById("fileName").value){
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = tessellationCanvas.toDataURL();
            a.download = document.getElementById("fileName").value + ".png";
            a.click();
            document.body.removeChild(a);
        }
    };
}

function handleModal(){
    document.querySelector(".download-button").onclick = function(){
        document.querySelector(".modal-bg").classList.add("bg-activate");
    };
    document.querySelector(".modal-close").onclick = function(){
        document.querySelector(".modal-bg").classList.remove("bg-activate");
    };
}


//zoom and pan feature-----------------------------------------------------------------------------------------


function draw(){
    window.requestAnimationFrame(draw);
    tessellationContext.clearRect(0,0,tessellationCanvas.width,tessellationCanvas.height);
    // for(let i=0;i<=100;i+=10){
    //     let sx=0,sy=i;
    //     let ex=100,ey=i;
    //     [sx,sy]=WtoS(sx,sy);
    //     [ex,ey]=WtoS(ex,ey);
        tessellationContext.beginPath();
        tessellationContext.moveTo(sx, sy);
        // tessellationContext.lineTo(ex, ey);
        tessellationContext.stroke();
    }
    for(let i=0;i<=100;i+=10){
        let sx=i,sy=0;
        let ex=i,ey=100;
        [sx,sy]=WtoS(sx,sy);
        [ex,ey]=WtoS(ex,ey);
        tessellationContext.beginPath();
        tessellationContext.moveTo(sx, sy);
        tessellationContext.lineTo(ex, ey);
        tessellationContext.stroke();
    }
}
// draw()
function WtoS(wx,wy){
    let sx=(wx-ox)*scx;
    let sy=(wy-oy)*scy;
    return[sx,sy];
}
function StoW(sx,sy){
    let wx=sx/scx+ox;
    let wy=sy/scy+oy;
    return[wx,wy];
}

