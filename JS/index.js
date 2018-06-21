// Our Javascript will go here.


document.getElementById('customFile').onchange = function(){
  $("#progress").css({"visibility":"visible","height":"40px"});
  $("#progressBar").css({"visibility":"visible","width":"100%"}).text("Cargando..."); /*Muestra la barra de progreso*/

  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    var json = JSON.parse(this.result);
    var puntos = json.p;
    console.log(puntos);

    voronoi3(puntos);
  };

  reader.readAsText(file);
  //$("#progressBar").attr('aria-valuenow', 30).css({"width":"30%"}).text("30%");

};
/*
var worker = new Worker('JS/voronoi.js');

worker.addEventListener('message', function(e) {
  console.log('Worker said: ', e.data);
}, false);

worker.postMessage('Hello World');*/

$(document).ready(function() {
       $(".dropdown").draggable({
           cancel: false,
       });
 });
