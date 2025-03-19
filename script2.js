document.addEventListener("DOMContentLoaded", function () {
    fetch("articles.json")
        .then(response => response.json())
        .then(articles => {
            const articlesPerPage = 3;
            const urlParams = new URLSearchParams(window.location.search);
            let page = parseInt(urlParams.get('page')) || 1;
            let start = (page - 1) * articlesPerPage;
            let end = start + articlesPerPage;
            let paginatedArticles = articles.slice(start, end);

            const blogContainer = document.getElementById("blog-container");
            blogContainer.innerHTML = "";

            paginatedArticles.forEach(article => {
                blogContainer.innerHTML += `
                    <div class="sofax-inner-blog-wrap wow fadeInUpX" style="max-width: 65%; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top : 20px">
                        <div class="sofax-inner-blog-img">
                            <img src="${article.image}" alt="${article.title}" style="width: 450px">
                        </div>
                        <div class="sofax-inner-blog-content">
                            <div class="sofax-inner-blog-meta">
                                <h5>${article.category}</h5>
                                <ul><li>${article.date}</li></ul>
                            </div>
                            <div class="sofax-inner-blog-text">
                                <a href="${article.link}"><h3>${article.title}</h3></a>
                                <p>${article.excerpt}</p>
                            </div>
                            <a class="sofax-icon-btn" href="${article.link}">En savoir plus</a>
                        </div>
                    </div>
                `;
            });

            // Pagination
            const paginationContainer = document.getElementById("pagination");
            paginationContainer.innerHTML = "";
            let totalPages = Math.ceil(articles.length / articlesPerPage);

            if (page > 1) {
                paginationContainer.innerHTML += `<a class="page-numbers" href="?page=${page - 1}"><<</a>`;
            }
            for (let i = 1; i <= totalPages; i++) {
                paginationContainer.innerHTML += `<a class="page-numbers ${i === page ? 'current' : ''}" href="?page=${i}">${i}</a>`;
            }
            if (page < totalPages) {
                paginationContainer.innerHTML += `<a class="page-numbers" href="?page=${page + 1}">>></a>`;
            }
        });
});
