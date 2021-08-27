class usuario {
    constructor(nombre, apellido, dni, telefono, obraSocial){
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.telefono = telefono;
    this.obraSocial = obraSocial;
    }
}

let Usuarios = [];

function carga(e){
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("dni").value;
    let telefono = document.getElementById("telefono").value;
    let obraSocial = document.getElementById("obraSocial").value;

    const Usuarios = new usuario (nombre, apellido, dni, telefono, obraSocial);

    if (aceptarCarga(Usuarios)){
        const listaUsuarios = cargaUsuarios();

        listaUsuarios.push(Usuarios);
        guardarUsuarios(listaUsuarios);
        document.getElementById("FormularioUsuario").reset();
    }
}


function aceptarCarga(Usuarios){
    let salida = true;
    return salida;
}

function cargaUsuarios(){
    const listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
    if (listaUsuarios == null){
        return [];
    }
    return listaUsuarios;
}

function alta(element){
    const altaUsuario = document.createElement("div")
    altaUsuario.classList.add("altaUsuario", "m-2");

    let btnEliminarUsuario = document.createElement("div")
    btnEliminarUsuario.textContent = "Eliminar";
    btnEliminarUsuario.classList.add("btn", "btn-danger", "float-end");
    btnEliminarUsuario.setAttribute("id", element.dni);
    btnEliminarUsuario.setAttribute("onclick", `eliminarUsuario(${element.dni})`);
    altaUsuario.appendChild(btnEliminarUsuario)


    let nombreUsuario = document.createElement("h4")
    nombreUsuario.textContent =`Nombre: ${element.nombre}`;
    altaUsuario.appendChild(nombreUsuario);
    nombreUsuario.setAttribute("class", "text-primary")

    let apellidoUsuario = document.createElement("div")
    apellidoUsuario.textContent = `Apellido: ${element.apellido}`;
    altaUsuario.appendChild(apellidoUsuario);
    apellidoUsuario.setAttribute("class", "text-primary")

    let dniUsuario = document.createElement("div")
    dniUsuario.textContent = `DNI: ${element.dni}`;
    altaUsuario.appendChild(dniUsuario);
    dniUsuario.setAttribute("class", "text-primary")

    let telefonoUsuario = document.createElement("div")
    telefonoUsuario.textContent = `Teléfono: ${element.telefono}`;
    altaUsuario.appendChild(telefonoUsuario)
    telefonoUsuario.setAttribute("class", "text-primary")

    let osUsuario = document.createElement("div")
    osUsuario.textContent = `Obra Social: ${element.obraSocial}`;
    altaUsuario.appendChild(osUsuario);
    osUsuario.setAttribute("class", "text-primary")

  
    return altaUsuario;
}


function guardarUsuarios(listaUsuarios){
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
    mostrarUsuarios(listaUsuarios);
}

function mostrarUsuarios(listaUsuarios){
    let lista = document.getElementById("listaUsuario");
    lista.textContent = "";
    listaUsuarios.forEach(element => {
        lista.appendChild(alta(element));
    })
}
mostrarUsuarios(cargaUsuarios());



function mostrarForm(){
    document.getElementById("altaUsuario").classList.toggle("oculto");
}

const agregarUsuario = document.getElementById("agregarUsuario");
agregarUsuario.addEventListener("click", mostrarForm);

const formulario = document.getElementById("FormularioUsuario")
formulario.addEventListener("submit", carga);

const btnRemoverUsuarios = document.getElementById("eliminarTodo")
btnRemoverUsuarios.addEventListener("click", removerUsuarios)

function removerUsuarios(){
    localStorage.clear();
    mostrarUsuarios(cargaUsuarios());
}

function eliminarUsuario(dni){
    let listadoUsuarios = cargaUsuarios();
    listadoUsuarios = listadoUsuarios.filter(Usuarios => Usuarios.dni != dni);
    guardarUsuarios(listadoUsuarios);
};