
document.onkeypress = function (e) {
    e = e || window.event;
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;

    //PARA SALTAR
    if (e.which == 32) {
        var saltar = document.querySelector('[camera]').getAttribute('position');
        document.querySelector('[camera]').setAttribute('position', { x: saltar.x, y: saltar.y + 1, z: saltar.z });
    }
    //PARA RETORNAR
    if (e.which == 13) {
        document.querySelector('[camera]').setAttribute('position', { x: 22, y: 3, z: 15 });
    }


    if (charCode) {
        var cameraEl = document.querySelector('[camera]').getAttribute('position');
    }
};


//  PARA SABER EL ID DE LAS ETIQUETAS AL HACER CLICK
function myFunctionid(comp) {
    let id = comp.id;
    alert(id);
}


// FUNCION PARA ESCRIBIR LAS ETIQUETAS
function escribir(cod, x, y, z) {
    var sceneEl = document.querySelector('#c');
    var entityEl = document.createElement('a-entity');
    entityEl.setAttribute('material', 'color', 'lightgrey');
    entityEl.setAttribute('geometry', { primitive: "plane", height: "1.5", width: "3" });
    entityEl.setAttribute('position', { x: x, y: y, z: z });
    entityEl.setAttribute('onclick', 'myFunctionid(this);');
    entityEl.setAttribute('name', cod);
    entityEl.setAttribute('id', cod);
    entityEl.setAttribute('text', 'value', cod);
    entityEl.setAttribute('text', 'align', 'center');
    entityEl.setAttribute('text', 'width', '30');
    entityEl.setAttribute('text', 'color', '#000000');
    entityEl.setAttribute('scale', '0.1 0.1 0.1');
    //entityEl.setAttribute('text', 'font', 'mozillavr');
    //entityEl.setAttribute('text', 'baseline', 'bottom');
    //  ROTACION A LAS ETIQUETAS TRASERAS
    if (cod == "118" || cod == "119" || cod == "120" || cod == "121" || cod == "122" || cod == "123" || cod == "124" || cod == "125" || cod == "126") {
        entityEl.setAttribute('rotation', { x: 0, y: 180, z: 0 });
    }
    sceneEl.appendChild(entityEl);
}

// INFORMACION DE LAS ETIQUETAS
const y1 = 1.5;
const z1 = 4.4;
const z12 = -2.3;
const y2 = 4.2;
const z2 = 4.4;
const y3 = 6.8;
const z3 = 4.4;
const etiquetas = [
    //primer piso
    escribir("101", -6.5, y1, z1),
    escribir("102", -0.4, y1, z1),
    escribir("103", 5.6, y1, z1),
    escribir("104", 10.11, y1, z1),
    escribir("105", 16.17, y1, z1),
    escribir("106", 22.3, y1, z1),
    escribir("107", 28.4, y1, z1),
    escribir("108", 32.8, y1, z1),
    escribir("109", 38.46, y1, z1),
    escribir("110", 39.6, y1, z1),
    escribir("111", 42, y1, z1),
    escribir("112", 44.54, y1, z1),
    escribir("113", 45.64, y1, z1),
    escribir("114", 48.24, y1, z1),
    escribir("115", 50.6, y1, z1),
    escribir("116", 51.7, y1, z1),
    escribir("117", 54.17, y1, z1),
    //primer piso parte trasera
    escribir("118", 38.1, y1, z12),
    escribir("119", 39.1, y1, z12),
    escribir("120", 41.5, y1, z12),
    escribir("121", 44.04, y1, z12),
    escribir("122", 45.14, y1, z12),
    escribir("123", 47.76, y1, z12),
    escribir("124", 50.4, y1, z12),
    escribir("125", 51.4, y1, z12),
    escribir("126", 54, y1, z12),


    //segundo  piso
    escribir("201", -6.5, y2, z2),
    escribir("202", -0.4, y2, z2),
    escribir("203", 5.6, y2, z2),
    escribir("204", 10.11, y2, z2),
    escribir("205", 16.17, y2, z2),
    escribir("206", 22.3, y2, z2),
    escribir("207", 32.8, y2, z2),
    escribir("208", 39.6, y2, z2),
    escribir("209", 51.7, y2, z2),

    //tercer  piso
    escribir("301", -6.5, y3, z3),
    escribir("302", -0.4, y3, z3),
    escribir("303", 5.6, y3, z3),
    escribir("304", 10.11, y3, z3),
    escribir("305", 16.17, y3, z3),
    escribir("306", 22.3, y3, z3),
    escribir("307", 32.8, y3, z3),
    escribir("308", 39.6, y3, z3),
    escribir("309", 43.38, y3, z3),
    escribir("310", 47, y3, z3),
    escribir("311", 48.2, y3, z3),
    escribir("312", 51.7, y3, z3),

];