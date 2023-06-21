// Obtiene los valores de los campos del formulario y los devuelve como un objeto
const obtenerCampos = () => {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const edad = document.getElementById('edad').value;
    const telefono = document.getElementById('telefono').value;
    const fecha = document.getElementById('fecha').value;
    const gusto = document.getElementById('gusto').value;
    const comentarios = document.getElementById('comentarios').value;
    const ofertas = document.getElementById('ofertas').checked;
  
    return {
      nombre,
      email,
      edad,
      telefono,
      fecha,
      gusto,
      comentarios,
      ofertas,
    };
  };
  
  // Resetea los valores de todos los campos del formulario
  const limpiarFormulario = () => {
    document.getElementById('formulario').reset();
  };
  
  // Crea un botón "Guardar cambios" y lo agrega al formulario
  const agregarBotonGuardarCambios = (indice) => {
    const botonGuardar = document.createElement('button');
    botonGuardar.textContent = 'Guardar cambios';
    botonGuardar.id = 'btnGuardarCambios';
    botonGuardar.addEventListener('click', () => {
      const personas = obtenerPersonas();
      personas[indice] = obtenerCampos();
      guardarPersonas(personas);
  
      limpiarFormulario();
      cargarTabla();
      document.getElementById('btnGuardarCambios').remove();
    });
  
    const formulario = document.getElementById('formulario');
    formulario.appendChild(botonGuardar);
  };
  
  // Obtiene los datos de personas almacenados en el localStorage
  const obtenerPersonas = () => {
    const personasStr = localStorage.getItem('personas');
    return personasStr ? JSON.parse(personasStr) : [];
  };
  
  // Guarda un arreglo de personas en el localStorage
  const guardarPersonas = (personas) => {
    localStorage.setItem('personas', JSON.stringify(personas));
  };
  
  // Elimina una persona del arreglo de personas en la posición especificada por el índice
  // y evita la modificación de los campos del formulario
  const eliminarPersona = (indice) => {
    const personas = obtenerPersonas();
    const campos = personas[indice];
  
    document.getElementById('nombre').value = campos.nombre ;
    document.getElementById('email').value = campos.email;
    document.getElementById('edad').value = campos.edad;
    document.getElementById('telefono').value = campos.telefono;
    document.getElementById('fecha').value = campos.fecha;
    document.getElementById('gusto').value = campos.gusto;
    document.getElementById('comentarios').value = campos.comentarios;
    document.getElementById('ofertas').checked = campos.ofertas;

    document.getElementById('nombre').readOnly = true;
    document.getElementById('email').readOnly = true;
    document.getElementById('edad').disabled = true;
    document.getElementById('telefono').readOnly = true;
    document.getElementById('fecha').readOnly = true;
    document.getElementById('gusto').disabled = true;
    document.getElementById('comentarios').readOnly = true;
    document.getElementById('ofertas').disabled = true;
    personas.splice(indice, 1);
    guardarPersonas(personas);
    cargarTabla();
  };
  
  // Edita una persona cargando sus datos en los campos del formulario
  const editarPersona = (indice) => {
    const personas = obtenerPersonas();
    const campos = personas[indice];
  
    document.getElementById('nombre').value = campos.nombre;
    document.getElementById('email').value = campos.email;
    document.getElementById('edad').value = campos.edad;
    document.getElementById('telefono').value = campos.telefono;
    document.getElementById('fecha').value = campos.fecha;
    document.getElementById('gusto').value = campos.gusto;
    document.getElementById('comentarios').value = campos.comentarios;
    document.getElementById('ofertas').checked = campos.ofertas;

    document.getElementById('nombre').readOnly = false;
    document.getElementById('email').readOnly = false;
    document.getElementById('edad').disabled = false;
    document.getElementById('telefono').readOnly = false;
    document.getElementById('fecha').readOnly = false;
    document.getElementById('gusto').disabled = false;
    document.getElementById('comentarios').readOnly = false;
    document.getElementById('ofertas').disabled = false;
  
    agregarBotonGuardarCambios(indice);
  };
  
  // Carga los datos de personas en una tabla y la agrega al elemento tabla con el ID "contenedorTabla"
  const cargarTabla = () => {
    const personas = obtenerPersonas();
    const tabla = document.createElement('table');
    tabla.classList.add('table', 'borde_table', 'bg-black', 'text_green',);
  
    const encabezado = document.createElement('tr');
    encabezado.innerHTML = `
      <th>Nombre</th>
      <th>Email</th>
      <th>Edad</th>
      <th>Teléfono</th>
      <th>Fecha</th>
      <th>Gusto</th>
      <th>Comentarios</th>
      <th>Ofertas</th>
      <th>Acciones</th>
    `;
    tabla.appendChild(encabezado);
  
    for (let i = 0; i < personas.length; i++) {
      const campos = personas[i];
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${campos.nombre}</td>
        <td>${campos.email}</td>
        <td>${campos.edad}</td>
        <td>${campos.telefono}</td>
        <td>${campos.fecha}</td>
        <td>${campos.gusto}</td>
        <td>${campos.comentarios}</td>
        <td>${campos.ofertas ? 'Sí' : 'No'}</td>
        <td>
          <button class="btnEditar btn btn-outline-light" data-indice="${i}">Editar</button>
          <button class="btnEliminar btn btn-outline-light" data-indice="${i}">Eliminar</button>
        </td>
      `;
  
      const btnEditar = fila.querySelector('.btnEditar');
      btnEditar.addEventListener('click', (e) => {
        const indice = parseInt(e.target.dataset.indice);
        if (!isNaN(indice)) {
          editarPersona(indice);
        }
      });
  
      const btnEliminar = fila.querySelector('.btnEliminar');
      btnEliminar.addEventListener('click', (e) => {
        const indice = parseInt(e.target.dataset.indice);
        if (!isNaN(indice)) {
          eliminarPersona(indice);
        }
      });
  
      tabla.appendChild(fila);
    }
  
    const contenedorTabla = document.getElementById('contenedorTabla');
    contenedorTabla.innerHTML = '';
    contenedorTabla.appendChild(tabla);
  };
  
  // Valida los campos del formulario y, si son válidos, agrega la persona y recarga la tabla
  const enviarFormulario = () => {
    if (validarCampos()) {
      const personas = obtenerPersonas();
      const campos = obtenerCampos();
      personas.push(campos);
      guardarPersonas(personas);
      limpiarFormulario();
      cargarTabla();
      document.getElementById('btnGuardarCambios').remove();
    }
  };
  
  // Llama las funciones al utilizar el botón de enviar
  const formulario = document.getElementById('formulario');
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    enviarFormulario();
  });
  
  // Carga la tabla al cargar la página
  window.addEventListener('load', cargarTabla);
  