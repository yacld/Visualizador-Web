function RedPorosa ( ){
    MenuRed.call(this);
}
RedPorosa.prototype = new MenuRed();

var redporosa = [];
var colorsp = {};

function porosa(json){
  var aspect = 1000 / 800;
  camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

  camera.position.set(350, 350, 700);
  camera.lookAt(0, 0, 0);
  vsym.scene = new THREE.Scene();

  espacio.appendChild( renderer.domElement );
  //scene.setValues( {background:''} );
  controls = new THREE.OrbitControls( camera, renderer.domElement );

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  controls.minDistance = 25;
  controls.maxDistance = 100;

  var group = new THREE.Group();
  scene.add(group);

  var colores = json.sitiosColor;
  var puntos = json.sitios;
  var x,y,z,radio,rotacion,radiomax = -1;

  for(var i = 0; i < colores.length; i++){
    x=puntos[i*5+0];
    y=puntos[i*5+1];
    z=puntos[i*5+2];
    radio=puntos[i*5+3];
    if(radio>radiomax){
      radiomax=radio;
    }
    rotacion=puntos[i*5+4];
    var p = new THREE.SphereGeometry(radio, 10,10);
    if(colores[i]==0){
      var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    }else if(colores[i]==1){
      var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    }else if(colores[i]==2){
      var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    }
    var sphere = new THREE.Mesh( p, material );
    sphere.position.x = parseInt(x);
    sphere.position.y = parseInt(y);
    sphere.position.z = parseInt(z);
    scene.add( sphere );
    redporosa.push(sphere);

  }
  var enlacescolores = json.enlacesColor;
  var enlaces = json.enlaces;
  for(var i = 0; i < enlacescolores.length; i++){
    x=enlaces[i*5+0];
    y=enlaces[i*5+1];
    z=enlaces[i*5+2];
    radio=enlaces[i*5+3];
    rotacion=enlaces[i*5+4];
    var p = new THREE.CylinderGeometry(radio,radio,radiomax*3,10);
    if(enlacescolores[i]==0){
      var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    }else if(enlacescolores[i]==1){
      var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    }else if(enlacescolores[i]==2){
      var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    }
    var cylinder = new THREE.Mesh( p, material );
    cylinder.position.x = parseInt(x);
    cylinder.position.y = parseInt(y);
    cylinder.position.z = parseInt(z);
    if(rotacion==0){
      cylinder.rotation.x=1;
      cylinder.rotation.y=0;
      cylinder.rotation.z=0;
    }else if(rotacion==1){
      cylinder.rotation.x=0;
      cylinder.rotation.y=1;
      cylinder.rotation.z=0;
    }else if(rotacion==2){
      cylinder.rotation.x=0;
      cylinder.rotation.y=0;
      cylinder.rotation.z=1;
    }
    scene.add( cylinder );
    redporosa.push(cylinder);

  }
  console.log(scene);
  var animate = function () {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame( animate );
    //menu
  };
  animate();
}

function rGrises (r,g,b){
  var checkbox = document.getElementById("Checkrp2");
  var coloraux, caux;
  if(checkbox.checked==true){
       redporosa.forEach(function(punto){
         var aux = punto.material.color;
         coloraux  =punto.material.color;
         if(aux.r==1 && aux.g==0 && aux.b==0){
           aux.r = r; aux.g = r; aux.b = r;
         }else if(aux.r==0 && aux.g==1 && aux.b==0){
           aux.r = g; aux.g = g; aux.b = g;
         }else if(aux.r==0 && aux.g==0 && aux.b==1){
           aux.r = b; aux.g = b; aux.b = b;
         }
         punto.material.setValues({color : aux});
         colorsp[aux.getHex()] = coloraux;
       });
  } else {
        redporosa.forEach(function(punto){
          var aux = punto.material.color;
          coloraux  =punto.material.color;
          if(aux.r == r && aux.g == r && aux.b == r){
            aux.r=1, aux.g=0, aux.b=0;
          }else if(aux.r == g && aux.g == g && aux.b == g){
            aux.r=0, aux.g=1, aux.b=0;
          }else if(aux.r == b && aux.g == b && aux.b == b){
            aux.r=0, aux.g=0, aux.b=1;
          }
          punto.material.setValues({color : aux});

        });
        colorsp = {};
  }
}
function rAzul (r,g,b){
  var checkbox = document.getElementById("Checkrp1");

  setColor(checkbox,r,g,b);
}
function rAutoR(){
  var checkbox = document.getElementById("Checkrp3");
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
       redporosa.forEach(function(punto){
         coloraux = punto.material.color;
         if(coloraux.r!=0){coloraux.r =0, coloraux.b=r;}
         else if(coloraux.g!=0){coloraux.g =0,coloraux.b=g;}
         else if(coloraux.b!=0){coloraux.b =b;}
         punto.material.setValues({color : coloraux});
       });
  } else {
        redporosa.forEach(function(punto){
          coloraux = punto.material.color;
          coloraux2 = punto.material.color;
          if(coloraux.b==r){coloraux.r =1, coloraux.b=0;}
          else if(coloraux.b==g){coloraux.g =1,coloraux.b=0;}
          else if(coloraux.b==b){coloraux.b =1;}
          punto.material.setValues({color : coloraux});

        });
        colorsp = {};
  }
}
