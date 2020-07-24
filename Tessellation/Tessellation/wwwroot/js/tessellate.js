function drawforSave() {
    let diagram = voronoi(sites),
        polygons = diagram.polygons();

    context.clearRect(0, 0, width, height);

    context.beginPath();
    for (let i = 0, n = polygons.length; i < n; ++i) drawCell(polygons[i]);
    context.strokeStyle = "#000";
    context.stroke();
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