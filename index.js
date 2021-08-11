let page = 1;

const postContainer = document.getElementById("posts-container");
const filterInput = document.getElementById('filter')
const loaderPage = document.querySelector(".loader");

const getPost = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
    return response.json();
}

const addPostsIntoDom = async () => {
    const allPosts = await getPost();
    allPosts.map(({ id, title, body }) => {
        e = `
        <div class="post">
            <div class="number">${id}</div>
            <div class="post-info">
                <h2 class="post-title">${title}</h2>
                <p class="post-body">${body}</p>
            </div>
        </div>
        `
        var post = document.createElement('div');
        post.innerHTML = e;

        postContainer.appendChild(post);
    }).join('');


}

addPostsIntoDom();


const getNextpost = () => {
    page++;
    addPostsIntoDom();
}

const removeLoader = () => {
    setTimeout(() => {
        loaderPage.classList.remove('show')
        getNextpost();
    }, 1000);
}

const showLoader = () => {
    loaderPage.classList.add('show')
    removeLoader();
}

window.addEventListener('scroll', () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const conditionFinalPage = scrollTop + clientHeight >= scrollHeight - 10

    if (conditionFinalPage) {
        showLoader();
    }
})

filterInput.addEventListener('input', event => {
    const inputValue = event.target.value.toLocaleLowerCase();
    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {

        const postTitle = post.querySelector(".post-title").textContent.toLocaleLowerCase();
        const postBody = post.querySelector(".post-body").textContent.toLocaleLowerCase();

        if (postTitle.includes(inputValue) || postBody.includes(inputValue)) {
            post.style.display = "flex";
            return
        }

        post.style.display = "none";

    });

})