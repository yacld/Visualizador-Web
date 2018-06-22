// Our Javascript will go here.
/*var worker1 = new Worker('JS/voronoi.js');

worker1.addEventListener('message', function(e) {
  $("#progressBar").css({"visibility":"hidden"});
  $(".custom-file").css({"visibility":"hidden","height":"0px"});
  $("#customFile").css({"visibility":"hidden","height":"0px"});
  $('#progress').css({"visibility":"hidden","height":"0px"});
  $('.dropdown').css({"visibility":"visible","height":"20px"});

}, false);*/

function Visualizador (){

}

document.getElementById('customFile').onchange = function(){
  $("#progress").css({"visibility":"visible","height":"40px"});
  $("#progressBar").css({"visibility":"visible","width":"100%"}).text("Cargando..."); /*Muestra la barra de progreso*/
  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    var json = JSON.parse(this.result);
    var puntos = json.p;
    console.log(puntos);
    //worker1.postMessage(puntos);
    voronoi3(puntos);
    $("#progressBar").css({"visibility":"hidden"});
    $(".custom-file").css({"visibility":"hidden","height":"0px"});
    $("#customFile").css({"visibility":"hidden","height":"0px"});
    $('#progress').css({"visibility":"hidden","height":"0px"});
    //$('.dropdown').css({"visibility":"visible","height":"20px"});
    $('.sidebar').css({"visibility":"visible"})
  };

  reader.readAsText(file);
  //$("#progressBar").attr('aria-valuenow', 30).css({"width":"30%"}).text("30%");

};


$(document).ready(function() {
       $(".dropdown").draggable({
           cancel: false,
       });
 });
