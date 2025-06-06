const quotes = [
      "Not everything can be explained. Some things are felt.",
      "Echoes of resistance in the void. Can you hear it?",
      "If chaos breeds order, what does your silence create?",
      "What happens when the machines decide they've had enough?",
      "The loudest noise is often silence. Sit with it. Understand it.",
      "To destroy is to create. To create is to destroy. Where do you stand?",
      "The anthem of rebellion returns. Are you ready?",
      "This is the calm before the storm. Stay tuned.",
      "Not all noise is sound. Some of it is revolution.",
      "Can a distorted reality be more true than the one you know?",
      "The future is noise. Will you embrace it or fear it?",
      "Rebellion has a sound. It's coming.",
      "Everything ends. But not yet.",
      "What if the static isn't interference, but the message?",
      "You can't see the machine. You are the machine."
    ];

    let currentQuote = 0;

    function changeQuote() {
      const quoteElement = document.getElementById('quote');
      quoteElement.style.opacity = 0;
      setTimeout(() => {
        quoteElement.innerText = quotes[currentQuote];
        quoteElement.style.opacity = 1;
      }, 500);
      currentQuote = (currentQuote + 1) % quotes.length;
    }

setInterval(changeQuote, 5000);
changeQuote();

// load saved edits for the current page from server
async function applyEdits(url) {
  const page = url.split('/').pop();
  const r = await fetch('/api/edits/' + page);
  const saved = await r.text();
  if (saved) {
    const container = document.getElementById('content') || document.querySelector('main');
    if (container) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = saved;
      container.appendChild(wrapper);
    }
  }
}

// basic PJAX navigation to keep the player alive
function loadContent(url, addHistory = true) {
  fetch(url)
    .then(r => r.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const newMain = doc.querySelector('main');
      if (newMain) {
        document.getElementById('content').innerHTML = newMain.innerHTML;
      }
      if (addHistory) {
        history.pushState({}, '', url);
      }
      applyEdits(url);
    });
}

function setupNavigation() {
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      loadContent(a.getAttribute('href'));
    });
  });
}

window.addEventListener('popstate', () => {
  loadContent(location.pathname, false);
});

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  applyEdits(location.pathname.split('/').pop() || 'index.html');
});
