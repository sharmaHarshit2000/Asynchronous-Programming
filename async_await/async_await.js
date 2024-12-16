const fetchButton = document.getElementById("fetch-btn");
const outputDiv = document.getElementById("output");

async function fetchPosts() {
  const API_URL = "https://dummyjson.com/posts";
  try {
    // Display loading message
    outputDiv.textContent = "Loading...";
    outputDiv.style.display = "flex";

    // Simulate a delay for timeout
    const response = await Promise.race([
      fetch(API_URL),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 5000)
      ),
    ]);

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Display fetched posts
    const posts = data.posts;
    outputDiv.innerHTML =
      `<h2>Posts:</h2>` + posts.map((post) => `<p>${post.title}</p>`).join("");
  } catch (error) {
    // Handle errors (network issues & timeout)
    outputDiv.innerHTML = `<p class="error">${error.message}</p>`;
  }
}


//Add EventListener to the button on click
fetchButton.addEventListener("click", fetchPosts);
