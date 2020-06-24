var width = window.document.getElementById("container").clientWidth;
var height = window.innerHeight;
var pointObjects = [];
var points = [];

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height * 0.9,
});

var layer = new Konva.Layer();

//add workplace
var workplace = new Konva.Rect({
    x: (stage.width() / 2) - 250,
    y: (stage.height() / 2) - 250,
    width: 500,
    height: 500,
    fill: 'rgb(100,100,100)',
    id: 'workplace',
});
// add the shape to the layer
layer.add(workplace);
//add layer to the stage



//toolbox
//var toolbox = new Konva.Rect({
//    x: 10,
//    y: (stage.height() / 2) - 250,
//    width: 120,
//    height: 150,
//    fill: 'grey',
//    shadowColor: 'black',
//    shadowBlur: 10,
//    shadowOffset: { x: 0, y: 0 },
//    shadowOpacity: 0.5,
//});
//// add the shape to the layer
//layer.add(toolbox);

var circle = new Konva.Circle({
    x: 10 + 60,
    y: (stage.height() / 2) - 220,
    radius: 30,
    stroke: 'white',
    strokeWidth: 2,
});

// add the shape to the layer
layer.add(circle);




//add layer to the stage
stage.add(layer);

//var circleIsClicked = false;

//circle.on('click', function () {
//    if (circleIsClicked) {
//        this.fill('grey');
//        layer.draw();
//        circleIsClicked = false;
//    }
//    else {
//        this.fill('white');
//        layer.draw();
//        circleIsClicked = true;
//    }
//});

var counter = 0;



//add shape if circle is clicked---------------------------------------------------------------------------------------------
//var group = new Konva.Group({});
//layer.add(group);

//layer.draw();

// this function will return pointer position relative to the passed node
//function getRelativePointerPosition(node) {
//    var transform = node.getAbsoluteTransform().copy();
//    // to detect relative position we need to invert transform
//    transform.invert();

//    // get pointer (say mouse or touch) position
//    var pos = node.getStage().getPointerPosition();

//    // now we can find relative point
//    return transform.point(pos);
//}

//add first two dots
//first
var i;
var starterpoint1 = new Konva.Circle({
    x: workplace.x() + (workplace.width() / 4),
    y: workplace.y() + (workplace.height()/2),
    draggable: true,
    fill: 'red',
    radius: 5,
    id: 'point' + counter,
    //dragBoundFunc: function () {
    //    //alert(this.id());
    //    var index = pointObjects.findIndex(x => x.id === this.id());
    //    points[index] = [this.x(), this.y()];
    //    moved(index);
    //    },
});
//add points to voronoi
pointObjects.push(starterpoint1);
points.push([starterpoint1.x(), starterpoint1.y()])
layer.add(starterpoint1);
counter++;
//second
var starterpoint2 = new Konva.Circle({
    x: workplace.x() + (workplace.width()/4)*3,
    y: workplace.y() + (workplace.height() / 2),
    draggable: true,
    fill: 'red',
    radius: 5,
    id: 'point' + counter,
    //dragBoundFunc: function () {
    //    //alert(this.id());
    //    var index = pointObjects.findIndex(x => x.id === this.id());
    //    points[index] = [this.x(), this.y()];
    //    moved(index);
    //},
});
//add points to voronoi
pointObjects.push(starterpoint2);
points.push([starterpoint2.x(), starterpoint2.y()])
layer.add(starterpoint2);

layer.draw();


//workplace.on('click', function () {
//    if (circleIsClicked) {
//    var pos = getRelativePointerPosition(group);
//    var shape = new Konva.Circle({
//        x: pos.x,
//        y: pos.y,
//        draggable: true,
//        fill: 'red',
//        radius: 5,
//    });
//    //add points to voronoi
//    points.push([shape.x(), shape.y()])
//        //alert('id:' + shape.id() + ', xpos:' + shape.x() +", ypos:" +shape.y())

//    layer.add(shape);
//    layer.batchDraw();
//    }
//})


//voronoi--------------------------------------------------------------------------------------------------------------
//var canvas = d3.select("canvas").on("click", moved).node(),
var canvas = d3.select("canvas").on("click", moved).node(),
    context = canvas.getContext("2d"),
    width = stage.width(),
    height = stage.height();
//canvas.style.position = "absolute";
//canvas.style.left = workplace.x() + 'px';
//canvas.style.top = workplace.y() + 'px';

var sites = points;

//.map(function (d) { return [Math.random() * width, Math.random() * height]; });

var voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);

redraw();

//ezt kell átírni hogy drag event közben frissüljön
function moved() {
    sites[0] = d3.mouse(this);
    redraw();
}

