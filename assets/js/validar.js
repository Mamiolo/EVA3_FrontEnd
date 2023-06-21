//cambiar el color de los campos de rojo a verde mediante el CSS

const validarCampos = () => {
    const campos = obtenerCampos();
    let valido = true;
  
    for (const campo in campos) {
      if (campos.hasOwnProperty(campo)) {
        if (campos[campo] === '') {
          document.getElementById(campo).classList.add('invalid');
          valido = false;
        } else {
          document.getElementById(campo).classList.remove('invalid');
        }
      }
    }
  
    return valido;
    
  };
