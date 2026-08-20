document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Course Category Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      courseCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "all" || filterValue === cardCategory) {
          card.classList.remove("hide");
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.classList.add("hide");
          }, 300);
        }
      });
    });
  });

  // 2. Terminale Syllabus Accordion Interactive Dropdowns
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const body = header.nextElementSibling;
      const arrow = header.querySelector(".arrow");

      // Toggle active accordion
      if (body.style.maxHeight) {
        body.style.maxHeight = null;
        arrow.textContent = "▼";
      } else {
        // Close other open accordions
        document.querySelectorAll(".accordion-body").forEach((b) => b.style.maxHeight = null);
        document.querySelectorAll(".arrow").forEach((a) => a.textContent = "▼");

        body.style.maxHeight = body.scrollHeight + "px";
        arrow.textContent = "▲";
      }
    });
  });

  // 3. Smooth Navigation Link Highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
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

  // 4. Contact Form Handler Simulation
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      formStatus.style.color = "#d4af37";
      formStatus.textContent = "Sending message...";

      setTimeout(() => {
        formStatus.style.color = "#4bb543";
        formStatus.textContent = "Thank you! Your message has been sent successfully.";
        contactForm.reset();
      }, 1200);
    });
  }
});