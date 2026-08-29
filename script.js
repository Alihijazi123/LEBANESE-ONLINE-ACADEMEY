document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS Scroll Animation Library
  AOS.init({
    once: true,
    offset: 100,
    duration: 800,
  });

  // Sticky Navbar Blur Effect on Scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.style.background = "rgba(18, 20, 24, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)";
    } else {
      navbar.style.background = "rgba(18, 20, 24, 0.85)";
      navbar.style.boxShadow = "none";
    }
  });

  // 1. Course Category Filtering with Smooth Stagger Animation
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
      let visibleIndex = 0;

      courseCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "all" || filterValue === cardCategory) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
            card.style.transition = `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${visibleIndex * 0.08}s`;
          }, 50);
          visibleIndex++;
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(30px) scale(0.95)";
          card.style.transition = "all 0.3s ease";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  courseCards.forEach((card) => {
    card.style.transition = "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
  });

  // 2. Terminale Syllabus Accordion Interactive Dropdowns
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const body = header.nextElementSibling;
      const arrow = header.querySelector(".arrow");

      if (body.style.maxHeight) {
        body.style.maxHeight = null;
        if (arrow) arrow.textContent = "▼";
      } else {
        document.querySelectorAll(".accordion-body").forEach((b) => b.style.maxHeight = null);
        document.querySelectorAll(".arrow").forEach((a) => a.textContent = "▼");

        body.style.maxHeight = body.scrollHeight + "px";
        if (arrow) arrow.textContent = "▲";
      }
    });
  });

  // 3. Smooth Navigation Link Active Highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href && href.includes(currentSection)) {
        link.classList.add("active");
      }
    });
  });

  // 4. WhatsApp Direct Order & Booking Integration (+961 81 713 254)
  const whatsappForm = document.getElementById("whatsappForm");
  const formStatus = document.getElementById("formStatus");

  if (whatsappForm) {
    whatsappForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const level = document.getElementById("level").value;
      const message = document.getElementById("message").value.trim();

      formStatus.style.color = "#d4af37";
      formStatus.textContent = "Redirecting to WhatsApp...";

      const phoneNumber = "96181713254";
      const text = `Hello Meryana! I would like to book a course session.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Level:* ${encodeURIComponent(level)}%0A*Message:* ${encodeURIComponent(message)}`;

      setTimeout(() => {
        formStatus.style.color = "#25d366";
        formStatus.textContent = "Success! Opening WhatsApp...";
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
        whatsappForm.reset();
      }, 1000);
    });
  }

  // 5. Enhanced Scroll Reveal Animation for Sections & Cards (Up & Down scrolling active)
  const revealElements = document.querySelectorAll("section, .course-card, .video-card, .stat-card, .about-text-card");

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
      }
    });
  }, {
    root: null,
    threshold: 0.1,
  });

  revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px) scale(0.98)";
    el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    revealOnScroll.observe(el);
  });

  // 6. Stats Counter Animation (تفعيل العد التصاعدي للـ Experience والـ Stats)
  const statNumbers = document.querySelectorAll(".stat-card h3, .stats-grid h3");
  let animatedStats = false;

  const statsSection = document.querySelector(".stats-grid") || document.querySelector(".about-container");

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          statNumbers.forEach(numEl => {
            const textValue = numEl.innerText;
            const target = parseInt(textValue.replace(/\D/g, '')); // استخراج الرقم فقط
            if (isNaN(target)) return;

            let current = 0;
            const increment = target / 30; // سرعة العداد
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                numEl.innerText = target + (textValue.includes('+') ? '+' : '');
                clearInterval(timer);
              } else {
                numEl.innerText = Math.floor(current) + (textValue.includes('+') ? '+' : '');
              }
            }, 40);
          });
          animatedStats = true;
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // 7. Modal Functionality with Accordion Fix inside Modal
  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.accordion') || e.target.closest('a') || e.target.closest('video') || e.target.closest('iframe')) return;
      
      const content = this.innerHTML;
      const modalBody = document.getElementById('modalBodyContent');
      if (modalBody) {
        modalBody.innerHTML = content;
        document.getElementById('courseModal').style.display = 'flex';

        // إعادة تفعيل الـ Accordion خصيصاً للشيء اللي جوة المودل
        const modalAccordions = modalBody.querySelectorAll(".accordion-header");
        modalAccordions.forEach((header) => {
          header.addEventListener("click", () => {
            const body = header.nextElementSibling;
            const arrow = header.querySelector(".arrow");

            if (body.style.maxHeight) {
              body.style.maxHeight = null;
              if (arrow) arrow.textContent = "▼";
            } else {
              modalBody.querySelectorAll(".accordion-body").forEach((b) => b.style.maxHeight = null);
              modalBody.querySelectorAll(".arrow").forEach((a) => a.textContent = "▼");

              body.style.maxHeight = body.scrollHeight + "px";
              if (arrow) arrow.textContent = "▲";
            }
          });
        });
      }
    });
  });

  const closeModalBtn = document.querySelector('.close-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
      document.getElementById('courseModal').style.display = 'none';
    });
  }

  window.addEventListener('click', function(e) {
    const modal = document.getElementById('courseModal');
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });

  // 8. Dynamic Back to Top Button Creation & Scroll Progress
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = "▲";
  backToTopBtn.id = "backToTopBtn";
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 45px;
    height: 45px;
    background: #d4af37;
    color: #121418;
    border: none;
    border-radius: 50%;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
    transition: all 0.3s ease;
    z-index: 999;
  `;
  document.body.appendChild(backToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  backToTopBtn.addEventListener("mouseenter", () => {
    backToTopBtn.style.transform = "scale(1.1) translateY(-3px)";
  });
  backToTopBtn.addEventListener("mouseleave", () => {
    backToTopBtn.style.transform = "scale(1) translateY(0)";
  });
});
// Dynamic Scroll Progress Bar
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress-bar";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + "%";
});