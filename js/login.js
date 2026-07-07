// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

// Navigation
function showSection(id) {
  const pages = {
    home: 'index.html',
    planos: 'planos.html',
    contato: 'contato.html',
    empresas: 'empresas.html',
    projectos: 'projectos.html',
    downloads: 'downloads.html',
    login: 'login.html'
  };

  if (pages[id]) window.location.href = pages[id];
}

// Mobile menu
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  if (!menu || !btn) return;
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  if (!menu || !btn) return;
  menu.classList.remove('open');
  btn.classList.remove('open');
}

// Scroll animations
function observeFadeIns() {
  const activeSection = document.querySelector('section.active');
  if (!activeSection) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('#' + activeSection.id + ' .fade-in').forEach(el => io.observe(el));
}
observeFadeIns();

// Form submission
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const feedback = document.getElementById('formFeedback');
  const btn = document.getElementById('submitBtn');

  // Sanitize inputs
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const assunto = form.assunto.value;
  const mensagem = form.mensagem.value.trim();

  // Validate
  if (!nome || nome.length < 2) { showError('Por favor, informe seu nome completo.'); return; }
  if (!isValidEmail(email)) { showError('Por favor, informe um e-mail válido.'); return; }
  if (!assunto) { showError('Por favor, selecione um assunto.'); return; }
  if (!mensagem || mensagem.length < 20) { showError('Por favor, escreva uma mensagem com pelo menos 20 caracteres.'); return; }

  // Simulate API call (Spring Boot endpoint: POST /api/contato)
  btn.innerHTML = '<span>Enviando...</span>';
  btn.disabled = true;

  setTimeout(() => {
    feedback.className = 'form-feedback success show';
    feedback.textContent = '✓ Mensagem enviada com sucesso! Nossa equipe retornará em até 24 horas úteis.';
    form.reset();
    btn.innerHTML = '<span>Enviar Mensagem →</span>';
    btn.disabled = false;
    setTimeout(() => feedback.classList.remove('show'), 6000);
  }, 1800);

  function showError(msg) {
    feedback.className = 'form-feedback error show';
    feedback.textContent = '✕ ' + msg;
    setTimeout(() => feedback.classList.remove('show'), 5000);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  const feedback = document.getElementById('loginFeedback');
  const email = form.email.value.trim();
  const senha = form.senha.value.trim();

  if (!isValidEmail(email)) {
    feedback.className = 'form-feedback error show';
    feedback.textContent = '✕ Informe um e-mail válido.';
    return;
  }

  if (senha.length < 6) {
    feedback.className = 'form-feedback error show';
    feedback.textContent = '✕ A senha deve ter pelo menos 6 caracteres.';
    return;
  }

  feedback.className = 'form-feedback success show';
  feedback.textContent = '✓ Login validado. Redirecionando para empresas cadastradas...';
  setTimeout(() => {
    window.location.href = 'empresas.html';
  }, 1200);
}
