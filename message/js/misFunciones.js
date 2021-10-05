function traerInformacion(){
$.ajax({
url:"https://g2f4248dfac9dfe-room.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
type:"GET",
datatype:"JSON",
success: function(respuesta){
  console.log(respuesta);
  pintarRespuesta(respuesta.items)

}
});
}


function pintarRespuesta(items){
    let myTable="<table>";
    for(i=0;i< items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].messagetext+"</td>";
        myTable+="<td> <button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
}





function pintarRespuestaRoom(items){
    let myTable="<table>";
    for(i=0;i< items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].room+"</td>";
        myTable+="<td>"+items[i].stars+"</td>";
        myTable+="<td>"+items[i].category_id+"</td>";
        myTable+="<td>"+items[i].description+"</td>";
        myTable+="<td> <button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoRoom").append(myTable);
}

function traerInformacionRoom(){
    $.ajax({
    url:"https://g2f4248dfac9dfe-room.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
    type:"GET",
    datatype:"JSON",
    success: function(respuesta){
      console.log(respuesta);
      pintarRespuestaRoom(respuesta.items)
    
    }
    })
    }


function guardarInformacion(){
    let myData={
        id:$("#id").val(),
        messagetext:$("#message").val(),
        
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g2f4248dfac9dfe-room.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#message").val("");
           
            traerInformacion();
            alert("se ha guardado el mensaje")
        }
    });
}

function editarInformacion(){
    let myData={
        id:$("#id").val(),
        messagetext:$("#message").val(),
      
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g2f4248dfac9dfe-room.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#message").val("");
            traerInformacion();
            alert("se ha actualizado la tabla mensaje")
        }
    });
}

function borrarElemento(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g2f4248dfac9dfe-room.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion();
            alert("Se ha eliminado el mensaje.")
        }
    });
}

