function particulas ( ){
    Visualizador.call(this);
}


/*var puntosred = [];
var colors = {};*/
var particulas = [];
var pars = [];

function sim2(json){
  //if(renderer==null){
  var aspect = 1000 / 800;
  camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

  camera.position.set(0, 0, 50);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( 1000, 800 );
  espacio.appendChild( renderer.domElement );
  //scene.setValues( {background:''} );
  controls = new THREE.OrbitControls( camera, renderer.domElement );

  controls.enableDamping = false;
  //controls.dampingFactor = 0.25;

  controls.maxDistance =500;
  controls.maxDistance = 1000;
  var group = new THREE.Group();
  scene.add(group);

  particulas = json.particles.particle;
  console.log(particulas.length);
  particulas.forEach(function(particula){
    var x = particula.pasos[0].x;
    var y = particula.pasos[0].y;
    //var z = particula.pasos[0].z;
    var p = new THREE.SphereGeometry(.5, 10,10);
    var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    var sphere = new THREE.Mesh( p, material );
    sphere.position.x = parseInt(x);
    sphere.position.y = parseInt(y);
    //sphere.position.z = parseInt(z);
    scene.add( sphere );
    pars.push(sphere);

  });
  console.log(particulas);


  //funcion que coloca la escena en el navegador
  var animate = function (paso) {
    controls.update();
    var done = 0;
    function avanza(paso){
      for(var i = 0; i < particulas.length; i++){
        if(paso < particulas[i].pasos.length){
          pars[i].position.x = parseInt(particulas[i].pasos[paso].x);
          pars[i].position.y = parseInt(particulas[i].pasos[paso].y);
        }else{
          console.log("particula " + i + " terminó");
          done++;
        }
      }

    }
    avanza(paso);
    renderer.render(scene, camera);
    if(done==particulas.length){
      requestAnimationFrame( animate);

    }else{
      requestAnimationFrame( animate(paso+1) );

    }
    //menu
  };
  animate(1);
};
