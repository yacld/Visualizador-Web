// Our Javascript will go here.

document.getElementById('customFile').onchange = function(){

  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    var json = JSON.parse(this.result);
    var puntos = json.p;
    console.log(puntos);
    three(puntos);
  };

  reader.readAsText(file);

};

var three = function(puntos){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, 1000/750, 0.1, 1000 );
  var controls = new THREE.OrbitControls( camera );
  camera.position.set(-15, -0, 500);

  controls.update();

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( 1000, 780 );
  espacio.appendChild( renderer.domElement );

  //especifica las figuras y su material
  var p = new THREE.BoxGeometry(1, 1, 1);
  var colors = 0x0000ff;

  puntos.forEach(function(punto){
    var aux = parseInt(colors, 16) + parseInt(punto.sb*10000);
    //var aux2 = aux.toString(16);
    var c = new THREE.MeshBasicMaterial( {color: aux}  );
    var puntomesh =  new THREE.Mesh( p, c);
      puntomesh.position.x=parseInt(punto.x);
      puntomesh.position.y=parseInt(punto.y);
      puntomesh.position.z=parseInt(punto.z);
      scene.add(puntomesh);
    });

  //funcion que coloca la escena en el navegador
  var animate = function () {
    requestAnimationFrame( animate );
    //~ controls.update();
    renderer.render(scene, camera);
    //menu
  };
  animate();
};
