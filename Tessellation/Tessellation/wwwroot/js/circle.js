var width = window.document.getElementById("container").clientWidth;
var height = 600;

var stage = new Konva.Stage({
    container: 'container',
    width:  width,
    height: height,
});

var layer = new Konva.Layer();

var rect1 = new Konva.Rect({
    x: (stage.width() / 2)-250,
    y: (stage.height() / 2)-250,
    width: 500,
    height: 500,
    stroke: 'black',
    strokeWidth: 4,
});
// add the shape to the layer
layer.add(rect1);
//add layer to the stage
stage.add(layer);

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