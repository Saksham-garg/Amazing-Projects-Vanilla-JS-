const postContainer = document.getElementById('post-container')

const loader = document.querySelector('.loader')
const filterPosts = document.getElementById('filter-posts')

let page = 1
let limit = 5
async function getPosts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    const data = await res.json()
    return data;
}

async function showPosts(){
    const posts = await getPosts();
    posts.forEach((post)=>{
        const postDiv = document.createElement('div')
        postDiv.classList.add('post')
        postDiv.innerHTML=`
        <div class="number">${post.id}</div>
        <div class="post-info">
           <div class="post-title">${post.title}</div>
           <p class="post-body">
               ${post.body}
           </p>
        </div>
        
        `
        postContainer.appendChild(postDiv)
    })
}

function showLoading(){
    loader.classList.add('show')

    setTimeout(() => {
        loader.classList.remove('show')

        setTimeout(() => {
            page++;
            showPosts()
        }, 300);
    }, (1000));
}

window.addEventListener('scroll',()=>{
    const {scrollTop,scrollHeight,clientHeight} = document.documentElement;

    if( scrollTop + clientHeight >= scrollHeight - 5 ){
        showLoading()
    }
})

function filterPost(e){
    const posts = document.querySelectorAll('.post')
    const term = e.target.value.toUpperCase();
    posts.forEach((post)=>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();
        console.log(title)
        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            post.style.display = 'flex'
        }else{
            post.style.display = 'none'
        }
    })
}

filterPosts.addEventListener('input',(e)=>filterPost(e))

showPosts()