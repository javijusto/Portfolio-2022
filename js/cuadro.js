var toques=0;

document.getElementById("canvas1").addEventListener("click", 
    function(event) {
        toques++;
        if(toques === 20){
            document.getElementById("musica").style.visibility = "visible";
            toques=0;   
        }
    }, false);
