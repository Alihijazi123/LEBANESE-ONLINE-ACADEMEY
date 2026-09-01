document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS Scroll Animation Library
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, offset: 100, duration: 800 });
  }

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

  // Navbar Dropdown Toggle Logic
  const menuDropdownBtn = document.getElementById('menuDropdownBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (menuDropdownBtn && dropdownMenu) {
    menuDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });

    window.addEventListener('click', () => {
      if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
      }
    });

    dropdownMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    dropdownMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
      });
    });
  }

  // Course Accordion Logic
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
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

  // Course Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // WhatsApp Form Integration
  const whatsappForm = document.getElementById("whatsappForm");
  const formStatus = document.getElementById("formStatus");

  if (whatsappForm) {
    whatsappForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const level = document.getElementById("level").value;
      const message = document.getElementById("message").value.trim();

      if (formStatus) {
        formStatus.style.color = "#d4af37";
        formStatus.textContent = "Redirecting to WhatsApp...";
      }

      const phoneNumber = "96181713254";
      const text = `Hello Meryana! I would like to book a course session.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Level:* ${encodeURIComponent(level)}%0A*Message:* ${encodeURIComponent(message)}`;

      setTimeout(() => {
        if (formStatus) {
          formStatus.style.color = "#25d366";
          formStatus.textContent = "Success! Opening WhatsApp...";
        }
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
        whatsappForm.reset();
      }, 1000);
    });
  }

  // Back to Top Button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = "▲";
  backToTopBtn.id = "backToTopBtn";
  backToTopBtn.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; width: 45px; height: 45px;
    background: #d4af37; color: #121418; border: none; border-radius: 50%;
    font-size: 18px; font-weight: bold; cursor: pointer; display: none;
    align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
    transition: all 0.3s ease; z-index: 999;
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});