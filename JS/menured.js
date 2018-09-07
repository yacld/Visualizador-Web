function MenuRed(){
  Visualizador.call(this);
  this.autoR = function(checkbox) {
    if(checkbox.checked==true){
      // auto rotate
      vsym.controls.autoRotate = true;
      vsym.controls.autoRotateSpeed = 5;
    }else{
      vsym.controls.autoRotate = false;
    }
  }
}
MenuRed.prototype = new Visualizador();
