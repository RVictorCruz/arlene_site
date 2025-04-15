document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          menuToggle.classList.remove('active');
          nav.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      });
    });
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Tabs de serviços
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show corresponding content
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Slider de depoimentos
    const slider = document.querySelector('.depoimentos-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    function updateSlider() {
      const slideWidth = document.querySelector('.depoimento-card').offsetWidth;
      slider.scrollTo({
        left: currentIndex * (slideWidth + 32), // 32px é o gap
        behavior: 'smooth'
      });
      
      // Atualizar dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Event listeners para botões
    prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = dots.length - 1;
      }
      updateSlider();
    });
    
    nextBtn.addEventListener('click', function() {
      if (currentIndex < dots.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSlider();
    });
    
    // Event listeners para dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        currentIndex = index;
        updateSlider();
      });
    });
    
    // Auto-rotate slider
    let sliderInterval = setInterval(() => {
      if (currentIndex < dots.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSlider();
    }, 5000);
    
    // Pausar auto-rotate quando interagir
    slider.addEventListener('mouseenter', () => {
      clearInterval(sliderInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
      sliderInterval = setInterval(() => {
        if (currentIndex < dots.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateSlider();
      }, 5000);
    });
    
    // Formulário de contato
    const contactForm = document.getElementById('form-contato');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envio (substituir por código real de envio)
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" class="spin"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" fill="none" stroke="currentColor" stroke-width="2"/></svg> Enviando...';
        
        // Simular atraso de rede
        setTimeout(() => {
          // Criar elemento de feedback
          const feedback = document.createElement('div');
          feedback.className = 'form-feedback success';
          feedback.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="currentColor" stroke-width="2"/>
              <polyline points="22 4 12 14.01 9 11.01" fill="none" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
          `;
          
          contactForm.appendChild(feedback);
          
          // Resetar botão
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          
          // Rolagem suave para o feedback
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
          // Limpar formulário após 3 segundos
          setTimeout(() => {
            contactForm.reset();
            feedback.remove();
          }, 5000);
        }, 1500);
      });
    }
    
    // Animação de elementos quando entram na viewport
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.hero-text, .sobre-img, .sobre-text, .servico-card, .depoimento-card, .contato-form, .contato-info');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('animate');
        }
      });
    };
    
    // Verificar na carga inicial
    animateOnScroll();
    
    // Verificar durante o scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Botão WhatsApp flutuante
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    whatsappBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Aqui você pode adicionar o link real do WhatsApp
      window.open('https://wa.me/SEUNUMERO', '_blank');
    });
    
    // Ativar tooltips para ícones de informação
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = element.getAttribute('data-tooltip');
      element.appendChild(tooltip);
      
      element.addEventListener('mouseenter', function() {
        tooltip.classList.add('visible');
      });
      
      element.addEventListener('mouseleave', function() {
        tooltip.classList.remove('visible');
      });
    });
    
    // Carregar Font Awesome dinamicamente (caso não esteja no HTML)
    if (!document.querySelector('.fa')) {
      const faScript = document.createElement('script');
      faScript.src = 'https://kit.fontawesome.com/SEUCODIGO.js';
      faScript.crossOrigin = 'anonymous';
      document.head.appendChild(faScript);
    }
  });
  
  // Adicionar estilos dinâmicos para animações
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .spin {
      animation: spin 1s linear infinite;
      margin-right: 8px;
      vertical-align: middle;
    }
    
    .form-feedback {
      padding: 1rem;
      border-radius: var(--radius-sm);
      margin-top: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 500;
    }
    
    .form-feedback svg {
      flex-shrink: 0;
    }
    
    .form-feedback.success {
      background-color: rgba(76, 175, 80, 0.1);
      color: var(--success-color);
      border: 1px solid rgba(76, 175, 80, 0.3);
    }
    
    .form-feedback.error {
      background-color: rgba(244, 67, 54, 0.1);
      color: var(--error-color);
      border: 1px solid rgba(244, 67, 54, 0.3);
    }
    
    .tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      z-index: 1000;
      margin-bottom: 8px;
    }
    
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 6px;
      border-style: solid;
      border-color: #333 transparent transparent transparent;
    }
    
    .tooltip.visible {
      opacity: 1;
      visibility: visible;
    }
    
    /* Animações de entrada */
    .hero-text.animate {
      animation: fadeInUp 0.8s ease forwards;
    }
    
    .sobre-img.animate {
      animation: fadeInLeft 0.8s ease forwards;
    }
    
    .sobre-text.animate {
      animation: fadeInRight 0.8s ease forwards;
    }
    
    .servico-card.animate {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    .depoimento-card.animate {
      animation: fadeIn 0.8s ease forwards;
    }
    
    .contato-form.animate {
      animation: fadeInLeft 0.8s ease forwards;
    }
    
    .contato-info.animate {
      animation: fadeInRight 0.8s ease forwards;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { 
        opacity: 0;
        transform: translateY(30px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInLeft {
      from { 
        opacity: 0;
        transform: translateX(-30px);
      }
      to { 
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes fadeInRight {
      from { 
        opacity: 0;
        transform: translateX(30px);
      }
      to { 
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .no-scroll {
      overflow: hidden;
    }
  `;
  document.head.appendChild(styleElement);