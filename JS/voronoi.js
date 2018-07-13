function vonoroi ( ){
    Visualizador.call(this);
}

addEventListener('message', function(e){
  voronoi3(e.data);
});


var puntosred = [];
var colors = {};

function voronoi3(puntos){
  //if(renderer==null){
  var aspect = 1000 / 800;
  camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

  camera.position.set(350, 350, 350);

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
  //}
  //especifica las figuras y su material
  var colores = {};
  var cs = [];
  var mx=-10000,my=-10000,mz=-10000;
  puntos.forEach(function(punto){
    var px = parseInt(punto.x);
    var py = parseInt(punto.y);
    var pz = parseInt(punto.z);
    if(!colores.hasOwnProperty(''+punto.sb)){
      var p = new THREE.Geometry();
      colores[''+punto.sb] = p ;

      cs.push(punto.sb);
    }
      var point = new THREE.Vector3();
      point.x=px;
      point.y=py;
      point.z=pz;
      if(px>mx) mx=px;
      if(py>my) my=py;
      if(pz>mz) mz=pz;

      colores[''+punto.sb].vertices.push(point);
  });
  cs.forEach(function(color){
    var aux =  color*111111;
    var c = new THREE.PointsMaterial( {color: aux}  );
    var puntomesh =  new THREE.Points( colores[''+color], c);
    group.add(puntomesh);
    puntosred.push(puntomesh);
  });
  console.log(puntosred);
  console.log(controls);
  var centro = new THREE.Vector3();
  centro.x = mx/2;
  centro.y = my/2;
  centro.z = mz/2;
  controls.target =  centro;

  //funcion que coloca la escena en el navegador
  var animate = function () {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame( animate() );
    //menu
  };
  animate();
};

function vGrises (r,g,b){
  var checkbox = document.getElementById("Check2");

  setColor(checkbox,r,g,b);
}
function vBlue (r,g,b){
  var checkbox = document.getElementById("Check1");

  setColor(checkbox,r,g,b);
}
function autoR(){
  var checkbox = document.getElementById("Check3");
  if(checkbox.checked==true){
    // auto rotate
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
  }else{
    controls.autoRotate = false;
  }


}
function setColor (checkbox,r,g,b){
  var coloraux, coloraux2, caux;
  if(checkbox.checked==true){
       puntosred.forEach(function(punto){
         coloraux = punto.material.color;
         coloraux2 = coloraux.getHex();
         caux = coloraux.r+ coloraux.g +coloraux.b;
         coloraux.r =r/caux;
         coloraux.g =g/caux;
         coloraux.b =b/caux;
         punto.material.setValues({color : coloraux});
         colors[coloraux.getHex()] = coloraux2;
       });
  } else {
        puntosred.forEach(function(punto){
          coloraux = punto.material.color;
          caux =colors[coloraux.getHex()];
          punto.material.setValues({color : caux});

        });
        colors = {};
  }

  console.log(colors);
}
