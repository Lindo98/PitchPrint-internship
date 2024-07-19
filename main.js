import "./style.css";

const apiKey = "4563bca55c444df69bad2adf99a5b966";

fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`).then((response) => {
  response.json().then((data) => {
    const sourcesContainer = document.getElementById("app");
    data.sources.forEach((source) => {
      const sourceButton = document.createElement("button");
      sourceButton.classList.add("source-button");
      sourceButton.textContent = source.name;
      sourcesContainer.appendChild(sourceButton);

      sourceButton.addEventListener("click", () => {
        fetch(
          `https://newsapi.org/v2/everything?sources=${source.id}&apiKey=${apiKey}`
        ).then((response) => {
          response.json().then((data) => {
            const newContainer = document.getElementById("article-container");
            data.articles.forEach((article) => {    
              const newArticle = document.createElement("article");
              newArticle.classList.add("article");
              newContainer.appendChild(newArticle);
              
              const source = document.createElement("h2");
              source.textContent = article.source.name;
              newArticle.appendChild(source);
              
              const images = document.createElement("img");
              images.src = article.urlToImage;  
              newArticle.appendChild(images);
              
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
            });
            document.body.appendChild(newContainer);
          });
        });
      });
    });
  });
});

fetch(
  `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${apiKey}`
).then((response) => {
  response.json().then((data) => {
    const newContainer = document.getElementById("article-container");

    data.articles.forEach((article) => {
      const newArticle = document.createElement("article");
      newArticle.classList.add("article");
      newContainer.appendChild(newArticle);

      const source = document.createElement("h2");
      source.textContent = article.source.name;
      newArticle.appendChild(source);

      const images = document.createElement("img");
      images.src = article.urlToImage;
      newArticle.appendChild(images);

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
    });
    document.body.appendChild(newContainer);
  });
});
