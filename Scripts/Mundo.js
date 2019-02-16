/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function Mundo(lx) {
    //----------------------------------
    //Variables
    this.cx = 0;//coordenada x / distancia
    this.lx = lx;
    this.vel = 0.8;
    this.img = new Image();
    this.img.src = "media/nivel1.png";
    this.velocimetro = new Image();
    this.velocimetro.src = "media/vel0.png";
    this.vcx = 30;
    this.vcy = 450;
    this.velocidad = 0;



    this.img0 = new Image();
    this.img0.src = "media/vel0.png";
    this.img1 = new Image();
    this.img1.src = "media/vel1.png";
    this.img2 = new Image();
    this.img2.src = "media/vel2.png";
    this.img3 = new Image();
    this.img3.src = "media/vel3.png";
    this.img4 = new Image();
    this.img4.src = "media/vel4.png";
    this.img5 = new Image();
    this.img5.src = "media/vel5.png";
    this.img6 = new Image();
    this.img6.src = "media/vel6.png";
    this.img7 = new Image();
    this.img7.src = "media/vel7.png";


    this.setImage = function() {
        switch (this.velocidad) {
            case 0:
                this.velocimetro = this.img0;
                break;
            case 1:
                this.velocimetro = this.img1;
                break;
            case 2:
                this.velocimetro = this.img2;
                break;
            case 3:
                this.velocimetro = this.img3;
                break;
            case 4:
                this.velocimetro = this.img4;
                break;
            case 5:
                this.velocimetro = this.img5;
                break;
            case 6:
                this.velocimetro = this.img6;
                break;
            case 7:
                this.velocimetro = this.img7;
                break;
        }
    }

}