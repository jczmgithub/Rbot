// Funcion js para la funcion de tab del apartado leyendas

function openLegend(evt, divEvent) {

    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(divEvent).style.display = "block";
    evt.currentTarget.className += " active";

}

// Funcion para activar el siguiente campo del formulario de control robot

function enableMotor(event) {
    console.log(event);
    for(var i = 0;i < event.path.length; i++) {

        if(event.path[i].nodeName == "TR") {
            var tr = event.path[i];
            tr.querySelector("select[name='selecMotor']").disabled = false;

            return;
        }
    }

    // document.getElementById("selecMotor").disabled = false;
}

function enablePasosVelocidad() {
    document.getElementById("pasosForm").disabled=false;
    document.getElementById("velocidadForm").disabled=false;

}

//pruebas mandar json en curpo de post

function send() {

    var datos = {
        robot: $("#selecRobot").val(),
        motor: $("#selecMotor").val(),
        pasos: $("#pasosForm").val(),
        velocidad: $("#velocidadForm").val()
    };

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/prueba',
        type: 'post',
        dataType: 'text',
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            alert("fallo");
        },
        complete: function (data) {
            alert("esto se hace siempre");
        },
        data: datos
    });
}

function enableGuardar() {
    document.getElementById("guardar").disabled=false;
}

function enableEnviar() {
    document.getElementById("enviar").disabled=false;
}

$(document).ready(function (){
    try {
        openLegend(null,"divMando");
    } catch (e) {
        console.error("Error on openLegeng");
    }

    document.getElementById("selecRobot").addEventListener("change", enableMotor);
    document.getElementById("selecMotor").addEventListener("change", enablePasosVelocidad);

});

$(document).ready(function(){
    $("#añadirColumna").on("click",function(){
        $clone=$("table tbody tr:first").clone();
        $clone.find("input").each(function(){
            $(this).val("");
        });
        $("table tbody").append($clone);
    });
});