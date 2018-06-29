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
  var scene=0,group=0,camera=0,renderer=0,controls=0;

}
scene = new THREE.Scene({background: '0xffffff'});
document.getElementById('exampleInputFile').onchange = function(){

  $("#progress").css({"visibility":"visible","height":"40px"});
  $("#progressBar").css({"visibility":"visible","width":"100%"}).text("Cargando..."); /*Muestra la barra de progreso*/
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(progressEvent){
    var json = JSON.parse(this.result);
    if(json.hasOwnProperty('p')){
      if(scene.children.length > 0){
        while(scene.children.length > 0){
          scene.remove(scene.children[0]);
        }
      }
      var puntos = json.p;
      console.log(puntos);
      //worker1.postMessage(puntos);
      voronoi3(puntos);
      $('.sidebar-heading').text("MenuVoronoi3D");
      $('#vor').css({"visibility":"visible", "height":"300px"})

    }else if(json.hasOwnProperty('particles')){
      alert('particulas')
      if(scene.children.length > 0){
        while(scene.children.length > 0){
          scene.remove(scene.children[0]);
        }
        console.log("ei");
      }


    }else if(json.hasOwnProperty('sitios')){
      alert('red porosa')
      if(scene.children.length > 0){
        while(scene.children.length > 0){
          scene.remove(scene.children[0]);
        }
        console.log("ei");
      }
      porosa(json);

    }else{
      alert('Selecciona un archivo JSON valido');
    }

    $("#progressBar").css({"visibility":"hidden"});
    //$(".custom-file").css({"visibility":"hidden","height":"0px"});
    //$("#customFile").css({"visibility":"hidden","height":"0px"});
    $('#progress').css({"visibility":"hidden","height":"0px"});
    //$('.dropdown').css({"visibility":"visible","height":"20px"});

  };

  reader.readAsText(file);
  //$("#progressBar").attr('aria-valuenow', 30).css({"width":"30%"}).text("30%");

};


$(document).ready(function() {
       $(".dropdown").draggable({
           cancel: false,
       });
 });
