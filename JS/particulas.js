function Particulas ( ){
    Visualizador.call(this);

    this.paso = 1;
    this.particulas = [];
    this.pars = [];
    this.velocidad = 1;

    this.animaParticulas  = function(json) {
      objParticulas.paso = 1;
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

      objParticulas.particulas = json.particles.particle;
      console.log(part.particulas.length);
      objParticulas.particulas.forEach(function(particula){
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
        objParticulas.pars.push(sphere);

      });
      console.log(objParticulas.pars);
      console.log(objParticulas.particulas);

      objParticulas.animate();
    };
}
Particulas.prototype =  new Visualizador();

//funcion que coloca la escena en el navegador
Particulas.prototype.animate =function() {
  vsym.controls.update();
  var done = 0;
  function avanza(){
    if(vsym.bandera != false){
      for(var i = 0; i < objParticulas.particulas.length; i++){
        if(objParticulas.paso < objParticulas.particulas[i].pasos.length){
          objParticulas.pars[i].position.setX(parseFloat(objParticulas.particulas[i].pasos[objParticulas.paso].x));
          objParticulas.pars[i].position.setY(parseFloat(objParticulas.particulas[i].pasos[objParticulas.paso].y));

        }else{
          console.log("particula " + i + " terminó");
          done++;
        }
      }
      vsym.renderer.render(vsym.scene, vsym.camera);
      objParticulas.paso++;
      requestAnimationFrame( avanza );
    }
  }
  requestAnimationFrame( avanza );
};

var objParticulas = new Particulas();
