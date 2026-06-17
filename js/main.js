// ════════════════════════════════════════════════════════════
// AMAKIDS — main.js
// Интерактивность: меню, формы, аккордеон, номера
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {

  // ── PRELOADER (исчезает через 1.5 сек) ──
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('gone');
    }
  }, 1500);

  // ── БУРГЕР МЕНЮ ──
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  
  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('active');
    });
    
    // Закрываем меню при клике на ссылку
    const links = nav.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('active');
      });
    });
  }

  // ── АККОРДЕОН (FAQ) ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-q');
    if (button) {
      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        // Закрываем все остальные
        faqItems.forEach(other => other.classList.remove('open'));
        
        // Открываем текущий, если он был закрыт
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // ── ФОРМА РОДИТЕЛЕЙ ──
  const btnParents = document.getElementById('btn-parents');
  if (btnParents) {
    btnParents.addEventListener('click', () => {
      const name = document.getElementById('p-name').value.trim();
      const child = document.getElementById('p-child').value.trim();
      const phone = document.getElementById('p-phone').value.trim();
      const course = document.getElementById('p-course').value;
      
      if (name && child && phone && course) {
        showModal(`Спасибо, ${name}! Свяжемся с вами скоро.`);
        // Очищаем форму
        document.getElementById('p-name').value = '';
        document.getElementById('p-child').value = '';
        document.getElementById('p-phone').value = '';
        document.getElementById('p-course').value = '';
      } else {
        alert('Пожалуйста, заполните все поля');
      }
    });
  }

  // ── ФОРМА ПЕДАГОГОВ ──
  const btnTeachers = document.getElementById('btn-teachers');
  if (btnTeachers) {
    btnTeachers.addEventListener('click', () => {
      const name = document.getElementById('t-name').value.trim();
      const phone = document.getElementById('t-phone').value.trim();
      const dir = document.getElementById('t-dir').value;
      
      if (name && phone && dir) {
        showModal(`${name}, спасибо! Скоро с вами свяжутся.`);
        document.getElementById('t-name').value = '';
        document.getElementById('t-phone').value = '';
        document.getElementById('t-dir').value = '';
      } else {
        alert('Пожалуйста, заполните все поля');
      }
    });
  }

  // ── ПЕРЕКЛЮЧЕНИЕ ТАБОВ ФОРМЫ ──
  const formTabs = document.querySelectorAll('.form-tab');
  formTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const formId = tab.getAttribute('data-tab');
      
      // Убираем активный класс со всех табов
      formTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Скрываем все формы
      document.querySelectorAll('.form-body').forEach(form => {
        form.classList.add('hidden');
      });
      
      // Показываем нужную форму
      const form = document.getElementById(`form-${formId}`);
      if (form) form.classList.remove('hidden');
    });
  });

  // ── СЧЁТЧИКИ (АНИМАЦИЯ ЧИСЕЛ) ──
  const stats = document.querySelectorAll('[data-count]');
  const animateCount = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    let current = 0;
    const step = target / 30; // 30 шагов
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 30);
  };

  // Запускаем анимацию при прокрутке
  const observerOptions = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  stats.forEach(stat => observer.observe(stat));

  // ── МОДАЛЬНОЕ ОКНО ──
  function showModal(message) {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('modal-overlay');
    const text = document.getElementById('modal-text');
    
    if (modal && overlay && text) {
      text.textContent = message;
      modal.classList.add('open');
      overlay.classList.add('open');
    }
  }

  const modalClose = document.getElementById('modal-close');
  const modalOk = document.getElementById('modal-ok');
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('modal-overlay');

  const closeModal = () => {
    if (modal) modal.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOk) modalOk.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // ── МАСКА НА ТЕЛЕФОН ──
  const phoneInput = document.getElementById('p-phone');
  const tPhoneInput = document.getElementById('t-phone');
  
  if (window.IMask) {
    if (phoneInput) {
      IMask(phoneInput, {
        mask: '+{7}(000)000-00-00',
        lazy: false
      });
    }
    if (tPhoneInput) {
      IMask(tPhoneInput, {
        mask: '+{7}(000)000-00-00',
        lazy: false
      });
    }
  }

  // ── РЕАКЦИИ (ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ) ──
  const reactionCards = document.querySelectorAll('.reaction-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
      }
    });
  }, { threshold: 0.3 });

  reactionCards.forEach(card => revealObserver.observe(card));

});
