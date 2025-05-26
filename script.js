const homeScreen = document.getElementById("homeScreen");
const urlInput = document.getElementById("urlInput");
const goButton = document.getElementById("goButton");
const darkModeToggle = document.getElementById("darkModeToggle");

const browserBar = document.getElementById("browserBar");
const proxyUrlInput = document.getElementById("proxyUrl");
const goBtn = document.getElementById("goBtn");
const homeBtn = document.getElementById("homeBtn");

// Format input into full URL or search query
function formatUrl(input) {
  input = input.trim();

  // Add https:// if missing
  if (!/^https?:\/\//i.test(input)) {
    input = "https://" + input;
  }

  // If not a proper TLD, treat as search
  const tldRegex = /\.[a-z]{2,}$/i;
  if (!tldRegex.test(input)) {
    input = `https://duckduckgo.com/?q=${encodeURIComponent(input.replace(/^https?:\/\//i, ''))}`;
  }

  return input;
}

// Send user to backend proxy
function openProxy(input) {
  const formattedUrl = formatUrl(input);
  const proxyBase = "https://famas-proxy-backend.onrender.com"; // Replace with your actual Render URL
  const fullUrl = `${proxyBase}/?url=${encodeURIComponent(formattedUrl)}`;
  window.location.href = fullUrl;
}

// Event listeners for home screen
goButton.addEventListener("click", () => {
  if (urlInput.value.trim() !== "") {
    openProxy(urlInput.value);
  }
});

urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && urlInput.value.trim() !== "") {
    openProxy(urlInput.value);
  }
});

// Optional: taskbar input listeners (if you have them in DOM)
goBtn?.addEventListener("click", () => {
  if (proxyUrlInput?.value.trim() !== "") {
    openProxy(proxyUrlInput.value);
  }
});

proxyUrlInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && proxyUrlInput.value.trim() !== "") {
    openProxy(proxyUrlInput.value);
  }
});

// Home button resets
homeBtn?.addEventListener("click", () => {
  location.href = "/";
});

// Dark mode handling
if (localStorage.getItem("darkMode") === "false") {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
  darkModeToggle.checked = false;
} else {
  document.body.classList.add("dark");
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("darkMode", "false");
  }
});
