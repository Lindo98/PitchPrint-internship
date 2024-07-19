import "./style.css";

const apiKey = "4563bca55c444df69bad2adf99a5b966";

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
