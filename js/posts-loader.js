function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false; // keep order, just in case
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

async function loadAllPosts() {
  window.allPosts = window.allPosts || [];

  const files = window.postScriptFiles || [];
  await Promise.all(files.map(loadScript));

  // now allPosts is filled by each post-*.js
  // sort newest first (optional)
  window.posts = window.allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Call this once DOM + scripts are ready.
// renderPostList should live in main.js
window.addEventListener("DOMContentLoaded", async () => {
  await loadAllPosts();
  if (typeof renderPostList === "function") {
    renderPostList();
  }
});