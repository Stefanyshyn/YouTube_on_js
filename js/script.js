const switcher = document.querySelector('#cbx'),
    more = document.querySelector('.more'),
    modal = document.querySelector('.modal'),
    videos = document.querySelectorAll('.videos__item');
let player;
const videosWrapper = document.querySelector('.videos__wrapper');


function bindSliderToggle(trigger, boxBody, content, openClass){
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };
    const box = document.querySelector(boxBody),
        boxContent = document.querySelector(content);
        button.element.addEventListener("click", () =>{
        if(button.active === false) { // Перевіряємо меню на не активність
            button.active = true;      // Якщо вона не активна - то робиимо її активною
            box.style.height = boxContent.clientHeight + 'px';
            box.classList.add(openClass);//Активний клас для меню
        }else{
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass);
        }
    })
}
bindSliderToggle('.hamburger', '[data-slide="nav"]', '.header__item', 'slide-active');

function switchMode(){
    if(night === false) {
        night = true;
        // Задній фон робиться чорним
        document.body.classList.add('night');
        // Міняємо колір ліній в гамбургера на білий
        document.querySelectorAll('.hamburger>line').forEach(iteam =>{
            iteam.style.stroke = '#fff';
        });
        // Міняємо колір назви відео на білий
        document.querySelectorAll('.videos__item-descr').forEach(iteam =>{
            iteam.style.color = '#fff';
        });
        // Міняємо колір кількість переглядів на білий
        document.querySelectorAll('.videos__item-views').forEach(iteam =>{
            iteam.style.color = '#fff';
        });
        // Міняємо колір позначки нічного режиму на білий колір
        document.querySelector('.header__item-descr').style.color = '#fff';
        // Міняємо лого на лого для нічного режиму
        document.querySelector('.logo>img').src = "logo/youtube_night.svg";
    } else{
        night = false;
        document.body.classList.remove('night');
        document.querySelectorAll('.hamburger>line').forEach(iteam =>{
            iteam.style.stroke = '#000';
        });
        document.querySelectorAll('.videos__item-descr').forEach(iteam =>{
            iteam.style.color = '#000';
        });
        document.querySelectorAll('.videos__item-views').forEach(iteam =>{
            iteam.style.color = '#000';
        });
        document.querySelectorAll('.header__item-descr').forEach(iteam =>{
            iteam.style.color = '#000';
        });
        document.querySelector('.header__item-descr').style.color = '#000';
        document.querySelector('.logo>img').src = "logo/youtube.svg";
    }
}

let night = false;
switcher.addEventListener('change', () =>{
    switchMode();
})
/*
const data = [
    ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
    ['Nightcore - So Am I',
        '#2 Установка spikmi и робота с ветками на Github | Мафарон верстки Урок 2',
        '#1 Верстка реального заказа landing Page | Марафон верстки | Артем Исламов'],
    ['2 343 349 переглядів', '4.2 тыс просмотров', '28 тыс просмотров'],
    ['EKLWC93nvAU', '7BvHoh0BrMw', 'mC8JW_aG2EM']
];
*/
/*
more.addEventListener("click", () =>{
    const videosWrapper = document.querySelector('.videos__wrapper');
    more.remove();

    for(let i = 0; i < data[0].length; ++i) {
        let card = document.createElement('a');
        card.classList.add('videos__item', 'videos__item-active');
        card.setAttribute('data-url', `${data[3][i]}`);
        card.innerHTML = `
        <img src="${data[0][i]}" alt="thumb">
        <div class="videos__item-descr">
            ${data[1][i]}
        </div>
        <div class="videos__item-views">
            ${data[2][i]}
        </div>
        `;
        videosWrapper.appendChild(card);
        setTimeout( () => {
            card.classList.remove('videos__item-active');
        }, 10);
        bindNewModal(card);

        if (night === true) {
            card.querySelector('.videos__item-descr').style.color = '#fff';
            card.querySelector('.videos__item-views').style.color = '#fff';
        }    
    }

    bindModal(document.querySelectorAll('.videos__item'));
    sliceTitle('.videos__item-descr', 50);
});
*/

