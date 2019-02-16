/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//------------------------------------------------------------------------------
//Variables
var micanvas;
var contexto;
var JUEGO_FPS = 50;
var Width;
var Height;
var level = 1;
var barra = new Image();//Barra superior de informacion
var mavatar = new Image();
var avatar;
var mundo;
var listaObjetos = new Array();  //Objetos
var listaCorrientes = new Array(); //Corrientes de aire 
var actived = true;
var pause = false;
var rest = false;
var mensaje = 0;
//var tor = "media/corriente.mp3";

var panel1 = new Image();

var mensaje1, mensaje2, mensaje3, mensaje4, mensaje5;
var mensaje1 = new Image();
var mensaje2 = new Image();
var mensaje3 = new Image();
var mensaje4 = new Image();
var mensaje5 = new Image();
var auxiliar = 0;
var llegada;

var tutorial = 1;
var t1 = false;
var t2 = false;
var t3 = false;
var t4 = false;
var t5 = false;

var mini = 22;
var miniaumento = 0.06568;

var longitud = -5100;

var valor1 = 200;//valor costal
var valor2 = 300;// valor globo

var finalStage = false;
var aterrizaje = false;

var mvelocidad = 0;
//------------------------------------------------------------------------------
//
window.onload = function() {
    micanvas = document.getElementById('canvas');
    loop = document.getElementById('loop');
    audio = document.getElementById('corriente');
    ganar = document.getElementById('llegada');
    cash = document.getElementById('cash');
    globo = document.getElementById('globo');
    contexto = micanvas.getContext('2d');
    barra.src = "media/panelUp.png";
    mavatar.src = "media/miniA.png";

    mensaje1.src = "media/tuto1.png";
    mensaje2.src = "media/tuto2.png";
    mensaje3.src = "media/tuto3.png";
    mensaje4.src = "media/tuto4.png";
    mensaje5.src = "media/tuto5.png";



    inicializar();
    intervals();
};
//------------------------------------------------------------------------------
//Inicializador
function inicializar() {
    Width = parseInt(micanvas.width);
    Height = parseInt(micanvas.height);
    avatar = new Avatar(Width, Height, 80);
    auxiliar = avatar.angulo1;
    llegada = new Llegada();
    mundo = new Mundo(longitud);
    listaObjetos[0] = new Objeto(1000, 1);
    listaCorrientes[0] = new Corriente(1300);
    listaObjetos[1] = new Objeto(2000, 1);
    listaObjetos[2] = new Objeto(2100, 1);
    listaObjetos[3] = new Objeto(2200, 1);
    listaObjetos[4] = new Objeto(2300, 1);
    listaObjetos[5] = new Objeto(2400, 1);
    listaCorrientes[1] = new Corriente(2700);
    listaObjetos[6] = new Objeto(3800, 2);
    listaObjetos[7] = new Objeto(3500, 1);
    listaObjetos[8] = new Objeto(4200, 1);
    listaObjetos[9] = new Objeto(4300, 1);
    listaCorrientes[2] = new Corriente(4300);
    listaObjetos[10] = new Objeto(5000, 2);
    listaObjetos[11] = new Objeto(5400, 2);
    mvelocidad = mundo.velocidad;
    
    contexto.fillStyle = "#FFFFFF";	
    contexto.font='Bold 20px  Verdana';


}
//------------------------------------------------------------------------------
//Hilos del juego
function intervals() {
    setInterval(startGame, 5);
    setInterval(verificarColisiones, 5);
}
//------------------------------------------------------------------------------
//
function startGame() {
    clear();
    if (pause == false) {
        verificarColisiones();
        verificarAngulo();
        moverFondo();
        soltarObjetos();
    }
    else {

    }
    dibujarSprites();
}
//------------------------------------------------------------------------------
//Clear canvas
function clear() {
    micanvas.width = micanvas.width;
}

