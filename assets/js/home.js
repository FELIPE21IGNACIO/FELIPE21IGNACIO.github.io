/* ══════════════════════════════════════════════
   HERO CANVAS — Animated Tech Grid
══════════════════════════════════════════════ */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let width, height, particles, animFrame;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    const count = Math.min(Math.floor((width * height) / 12000), 120);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(69, 69, 70, ' + (1 - dist / 150) * 0.5 + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Tema de particulas
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.fillStyle = 'rgb(0, 247, 255)';
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }

    animFrame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', function() {
    resize();
    createParticles();
  });

  resize();
  createParticles();
  draw();
})();

/* ══════════════════════════════════════════════
   NAVBAR SCROLL EFFECT
══════════════════════════════════════════════ */
(function initNavbar() {
  var navbar = document.getElementById('navbar');
  var lastScroll = 0;

  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });
})();

/* ══════════════════════════════════════════════
   MOBILE NAV TOGGLE
══════════════════════════════════════════════ */
(function initMobileNav() {
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  var links = document.querySelectorAll('.mobile-link');

  function closeMenu() {
    toggle.classList.remove('active');
    mobileNav.classList.remove('open');
  }

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  links.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
})();

/* ══════════════════════════════════════════════
   GSAP ANIMATIONS
══════════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

// Hero entrance animation
(function animateHero() {
  var tl = gsap.timeline({ delay: 0.3 });

  tl.to('.hero-tag', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  })
  .to('.line-inner', {
    y: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power4.out',
  }, '-=0.4')
  .to('.hero-title', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.4')
  .to('.hero-cta', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.3')
  .to('.hero-scroll-indicator', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.2');
})();

// Scroll reveal animations
(function animateScrollReveals() {
  var revealsUp = document.querySelectorAll('.reveal-up');
  revealsUp.forEach(function(el) {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  var revealsLeft = document.querySelectorAll('.reveal-left');
  revealsLeft.forEach(function(el) {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    });
  });

  var revealsRight = document.querySelectorAll('.reveal-right');
  revealsRight.forEach(function(el) {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    });
  });

  var revealsScale = document.querySelectorAll('.reveal-scale');
  revealsScale.forEach(function(el, i) {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      scale: 1,
      opacity: 1,
      duration: 0.8,
      delay: (i % 2) * 0.15,
      ease: 'power3.out',
    });
  });
})();

// Skill bars animation
(function animateSkillBars() {
  var skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(function(bar) {
    var targetWidth = bar.getAttribute('data-width');
    gsap.to(bar, {
      scrollTrigger: {
        trigger: bar,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      width: targetWidth + '%',
      duration: 1.2,
      ease: 'power3.out',
    });
  });
})();

// Section dividers
(function animateDividers() {
  var dividers = document.querySelectorAll('.divider');
  dividers.forEach(function(d) {
    gsap.fromTo(d,
      { scaleX: 0 },
      {
        scaleX: 1,
        scrollTrigger: {
          trigger: d,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
        duration: 1.2,
        ease: 'power3.out',
      }
    );
  });
})();

/* ══════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════ */
(function initContactForm() {
  var form = document.getElementById('contactForm');
  var toast = document.getElementById('toast');

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function() {
      toast.classList.remove('show');
    }, 3000);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Mensaje enviado correctamente ✓');
    form.reset();
  });
})();

/* ══════════════════════════════════════════════
   TECH TAG STAGGER ON SCROLL
══════════════════════════════════════════════ */
(function animateTechTags() {
  var tags = document.querySelectorAll('.tech-tag');
  gsap.fromTo(tags,
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.tech-tags',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    }
  );
})();