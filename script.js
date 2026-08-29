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
          // تأثير حركة دخول متسلسلة لكل كرت ورا التاني
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

  // ضبط الحالة الأوليّة للكرتات عشان تبدأ الحركة بشكل صحيح
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
        arrow.textContent = "▼";
      } else {
        document.querySelectorAll(".accordion-body").forEach((b) => b.style.maxHeight = null);
        document.querySelectorAll(".arrow").forEach((a) => a.textContent = "▼");

        body.style.maxHeight = body.scrollHeight + "px";
        arrow.textContent = "▲";
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
      if (link.getAttribute("href").includes(currentSection)) {
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

      // Format WhatsApp Message Payload
      const phoneNumber = "96181713254";
      const text = `Hello Meryana! I would like to book a course session.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Level:* ${encodeURIComponent(level)}%0A*Message:* ${encodeURIComponent(message)}`;

      setTimeout(() => {
        formStatus.style.color = "#25d366";
        formStatus.textContent = "Success! Opening WhatsApp...";
        
        // Open WhatsApp Web/App
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
        whatsappForm.reset();
      }, 1000);
    });
  }
});

// Smooth Scroll Reveal for Sections
  const allSections = document.querySelectorAll("section");

  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15, // بيشتغل أول ما يبان 15% من القسم عالتلفون
  });

  allSections.sectionObserver = allSections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    sectionObserver.observe(section);
  });


  // Open Modal on Course Click
document.querySelectorAll('.course-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // La ma yekbos 3al accordion aw el zakir bi alb el card w yeftah lal mawhal
    if (e.target.closest('.accordion') || e.target.closest('a')) return;
    
    const content = this.innerHTML;
    document.getElementById('modalBodyContent').innerHTML = content;
    document.getElementById('courseModal').style.display = 'flex';
  });
});

// Close Modal on 'X' click
document.querySelector('.close-modal').addEventListener('click', function() {
  document.getElementById('courseModal').style.display = 'none';
});

// Close Modal when clicking outside the box
window.addEventListener('click', function(e) {
  const modal = document.getElementById('courseModal');
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});


// Open Modal on Course Click
document.querySelectorAll('.course-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Prevent opening modal if clicking accordion, links, OR videos/iframes/controls
    if (e.target.closest('.accordion') || e.target.closest('a') || e.target.closest('video') || e.target.closest('iframe')) return;
    
    const content = this.innerHTML;
    document.getElementById('modalBodyContent').innerHTML = content;
    document.getElementById('courseModal').style.display = 'flex';
  });
});
document.querySelectorAll('.course-card video').forEach(video => {
  video.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});