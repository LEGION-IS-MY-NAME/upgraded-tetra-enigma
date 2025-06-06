// Admin panel functionality for local server edits

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

async function loadSnippet(page) {
  const r = await fetch('/api/edits/' + page);
  return r.text();
}

async function saveSnippet(page, content) {
  await fetch('/api/edits/' + page, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({content})
  });
}

async function deleteSnippet(page) {
  await fetch('/api/edits/' + page, {method: 'DELETE'});
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

  byId('loadContent').addEventListener('click', async () => {
    const page = byId('pageSelect').value;
    byId('editor').value = await loadSnippet(page);
  });

  byId('saveContent').addEventListener('click', async () => {
    const page = byId('pageSelect').value;
    await saveSnippet(page, byId('editor').value);
    alert('Saved');
  });

  byId('deleteContent').addEventListener('click', async () => {
    const page = byId('pageSelect').value;
    await deleteSnippet(page);
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
