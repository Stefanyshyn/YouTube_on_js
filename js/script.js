const switcher = document.querySelector('#cbx'),
    more = document.querySelector('.more'),
    modal = document.querySelector('.modal'),
    videos = document.querySelectorAll('.videos__item');
let player;


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

const data = [
    ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
    ['W3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
        '#2 Установка spikmi и робота с ветками на Github | Мафарон верстки Урок 2',
        '#1 Верстка реального заказа landing Page | Марафон верстки | Артем Исламов'],
    ['3.6 тыс просмотров', '4.2 тыс просмотров', '28 тыс просмотров'],
    ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
];

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
    }

    bindModal(document.querySelectorAll('.videos__item'));

    if (night === true) {
        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#fff';
        });
        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#fff';
        });
    }
    sliceTitle('.videos__item-descr', 50);
});

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
bindModal(videos);

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