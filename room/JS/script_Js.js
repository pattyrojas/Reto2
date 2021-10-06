let urlConexion = "https://gbcc1429a7695a6-database.adb.sa-santiago-1.oraclecloudapps.com";
let moduloRoom = "/ords/admin/room/room";
let mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function editarRoom(id) {
	event.preventDefault();
	$.ajax({
		url: urlConexion + moduloRoom + "/" + id,
		type: 'GET',
		dataType: 'json',
		success: function (json) {
			console.log(json.items);
			$("#txtId").val(json.items[0].id);
			$("#txtRoom").val(json.items[0].room);
			$("#txtStars").val(json.items[0].stars);
			$("#txtCategory_id").val(json.items[0].category_id);
            $("#txtDescription").val(json.items[0].description);
			$("#btnAgregar").hide();
			$("#btnActualizar").show();
			$("#btnCancelar").show();
			$("#lblTitle").html("Actualizar datos");
			$("#txtId").attr('disabled', 'disabled');
		},
		error: function (result) { console.log(result) }
	});
	event.preventDefault();
}

function borrarRoom(codigo) {
	event.preventDefault();
	$.ajax({
		url: urlConexion + moduloRoom,
		type: 'DELETE',
		data: JSON.stringify({
			"id": codigo
		}),
		contentType: 'application/json',
		dataType: 'text',
		error: function (result) { alert('Error: Postman details.'); console.log(result); },
		success: function () { alert('Habitación Eliminada.'); consultarClientes(); }
	});
}

function registrarNuevoRoom() {
	event.preventDefault();
	$.ajax({
		url: urlConexion + moduloRoom,
		data: JSON.stringify({
			"id": $("#txtId").val(),
			"room": $("#txtRoom").val(),
			"stars": $("#txtStars").val(),
			"category_id": $("#txtCategory_id").val(),
            "description": $("#txtDescription").val()
		}),
		type: 'POST',
		contentType: 'application/json',
		dataType: 'text',
		error: function (result) { alert('Error: Postman details.'); console.log(result); },
		success: function () { alert('Habitación Registrada.'); consultarRoom(); }
	});
}

function agregarRoom() {
	event.preventDefault();
	if ($("#txtId").val() === "") {
		alert('Ingrese el ID de la habitación.');
		$("#txtId").focus();
	} else if ($("#txtRoom").val() === "") {
		alert('Ingresa el número de habitación.');
		$("#txtRoom").focus();
	} else if ($("#txtStars").val() === "") {
		alert('Ingresa las estrellas de la habitación.');
		$("txtStars").focus();
	} else if ($("#txtCategory_id").val() === "") {
		alert('Ingresa la categoría de la habitación.');
		$("#txtCategory_id").focus();
	} else {
		registrarNuevoRoom();
	}
}

function crearListaRooms(registros) {
	$("#pnlListaRooms").empty();
	let tblRegistros = "<table id='tblRegistros' width='100%' border='1'>";
	tblRegistros += "<tr>";
	tblRegistros += "<td width='20%'><h4>ID</h4></td>";
	tblRegistros += "<td width='20%'><h4>Room</h4></td>";
	tblRegistros += "<td width='20%'><h4>Stars</h4></td>";
	tblRegistros += "<td width='20%'><h4>Category_id</h4></td>";
    tblRegistros += "<td width='20%'><h4>Descriptions</h4></td>";
	tblRegistros += "<td width='20%'><h4>Options</h4></td>";
	tblRegistros += "</tr>";
	if (registros.length == 0) {
		tblRegistros += "<tr>";
		tblRegistros += "<td colspan='5'><center>No existe información.</center></td>";
		tblRegistros += "</tr>";
	} else {
		for (i = 0; i < registros.length; i++) {
			tblRegistros += "<tr>";
			tblRegistros += "<td>" + registros[i].id + "</td>";
			tblRegistros += "<td>" + registros[i].room + "</td>";
			tblRegistros += "<td>" + registros[i].stars + "</td>";
			tblRegistros += "<td>" + registros[i].category_id + "</td>";
            tblRegistros += "<td>" + registros[i].description + "</td>";
			tblRegistros += "<td><button onclick='borrarRoom(" + registros[i].id + ");'>Eliminar Habitación</;>";
            tblRegistros += "<button onclick='editarRoom(" + registros[i].id + ");'>Editar Reg</button></td>";
			tblRegistros += "</tr>";
		}
	}
	tblRegistros += "</table>";
	$("#pnlListaRooms").append(tblRegistros);
}

function consultarRoom() {
	$.ajax({
		url: urlConexion + moduloRoom,
		type: 'GET',
		dataType: 'json',
		error: crearListaRooms([]),
		success: function (json) { crearListaRooms(json.items); }
	});
	$("#btnAgregar").show();
	$("#btnActualizar").hide();
	$("#btnCancelar").hide();
	$("#txtId").val("");
	$("#txtRoom").val("");
	$("#txtStars").val("");
	$("#txtCategory_id").val("");
    $("#txtDescription").val("");
	$("#lblTitle").html("Nueva Habitación");
	$("#txtId").removeAttr('disabled');
}

function actualizarRoom() {
	event.preventDefault();
	$.ajax({
		url: urlConexion + moduloRoom,
		data: JSON.stringify({
			"id": $("#txtId").val(),
			"room": $("#txtRoom").val(),
			"stars": $("#txtStars").val(),
			"category_id": $("#txtCategory_id").val(),
            "description": $("#txtDescription").val()
		}),
		type: 'PUT',
		contentType: 'application/json',
		dataType: 'text',
		error: function (result) { alert('Error: Postman Details.'); console.log(result); },
		success: function (result) { alert('Habitación Actualizada'); consultarRoom(); }
	});
}