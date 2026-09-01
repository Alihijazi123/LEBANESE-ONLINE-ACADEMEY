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
// 3D Tilt Effect on Cards

// Live Search & Filter for Teachers
  const searchInput = document.getElementById('teacherSearch');
  const gradeSelect = document.getElementById('gradeFilter');
  const teacherCards = document.querySelectorAll('.teachers-grid .teacher-card');

  function filterTeachers() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedGrade = gradeSelect ? gradeSelect.value : 'all';

    teacherCards.forEach(card => {
      const name = card.getAttribute('data-name') || '';
      const categories = card.getAttribute('data-category') || '';
      const textContent = card.innerText.toLowerCase();

      const matchesSearch = name.includes(searchTerm) || textContent.includes(searchTerm);
      const matchesGrade = selectedGrade === 'all' || categories.includes(selectedGrade);

      if (matchesSearch && matchesGrade) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterTeachers);
  }
  if (gradeSelect) {
    gradeSelect.addEventListener('change', filterTeachers);
  }

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS Library
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }

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
      const accordion = header.parentElement;
      accordion.classList.toggle('active');
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

  // ==========================================
  // TEACHERS MANAGEMENT & DYNAMIC SEARCH SYSTEM
  // ==========================================

  // Default initial teachers list (20 teachers covering various regions like Saida, Beirut, etc.)
  const defaultTeachers = [
    { id: 1, name: "Meryana Youness", subject: "Mathematics Expert", grades: "Brevet, Seconde, Bac 1, Terminale (9-12)", exp: "26+ Years", location: "Lebanon", phone: "+961 81 713 254", image: "./images/photo_2026-08-29_00-56-35.jpg", rating: 4.9, category: "brevet seconde bac1 terminale" },
    { id: 2, name: "Ahmad Kanso", subject: "Elementary Math", grades: "Grades 1 - 6", exp: "7 Years", location: "Beirut", phone: "+961 70 123 456", image: "", rating: 4.7, category: "elementary intermediate" },
    { id: 3, name: "Fatima Zein", subject: "Intermediate Math", grades: "Grades 7 - 9", exp: "9 Years", location: "Saida", phone: "+961 03 987 654", image: "", rating: 4.8, category: "intermediate brevet" },
    { id: 4, name: "Ziad Harbieh", subject: "Algebra & Geometry", grades: "Grades 10, 11", exp: "12 Years", location: "Tripoli", phone: "+961 71 555 444", image: "", rating: 4.6, category: "seconde bac1" },
    { id: 5, name: "Nour El Huda", subject: "Terminale Calculus", grades: "Grade 12 (LS & SE)", exp: "15 Years", location: "Nabatieh", phone: "+961 76 333 222", image: "", rating: 5.0, category: "terminale" },
    { id: 6, name: "Rana Saliba", subject: "Primary Math Coach", grades: "Grades 1 - 4", exp: "6 Years", location: "Jounieh", phone: "+961 9 911 223", image: "", rating: 4.7, category: "elementary" },
    { id: 7, name: "Karim Chahine", subject: "Intermediate Math", grades: "Grades 7, 8, 9", exp: "10 Years", location: "Zahle", phone: "+961 8 812 345", image: "", rating: 4.8, category: "intermediate brevet" },
    { id: 8, name: "Sara Darwiche", subject: "Scientific Math", grades: "Grades 11, 12", exp: "11 Years", location: "Beirut", phone: "+961 70 888 999", image: "", rating: 4.9, category: "bac1 terminale" },
    { id: 9, name: "Elias Abboud", subject: "Foundational Math", grades: "Grades 3 - 7", exp: "8 Years", location: "Batroun", phone: "+961 6 741 852", image: "", rating: 4.6, category: "elementary intermediate" },
    { id: 10, name: "Maya Fawaz", subject: "Algebra Specialist", grades: "Grades 9, 10", exp: "9 Years", location: "Tyre", phone: "+961 71 369 258", image: "", rating: 4.7, category: "brevet seconde" },
    { id: 11, name: "Georges Khoury", subject: "Terminale Expert", grades: "Grade 12 LS", exp: "18 Years", location: "Ashrafieh", phone: "+961 3 112 233", image: "", rating: 4.9, category: "terminale" },
    { id: 12, name: "Layla Nassar", subject: "Junior Math Mentor", grades: "Grades 1 - 5", exp: "5 Years", location: "Byblos", phone: "+961 9 543 210", image: "", rating: 4.8, category: "elementary" },
    { id: 13, name: "Rami Haddad", subject: "Intermediate Tutor", grades: "Grades 7, 8", exp: "7 Years", location: "Tripoli", phone: "+961 70 456 789", image: "", rating: 4.7, category: "intermediate" },
    { id: 14, name: "Lina Soueid", subject: "Brevet Prep Specialist", grades: "Grade 9", exp: "10 Years", location: "Saida", phone: "+961 5 333 444", image: "", rating: 4.9, category: "brevet" },
    { id: 15, name: "Hassan Fakhry", subject: "Trigonometry & Calculus", grades: "Grades 11, 12", exp: "14 Years", location: "Tyre", phone: "+961 71 999 111", image: "", rating: 4.8, category: "bac1 terminale" },
    { id: 16, name: "Nadine Matar", subject: "Elementary Math", grades: "Grades 2 - 6", exp: "6 Years", location: "Metn", phone: "+961 4 700 800", image: "", rating: 4.7, category: "elementary" },
    { id: 17, name: "Fady Daher", subject: "Secondary Math Coach", grades: "Grades 10, 11", exp: "12 Years", location: "Baabda", phone: "+961 5 920 100", image: "", rating: 4.8, category: "seconde bac1" },
    { id: 18, name: "Noura Khalil", subject: "Intermediate Math", grades: "Grades 8, 9", exp: "9 Years", location: "Akkar", phone: "+961 70 112 233", image: "", rating: 4.7, category: "intermediate brevet" },
    { id: 19, name: "Ziad Tarabay", subject: "Terminale SE Expert", grades: "Grade 12 SE", exp: "16 Years", location: "Zahle", phone: "+961 8 930 400", image: "", rating: 4.9, category: "terminale" },
    { id: 20, name: "Mirna Bou Chdid", subject: "Primary & Middle Math", grades: "Grades 4 - 8", exp: "11 Years", location: "Jounieh", phone: "+961 9 654 321", image: "", rating: 4.8, category: "elementary intermediate" }
  ];

  // Load teachers from localStorage or use default
  let teachers = JSON.parse(localStorage.getItem('loacademy_teachers')) || defaultTeachers;

  const teachersGrid = document.getElementById('teachersGrid');
  const searchInput = document.getElementById('teacherSearch');
  const gradeSelect = document.getElementById('gradeFilter');
  const toggleAdminBtn = document.getElementById('toggleAdminBtn');
  const adminPanel = document.getElementById('adminPanel');
  const addTeacherForm = document.getElementById('addTeacherForm');

  // Toggle Admin Panel visibility
  if (toggleAdminBtn && adminPanel) {
    toggleAdminBtn.addEventListener('click', () => {
      if (adminPanel.style.display === 'none') {
        adminPanel.style.display = 'block';
        toggleAdminBtn.innerHTML = '<i class="fas fa-unlock"></i> Hide Admin';
      } else {
        adminPanel.style.display = 'none';
        toggleAdminBtn.innerHTML = '<i class="fas fa-lock"></i> Admin Panel';
      }
    });
  }

  // Render Teachers to DOM
  function renderTeachers(list) {
    if (!teachersGrid) return;
    teachersGrid.innerHTML = '';

    if (list.length === 0) {
      teachersGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 30px;">No teachers found matching your search.</p>`;
      return;
    }

    list.forEach(t => {
      const card = document.createElement('div');
      card.className = 'teacher-card compact glass-card';
      card.setAttribute('data-id', t.id);

      const imgContent = t.image 
        ? `<img src="${t.image}" alt="${t.name}">` 
        : `<i class="fas fa-user-tie gold-text"></i>`;
      const imgClass = t.image ? '' : 'placeholder-img';

      card.innerHTML = `
        <div class="teacher-img ${imgClass}">${imgContent}</div>
        <h3>${t.name}</h3>
        <p>${t.subject}</p>
        <div class="teacher-details">
          <div><i class="fas fa-graduation-cap gold-text"></i> <strong>Grades:</strong> ${t.grades}</div>
          <div><i class="fas fa-briefcase gold-text"></i> <strong>Exp:</strong> ${t.exp}</div>
          <div><i class="fas fa-map-marker-alt gold-text"></i> <strong>Location:</strong> ${t.location}</div>
          <div><i class="fas fa-phone gold-text"></i> <strong>Phone:</strong> ${t.phone}</div>
        </div>
        <div class="rating-box" data-teacher="${t.name}">
          <div class="stars" data-rating="0">
            <i class="fas fa-star" data-value="1"></i>
            <i class="fas fa-star" data-value="2"></i>
            <i class="fas fa-star" data-value="3"></i>
            <i class="fas fa-star" data-value="4"></i>
            <i class="fas fa-star" data-value="5"></i>
          </div>
          <span class="rating-count"><strong class="avg-score">${t.rating}</strong> / 5</span>
        </div>
        <button class="delete-teacher-btn" data-id="${t.id}" style="margin-top: 10px; background: rgba(255,0,0,0.2); color: #ff6b6b; border: 1px solid rgba(255,0,0,0.4); padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; cursor: pointer; width: 100%;"><i class="fas fa-trash"></i> Delete Teacher</button>
      `;

      teachersGrid.appendChild(card);
    });

    attachStarEvents();
    attachDeleteEvents();
  }

  // Filter & Search Logic (Handles name, subject, grades, AND location like 'Saida')
  function filterTeachers() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedGrade = gradeSelect ? gradeSelect.value : 'all';

    const filtered = teachers.filter(t => {
      const matchText = (t.name + ' ' + t.subject + ' ' + t.location + ' ' + t.grades).toLowerCase();
      const matchesSearch = matchText.includes(searchTerm);

      let matchesGrade = true;
      if (selectedGrade !== 'all') {
        const cat = (t.category || '').toLowerCase();
        const gradeStr = t.grades.toLowerCase();
        matchesGrade = cat.includes(selectedGrade) || gradeStr.includes(selectedGrade);
      }

      return matchesSearch && matchesGrade;
    });

    renderTeachers(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterTeachers);
  if (gradeSelect) gradeSelect.addEventListener('change', filterTeachers);

  // Add Teacher Form Submission
  if (addTeacherForm) {
    addTeacherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newTeacher = {
        id: Date.now(),
        name: document.getElementById('newTeacherName').value.trim(),
        subject: document.getElementById('newTeacherSubject').value.trim(),
        grades: document.getElementById('newTeacherGrades').value.trim(),
        location: document.getElementById('newTeacherLocation').value.trim(),
        phone: document.getElementById('newTeacherPhone').value.trim(),
        image: document.getElementById('newTeacherImage').value.trim(),
        rating: 5.0,
        category: "intermediate brevet"
      };

      teachers.unshift(newTeacher);
      localStorage.setItem('loacademy_teachers', JSON.stringify(teachers));
      filterTeachers();
      addTeacherForm.reset();
      alert('Teacher added successfully!');
    });
  }

  // Delete Teacher Logic
  function attachDeleteEvents() {
    document.querySelectorAll('.delete-teacher-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        if (confirm('Are you sure you want to delete this teacher?')) {
          teachers = teachers.filter(t => t.id !== id);
          localStorage.setItem('loacademy_teachers', JSON.stringify(teachers));
          filterTeachers();
        }
      });
    });
  }

  // Interactive Star Rating System
  function attachStarEvents() {
    document.querySelectorAll('.teacher-card .stars').forEach(starContainer => {
      starContainer.querySelectorAll('i').forEach(star => {
        star.addEventListener('mouseover', function() {
          const val = parseInt(this.getAttribute('data-value'));
          highlightStars(starContainer, val);
        });

        starContainer.addEventListener('mouseleave', function() {
          const currentRating = parseInt(starContainer.getAttribute('data-rating')) || 0;
          highlightStars(starContainer, currentRating);
        });

        star.addEventListener('click', function() {
          const val = parseInt(this.getAttribute('data-value'));
          starContainer.setAttribute('data-rating', val);
          highlightStars(starContainer, val);
          
          const teacherName = starContainer.closest('.teacher-card').querySelector('h3').innerText;
          alert(`Thank you! You rated ${teacherName} ${val} stars.`);
        });
      });
    });
  }

  function highlightStars(container, count) {
    container.querySelectorAll('i').forEach(star => {
      const starVal = parseInt(star.getAttribute('data-value'));
      if (starVal <= count) {
        star.style.color = '#d4af37';
      } else {
        star.style.color = '#444';
      }
    });
  }

  // Initial render on page load
  renderTeachers(teachers);

  // WhatsApp Form Redirect Integration
  const whatsappForm = document.getElementById('whatsappForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const level = document.getElementById('level').value;
      const message = document.getElementById('message').value.trim();

      const phone = '96181713254';
      const text = `Hello Meryana,%0A%0A*New Booking / Course Order*%0A- *Name:* ${encodeURIComponent(name)}%0A- *Email:* ${encodeURIComponent(email)}%0A- *Package:* ${encodeURIComponent(level)}%0A- *Message:* ${encodeURIComponent(message)}`;

      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    });
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const menuDropdownBtn = document.getElementById('menuDropdownBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (menuDropdownBtn && dropdownMenu) {
    // فتح وإغلاق القائمة عند النقر على الزر
    menuDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // تبديل العرض بشكل مباشر
      if (dropdownMenu.style.display === 'flex') {
        dropdownMenu.style.display = 'none';
      } else {
        dropdownMenu.style.display = 'flex';
        dropdownMenu.style.flexDirection = 'column';
      }
    });

    // إغلاق القائمة عند النقر بأي مكان خارجها
    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && !menuDropdownBtn.contains(e.target)) {
        dropdownMenu.style.display = 'none';
      }
    });

    // إغلاق القائمة عند النقر على أي رابط بداخلها
    dropdownMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdownMenu.style.display = 'none';
      });
    });
  }
});