let urlConexion = "https://g83f1de06147000-dbhoteles.adb.sa-santiago-1.oraclecloudapps.com";
let moduloClient = "/ords/admin/client/client";
let mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function editarCliente(id) {
	event.preventDefault();
	$.ajax({
		url: urlConexion + moduloClient + "/" + id,
		type: 'GET',
		dataType: 'json',
		success: function (json) {
			console.log(json.items);
			$("#txtId").val(json.items[0].id);
			$("#txtNombre").val(json.items[0].name);
			$("#txtEmail").val(json.items[0].email);
			$("#txtEdad").val(json.items[0].age);
			$("#btnAgregar").hide();
			$("#btnActualizar").show();
			$("#btnCancelar").show();
			$("#lblTitle").html("Actualizar Cliente");
			$("#txtId").attr('disabled', 'disabled');
		},
		error: function (result) { console.log(result) }
	});
	event.preventDefault();
}

function borrarCliente(codigo) {
	event.preventDefault();
	$.ajax({
		url: urlConexion + moduloClient,
		type: 'DELETE',
		data: JSON.stringify({
			"id": codigo
		}),
		contentType: 'application/json',
		dataType: 'text',
		error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
		success: function () { alert('Usuario Eliminado.'); consultarClientes(); }
	});
}

function registrarNuevoCliente() {
	event.preventDefault();
	$.ajax({
		url: urlConexion + moduloClient,
		data: JSON.stringify({
			"id": $("#txtId").val(),
			"name": $("#txtNombre").val(),
			"email": $("#txtEmail").val(),
			"age": $("#txtEdad").val()
		}),
		type: 'POST',
		contentType: 'application/json',
		dataType: 'text',
		error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
		success: function () { alert('Usuario Agregado.'); consultarClientes(); }
	});
}

function agregarCliente() {
	event.preventDefault();
	if ($("#txtId").val() === "") {
		alert('Ingrese el ID del cliente.');
		$("#txtId").focus();
	} else if ($("#txtNombre").val() === "") {
		alert('Ingrese el nombre del cliente.');
		$("#txtNombre").focus();
	} else if ($("#txtEmail").val() === "") {
		alert('Ingrese el e-mail del cliente.');
		$("#txtEmail").focus();
	} else if (!mail_format.test(($("#txtEmail").val()))) {
		alert('Ingrese un E-mail válido');
		$("#txtEmail").focus();
	} else if ($("#txtEdad").val() === "") {
		alert('Ingrese la edad del cliente.');
		$("#txtEdad").focus();
	} else {
		registrarNuevoCliente();
	}
}

function crearListaClientes(registros) {
	$("#pnlListaClientes").empty();
	let tblRegistros = "<table id='tblRegistros' width='100%' border='1'>";
	tblRegistros += "<tr>";
	tblRegistros += "<td width='20%'><h4>ID</h4></td>";
	tblRegistros += "<td width='20%'><h4>Nombre</h4></td>";
	tblRegistros += "<td width='20%'><h4>E-mail</h4></td>";
	tblRegistros += "<td width='20%'><h4>Edad</h4></td>";
	tblRegistros += "<td width='20%'><h4>Acciones</h4></td>";
	tblRegistros += "</tr>";
	if (registros.length == 0) {
		tblRegistros += "<tr>";
		tblRegistros += "<td colspan='5'><center>No existen registros.</center></td>";
		tblRegistros += "</tr>";
	} else {
		for (i = 0; i < registros.length; i++) {
			tblRegistros += "<tr>";
			tblRegistros += "<td>" + registros[i].id + "</td>";
			tblRegistros += "<td>" + registros[i].name + "</td>";
			tblRegistros += "<td>" + registros[i].email + "</td>";
			tblRegistros += "<td>" + registros[i].age + "</td>";
			tblRegistros += "<td><button onclick='borrarCliente(" + registros[i].id + ");'>Borrar Cliente</button>";
			tblRegistros += "<button onclick='editarCliente(" + registros[i].id + ");'>Editar Cliente</button></td>";
			tblRegistros += "</tr>";
		}
	}
	tblRegistros += "</table>";
	$("#pnlListaClientes").append(tblRegistros);
}

function consultarClientes() {
	$.ajax({
		url: urlConexion + moduloClient,
		type: 'GET',
		dataType: 'json',
		error: crearListaClientes([]),
		success: function (json) { crearListaClientes(json.items); }
	});
	$("#btnAgregar").show();
	$("#btnActualizar").hide();
	$("#btnCancelar").hide();
	$("#txtId").val("");
	$("#txtNombre").val("");
	$("#txtEmail").val("");
	$("#txtEdad").val("");
	$("#lblTitle").html("Agregar Nuevo Cliente");
	$("#txtId").removeAttr('disabled');
}

function actualizarCliente() {
	event.preventDefault();
	$.ajax({
		url: urlConexion + moduloClient,
		data: JSON.stringify({
			"id": $("#txtId").val(),
			"name": $("#txtNombre").val(),
			"email": $("#txtEmail").val(),
			"age": $("#txtEdad").val()
		}),
		type: 'PUT',
		contentType: 'application/json',
		dataType: 'text',
		error: function (result) { alert('Error: Ver log para detalles.'); console.log(result); },
		success: function (result) { alert('Usuario Actualizado.'); consultarClientes(); }
	});
}