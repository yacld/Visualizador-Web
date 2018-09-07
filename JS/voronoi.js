function Voronoi ( ){
    MenuRed.call(this);
    this.puntosred = [];
    this.colors = {};


    this.vGrises = function(r,g,b) {
      var checkbox = document.getElementById("Check2");
      this.setColor(checkbox,r,g,b);
    }
    this.vBlue  = function(r,g,b){
      var checkbox = document.getElementById("Check1");
      this.setColor(checkbox,r,g,b);
    }

    this.setColor = function(checkbox,r,g,b){
      var coloraux, coloraux2, caux;
      if(checkbox.checked==true){
           vor.puntosred.forEach(function(punto){
             coloraux = punto.material.color;
             coloraux2 = coloraux.getHex();
             caux = coloraux.r+ coloraux.g +coloraux.b;
             coloraux.r =r/caux;
             coloraux.g =g/caux;
             coloraux.b =b/caux;
             punto.material.setValues({color : coloraux});
             vor.colors[coloraux.getHex()] = coloraux2;
           });
      } else {
            vor.puntosred.forEach(function(punto){
              coloraux = punto.material.color;
              caux =vor.colors[coloraux.getHex()];
              punto.material.setValues({color : caux});
            });
            vor.colors = {};
      }
      console.log(vor.colors);
    }

    this.voronoi3 = function(puntos){
      var aspect = 1000 / 800;
      vsym.camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );

      vsym.camera.position.set(350, 350, 350);

      vsym.scene = new THREE.Scene();
      espacio.appendChild( vsym.renderer.domElement );
      vsym.controls = new THREE.OrbitControls( vsym.camera, vsym.renderer.domElement );

      vsym.controls.maxDistance =500;
      vsym.controls.maxDistance = 1000;
      var group = new THREE.Group();
      vsym.scene.add(group);
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
        vor.puntosred.push(puntomesh);
      });
      console.log(vor.puntosred);
      console.log(vsym.controls);
      var centro = new THREE.Vector3();
      centro.x = mx/2;
      centro.y = my/2;
      centro.z = mz/2;
      vsym.controls.target =  centro;

      vsym.animate();
    };

}
Voronoi.prototype = new MenuRed();

var vor = new Voronoi();
