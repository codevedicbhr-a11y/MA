// Mary's Academy - One Page JS

document.addEventListener('DOMContentLoaded', function () {
  // Mobile Nav
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.textContent = '☰';
      });
    });
  }

  // Hero Carousel
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let timer;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      if (dots[i]) dots[i].classList.toggle('active', i === index);
    });
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  if (slides.length) {
    showSlide(0);
    timer = setInterval(nextSlide, 4500);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        showSlide(i);
        timer = setInterval(nextSlide, 4500);
      });
    });
  }

  // Enquiry Modal - first load
  const modal = document.getElementById('enquiryModal');
  const modalClose = document.querySelector('.modal-close');
  if (modal && !sessionStorage.getItem('enquiryShown')) {
    setTimeout(() => {
      modal.classList.add('active');
      sessionStorage.setItem('enquiryShown', 'true');
    }, 1800);
  }
  if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  // Forms
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        alert('Thank you! Your enquiry has been received.\nWe will contact you soon.\n\nCall: +91 62071 08082');
        form.reset();
        btn.textContent = original;
        btn.disabled = false;
        if (modal) modal.classList.remove('active');
      }, 900);
    });
  });

  // Active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) currentId = sec.getAttribute('id');
    });
    document.querySelectorAll('.nav-menu a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  });
});
