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

var voronoi3 = function(puntos){
  var scene = new THREE.Scene();
  var aspect = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

  camera.position.set(350, 350, 700);
  camera.lookAt(0, 0, 0);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( 1000, 800 );
  espacio.appendChild( renderer.domElement );

  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  // auto rotate
  controls.autoRotate = true;
  controls.autoRotateSpeed = 15;

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  controls.minDistance = 200;
  controls.maxDistance = 1000;



  var group = new THREE.Group();
  scene.add(group);

  //especifica las figuras y su material
  var p = new THREE.BoxGeometry(1, 1, 1);
  var colors = 0x0000ff; /* Color blue*/
  var puntosred = [];

  //$("#progressBar").attr('aria-valuenow', 40).css({"width":"40%"}).text("40%");
  puntos.forEach(function(punto){

    var aux = parseInt(colors, 16) + parseInt(punto.sb*10000);
    var c = new THREE.MeshBasicMaterial( {color: aux}  );
    var puntomesh =  new THREE.Mesh( p, c);
    puntomesh.position.x=parseInt(punto.x);
    puntomesh.position.y=parseInt(punto.y);
    puntomesh.position.z=parseInt(punto.z);
    group.add(puntomesh);
    puntosred.push(puntomesh);
  });
  //$("#progressBar").attr('aria-valuenow', 90).css({"width":"90%"}).text("90%");
  //funcion que coloca la escena en el navegador
  var animate = function () {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render(scene, camera);
    //menu
  };

  $("#progressBar").css({"visibility":"hidden"});
  $('#progress').css({"visibility":"hidden","height":"0px"});
  animate();
};