function start(){
    gapi.client.init(
        {
            'apiKey': 'AIzaSyCo8462XctGHxPyEckhAgqq-QgTPjywWNA',
            'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
        }
    ).then(function(){
        return gapi.client.youtube.playlistItems.list(
            {
                "part": "snippet,contentDetails",
                "maxResults": '6',
                'playlistId':"PL3LQJkGQtzc4gsrFkm4MjWhTXhopsMgpv"
            }
        );
    }).then(function(response){
        console.log(response.result);
        
        response.result.items.forEach(item => {
            let card = document.createElement('a');
            card.classList.add('videos__item', 'videos__item-active');
            card.setAttribute('data-url', item.contentDetails.videoId);
            card.innerHTML = `
            <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
            <div class="videos__item-descr">
                ${item.snippet.title}
            </div>
            <div class="videos__item-views">
                2.7 тис. просмотров
            </div>
            `;
            videosWrapper.appendChild(card);
            setTimeout( () => {
                card.classList.remove('videos__item-active');
            }, 10);
         
            if (night === true) {
                card.querySelector('.videos__item-descr').style.color = '#fff';
                card.querySelector('.videos__item-views').style.color = '#fff';
            }

        });

        sliceTitle('.videos__item-descr', 50);
        bindModal(document.querySelectorAll('.videos__item'));

    }).catch(e => {
        console.log(e);
    })
}

more.addEventListener('click', () =>{
    more.remove();
    gapi.load('client', start);
});

function search(target){
    gapi.client.init(
        {
            'apiKey': 'AIzaSyCo8462XctGHxPyEckhAgqq-QgTPjywWNA',
            'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
        }
    ).then(function(){
        return gapi.client.youtube.search.list(
            {
                'maxResults': '10',
                'part': 'snippet',
                'q': `${target}`,
                'type': '' 
            }
        )
   }).then(function(response){
        console.log(response.result);
        // videosWrapper.innerHTML = "";
        while(videosWrapper.firstChild){
            videosWrapper.removeChild(videosWrapper.firstChild);
        }
        response.result.items.forEach(item => {
            let card = document.createElement('a');
            card.classList.add('videos__item', 'videos__item-active');
            card.setAttribute('data-url', item.id.videoId);
            card.innerHTML = `
            <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
            <div class="videos__item-descr">
                ${item.snippet.title}
            </div>
            <div class="videos__item-views">
                2.7 тис. просмотров
            </div>
            `;
            videosWrapper.appendChild(card);
            setTimeout( () => {
                card.classList.remove('videos__item-active');
            }, 10);
         
            if (night === true) {
                card.querySelector('.videos__item-descr').style.color = '#fff';
                card.querySelector('.videos__item-views').style.color = '#fff';
            }

        });

        sliceTitle('.videos__item-descr', 50);
        bindModal(document.querySelectorAll('.videos__item'));

    })
}

document.querySelector('.search').addEventListener('submit', (e) => {
    e.preventDefault();
    gapi.load('client', () => {
        search(document.querySelector('.search > input').value);
        document.querySelector('.search > input').value = "";
    });

})

function sliceTitle(selector, count){
    document.querySelectorAll(selector).forEach(item => {
        // Видаляються пропуски спочатку і з кінця
        item.textContent = item.textContent.trim();
        
        if(item.textContent.length < count){
            return;
        } else {
            const str = item.textContent.slice(0, count + 1) + "...";
            item.textContent = str;
        }
    });
}
sliceTitle('.videos__item-descr', 50);


function openModal(){
    modal.style.display = 'block';
}

function closeModal(){
    modal.style.display = 'none';
    player.stopVideo();
}

function bindModal(cards){
    cards.forEach(item => {
         item.addEventListener('click', (e) =>{
            e.preventDefault();
            const id = item.getAttribute('data-url');
            loadVideo(id);
            openModal();
         });
    })
}

function bindNewModal(card) {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    })
}

modal.addEventListener('click', (e) => {
    if(!e.target.classList.contains('modal__body')){
        closeModal();
    }
})
document.addEventListener('keydown', (e) => {
    if(e.keyCode === 27){
        closeModal();
    }   
})
function createVideo(){
    // 1. Цей код завантажує код API IFrame Player асинхронно
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // 2. Ця функція створює <iframe> (і програвач YouTube) 
    // після завантаження коду API.
    setTimeout(() => {
        player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE',
          });    
    }, 300);
}

createVideo();

function loadVideo(id) {
    player.loadVideoById({'videoId': `${id}`});
}