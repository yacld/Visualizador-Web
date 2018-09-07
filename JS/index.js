function Visualizador (){
  this.scene=0;
  this.group=0;
  this.camera=0;
  this.renderer=0;
  this.controls=0;
  this.bandera = true;
}
//funcion que coloca la escena en el navegador
Visualizador.prototype.animate =function() {
  if(vsym.bandera != false){
    vsym.controls.update();
    vsym.renderer.render(vsym.scene, vsym.camera);
    requestAnimationFrame( vsym.animate );
  }
};

var vsym = new Visualizador();

vsym.renderer = new THREE.WebGLRenderer();
vsym.renderer.setSize( 1000, 800 );

/* funcion para leer el archivo */
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
      vor.voronoi3(puntos);

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

      rp.porosa(json);

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

function autoRot(checkid){
  var checkbox;
  if(checkid == 1){
    checkbox = document.getElementById("Check3");
  }else if(checkid == 2){
    checkbox = document.getElementById("Checkrp3");
  }
  vor.autoR(checkbox);
}
