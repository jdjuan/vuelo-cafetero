/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function Objeto(cx, tipo){
    this.cx=cx;
    this.cy=0;
    this.w=50;
    this.h=50;
    this.activo=true;
    this.tipo=tipo;
    this.img = new Image();
    if (tipo==1) {
        this.w=50;
        this.h=50;
        this.img.src="media/cafe.gif";
        this.cy=-60;
    }else{
        this.w=25;
        this.h=50;
        this.img.src="media/globo01.png";
        this.cy=650;
    }      
    
}