//------------------------------------------------------------------------------
function dibujarSprites() {
    contexto.drawImage(mundo.img, mundo.cx, 0);
    contexto.drawImage(llegada.img, llegada.cx, llegada.cy, llegada.w, llegada.h);
    contexto.drawImage(avatar.img, avatar.cx, avatar.cy);



//    if (pause) {
//        switch (mensaje) {
//            case 0:
//                break;
//            case 1:
//                break;
//            case 3:
//                break;
//        }
//
//    }

    for (var c = 0; c < listaCorrientes.length; c++) {
        contexto.drawImage(listaCorrientes[c].img, listaCorrientes[c].cx, listaCorrientes[c].cy, 50, 50);
    }

    for (var c = 0; c < listaObjetos.length; c++) {
        if (listaObjetos[c].activo) {
            contexto.drawImage(listaObjetos[c].img, listaObjetos[c].cx, listaObjetos[c].cy, listaObjetos[c].w, listaObjetos[c].h);
        }
    }


    contexto.drawImage(barra, 0, 0);
    contexto.drawImage(mavatar, mini, 20);
    contexto.fillText('Puntaje: ' + avatar.creditos, 650, 45);
    contexto.drawImage(mundo.velocimetro, mundo.vcx, mundo.vcy, 120, 120);


    switch (tutorial) {
        case 1:
            if (mini > 30 && t1 == false) {
                pause = true;
                contexto.drawImage(mensaje1, 200, 200);

            }
            break;
        case 2:
            if (mini > 60 && t2 == false) {
                pause = true;
                contexto.drawImage(mensaje2, 200, 200);
            }
            break;
        case 3:
            if (mini > 90 && t3 == false) {
                pause = true;
                contexto.drawImage(mensaje3, 200, 200);
            }
            break;
        case 4:
            if (mini > 150 && t4 == false) {
                pause = true;
                contexto.drawImage(mensaje5, 200, 200);
            }
            break;
        case 5:
            if (mini > 430 && t5 == false) {
                pause = true;
                contexto.drawImage(mensaje4, 200, 200);
            }
            break;
    }




}
//------------------------------------------------------------------------------
//



//------------------------------------------------------------------------------
function verificarColisiones() {
    //Verificar si el avatar llegó al piso, sino seguir cayendo
    if (avatar.cy > avatar.ly - avatar.height) {
        avatar.caida = true;
    } else {
        if (pause == false) {
            avatar.cy += avatar.velCaida;
        }

    }


    //Verifica si el avatar llegó al final de mapa
    if (mundo.cx <= mundo.lx && avatar.caida == false) {
        avatar.cx += 0.2;
    }

    //COLISIÓN DE CORRRIENTES
    for (var c = 0; c < listaCorrientes.length; c++) {
        if (colision(avatar.cx, avatar.cy, avatar.w, avatar.h, listaCorrientes[c].cx, listaCorrientes[c].cy, listaCorrientes[c].w, listaCorrientes[c].h)) {
            if (listaCorrientes[c].activo) {
                listaCorrientes[c].activo = false;
                avatar.subir = true;
                avatar.cy = listaCorrientes[c].cy;
                avatar.img.src = "media/avatar0.png";
                audio.play();
            }
        }
    }
    //COLISION DE OBJETOS
    for (var c = 0; c < listaObjetos.length; c++) {
        if (colision(avatar.cx, avatar.cy, avatar.w, avatar.h, listaObjetos[c].cx, listaObjetos[c].cy, listaObjetos[c].w, listaObjetos[c].h)) {
            if (listaObjetos[c].activo) {
                if (listaObjetos[c].tipo == 1) {
//                    cash.pause();
//                    cash.currentTime = 0;

                    avatar.creditos += valor1;
                    cash.play();

                } else {
                    avatar.creditos += valor2;
                    globo.play();
                }
                listaObjetos[c].activo = false;

                if (mensaje == 0) {
                    //pause = true;
                    mensaje++;
                }
            }
        }
    }
    //COLISIÓN CON LA PLATAFORMA
    if (colision(avatar.cx, avatar.cy, avatar.w, avatar.h, llegada.cx, llegada.cy, llegada.w, llegada.h)) {
if(llegada.activo){
        loop.pause();
        avatar.cx = llegada.cx;
        avatar.caida = true;
        //avatar.img.src = "media/avatar0.png";
        llegada.activo = false;
            ganar.play();        
        if (Llegada.fin == false) {
            avatar.creditos += 2000;

        }

}
    }
}
//------------------------------------------------------------------------------
//
function colision(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (y1 > y2 + 10 && y1 < y2 + h2 || y1 + h1 > y2 + 10 && y1 + h1 < y2 + h2) {
        if (x1 + w1 > x2 + 10 && x1 < x2 + w2 || x1 > x2 && x1 < x2 + w2 - 20) {
            return true;
        }
    }
}
//------------------------------------------------------------------------------
function moverFondo() {
    if (avatar.subir) {
        if (avatar.velCaida < -0.5) {
            avatar.velCaida = -0.5;
        } else {
            avatar.velCaida = -avatar.cy * 0.002;
        }
        avatar.img.src = "media/avatar0.png";
        if (avatar.cy < 60) {
            avatar.velCaida = 0.05;
            avatar.subir = false;
        }
    }
    if (mundo.cx > mundo.lx && avatar.caida == false) {
        mundo.cx -= mundo.vel;
        llegada.cx -= mundo.vel;

        for (var c = 0; c < listaCorrientes.length; c++) {
            listaCorrientes[c].cx -= mundo.vel;
        }

        for (var c = 0; c < listaObjetos.length; c++) {
            listaObjetos[c].cx -= mundo.vel;
        }
    }
    if (mini < 470 && avatar.caida == false) {
        mini += miniaumento;
    }


    if (avatar.cy > 490) {
        avatar.caida2 = true;
        if (avatar.cy > 490 && avatar.cy < 500) {
            avatar.img.src = "media/baja1.png";
        }
        else if (avatar.cy > 500 && avatar.cy < 510) {
            avatar.img.src = "media/baja2.png";
        }
        else if (avatar.cy > 510 && avatar.cy < 520) {
            avatar.img.src = "media/baja3.png";
        }
        else if (avatar.cy > 520 && avatar.cy < 525) {
            avatar.img.src = "media/baja4.png";
        }
    }



}
//------------------------------------------------------------------------------
function verificarAngulo() {
    switch (avatar.angulo) {
        case -1:

            if (avatar.velCaida < 0.3) {
                avatar.velCaida += 0.001;

            }

            if (mundo.vel < 0.1) {
                mundo.vel += 0.001;

            }
            //mundo.vel = 0.9;
            //avatar.velCaida = 0.2;
            break;
        case 0:


            if (avatar.velCaida > 0.1) {
                avatar.velCaida -= 0.001;

            }

            if (mundo.vel > 0.8) {
                mundo.vel -= 0.001;
            }
            //mundo.vel = 0.8;
            //avatar.velCaida = 0.1;
            break;
    }


    if (avatar.velCaida > 0.8 && avatar.velCaida < 0.1) {
        avatar.angulo1 = 0;
        mundo.velocidad = 0;


    }
    else if (avatar.velCaida > 0.1 && avatar.velCaida < 0.13) {
        avatar.angulo1 = 1;
        mundo.velocidad = 1;


    }
    else if (avatar.velCaida > 0.13 && avatar.velCaida < 0.16) {
        avatar.angulo1 = 2;
        mundo.velocidad = 2;

    }
    else if (avatar.velCaida > 0.16 && avatar.velCaida < 0.2) {
        avatar.angulo1 = 3;
        mundo.velocidad = 3;
    }
    else if (avatar.velCaida > 0.2 && avatar.velCaida < 0.23) {
        avatar.angulo1 = 4;
        mundo.velocidad = 4;
    }
    else if (avatar.velCaida > 0.23 && avatar.velCaida < 0.26) {
        avatar.angulo1 = 5;
        mundo.velocidad = 5;
    }
    else if (avatar.velCaida > 0.26 && avatar.velCaida < 0.3) {
        avatar.angulo1 = 6;
        mundo.velocidad = 6;
    }
    else if (avatar.velCaida > 0.1 && avatar.velCaida < 0.13) {
        avatar.angulo1 = 7;
        mundo.velocidad = 7;
    }

    if (avatar.angulo1 != auxiliar) {
        auxiliar = avatar.angulo1;
        if (avatar.caida == false) {
            avatar.setImage();
        }

    }

    if (mundo.velocidad != mvelocidad) {
        mvelocidad = mundo.velocidad;
        mundo.setImage();


    }



}
//------------------------------------------------------------------------------
function soltarObjetos() {
    for (var c = 0; c < listaObjetos.length; c++) {
        if (listaObjetos[c].cx < 800) {
            if (listaObjetos[c].tipo == 1) {
                listaObjetos[c].cy += 0.5;
            } else {
                listaObjetos[c].cy -= 0.5;
            }
        }
    }
}

