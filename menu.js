
let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')


let darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');  


  // Alterar as classes do ícone aqui
  darkModeToggle.querySelector('i').classList.toggle('bi-sun');
  darkModeToggle.querySelector('i').classList.toggle('bi-moon');
});


btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

function scrollToElement(elementId) {
    document.getElementById(elementId).scrollIntoView({
      behavior: 'smooth'
    });
  }
  
  // Adicionando evento de clique aos links do header
  const links = document.querySelectorAll('header nav a');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();  
   // Impede o comportamento padrão do link
      const targetId = link.getAttribute('href').substring(1);  
   // Obtém o ID do elemento alvo
      scrollToElement(targetId);
    });
  });

  const btnContato = document.querySelector('.btn-contato button');

// Adiciona um ouvinte de evento de clique ao botão
btnContato.addEventListener('click', () => {
    const email = 'seu_email@exemplo.com';
    window.location.href = `mailto:${email}?subject=Contato%20pelo%20site&body=Olá,%20gostaria%20de%20entrar%20em%20contato.`;
});