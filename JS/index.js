function Visualizador (){
  var scene=0,group=0,camera=0,renderer=0,controls=0;
  //funcion que coloca la escena en el navegador
}
Visualizador.prototype.animate =function() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame( vsym.animate );
};

var vsym = new Visualizador();

renderer = new THREE.WebGLRenderer();
renderer.setSize( 1000, 800 );


document.getElementById('exampleInputFile').onchange = function(){

  $('#MenuVoronoi').css({"visibility":"hidden", "height":"0px", "width":"0px"});
  $('#voronoiMenu').css({"visibility":"hidden"});
  $('#MenuRedPorosa').css({"visibility":"hidden", "height":"0px", "width":"0px"});
  $('#porosMenu').css({"visibility":"hidden"});
  $('#MenuParticulas').css({"visibility":"hidden", "height":"0px", "width": "0px"})
  $('#particulasMenu').css({"visibility":"hidden"})
  $("#progress").css({"visibility":"visible","height":"40px"});
  $("#progressBar").css({"visibility":"visible","width":"100%"}).text("Cargando..."); /*Muestra la barra de progreso*/
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(progressEvent){
    var json = JSON.parse(this.result);
    console.log(json);
    if(json.hasOwnProperty('p')){

      var puntos = json.p;
      console.log(puntos);
      voronoi3(puntos);

      $('#MenuVoronoi').css({"visibility":"visible", "height":"300px", "width": "auto"})
      $('#voronoiMenu').css({"visibility":"visible"})

    }else if(json.hasOwnProperty('particles')){

      if(json.type == "2D"){
        sim2(json);
      }else{
        alert("3D");
      }

      $('#MenuParticulas').css({"visibility":"visible", "height":"300px", "width": "auto"})
      $('#particulasMenu').css({"visibility":"visible"})

    }else if(json.hasOwnProperty('sitios')){

      porosa(json);

      $('#MenuRedPorosa').css({"visibility":"visible", "height":"300px", "width": "auto"})
      $('#porosMenu').css({"visibility":"visible"})
    }else{
      alert('Selecciona un archivo JSON valido');
    }

    $("#progressBar").css({"visibility":"hidden"});

    $('#progress').css({"visibility":"hidden","height":"0px"});


  };

  reader.readAsText(file);
};
