const archPic = document.querySelectorAll('.arch_pic'),
      archSlides = document.querySelectorAll('.arch_ex'),
      arrowContainer = document.querySelectorAll('.arrow_container'),
      archTape = document.querySelector('.arch_tape'),
      sliderWindow = document.querySelector('.arch_examples_slider'),
      width = window.getComputedStyle(sliderWindow).width;

// Блок слайдера из раздела "Архитектура"

      let sliderIndex = 1,
    offset = 0;

archTape.style.width = archSlides.length * 100 + '%';
archTape.style.transition = '0.5s all';

function setSlideSize () {
    archSlides.forEach (element => {
        element.style.width = width;
    })
}

setSlideSize();

arrowContainer.forEach(element => {
    
    element.addEventListener('click', (event) => {

        if (event.target.classList.contains('left_arrow')) {
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) * (archSlides.length - 1);
            } else {
                offset -= +width.slice(0, width.length - 2);
            }

            archTape.style.transform = `translateX(-${offset}px)`;
        
        } else if (event.target.classList.contains('right_arrow')) {
            if (offset == +width.slice(0, width.length - 2) * (archSlides.length - 1)) {
                offset = 0;
             } else {
                  offset += +width.slice(0, width.length - 2);
              }

              archTape.style.transform = `translateX(-${offset}px)`;
        }

        })
    })

// Блок корректировки размера картинок при изменении размера экрана

window.addEventListener('resize', (e) => {
    
    setSlideSize();

    if (window.matchMedia("(max-width: 768px)").matches) {
        archPic.forEach((el) => {
            if (el.style !== 'width: 200px; height: 200px') {
                el.style = 'width: 200px; height: 200px'
            }
    
        })
      } else {
        archPic.forEach((el) => {
            if (el.style !== 'width: 270px; height: 270px') {
                el.style = 'width: 270px; height: 270px'
            }
            
        })
      };  
});

// Блок работы табов раздела "Досуг"

const tabs = document.querySelectorAll('.tab'),
      tabMenuOptions = document.querySelectorAll('.tab_menu_button');

      tabs[0].classList.remove('not_displayed');
      tabMenuOptions[0].classList.add('selected');

      tabMenuOptions.forEach((element, index) => {
        
        element.addEventListener('click', event => {
            tabMenuOptions.forEach((el) => {
                el.classList.remove('selected');
            })
            element.classList.add('selected');

            tabs.forEach((element) => {
                element.classList.add('not_displayed');
            });
            
            tabs[index].classList.remove('not_displayed');

        })
      })

// Блок "Рекомендации"

const churchesDB = [{src:'img/Spas_Monastery.jpg', name: 'Спасо-Ефимьев монастырь', description: 'Монастырь основан в 1352 году. На протяжении своей истории перестраивался и обрастал новыми строениями. В советский период в монастыре размещалась тюрьма. На сегодняшний день монастырь представляет собой укрепленную территорию с интересными музеями.'}, {src:'img/Bogoroditsa_church2.jpg',name: 'Собор Рождества Богородицы', description: 'Самое старое здание в Суздале. Он построен на месте старой церкви в 1222-1225 году, затем неоднократно перестраивался. Внутри собор украшен роскошными фресками, а входные двери отделаны сусальным золотом.'}, {src: 'img/Ilya4.jpg', name: 'Церковь Ильи Пророка', description: 'Храм построен в 1744 году в живописном месте - излучине реки Каменки. С холма, на котром расположен храм, открывается великолепный вид на Ильинский луг, Кремль и торговые ряды.'}],
      civilDB =[{src:'img/Posad2.jpg', name: 'Посадский дом', description: 'Здание построено в конце XVII века, и представляет собой безусловную архитектурную жемчужину города, несмотря на скромное украшение. Посадский дом является единственным в Суздале и очень редким в России памятником жилого каменного зодчества.'}, {src: 'img/WoodenMuseum.jpg', name: 'Музей деревянного зодчества', description: 'Музей деревянных построек разных времен и назначений, собранных со всей Владимирской области. Представлены разные здания: от старинных мельниц до амбаров на деревянных сваях.'}, {src:'img/TradeRows.jpg',name: 'Торговые ряды', description: 'Возведены в начале XIX века, и по-прежнему выполняют свое назначение. В одном из десятков магазинчиков можно купить сувенир, а в кафе - отведать местных блюд.'}],
      cuisineDrinksDB = [{src:'img/uley.jpg', name: 'Ресторан "Улей"', description: 'Ресторан расположен на территории гостиничного комплекса "Пушкарская слобода", в нескольких минутах от музея деревянного зодчества. В меню традиционные русские блюда, которые вам подадут в интерьере бревенчатых стен и мебели из древесного массива.'}, {src: 'img/cucumber.jpg',name: 'Ресторан"Огурец"', description: 'Особенность ресторана - использование в приготовлении блюд фермерских сезонных продуктов от локальных производителей. В меню русская и европейская кухни. Ресторан расположен в двух шагах от Спасо-Ефимьева монастыря.'}, {src: 'img/old_yard.jpg',name: 'Ресторан "Гостиный двор"', description: 'Ресторан расположен внтури торговых рядов Суздаля, неподалеку от Кремля и территории старого города. В меню русская кухня, залы оформлены в стиле конца XIX века.'}];


