const form = document.getElementById('form')
const result = document.getElementById('result')
const search = document.getElementById('search')
const more = document.getElementById('more')

const apiURL = 'https://api.lyrics.ovh'

//Get data from API
async function searchSong(searchValue){
    const res = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await res.json()
    
    showData(data);
}

//show data on screen
function showData(data){
    // let output = ''
    // data.data.forEach(song => {
    //     output += `
    //         <li>
    //             <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    //             <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    //         </li>
    //     `
    // });

    // result.innerHTML = `
    // <ul class="songs">
    //     ${output}
    // </ul>
    // `
    result.innerHTML = `
    <ul class="songs">
    ${data.data.map((song)=>{
        return `
        <li>
                <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </li>
        `
    }).join('')}
</ul>

    `

    if(data.prev || data.next){
        more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoresongs('${data.prev}')">Prev</button>`:""}
        ${data.next ? `<button class="btn" onclick="getMoresongs('${data.next}')">Next</button>`:""}
        `
    }else{
        more.innerHTML = ''
    }
}   

async function getMoresongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await res.json()
    
    showData(data);
}

async function getLyrics(artist,songTitle){
    console.log(artist)
    console.log(songTitle)
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)
    const data = await res.json()
    console.log(data)
    const lyrics = data.lyrics.replace(/(\r\n |\r|\n)/g,'<br>');

    result.innerHTML = lyrics

    more.innerHTML=''
}

//EVENT LISTENER

form.addEventListener('submit',(e) =>{
    e.preventDefault()
    const searchValue = search.value.trim()
    if(!searchValue){
        alert("Please Enter some input")
    }
    else{
        searchSong(searchValue)
    }

})


result.addEventListener('click',e=>{
    if(e.target.tagName === 'BUTTON'){
        const artist = e.target.getAttribute('data-artist')
        const songTitle = e.target.getAttribute('data-songtitle')
        
        getLyrics(artist,songTitle)
    }
})