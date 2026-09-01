document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'http://localhost:5000/api/teachers';
  const teachersGrid = document.getElementById('teachersGrid');
  const searchInput = document.getElementById('teacherSearch');
  const gradeSelect = document.getElementById('gradeFilter');

  let allTeachers = [];
  let isAdmin = false; // القيمة افتراضياً للزوار (مغلق)

  // 🔐 كلمة المرور الخاصة بك كأدمن
  const adminPassword = "ali_admin_2026";

  // أمر سري لتفعيل وضع الأدمن من المتصفح (عبر الـ Console)
  window.enableAdminMode = function() {
    const pwd = prompt("Enter Admin Password:");
    if (pwd === adminPassword) {
      isAdmin = true;
      alert("Admin mode activated! You can now add and delete teachers.");
      createAdminPanelUI();
      renderTeachers(allTeachers);
    } else {
      alert("Incorrect password!");
    }
  };

  // إنشاء لوحة التحكم خفياً ولا تظهر إلا بعد تسجيل الدخول الصحيح
  function createAdminPanelUI() {
    if (document.getElementById('secretAdminPanel')) return;

    const panelHTML = `
      <div id="secretAdminPanel" style="max-width: 900px; margin: 0 auto 30px; padding: 25px; border: 1px solid #d4af37; border-radius: 12px; background: rgba(20, 20, 20, 0.95);">
        <h3 style="color: #d4af37; margin-bottom: 15px;"><i class="fas fa-user-shield"></i> Admin Control Panel</h3>
        <form id="addTeacherForm" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
          <input type="text" id="newTeacherName" placeholder="Teacher Full Name" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff;">
          <input type="text" id="newTeacherSubject" placeholder="Subject / Specialty" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff;">
          <input type="text" id="newTeacherGrades" placeholder="Grades (e.g. Grade 9, 10)" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff;">
          <input type="text" id="newTeacherLocation" placeholder="Location (e.g. Saida)" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff;">
          <input type="text" id="newTeacherPhone" placeholder="Phone (+961 ...)" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff;">
          <input type="text" id="newTeacherImage" placeholder="Image URL (optional)" style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff;">
          <button type="submit" style="grid-column: 1 / -1; padding: 12px; cursor: pointer; background: #d4af37; color: #000; font-weight: bold; border: none; border-radius: 6px;">Add Teacher</button>
        </form>
      </div>
    `;
    
    const teachersSection = document.getElementById('teachers');
    const controls = document.querySelector('.teachers-controls');
    if (teachersSection && controls) {
      controls.insertAdjacentHTML('afterend', panelHTML);
      document.getElementById('addTeacherForm').addEventListener('submit', handleAddTeacher);
    }
  }

  // عرض الأساتذة (أزرار الحذف تظهر فقط للأدمن)
  function renderTeachers(list) {
    if (!teachersGrid) return;
    teachersGrid.innerHTML = '';

    if (!list || list.length === 0) {
      teachersGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #fff; padding: 30px;">No teachers found.</p>`;
      return;
    }

    list.forEach(t => {
      const card = document.createElement('div');
      card.className = 'glass-card';
      card.style.cssText = 'padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); text-align: center;';

      const deleteButtonHTML = isAdmin ? `
        <button class="btn-delete-teacher" data-id="${t._id}" style="display: block; width: 100%; margin-top: 15px; padding: 8px; background: #e63946; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
          <i class="fas fa-trash"></i> Delete Teacher
        </button>` : '';

      card.innerHTML = `
        <div style="width: 90px; height: 90px; margin: 0 auto 15px; border-radius: 50%; overflow: hidden; border: 2px solid #d4af37;">
          <img src="${t.image || './images/photo_2026-08-29_00-56-35.jpg'}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <h3 style="color: #d4af37; margin-bottom: 8px;">${t.name}</h3>
        <p style="margin: 4px 0; font-size: 0.95rem; color:#fff;"><strong>Subject:</strong> ${t.subject}</p>
        <p style="margin: 4px 0; font-size: 0.95rem; color:#fff;"><strong>Grades:</strong> ${t.grades}</p>
        <p style="margin: 4px 0; font-size: 0.95rem; color:#fff;"><strong>Location:</strong> ${t.location}</p>
        
        <a href="https://wa.me/${t.phone ? t.phone.replace(/[^0-9]/g, '') : ''}" target="_blank" style="display: inline-block; margin-top: 12px; padding: 8px 16px; background: #25d366; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">
          <i class="fab fa-whatsapp"></i> WhatsApp
        </a>

        ${deleteButtonHTML}
      `;
      teachersGrid.appendChild(card);
    });

    if (isAdmin) {
      attachDeleteEvents();
    }
  }

  // جلب البيانات من السيرفر
  async function loadTeachersFromDB() {
    if (!teachersGrid) return;
    teachersGrid.innerHTML = '<p style="color: #fff; text-align: center; grid-column: 1/-1;">Loading teachers...</p>';

    try {
      const response = await fetch(API_URL);
      allTeachers = await response.json();
      renderTeachers(allTeachers);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      teachersGrid.innerHTML = '<p style="color: #ff6b6b; text-align: center; grid-column: 1/-1;">Error connecting to server.</p>';
    }
  }

  // الفلترة والبحث للزوار
  function filterTeachers() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedGrade = gradeSelect ? gradeSelect.value : 'all';

    const filtered = allTeachers.filter(t => {
      const matchText = (t.name + ' ' + t.subject + ' ' + t.location + ' ' + t.grades).toLowerCase();
      const matchesSearch = matchText.includes(searchTerm);
      let matchesGrade = true;
      if (selectedGrade !== 'all') {
        matchesGrade = (t.grades || '').toLowerCase().includes(selectedGrade);
      }
      return matchesSearch && matchesGrade;
    });

    renderTeachers(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterTeachers);
  if (gradeSelect) gradeSelect.addEventListener('change', filterTeachers);

  // إضافة أستاذ جديد (للأدمن فقط)
  async function handleAddTeacher(e) {
    e.preventDefault();
    const newTeacher = {
      name: document.getElementById('newTeacherName').value.trim(),
      subject: document.getElementById('newTeacherSubject').value.trim(),
      grades: document.getElementById('newTeacherGrades').value.trim(),
      location: document.getElementById('newTeacherLocation').value.trim(),
      phone: document.getElementById('newTeacherPhone').value.trim(),
      image: document.getElementById('newTeacherImage').value.trim() || ''
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeacher)
      });

      if (response.ok) {
        document.getElementById('addTeacherForm').reset();
        loadTeachersFromDB();
        alert('Teacher added successfully!');
      } else {
        alert('Failed to add teacher.');
      }
    } catch (err) {
      console.error('Error adding teacher:', err);
    }
  }

  // حذف أستاذ (للأدمن فقط)
  function attachDeleteEvents() {
    document.querySelectorAll('.delete-teacher-btn').forEach(btn => {
      btn.addEventListener('click', async function() {
        const teacherId = this.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this teacher?')) {
          try {
            const res = await fetch(`${API_URL}/${teacherId}`, { method: 'DELETE' });
            if (res.ok) {
              loadTeachersFromDB();
            } else {
              alert('Failed to delete teacher.');
            }
          } catch (err) {
            console.error('Error deleting teacher:', err);
          }
        }
      });
    });
  }

  loadTeachersFromDB();
});


const API_URL = 'https://lebanese-online-academey.onrender.com/api/teachers';