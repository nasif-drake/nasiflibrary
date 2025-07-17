// --- Featured LIS Books Data ---
const lisBooks = [
  {
    title: "Foundations of Library and Information Science",
    author: "Richard E. Rubin",
    desc: "A foundational book on the history, ethics, and development of library services.",
    status: "Available",
    cover: "📚"
  },
  {
    title: "Introduction to Information Science",
    author: "David Bawden & Lyn Robinson",
    desc: "Explains how information is produced, used, and managed in modern systems.",
    status: "Issued",
    cover: "💡"
  },
  {
    title: "The Organization of Information",
    author: "Arlene G. Taylor & Daniel N. Joudrey",
    desc: "A key text for cataloging and metadata.",
    status: "Available",
    cover: "🗂️"
  },
  {
    title: "Information Services Today: An Introduction",
    author: "Sandra Hirsh (ed.)",
    desc: "Covers modern library services, including digital transformation and policy.",
    status: "Available",
    cover: "🌐"
  },
  {
    title: "Digital Libraries: Principles and Practice in a Global Environment",
    author: "Lucy A. Tedd & J.A. Large",
    desc: "Focuses on design, structure, and international models of digital libraries.",
    status: "Issued",
    cover: "🖥️"
  }
];

let lisCarouselIndex = 0;
const lisVisibleCount = 3;
function renderLisCarousel() {
  const track = document.getElementById('lis-carousel-track');
  if (!track) return;
  track.innerHTML = '';
  const start = lisCarouselIndex;
  const end = Math.min(start + lisVisibleCount, lisBooks.length);
  for (let i = start; i < end; i++) {
    const book = lisBooks[i];
    const card = document.createElement('div');
    card.className = 'lis-book-card';
    card.innerHTML = `
      <div class="lis-book-cover">${book.cover}</div>
      <div class="lis-book-title">${book.title}</div>
      <div class="lis-book-author">${book.author}</div>
      <div class="lis-book-desc">${book.desc}</div>
      <span class="lis-status-badge${book.status === 'Issued' ? ' issued' : ''}">${book.status}</span>
      <button class="lis-view-btn">View Details</button>
    `;
    track.appendChild(card);
  }
  const leftBtn = document.getElementById('lis-carousel-left');
  const rightBtn = document.getElementById('lis-carousel-right');
  if (leftBtn) leftBtn.disabled = lisCarouselIndex === 0;
  if (rightBtn) rightBtn.disabled = lisCarouselIndex + lisVisibleCount >= lisBooks.length;
}
function setupLisCarousel() {
  const leftBtn = document.getElementById('lis-carousel-left');
  const rightBtn = document.getElementById('lis-carousel-right');
  if (leftBtn) leftBtn.addEventListener('click', () => {
    if (lisCarouselIndex > 0) {
      lisCarouselIndex--;
      renderLisCarousel();
    }
  });
  if (rightBtn) rightBtn.addEventListener('click', () => {
    if (lisCarouselIndex + lisVisibleCount < lisBooks.length) {
      lisCarouselIndex++;
      renderLisCarousel();
    }
  });
}
function setupLisSwipe() {
  const track = document.getElementById('lis-carousel-track');
  if (!track) return;
  let startX = 0;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 40 && lisCarouselIndex > 0) {
      lisCarouselIndex--;
      renderLisCarousel();
    } else if (startX - endX > 40 && lisCarouselIndex + lisVisibleCount < lisBooks.length) {
      lisCarouselIndex++;
      renderLisCarousel();
    }
  });
}

// --- Newly Arrived Section ---
const newlyArrived = [
  {
    title: "Library Spaces: Meeting the Challenge of User Needs",
    author: "Kathleen Stacey",
    desc: "A practical guide to designing and managing modern library spaces.",
    cover: "🏛️"
  },
  {
    title: "Open Access and the Library",
    author: "John Willinsky",
    desc: "Explores the impact of open access on libraries and scholarly communication.",
    cover: "🔓"
  },
  {
    title: "Data Management for Libraries",
    author: "Margaret E. Henderson",
    desc: "Strategies and best practices for managing research data in libraries.",
    cover: "💾"
  },
  {
    title: "Emerging Technologies in Libraries",
    author: "Jennifer Koerber",
    desc: "An overview of new technologies and their applications in library settings.",
    cover: "🤖"
  }
];
function renderNewlyArrived() {
  const list = document.getElementById('newly-arrived-list');
  if (!list) return;
  list.innerHTML = '';
  newlyArrived.slice(0, 4).forEach(item => {
    const card = document.createElement('div');
    card.className = 'newly-card';
    card.innerHTML = `
      <div class="newly-cover">${item.cover}</div>
      <div class="newly-title">${item.title}</div>
      <div class="newly-author">${item.author}</div>
      <div class="newly-desc">${item.desc}</div>
    `;
    list.appendChild(card);
  });
}

