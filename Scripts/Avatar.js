/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//Constructor
function Avatar(lx, ly, height) {
    this.cx = 210;//coordenada x / distancia
    this.cy = 63;//coordenada y
    this.ly = ly;
    this.lx = lx;
    this.up2 = false;
    this.down2 = false;
    this.height = height;
    this.img0 = new Image();
    this.img0.src = "media/avatar0.png";
    this.img = new Image();
    this.img.src = "media/avatar0.png";
    this.img = new Image();
    this.img.src = "media/avatar0.png";
    this.img1 = new Image();
    this.img1.src = "media/avatar1.png";
    this.img2 = new Image();
    this.img2.src = "media/avatar2.png";
    this.img3 = new Image();
    this.img3.src = "media/avatar3.png";
    this.img4 = new Image();
    this.img4.src = "media/avatar4.png";
    this.img5 = new Image();
    this.img5.src = "media/avatar5.png";
    this.img6 = new Image();
    this.img6.src = "media/avatar6.png";
    this.img7 = new Image();
    this.img7.src = "media/avatar7.png";
    this.creditos = 0;
    this.cohetes = 0;
    this.agua = 0;
    this.nieve = 0;
    this.jugabilidad = 0;//casos 1,2,3; nivel de control
    this.aviones = 0;//mostrar imagen si tiene los 4
    this.caida = false;
    this.caida2=false;
    this.angulo = 0;
    this.velCaida = 0.1;
    this.w = 100;
    this.h = 63;
    this.subir = false;
    this.angulo1=0.1;
    //--------------------------------------------------------------------------
    //
    this.giro = function() {
        if (avatar.subir == false) {
            switch (this.angulo) {
                case -2:
                    this.img.src = "media/avatar7.png";
                    break;
                case -1:
                    this.img.src = "media/avatar4.png";
                    break;
                case 0:
                    this.img.src = "media/avatar0.png";
                    break;
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    this.setImage = function() {
        switch (this.angulo1) {
            case 0:
                this.img = this.img0;
                break;
            case 1:
                this.img = this.img1;
                break;
            case 2:
                this.img = this.img2;
                break;
            case 3:
                this.img = this.img3;
                break;
            case 4:
                this.img = this.img4;
                break;
            case 5:
                this.img = this.img5;
                break;
            case 6:
                this.img = this.img6;
                break;
            case 7:
                this.img = this.img7;
                break;
        }
    }
}

