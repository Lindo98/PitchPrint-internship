import "./style.css";

const apiKey = "4563bca55c444df69bad2adf99a5b966";
let currentIndex = 0;
let articles = [];

// Carousel

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${apiKey}`
    );
    const data = await response.json();
    articles = data.articles;

    const carouselInner = document.querySelector(".carousel-slides");
    articles.forEach((article) => {
      const imgElement = document.createElement("img");
      imgElement.src = article.urlToImage;
      imgElement.alt = article.title;
      imgElement.onclick = () => {
        window.open(article.url, "_blank");
      };
      carouselInner.appendChild(imgElement);
    });

    updateCarousel();
  } catch (error) {
    console.error(error);
  }
});

function updateCarousel() {
  const carouselInner = document.querySelector(".carousel-slides");
  carouselInner.style.transform = `translateX(-${currentIndex * 50}%)`;
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = articles.length - 2;
  }
  updateCarousel();
  resetAutoScroll();
}

function nextSlide() {
  if (currentIndex < articles.length - 2) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
  resetAutoScroll();
}

function startAutoScroll() {
  autoScrollInterval = setInterval(nextSlide, 5000); // Auto-scroll every 5 seconds
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function resetAutoScroll() {
  stopAutoScroll();
  startAutoScroll();
}

// Added event listeners to stop auto-scrolling when user interacts with carousel
document
  .querySelector(".carousel")
  .addEventListener("mouseenter", stopAutoScroll);
document
  .querySelector(".carousel")
  .addEventListener("mouseleave", startAutoScroll);

// following code is for the news articles

fetch(`https://newsapi.org/v2/top-headlines?country=za&apiKey=${apiKey}`).then(
  (response) => {
    response.json().then((data) => {
      const newContainer = document.getElementById("article-container");

      // code snippet iterates over an array of articles and creates a new HTML <article>
      //element for each one, appending it to a container element

      data.articles.forEach((article) => {
        const newArticle = document.createElement("article");
        newArticle.classList.add("article");
        newContainer.appendChild(newArticle);

        const source = document.createElement("h2");
        source.textContent = article.source.name;
        newArticle.appendChild(source);

        const title = document.createElement("h4");
        title.textContent = article.title;
        newArticle.appendChild(title);

        const author = document.createElement("p");
        author.textContent = article.author;
        newArticle.appendChild(author);

        const description = document.createElement("p");
        description.textContent = article.description;
        newArticle.appendChild(description);

        const url = document.createElement("a");
        url.textContent = "Read more";
        url.href = article.url;
        newArticle.appendChild(url);

        const publishedAt = document.createElement("p");
        publishedAt.textContent = article.publishedAt;
        newArticle.appendChild(publishedAt);
      });
      document.body.appendChild(newContainer);
    });
  }
);
