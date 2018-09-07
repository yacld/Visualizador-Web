function Particulas ( ){
    Visualizador.call(this);
}
Particulas.prototype =  new Visualizador();

var paso = 1;
//funcion que coloca la escena en el navegador
Particulas.prototype.animate =function() {
  vsym.controls.update();
  var done = 0;
  function avanza(){
    for(var i = 0; i < particulas.length; i++){
      if(paso < particulas[i].pasos.length){
        pars[i].position.setX(parseFloat(particulas[i].pasos[paso].x));
        pars[i].position.setY(parseFloat(particulas[i].pasos[paso].y));

      }else{
        console.log("particula " + i + " terminó");
        done++;
      }
    }
    vsym.renderer.render(vsym.scene, vsym.camera);
    paso++;
    requestAnimationFrame( avanza );
  }
//  avanza();
  requestAnimationFrame( avanza );
};


var particulas = [];
var pars = [];
var part = new Particulas();


function sim2(json){
  //if(renderer==null){
  var aspect = 1000 / 800;
  vsym.camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

  vsym.camera.position.set(0, 0, 1);

  vsym.scene = new THREE.Scene();
  espacio.appendChild( vsym.renderer.domElement );
  //scene.setValues( {background:''} );
  vsym.controls = new THREE.OrbitControls( vsym.camera, vsym.renderer.domElement );

  vsym.controls.enableDamping = false;
  //controls.dampingFactor = 0.25;

  vsym.controls.maxDistance =500;
  vsym.controls.maxDistance = 1000;
  var group = new THREE.Group();
  vsym.scene.add(group);

  particulas = json.particles.particle;
  console.log(particulas.length);
  particulas.forEach(function(particula){
    var x = particula.pasos[0].x;
    var y = particula.pasos[0].y;
    //var z = particula.pasos[0].z;
    var p = new THREE.SphereGeometry(.01, 10,10);
    var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    var sphere = new THREE.Mesh( p, material );
    sphere.position.x = parseInt(x);
    sphere.position.y = parseInt(y);
    //sphere.position.z = parseInt(z);
    vsym.scene.add( sphere );
    pars.push(sphere);

  });
  console.log(pars);
  console.log(particulas);

  part.animate();
};
