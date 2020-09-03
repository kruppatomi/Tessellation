function downloadPicture(){
    document.getElementById("true-download-button").onclick = function(){
        if(document.getElementById("fileName").value){
            if(document.getElementById("png").checked){
                const a = document.createElement("a");
                document.body.appendChild(a);
                a.href = tessellationCanvas.toDataURL();
                a.download = document.getElementById("fileName").value + ".png";
                a.click();
                document.body.removeChild(a);
            }
            else{
                const a = document.createElement("a");
                document.body.appendChild(a);
                a.href = tessellationCanvas.toDataURL("image/jpeg");
                a.download = document.getElementById("fileName").value + ".jpeg";
                a.click();
                document.body.removeChild(a);
            }
        }
        else{
            document.getElementById("fileName").placeholder = "input file name!";
        }
    };
}