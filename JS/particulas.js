function Particulas ( ){
    Visualizador.call(this);

    this.paso = 1;
    this.particulas = [];
    this.functions = [];
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

      objParticulas.funciones = json.canal;

      var barizq = objParticulas.funciones.LBarrier.value;
      var barder = objParticulas.funciones.RBarrier.value;

      var xRange = barder - barizq;
      var h = xRange / 1000;
      var x = 0;
      var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

      //TWALL
      var funciont = objParticulas.funciones.TWall.function;
      var tWall = texttoFunction(funciont);
      var tgeometry = new THREE.Geometry();

      for(var i = 0; i<1000; i++){
        var y = tWall(x);
        tgeometry.vertices.push(new THREE.Vector3( x, y, 0) );
        x += h;
      }
      var funt = new THREE.Line( tgeometry, material );
      vsym.scene.add(funt);

      //BWALL
      var funcionb = objParticulas.funciones.BWall.function;
      var bWall = texttoFunction(funcionb);
      var bgeometry = new THREE.Geometry();
      x = 0;
      for(var i = 0; i<1000; i++){
        var y = bWall(x);
        bgeometry.vertices.push(new THREE.Vector3( x, y, 0) );
        x += h;
      }
      var funb = new THREE.Line( bgeometry, material );
      vsym.scene.add(funb);
      var y;

      //LBarrier
      y = tWall(barizq);
      var lgeometry = new THREE.Geometry();
      lgeometry.vertices.push(new THREE.Vector3( barizq, y, 0) );
      y = bWall(barizq);
      lgeometry.vertices.push(new THREE.Vector3( barizq, y, 0) );
      var barl = new THREE.Line( lgeometry, material );
      vsym.scene.add(barl);

      //RBarrier
      y = tWall(barder);
      var rgeometry = new THREE.Geometry();
      rgeometry.vertices.push(new THREE.Vector3( barder, y, 0) );
      y = bWall(barder);
      rgeometry.vertices.push(new THREE.Vector3( barder, y, 0) );
      var barr = new THREE.Line(rgeometry, material );
      vsym.scene.add(barr);


      objParticulas.particulas = json.particles.particle;
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
      console.log(vsym.scene);

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

function texttoFunction(funcion){
  return Parser.parse(funcion).toJSFunction( ['x'] );
}
