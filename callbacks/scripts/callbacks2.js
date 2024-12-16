
async function getPosts(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error(`Error fetching posts: ${error}`);
  }
}

async function getTitlesOfPosts() {
  try {
    const posts = await getPosts("https://www.dummyjson.com/posts");
    return posts.map((post) => post.title);
  } catch (error) {
    console.error(`Error processing posts: ${error}`);
  }
}

document
  .getElementById("callback-btn")
  .addEventListener("click", async function () {
    const parentElement = document.getElementById("callback-text");
    parentElement.innerHTML = ""; // Clear previous titles

    // Add heading
    const mainHeading = document.createElement("h2");
    mainHeading.textContent = "Posts:";
    parentElement.appendChild(mainHeading);

    // Delay for 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Fetch and display titles
    const titles = await getTitlesOfPosts();
    if (titles && titles.length > 0) {
      parentElement.style.display = "flex"; // Show the container
      titles.forEach((title) => {
        const childElement = document.createElement("p");
        childElement.textContent = title;
        parentElement.appendChild(childElement);
      });
    }
  });
