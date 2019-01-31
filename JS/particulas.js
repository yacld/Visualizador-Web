function Particulas ( ){
    Visualizador.call(this);

    this.paso = 1;
    this.particulas = 0;
    this.funciones = 0 ;
    this.pars = [];
    this.color = [];
    this.trays = [];
    this.trayso = [];
    //this.velocidad = 1;
    this.play = false;

    this.creaEscena  = function(json) {
      objParticulas.paso = 1;
      objParticulas.play = true;
      var aspect = 1000 / 800;
      vsym.camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

      vsym.camera.position.set(0, 0, 1);

      vsym.scene = new THREE.Scene();
      espacio.appendChild( vsym.renderer.domElement );

      /**vsym.controls = new THREE.OrbitControls( vsym.camera, vsym.renderer.domElement );

      vsym.controls.maxDistance =1;
      vsym.controls.maxDistance = .5;
      vsym.controls.enableZoom = true;**/

      objParticulas.funciones = json.canal;

      var barizq = objParticulas.funciones.LBarrier.value;
      var barder = objParticulas.funciones.RBarrier.value;

      var xRange = barder - barizq;
      var h = xRange / 1000;
      var x = 0;
      var material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 10 } );
      var mat2 = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 10} );

      //TWALL
      var funciont = objParticulas.funciones.TWall.function;
      var tWall = texttoFunction(funciont);
      var tgeometry = new THREE.Geometry();

      for(var i = 0; i<1000; i++){
        var y = tWall(x);
        tgeometry.vertices.push(new THREE.Vector3( x, y, 0) );
        x += h;
      }
      if(objParticulas.funciones.TWall.isReflec){
        var funt = new THREE.Line( tgeometry, material );
      }else{
        var funt = new THREE.Line( tgeometry, mat2 );
      }
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
      if(objParticulas.funciones.BWall.isReflec){
        var funb = new THREE.Line( bgeometry, material );
      }else{
        var funb = new THREE.Line( bgeometry, mat2 );
      }
      vsym.scene.add(funb);
      var y;

      //LBarrier
      y = tWall(barizq);
      var lgeometry = new THREE.Geometry();
      lgeometry.vertices.push(new THREE.Vector3( barizq, y, 0) );
      y = bWall(barizq);
      lgeometry.vertices.push(new THREE.Vector3( barizq, y, 0) );
      if(objParticulas.funciones.LBarrier.isReflec){
        var barl = new THREE.Line( lgeometry, material );
      }else{
        var barl = new THREE.Line( lgeometry, mat2 );
      }
      vsym.scene.add(barl);

      //RBarrier
      y = tWall(barder);
      var rgeometry = new THREE.Geometry();
      rgeometry.vertices.push(new THREE.Vector3( barder, y, 0) );
      y = bWall(barder);
      rgeometry.vertices.push(new THREE.Vector3( barder, y, 0) );
      if(objParticulas.funciones.RBarrier.isReflec){
        var barr = new THREE.Line( rgeometry, material );
      }else{
        var barr = new THREE.Line( rgeometry, mat2 );
      }
      vsym.scene.add(barr);

      //dibuja particulas
      objParticulas.particulas = json.particles.particle;
      var color = 1;
      objParticulas.particulas.forEach(function(particula){
        var x = particula.pasos[0].x;
        var y = particula.pasos[0].y;
        var p = new THREE.SphereGeometry(.01, 10,10); //(radio, ..., ...)
        var aux =  color*111111;
        objParticulas.color.push(aux);
        var material = new THREE.MeshBasicMaterial( {color: aux} );
        var sphere = new THREE.Mesh( p, material );
        sphere.position.x = parseInt(x);
        sphere.position.y = parseInt(y);
        vsym.scene.add( sphere );
        objParticulas.pars.push(sphere);

        objParticulas.trays.push( [{ "x": x, "y": y }] );

        color += 100;
      });
      console.log(vsym.scene);
      console.log(objParticulas.trayso);
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
          var x = parseFloat(objParticulas.particulas[i].pasos[objParticulas.paso].x);
          var y = parseFloat(objParticulas.particulas[i].pasos[objParticulas.paso].y);
          objParticulas.pars[i].position.setX(x);
          objParticulas.pars[i].position.setY(y);
          objParticulas.trays[i].push( { "x": x, "y": y } );
        }else if(objParticulas.paso == objParticulas.particulas[i].pasos.length){
          console.log("particula: " + i);
        }
      }
      checkbox = document.getElementById("Checkpt1");
      if(checkbox.checked==true){
        objParticulas.muestraTray();
      }
      document.getElementById("paso").innerHTML = objParticulas.paso;
    }

    // muestra trayectorias
    this.muestraTray  = function() {
      checkbox = document.getElementById("Checkpt1");
      objParticulas.trayso.forEach( function(tray) {
        vsym.scene.remove(tray);
      });
      objParticulas.trayso = [];
      if(checkbox.checked==true){
        for(var i = 0; i < objParticulas.trays.length; i++) {
          var color = objParticulas.color[i];
          var geometry = new THREE.Geometry();
          var material = new THREE.LineBasicMaterial( { color: color } );
          for(var j = 0; j < objParticulas.trays[i].length; j++ ) {
            var x = objParticulas.trays[i][j].x;
            var y = objParticulas.trays[i][j].y;
            geometry.vertices.push(new THREE.Vector3( x, y, 0) );

          }
          var tray = new THREE.Line( geometry, material );
          vsym.scene.add(tray);
          objParticulas.trayso.push(tray);

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

//convierte una funcion de texto a js
function texttoFunction(funcion){
  return Parser.parse(funcion).toJSFunction( ['x'] );
}
