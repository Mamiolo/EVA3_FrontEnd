// cambia el color de la página con el modo-claro y modo-oscuro

var handleContraste = ()=>{
  let btn = document.getElementById('btnContraste');
  let estado = btn.value
  if(estado=='o'){
      btn.value = 'c';
      let elements = document.getElementsByClassName('modo-oscuro');
      console.log(elements)
      console.log(elements[0])
      console.log(elements[0].classList)
      elements[0].classList.add('modo-claro');
      console.log(elements[0].classList)
      elements[0].classList.remove('modo-oscuro');
  }
  else if(estado=='c'){
      btn.value = 'o';
      let elements = document.getElementsByClassName('modo-claro');
      console.log(elements)
      elements[0].classList.add('modo-oscuro');
      elements[0].classList.remove('modo-claro');
  }

}
  
//Cambia la fuente de la página mediante la clase tex-normal/tex-grande

var handleFuente = ()=>{
    let btn = document.getElementById('btnFuente')
    let estado = btn.value;
    if(estado=='0'){
        btn.value = '1';
        let elements = document.getElementsByClassName("tex-normal");
        for (let index = 0; index < elements.length; index++){
            const element = elements[index];
            console.log(element)
            element.classList.add("tex-grande");
            element.classList.remove("tex-normal");
        }

        console.log(elements)
    }
    else if(estado == '1'){
        btn.value = '0';
        let elements = document.getElementsByClassName("tex-grande");
        for (let index = 0; index < elements.length; index++){
            const element = elements[index];
            console.log(element)
            element.classList.add("tex-normal");
            element.classList.remove("tex-grande");
        }

    }
}


document.getElementById("btnContraste").addEventListener('click',handleContraste)
document.getElementById("btnFuente").addEventListener('click',handleFuente)