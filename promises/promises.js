const fetchButton = document.getElementById("fetch-btn");
const outputDiv = document.getElementById("output");

function fetchApiWithTimeout(apiUrl, timeout = 5000) {
  // Timeout promise
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject("Operation timed out."), timeout);
  });

  // Fetch promise
  const fetchPromise = fetch(apiUrl).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });

  // Return the fastest promise
  return Promise.race([fetchPromise, timeoutPromise]);
}

fetchButton.addEventListener("click", async () => {
  // Display loading message
  outputDiv.textContent = "Loading...";
  outputDiv.style.display = "flex";

  try {
    const data = await fetchApiWithTimeout("https://www.dummyjson.com/posts");
    const posts = data.posts;

    // Display fetched posts
    outputDiv.innerHTML =
      `<h2>Posts:</h2>` + posts.map((post) => `<p>${post.title}</p>`).join("");
  } catch (error) {
    // Handle errors
    outputDiv.innerHTML = `<p class="error">${error}</p>`;
  }
});
