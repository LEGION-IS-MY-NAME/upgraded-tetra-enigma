// Admin panel functionality

// ensure default password exists
if (!localStorage.getItem('adminPassword')) {
  localStorage.setItem('adminPassword', 'password1');
}

function byId(id) {
  return document.getElementById(id);
}

function showPanel() {
  byId('login').style.display = 'none';
  byId('adminPanel').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  byId('loginButton').addEventListener('click', () => {
    const stored = localStorage.getItem('adminPassword');
    const entered = byId('passwordInput').value;
    if (entered === stored) {
      showPanel();
    } else {
      byId('loginError').textContent = 'Incorrect password';
    }
  });

  byId('loadContent').addEventListener('click', () => {
    const page = byId('pageSelect').value;
    byId('editor').value = localStorage.getItem('edits_' + page) || '';
  });

  byId('saveContent').addEventListener('click', () => {
    const page = byId('pageSelect').value;
    localStorage.setItem('edits_' + page, byId('editor').value);
    alert('Saved');
  });

  byId('deleteContent').addEventListener('click', () => {
    const page = byId('pageSelect').value;
    localStorage.removeItem('edits_' + page);
    byId('editor').value = '';
  });

  byId('changePassword').addEventListener('click', () => {
    const newPass = byId('newPassword').value.trim();
    if (newPass) {
      localStorage.setItem('adminPassword', newPass);
      byId('passwordMessage').textContent = 'Password updated';
      byId('newPassword').value = '';
    }
  });
});
