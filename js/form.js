const email_fale_comigo = "falecomigo@eliascosta.com.br";

function AbreFormularioEnvioMensagem(){
    Swal.fire({
        title: '<span class="titulo-formulario">Me envie uma mensagem</span>',
        confirmButtonText: 'Enviar',
        showCloseButton : true,
        html:
    '<div style="text-align:left">' +
        '<label for="nome" >Seu Nome</label>'+
        '<input id="nome" maxlength="30" class="swal2-input">'+
    '</div>'+
    '<div style="text-align:left">' +
        '<label for="email">Seu E-mail</label>'+
        '<input id="email" maxlength="50" class="swal2-input" type="email">'+
    '</div>'+
    '<div style="text-align:left">' +
        '<label for="mensagem">Mensagem</label>'+
        '<textarea id="mensagem" class="swal2-textarea" rows="40" cols="30"></textarea>'+
    '</div>'
      }).then((result) => {
        if (result.value) {
          sendEmail();
        }
      })
}

document.addEventListener("DOMContentLoaded", function(event) {
  OnScroll();

  document.getElementById('menu-opcoes').addEventListener('click',() => {
    document.getElementById('menu-hamburguer').checked = false;
  });
});

window.onscroll = function() {OnScroll()};

function OnScroll(){
  /*var header = document.getElementById('myHeader');
 
  if(window.innerWidth > 991){
    if(window.pageYOffset == 0){   
      header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
  
    else if(window.pageYOffset > 407){  
      header.style.backgroundColor = 'black';
    }
  }else{
    //header.style.backgroundColor = 'black';
  }*/
  
}

function sendEmail(){
  let url = 'https://rest-api-cobaia.herokuapp.com/sendemail'; //http://localhost:3000/sendemail

  let dados = {}; 
  dados.user = email_fale_comigo;
  dados.from = document.getElementById('email').value;
  dados.to = email_fale_comigo;
  
  dados.text = document.getElementById('mensagem').value;
  dados.name = document.getElementById('nome').value;

  dados.subject = `${dados.name.toUpperCase()} ENVIOU MENSAGEM `;

$.post(url,dados,(response)=>{
  
  Swal.fire(
    'Mensagem enviada!',
    'Em breve você será respondido.',
    'success'
  )

}).catch((err) => {
  console.log('err :',err)
  Swal.fire(
    '<span style="font-size:1.5rem">Nos desculpe! :( ' +'</br>'+ 
    'Houve um erro ao enviar a sua mensagem!</span>',
    '<span style="font-size:1rem"></br>Entre em contato comigo pelas minhas redes sociais ou pelo meu whatsapp!'+'</br>'+
    '</br>Você também pode enviar um e-mail para <span style="color:orangered">falecomigo@eliascosta.com.br</span>'+'</br>'+
    '</br>Tente novamente mais tarde!</span>',
    'error'
  )

});
}
