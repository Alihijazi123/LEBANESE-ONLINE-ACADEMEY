document.addEventListener('DOMContentLoaded', () => {
 const API_URL = 'https://lebanese-online-academey.onrender.com/api/teachers';
  const teachersGrid = document.getElementById('teachersGrid');
  const searchInput = document.getElementById('teacherSearch');
  const gradeSelect = document.getElementById('gradeFilter');

  let allTeachers = [];
  let isAdmin = false; 

  const adminPassword = "ali_admin_2026";

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

  function createAdminPanelUI() {
    if (document.getElementById('secretAdminPanel')) return;

    const panelHTML = `
      <div id="secretAdminPanel" style="max-width: 900px; margin: 0 auto 30px; padding: 25px; border: 1px solid #d4af37; border-radius: 12px; background: rgba(20, 20, 20, 0.95);">
        <h3 style="color: #d4af37; margin-bottom: 15px;"><i class="fas fa-user-shield"></i> Admin Control Panel</h3>
        <form id="addTeacherForm" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
          
          <input type="text" id="newTeacherName" placeholder="Teacher Full Name" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff;">
          
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #d4af37; font-size: 0.85rem;">Subjects (Hold Ctrl to select multiple):</label>
            <select id="newTeacherSubject" multiple required style="padding: 10px; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff; height: 110px;">
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="French">French</option>
              <option value="Computer Science">Computer Science</option>
              <option value="History & Geography">History & Geography</option>
            </select>
          </div>

          <div style="display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #d4af37; font-size: 0.85rem;">Grades (Hold Ctrl to select multiple):</label>
            <select id="newTeacherGrades" multiple required style="padding: 10px; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff; height: 110px;">
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9 (Brevet)">Grade 9 (Brevet)</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12 (Terminale)">Grade 12 (Terminale)</option>
              <option value="All Grades">All Grades</option>
            </select>
          </div>

          <input type="text" id="newTeacherLocation" placeholder="Location (e.g. Saida, Beirut)" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff;">

          <input type="text" id="newTeacherPhone" placeholder="Phone (+961 ...)" required style="padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff;">
          
          <div style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: 5px;">
            <label style="color: #d4af37; font-size: 0.9rem;">Teacher Photo (from Gallery):</label>
            <input type="file" id="newTeacherImage" accept="image/*" style="padding: 8px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #fff; cursor: pointer;">
          </div>
          
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
        <button class="btn-delete-teacher" data-id="${t._id || t.id}" style="display: block; width: 100%; margin-top: 15px; padding: 8px; background: #e63946; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">
          <i class="fas fa-trash"></i> Delete Teacher
        </button>` : '';

      const teacherName = t.name || t.teacherName || 'Unnamed Teacher';
      
      let teacherSubject = 'Not Specified';
      if (Array.isArray(t.subject)) {
        teacherSubject = t.subject.join(', ');
      } else if (typeof t.subject === 'string') {
        teacherSubject = t.subject;
      } else if (t.subjects) {
        teacherSubject = Array.isArray(t.subjects) ? t.subjects.join(', ') : t.subjects;
      }

      let teacherGrades = 'Not Specified';
      if (Array.isArray(t.grades)) {
        teacherGrades = t.grades.join(', ');
      } else if (typeof t.grades === 'string') {
        teacherGrades = t.grades;
      } else if (t.grade) {
        teacherGrades = Array.isArray(t.grade) ? t.grade.join(', ') : t.grade;
      }

      const teacherLocation = t.location || t.city || 'Lebanon';
      const teacherPhone = t.phone || t.phoneNumber || '';
      const cleanPhone = teacherPhone.replace(/[^0-9]/g, '');

      card.innerHTML = `
        <div style="width: 90px; height: 90px; margin: 0 auto 15px; border-radius: 50%; overflow: hidden; border: 2px solid #d4af37;">
          <img src="${t.image || t.imageUrl || './images/photo_2026-08-29_00-56-35.jpg'}" alt="${teacherName}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <h3 style="color: #d4af37; margin-bottom: 8px;">${teacherName}</h3>
        <p style="margin: 4px 0; font-size: 0.95rem; color:#fff;"><strong>Subject:</strong> ${teacherSubject}</p>
        <p style="margin: 4px 0; font-size: 0.95rem; color:#fff;"><strong>Grades:</strong> ${teacherGrades}</p>
        <p style="margin: 4px 0; font-size: 0.95rem; color:#fff;"><strong>Location:</strong> ${teacherLocation}</p>
        
        <a href="https://wa.me/${cleanPhone}" target="_blank" style="display: inline-block; margin-top: 12px; padding: 8px 16px; background: #25d366; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">
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

  function filterTeachers() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedGrade = gradeSelect ? gradeSelect.value : 'all';
    const searchWords = searchTerm ? searchTerm.split(/\s+/) : [];

    const filtered = allTeachers.filter(t => {
      const nameStr = t.name || '';
      const subStr = Array.isArray(t.subject) ? t.subject.join(' ') : (t.subject || '');
      const gradeStr = Array.isArray(t.grades) ? t.grades.join(' ') : (t.grades || '');
      const locStr = t.location || '';

      const matchText = (nameStr + ' ' + subStr + ' ' + locStr + ' ' + gradeStr).toLowerCase();
      
      const matchesSearch = searchWords.every(word => matchText.includes(word));

      let matchesGrade = true;
      if (selectedGrade !== 'all') {
        matchesGrade = matchText.includes(selectedGrade.toLowerCase());
      }
      return matchesSearch && matchesGrade;
    });

    renderTeachers(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterTeachers);
  if (gradeSelect) gradeSelect.addEventListener('change', filterTeachers);

  async function handleAddTeacher(e) {
    e.preventDefault();
    
    const subjectSelect = document.getElementById('newTeacherSubject');
    const selectedSubjects = Array.from(subjectSelect.selectedOptions).map(opt => opt.value);

    const gradesSelect = document.getElementById('newTeacherGrades');
    const selectedGrades = Array.from(gradesSelect.selectedOptions).map(opt => opt.value);

    const formData = new FormData();
    formData.append('name', document.getElementById('newTeacherName').value.trim());
    formData.append('subject', selectedSubjects.join(', '));
    formData.append('grades', selectedGrades.join(', '));
    formData.append('location', document.getElementById('newTeacherLocation').value.trim());
    formData.append('phone', document.getElementById('newTeacherPhone').value.trim());
    
    const imageFile = document.getElementById('newTeacherImage').files[0];
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
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

  function attachDeleteEvents() {
    document.querySelectorAll('.btn-delete-teacher').forEach(btn => {
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