//------------------------------------------------------------------------------
// Detectar presionar tecla
window.onkeydown = function(e) {
    e.preventDefault();
    var keyCode = e.keyCode || e.which || window.Event;
    switch (keyCode) {
        case (32):
            //pause = false;
            break;
        case (38):
            //Up arrow
            if (avatar.angulo == -1) {
                avatar.angulo = 0;
            }
            break;
        case (40):
            //Down arrow
            if (avatar.angulo == 0) {
                avatar.angulo = -1;
            }
            break;

        case(13):
            if(avatar.caida){
                document.location='Tienda.html';
            }
            if (t5 == false && t4 == true && mini > 430) {
                t5 = true;
                tutorial++;
            }
            if (t4 == false && t3 == true && mini > 150) {
                t4 = true;
                tutorial++;
            }
            if (t3 == false && t2 == true && mini > 90) {
                t3 = true;
                tutorial++;
            }
            if (t2 == false && t1 == true && mini > 60) {
                t2 = true;
                tutorial++;
            }
            if (t1 == false && mini > 30) {
                t1 = true;
                tutorial++;
            }
            break;
    }
    //avatar.giro();




    if (pause == true) {
        pause = false;
    }

}
//------------------------------------------------------------------------------
//Detectar subida de tecla
window.onkeyup = function(e) {
    e.preventDefault();
    var keyCode = e.keyCode || e.which || window.Event;
    switch (keyCode) {
        case (38):
            break;
        case (40):
            break;
    }
}
