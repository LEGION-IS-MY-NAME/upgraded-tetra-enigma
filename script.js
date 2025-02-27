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
