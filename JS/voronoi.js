function vonoroi ( ){
    Visualizador.call(this);
}

addEventListener('message', function(e){
  voronoi3(e.data);
});



var scene = new THREE.Scene();
var colors = 0x0000ff; /* Color blue*/
var puntosred = [];
/*var renderer = new THREE.WebGLRenderer();
renderer.setSize( 1000, 800 );
espacio.appendChild( renderer.domElement );
var p = new THREE.BoxGeometry(1, 1, 1);
var group = new THREE.Group();*/



function voronoi3(puntos){
//  var scene = new THREE.Scene();
  var aspect = 1000 / 800;
  var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

  camera.position.set(350, 350, 700);
  camera.lookAt(0, 0, 0);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( 1000, 800 );
  espacio.appendChild( renderer.domElement );


  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  // auto rotate
  /*controls.autoRotate = true;
  controls.autoRotateSpeed = 15;

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;*/

  controls.minDistance = 200;
  controls.maxDistance = 1000;



  var group = new THREE.Group();
  scene.add(group);

  //especifica las figuras y su material
  var p = new THREE.BoxGeometry(1, 1, 1);
  /*var colors = 0x0000ff; /* Color blue/
  var puntosred = [];*/

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

  //funcion que coloca la escena en el navegador
  var animate = function () {
        //controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame( animate );
    //menu
  };


  animate();
};