const churchesBtn = document.querySelector('#recommendation_choice_1'),
      civilBtn = document.querySelector('#recommendation_choice_2'),
      kitchenBtn = document.querySelector('#recommendation_choice_3'),
      recContainer = document.querySelector('.recommendation_container'),
      recConfirmBtn = document.querySelector('.confirm_button'),
      clearBtn = document.querySelector('.clear_button');

let recCardsStatus = {
    churchesShowed: false,
    civilShowed: false,
    cuisineShowed: false,
}

let recBlockStatus = {
    recBlockDisplayed: false,
}

function smoothAppearance (elem) {
     elem.style.cssText = 'display: block; animation: appearing 1.5s forwards';
}

function buildRecElements (database) {
    recContainer.innerHTML = ' ';
    let newBlock = document.createElement('div');
        let newElements = database.map((el) => {
            let element = document.createElement('div');
                element.innerHTML = `<div class="img_container">
                                        <img src="${el.src}" alt="rec_picture"> </img>
                                    </div>
                                    <div class="rec_header">${el.name}</div>
                                    <div class="rec_text">${el.description}</div>`
                
                element.classList.add('rec_element_container');
                
                recContainer.append(element);
                
                setTimeout(smoothAppearance, 500, element);
        })
    setTimeout(() => {recBlockStatus.recBlockDisplayed = true}, 1500)
}

function toggleStatus (trueString) {
    for (let [key, value] of Object.entries(recCardsStatus)) {
        recCardsStatus.key = false;
    }
        trueString = true;
}

recConfirmBtn.addEventListener('click', event => {
    
    event.preventDefault();
    
    // if (!recBlockStatus.recBlockDisplayed) {

    if (churchesBtn.checked || civilBtn.checked || kitchenBtn.checked && (!recBlockStatus.recBlockDisplayed)) {
        recContainer.style.cssText = ' ';
            recContainer.classList.remove('recommendations_block_hidden');
            recContainer.classList.add('recommendations_block_showed');
            // recConfirmBtn.classList.add('show_btn_clicked');
            recConfirmBtn.style.cssText = 'animation: show_btn_move 1.5s forwards';
            clearBtn.style.cssText = 'animation: clear_btn_move 1.5s forwards';
    }

    if (churchesBtn.checked) {
        if (!recCardsStatus.churchesShowed) {
            toggleStatus(recCardsStatus.churchesShowed);
            buildRecElements(churchesDB);
        }
    }

    if (civilBtn.checked) {
        if (!recCardsStatus.civilShowed) {
            toggleStatus(recCardsStatus.civilShowed);
            buildRecElements(civilDB);
        }
    }

    if (kitchenBtn.checked) {
        if (!recCardsStatus.cuisineShowed) {
            toggleStatus(recCardsStatus.cuisineShowed);
            buildRecElements(cuisineDrinksDB);
        }
    }
// }
    console.log(recBlockStatus.recBlockDisplayed) 
    
})

clearBtn.addEventListener('click', event => {
    event.preventDefault();
    if (recBlockStatus.recBlockDisplayed) {
    // document.querySelectorAll('.rec_element_container').forEach(el => el.style.cssText = 'animation: disappearing 1s forwards')
    // recContainer.style.cssText = 'animation: block_disappearing 1.5s forwards';
    document.querySelectorAll('.rec_element_container').forEach(el => {el.style.cssText = 'display: block; animation: disappearing 1.5s forwards';})
        setTimeout(function () {document.querySelectorAll('.rec_element_container').forEach(el => {el.style.cssText = 'display: none'})}, 1500);
            setTimeout(function(){recContainer.classList.add('recommendations_block_hidden');}, 1600)
        recConfirmBtn.style.cssText = 'animation: show_btn_move_right 1.5s forwards';
        clearBtn.style.cssText = 'animation: clear_btn_move_left 1.5s forwards';
        setTimeout(function () {recBlockStatus.recBlockDisplayed = false}, 3100);
        console.log(recBlockStatus.recBlockDisplayed) 
    
    }
    
    
    
    
        // recContainer.classList.remove('recommendations_block_showed');
        // recContainer.classList.add('reccontainer_hidden')    
            // recContainer.style.cssText = 'animation: disappearing 1s forwards';
            
                // setTimeout(function notDisp() {recContainer.style.cssText += 'display: none'}, 1000);
                
})