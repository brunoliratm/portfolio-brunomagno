document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contatoForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();
      
      if (!nome || !email || !mensagem) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
      }
      
      const mailtoLink = `mailto:bmagnoserver@gmail.com?subject=Contato de ${encodeURIComponent(nome)}&body=${encodeURIComponent(mensagem)}%0A%0AEmail: ${encodeURIComponent(email)}`;
      
      const successMessage = document.createElement("div");
      successMessage.className = "form-success";
      successMessage.innerHTML = `
        <h3>Mensagem enviada!</h3>
        <p>Obrigado pelo contato, ${nome}. Responderei em breve.</p>
        <button id="closeSuccessMessage">OK</button>
      `;
      
      contactForm.style.display = "none";
      contactForm.parentNode.appendChild(successMessage);
      
      document.getElementById("closeSuccessMessage").addEventListener("click", function() {
        successMessage.remove();
        contactForm.style.display = "flex";
        contactForm.reset();
      });
      
      window.location.href = mailtoLink;
    });
  }
});
