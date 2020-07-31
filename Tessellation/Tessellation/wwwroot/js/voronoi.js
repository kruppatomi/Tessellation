var canvas = d3.select("canvas").on("touchmove mousemove", mouseMoved).node(),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

//starting points
var sites = [[100, 100], [200, 200], [200, 100], [300, 200]];

var voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);

redraw(0, sites, voronoi, context);

Math.dist = function (x1, y1, x2, y2) {
    if (!x2) x2 = 0;
    if (!y2) y2 = 0;
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

Math.dist(0, 0, 3, 4);

function SelectNearest() {
    var nearestP = 0;
    var smallestDistance = Math.dist(sites[0][0], sites[0][0], d3.mouse(this)[0], d3.mouse(this)[1]);
    var i;
    for (i = 1; i < sites.length; i++) {
        if (Math.dist(sites[i][0], sites[i][1], d3.mouse(this)[0], d3.mouse(this)[1]) < smallestDistance) {
            smallestDistance = Math.dist(sites[i][0], sites[i][1], d3.mouse(this)[0], d3.mouse(this)[1])
            nearestP = i
        }
    }
    return nearestP;
}

function mouseMoved() {
    //calculate nearest
    let nearestP = 0;
    if (isSelect) {
        let smallestDistance = Math.dist(sites[0][0], sites[0][0], d3.mouse(this)[0], d3.mouse(this)[1]);
        for (let i = 1; i < sites.length; i++) {
            if (Math.dist(sites[i][0], sites[i][1], d3.mouse(this)[0], d3.mouse(this)[1]) < smallestDistance) {
                smallestDistance = Math.dist(sites[i][0], sites[i][1], d3.mouse(this)[0], d3.mouse(this)[1])
                nearestP = i
            }
        }

        coloriseSelected(nearestP);
    }
    if (isGrab && isSelect) {
        sites[nearestP] = d3.mouse(this);
        redraw(nearestP, sites, voronoi, context);
    }

    if (isDelete && isSelect) {
        sites.splice(nearestP, 1);
        redraw(nearestP, sites, voronoi, context);
        isDelete = false;
    }

    if (isAdd) {
        if (!newPointWasAdded) {
            sites.push(d3.mouse(this));
            newPointWasAdded = true;
        }
        sites[sites.length - 1] = d3.mouse(this);
        redraw(sites.length - 1, sites, voronoi, context);
    }
}

function coloriseSelected(near) {
    context.beginPath();
    for (let i = 0, n = sites.length; i < n; ++i) drawSite(sites[i], context);
    context.fillStyle = "#000";
    context.fill();
    context.strokeStyle = "#fff";
    context.stroke();

    context.beginPath();
    drawSite(sites[near], context);
    context.fillStyle = "#f00";
    context.fill();
    //iadded this
    context.strokeStyle = "#fff";
    context.stroke();
}

function redraw(near, points, selectedVoronoi, voronoiContext) {
    let diagram = selectedVoronoi(points),
        polygons = diagram.polygons();

    voronoiContext.clearRect(0, 0, width, height);
    voronoiContext.beginPath();
    drawCell(polygons[near], voronoiContext);

    voronoiContext.beginPath();
    for (let i = 0, n = polygons.length; i < n; ++i) drawCell(polygons[i], voronoiContext);
    voronoiContext.strokeStyle = "#000";
    voronoiContext.stroke();

    voronoiContext.beginPath();
    for (let i = 0, n = points.length; i < n; ++i) drawSite(points[i], voronoiContext);
    voronoiContext.fillStyle = "#000";
    voronoiContext.fill();
    voronoiContext.strokeStyle = "#fff";
    voronoiContext.stroke();
}

function drawSite(site, voronoiContext) {
    voronoiContext.moveTo(site[0] + 2.5, site[1]);
    voronoiContext.arc(site[0], site[1], 2.5, 0, 2 * Math.PI, false);
}

function drawCell(cell, voronoiContext) {
    if (!cell) return false;
    voronoiContext.moveTo(cell[0][0], cell[0][1]);
    for (let j = 1, m = cell.length; j < m; ++j) {
        voronoiContext.lineTo(cell[j][0], cell[j][1]);
    }
    voronoiContext.closePath();
    return true;
};