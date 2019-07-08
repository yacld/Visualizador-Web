function Particulas ( ){
    Visualizador.call(this);

    this.paso = 1;
    this.particulas = 0;
    this.funciones = 0 ;
    this.pars = [];//particulas (objetos)
    this.color = [];//colores
    this.trays = [];//posiciones
    this.trayso = [];//lineas
    this.play = false;

    //inicia escena, particulas, dibuja canal y los agrega a escena
    this.creaEscena  = function(json) {
      objParticulas.paso = 1;
      objParticulas.play = true;
      var aspect = 1000 / 800;
      vsym.camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

      vsym.camera.position.set(0, 0, 1);

      vsym.scene = new THREE.Scene();
      vsym.scene.background = new THREE. Color( 0xffffff );
      espacio.appendChild( vsym.renderer.domElement );

      /**vsym.controls = new THREE.OrbitControls( vsym.camera, vsym.renderer.domElement );

      vsym.controls.maxDistance =1;
      vsym.controls.maxDistance = .5;
      vsym.controls.enableZoom = true;**/

      objParticulas.funciones = json.canal;

      var barizq = objParticulas.funciones.LBarrier.value;
      var barder = objParticulas.funciones.RBarrier.value;

      var xRange = barder - barizq;
      var h = xRange / 1000; //si se requiere mas detalle en las funciones hacer mas pequeño este valor
      var x = barizq;
      var material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 10 } );//rojo
      var mat2 = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 10} );//azul

      //TWALL
      var funciont = objParticulas.funciones.TWall.function;
      var tWall = texttoFunction(funciont);//string --> js
      var tgeometry = new THREE.Geometry();

      while( x < barder ){
        var y = tWall(x);
        tgeometry.vertices.push(new THREE.Vector3( x, y, 0) );
        x += h;
      }
      if(objParticulas.funciones.TWall.isReflec){
        var funt = new THREE.Line( tgeometry, material );//rojo
      }else{
        var funt = new THREE.Line( tgeometry, mat2 );//azul
      }
      vsym.scene.add(funt);//agrega a escena

      //BWALL
      var funcionb = objParticulas.funciones.BWall.function;
      var bWall = texttoFunction(funcionb);
      var bgeometry = new THREE.Geometry();
      x = barizq;
      while( x < barder ){
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

      //LBarrier, solo cortan en twall y bwall
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

      //dibuja particulas y las coloca en la primer posicion
      objParticulas.particulas = json.particles.particle;
      var color = 1;
      objParticulas.particulas.forEach(function(particula){//para cada particula se realiza
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

        objParticulas.trays.push( [{ "x": x, "y": y }] );//se guarda pos para las trayectorias

        color += 100;
      });
      //console.log(vsym.scene);
      //console.log(objParticulas.trayso);
      objParticulas.animate();
    }
    //pausa la animacion
    this.pause = function() {
      if(objParticulas.play == true){
        objParticulas.play = false;
      }else{
        objParticulas.play  = true;
      }
    }
    //regresa 5 pasos
    this.regresa = function() {
      objParticulas.play = false;
      objParticulas.paso -= 5;
      objParticulas.setPos();
      vsym.renderer.render(vsym.scene, vsym.camera);
    }
    //avanza 5 pasos
    this.avanzar = function() {
      objParticulas.play = false;
      objParticulas.paso += 5;
      objParticulas.setPos();
      vsym.renderer.render(vsym.scene, vsym.camera);
    }

    /**actualiza posiciones de las particulas si el paso actual
    esta dentro del rango de cada trayectoria
    tambien agrega las posiciones actuales al objeto trays para
    que se agregue al dibujo de las trayectorias**/
    this.setPos = function() {
      for(var i = 0; i < objParticulas.particulas.length; i++){
        if(objParticulas.paso < objParticulas.particulas[i].pasos.length){
          var x = parseFloat(objParticulas.particulas[i].pasos[objParticulas.paso].x);
          var y = parseFloat(objParticulas.particulas[i].pasos[objParticulas.paso].y);
          objParticulas.pars[i].position.setX(x);
          objParticulas.pars[i].position.setY(y);
          objParticulas.trays[i].push( { "x": x, "y": y } );
        }else if(objParticulas.paso == objParticulas.particulas[i].pasos.length){
          console.log("terminó particula: " + i);
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
        objParticulas.paso++;
        objParticulas.setPos();
      }
      //objParticulas.paso++;

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