function redraw() {
    var diagram = voronoi(sites),
        links = diagram.links(),
        polygons = diagram.polygons();

    context.clearRect(0, 0, width, height);
    context.beginPath();
    drawCell(polygons[0]);
    //context.fillStyle = "#000";
    //context.fill();

    context.beginPath();
    for (var i = 0, n = polygons.length; i < n; ++i) drawCell(polygons[i]);
    context.strokeStyle = "#000";
    context.stroke();

    context.beginPath();
    for (var i = 0, n = links.length; i < n; ++i) drawLink(links[i]);
    context.strokeStyle = "rgba(0,0,0,0.4)";
    context.stroke();

    context.beginPath();
    drawSite(sites[0]);
    context.fillStyle = "#fff";
    context.fill();

    context.beginPath();
    for (var i = 1, n = sites.length; i < n; ++i) drawSite(sites[i]);
    context.fill();
    context.strokeStyle = "#fff";
    context.stroke();
}

function drawSite(site) {
    context.moveTo(site[0] + 2.5, site[1]);
    context.arc(site[0], site[1], 2.5, 0, 2 * Math.PI, false);
}

function drawLink(link) {
    context.moveTo(link.source[0], link.source[1]);
    context.lineTo(link.target[0], link.target[1]);
}

function drawCell(cell) {
    if (!cell) return false;
    context.moveTo(cell[0][0], cell[0][1]);
    for (var j = 1, m = cell.length; j < m; ++j) {
        context.lineTo(cell[j][0], cell[j][1]);
    }
    context.closePath();
    return true;
}



//workplace.on('click', function () {
//    var shapes = stage.find('Circle');
//    alert(shapes);
//})


//-----------------------------------------------------------------------------------------------------------------------------
//show position
//var text = new Konva.Text({
//    x: 5,
//    y: 200,
//});
//layer.add(text);
//updateText();

//// create new transformer
//var tr = new Konva.Transformer();
//var tr2 = new Konva.Transformer();
//layer.add(tr);
//layer.add(tr2);
//tr.nodes([circle]);
//tr2.nodes([circle2]);
//layer.draw();



//circle.on('transformstart', function () {
//    console.log('transform start');
//});

//circle.on('dragmove', function () {
//    updateText();
//});
//circle.on('transform', function () {
//    updateText();
//    console.log('transform');
//});

//rect.on('transformend', function () {
//    console.log('transform end');
//});

//function updateText() {
//    var lines = [
//        'x: ' + circle.x(),
//        'y: ' + circle.y(),
//        'rotation: ' + circle.rotation(),
//        'width: ' + circle.width(),
//        'height: ' + circle.height(),
//        'scaleX: ' + circle.scaleX(),
//        'scaleY: ' + circle.scaleY(),
//    ];
//    text.text(lines.join('\n'));
//    layer.batchDraw();
//}

//function writeMessage(message) {
//    text.text(message);
//    layer.draw();
//}
//------------------------------------------------------------------------------------------------------------------------------


//function createCircle() {
//    layer.add(new Konva.Circle({
//        x: ,
//        y: 50 + 40,
//        radius: 30,
//        fill: 'white',
//    }));
//}


//var circle = new Konva.Circle({
//    x: 700,
//    y: 300,
//    radius: 70,
//    fill: 'red',
//    draggable: true,
//});

//var circle2 = new Konva.Circle({
//    x: 500,
//    y: 300,
//    radius: 70,
//    fill: 'black',
//    draggable: true,
//});

//var circle3 = new Konva.Circle({
//    x: 500,
//    y: 500,
//    radius: 70,
//    fill: 'green',
//    draggable: true,
//});

//var circle4 = new Konva.Circle({
//    x: 700,
//    y: 500,
//    radius: 70,
//    fill: 'blue',
//    draggable: true,
//});

//// add the shape to the layer
//layer.add(circle);
//layer.add(circle2);
//layer.add(circle3);
//layer.add(circle4);


//var circle5 = new Konva.Circle({
//    x: 50,
//    y: 50,
//    radius: 20,
//    fill: 'black',
//    draggable: true,
//});

//// add the shape to the layer
//layer.add(circle5);


//var circle6 = new Konva.Circle({
//    x: 100,
//    y: 50,
//    radius: 20,
//    fill: 'black',
//    draggable: true,
//});

//// add the shape to the layer
//layer.add(circle6);
//// add the layer to the stage

//var text = new Konva.Text({
//    x: 5,
//    y: 5,
//});
//layer.add(text);
//updateText();

//// create new transformer
//var tr = new Konva.Transformer();
//var tr2 = new Konva.Transformer();
//layer.add(tr);
//layer.add(tr2);
//tr.nodes([circle]);
//tr2.nodes([circle2]);
//layer.draw();



//circle.on('transformstart', function () {
//    console.log('transform start');
//});

//circle.on('dragmove', function () {
//    updateText();
//});
//circle.on('transform', function () {
//    updateText();
//    console.log('transform');
//});

//rect.on('transformend', function () {
//    console.log('transform end');
//});

//function updateText() {
//    var lines = [
//        'x: ' + circle.x(),
//        'y: ' + circle.y(),
//        'rotation: ' + circle.rotation(),
//        'width: ' + circle.width(),
//        'height: ' + circle.height(),
//        'scaleX: ' + circle.scaleX(),
//        'scaleY: ' + circle.scaleY(),
//    ];
//    text.text(lines.join('\n'));
//    layer.batchDraw();
//}

//function writeMessage(message) {
//    text.text(message);
//    layer.draw();
//}