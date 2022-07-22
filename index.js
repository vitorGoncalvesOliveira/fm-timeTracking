import api from './js/data.js'
const infoUser = document.getElementsByClassName('info')[0];

const times = ['work', 'play','study','exercise','social','selfcare']

async function main(){
    try{
    const data = await api;
    const timeData = await data.json();
    infoUser.addEventListener('click', (e) =>{
        const target = e.target
        if(target.tagName === 'H4'){
            removeClassActive()
            target.classList.add('active')
            updateData(target.innerText.toLowerCase(),timeData)

        }
    })
    updateData('daily', timeData)

    }catch(error){
        console.log(error)
    }

}
await main()

function removeClassActive(){
    
    const childrens = infoUser.children
    for(let element of childrens){
        element.classList.remove('active')
    }    
}

function updateData(time, data){
    console.log(data)
    for(let type of times){

        const divElements = document.getElementsByClassName(`times-${type}`)[0];
        const timeWork = data.find(element => element.title.toLowerCase() === type)
        divElements.children[1].innerHTML = timeWork.timeframes[time].current + 'hrs'
        const previousTime = timeWork.timeframes[time].previous;
        divElements.children[2].innerHTML = `Last Week - ${previousTime}hrs`

    }   

}