function Particulas ( ){
    Visualizador.call(this);

    this.paso = 1;
    this.particulas = [];
    this.pars = [];
    this.velocidad = 1;
    this.play = false;

    this.animaParticulas  = function(json) {
      objParticulas.paso = 1;
      objParticulas.play = true;
      var aspect = 1000 / 800;
      vsym.camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

      vsym.camera.position.set(0, 0, 1);

      vsym.scene = new THREE.Scene();
      espacio.appendChild( vsym.renderer.domElement );
      //scene.setValues( {background:''} );

      var group = new THREE.Group();
      vsym.scene.add(group);

      objParticulas.particulas = json.particles.particle;
      console.log(objParticulas.particulas.length);
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
    }

    this.pause = function() {
      if(objParticulas.play == true){
        objParticulas.play = false;
      }else{
        objParticulas.play  = true;
      }
    }

    this.regresa = function() {
      objParticulas.play = false;
      objParticulas.paso -= 5;
      objParticulas.setPos();
      vsym.renderer.render(vsym.scene, vsym.camera);
    }

    this.avanzar = function() {
      objParticulas.play = false;
      objParticulas.paso += 5;
      objParticulas.setPos();
      vsym.renderer.render(vsym.scene, vsym.camera);
    }

    this.setPos = function() {
      for(var i = 0; i < objParticulas.particulas.length; i++){
        if(objParticulas.paso < objParticulas.particulas[i].pasos.length){
          objParticulas.pars[i].position.setX(parseFloat(objParticulas.particulas[i].pasos[objParticulas.paso].x));
          objParticulas.pars[i].position.setY(parseFloat(objParticulas.particulas[i].pasos[objParticulas.paso].y));
        }
      }
    }
}

Particulas.prototype =  new Visualizador();

//funcion que coloca la escena en el navegador
Particulas.prototype.animate =function() {
  function avanza(){
    if(vsym.bandera != false){
      if(objParticulas.play != false){
        objParticulas.setPos();
      }
      objParticulas.paso++;
    }
    vsym.renderer.render(vsym.scene, vsym.camera);
    requestAnimationFrame( avanza );
  }
  requestAnimationFrame( avanza );
};

var objParticulas = new Particulas();
