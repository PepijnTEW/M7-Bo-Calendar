document.addEventListener("DOMContentLoaded", function () {
  let allPosts = [];
  let currentIndex = 0;
  const postsPerPage = 10;

  fetch("./json/MOCK_DATA.json")
    .then((res) => res.json())
    .then((data) => {
      allPosts = data;
      loadMorePosts();
    })
    .catch((error) => console.error("Error fetching JSON data:", error));

  function loadMorePosts() {
    const container = document.getElementById("post_container");
    if (!container) {
      console.error("Element with ID 'post_container' not found.");
      return;
    }

    const nextPosts = allPosts.slice(currentIndex, currentIndex + postsPerPage);
    nextPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
                <div class="post_card">
                    <div class="user_info">
                        <img src="${post.avatar}" alt="Avatar of ${post.user}" class="avatar" />
                        <span class="username">@${post.user}</span>
                        <span class="score">⭐ ${post.score}</span>
                    </div>
                    <div class="post_content">
                        <h2 class="title">${post.title}</h2>
                        <img class="post_img"src="${post.img}" alt="">
                    </div>

                </div>
            `;
      container.appendChild(postElement);
    });

    currentIndex += postsPerPage;
  }

  window.addEventListener("scroll", function () {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      loadMorePosts();
    }
  });
});
