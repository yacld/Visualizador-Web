function redporosa ( ){
    Visualizador.call(this);
}

function porosa(json){
  var aspect = 1000 / 800;
  camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

  camera.position.set(350, 350, 700);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( 1000, 800 );
  espacio.appendChild( renderer.domElement );
  //scene.setValues( {background:''} );
  controls = new THREE.OrbitControls( camera, renderer.domElement );

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  controls.minDistance = 200;
  controls.maxDistance = 1000;

  var group = new THREE.Group();
  scene.add(group);
}
