const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')


settingsBtn.addEventListener('click',()=>{
    console.log("fdkl")
    if(settings.classList.contains('show')){
        settings.classList.remove('show')
    }else{
        settings.classList.add('show')
    }
})