// --- AI Chatbot Widget Logic ---
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotBox = document.getElementById('chatbot-box');
const chatbotMinimize = document.getElementById('chatbot-minimize');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotHeader = chatbotBox ? chatbotBox.querySelector('.chatbot-header') : null;

function openChatbot() {
  chatbotBox.classList.add('open');
  chatbotToggle.style.display = 'none';
}
function closeChatbot() {
  chatbotBox.classList.remove('open');
  chatbotToggle.style.display = 'flex';
}
if (chatbotToggle && chatbotBox) {
  chatbotToggle.addEventListener('click', openChatbot);
}
if (chatbotMinimize) {
  chatbotMinimize.addEventListener('click', closeChatbot);
}

function addChatMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.className = `chatbot-message ${sender}`;
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

const suggestionResponses = {
  'See Membership Information': 'Membership is open to all. Visit the front desk or our website to join!',
  'Borrow Information': 'You can borrow up to 5 books for 2 weeks. Renewals are available online or at the library.',
  'Fine Information': 'Overdue fines are $0.25 per day per book. Please return books on time to avoid fines.',
  'Newly Arrived Documents': 'Check out our Newly Arrived section for the latest books and resources!'
};

function handleSuggestionClick(e) {
  const text = e.target.textContent;
  addChatMessage(text, 'user');
  setTimeout(() => {
    addChatMessage(suggestionResponses[text] || 'Sorry, I do not have information on that yet.', 'bot');
  }, 600);
}

if (chatbotBox) {
  chatbotBox.addEventListener('click', e => {
    if (e.target.classList.contains('chatbot-suggestion')) {
      handleSuggestionClick(e);
    }
  });
}

if (chatbotForm && chatbotInput) {
  chatbotForm.addEventListener('submit', e => {
    e.preventDefault();
    const val = chatbotInput.value.trim();
    if (!val) return;
    addChatMessage(val, 'user');
    chatbotInput.value = '';
    setTimeout(() => {
      // Placeholder bot response
      if (/membership|join/i.test(val)) {
        addChatMessage(suggestionResponses['See Membership Information'], 'bot');
      } else if (/borrow|loan/i.test(val)) {
        addChatMessage(suggestionResponses['Borrow Information'], 'bot');
      } else if (/fine|overdue/i.test(val)) {
        addChatMessage(suggestionResponses['Fine Information'], 'bot');
      } else if (/new|arriv/i.test(val)) {
        addChatMessage(suggestionResponses['Newly Arrived Documents'], 'bot');
      } else {
        addChatMessage('Sorry, I am just a demo. Please select a suggestion or ask about membership, borrowing, fines, or new arrivals.', 'bot');
      }
    }, 700);
  });
}

// --- Draggable Chatbot (Desktop) ---
if (chatbotBox && chatbotHeader) {
  let isDragging = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;
  chatbotHeader.addEventListener('mousedown', function(e) {
    if (window.innerWidth < 700) return; // Don't drag on mobile
    isDragging = true;
    chatbotBox.classList.add('draggable');
    startX = e.clientX;
    startY = e.clientY;
    const rect = chatbotBox.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    chatbotBox.style.left = (startLeft + dx) + 'px';
    chatbotBox.style.top = (startTop + dy) + 'px';
    chatbotBox.style.right = 'auto';
    chatbotBox.style.bottom = 'auto';
    chatbotBox.style.position = 'fixed';
  });
  document.addEventListener('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      chatbotBox.classList.remove('draggable');
      document.body.style.userSelect = '';
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderLisCarousel();
  setupLisCarousel();
  setupLisSwipe();
  renderNewlyArrived();
}); 