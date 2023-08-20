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
                                    <div class="rec_header"><b>${el.name}</b></div>
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
    
    if (!recBlockStatus.recBlockDisplayed || recContainer.classList.contains('mark')) {

    if (churchesBtn.checked || civilBtn.checked || kitchenBtn.checked && (!recBlockStatus.recBlockDisplayed)) {
        recContainer.style.cssText = ' ';
            if (window.matchMedia("(max-width: 768px)").matches) {
                recContainer.classList.remove('recommendations_block_hidden_mobile');
                recContainer.classList.add('recommendations_block_showed_mobile', 'mark');
            } else {
                recContainer.classList.remove('recommendations_block_hidden');
                recContainer.classList.add('recommendations_block_showed', 'mark');
            }
            
            // recConfirmBtn.classList.add('show_btn_clicked');
            if (window.matchMedia("(max-width: 768px)").matches) {
                recConfirmBtn.style.cssText = 'animation: show_btn_move_mobile 1.5s forwards';
                clearBtn.style.cssText = 'animation: clear_btn_move_mobile 1.5s forwards';
            } else {
                recConfirmBtn.style.cssText = 'animation: show_btn_move 1.5s forwards';
                clearBtn.style.cssText = 'animation: clear_btn_move 1.5s forwards';
            }
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
}
    console.log(recBlockStatus.recBlockDisplayed) 
    
})

clearBtn.addEventListener('click', event => {
    event.preventDefault();
    if (recBlockStatus.recBlockDisplayed) {
        recContainer.classList.remove('mark');
        document.querySelectorAll('.rec_element_container').forEach(el => {
            el.style.cssText = 'display: block; animation: disappearing 1.5s forwards';
        })

        setTimeout(function () {
            document.querySelectorAll('.rec_element_container').forEach(el => {
                el.style.cssText = 'display: none'
        })}, 1500);
        
        setTimeout(function(){
            
            if (window.matchMedia("(max-width: 768px)").matches) {
                recContainer.classList.add('recommendations_block_hidden_mobile');
                recContainer.classList.remove('recommendations_block_showed_mobile', 'mark');
            } else {
                recContainer.classList.add('recommendations_block_hidden');
                recContainer.classList.remove('recommendations_block_showed', 'mark');
            }
        }, 1600)
        recConfirmBtn.style.cssText = 'animation: show_btn_move_right 1.5s forwards';
        clearBtn.style.cssText = 'animation: clear_btn_move_left 1.5s forwards';
        setTimeout(function () {recBlockStatus.recBlockDisplayed = false}, 3100); 
    }
})

// Блок "День города"

const   bdSliderTape = document.querySelector('.bd_slider_tape'),
        bdSliderWindow = document.querySelector('.bd_slider_window'),
        bdSliderHandler = document.querySelector('.bd_slider_handle'),
        counterContainer = document.querySelector('.bd_counter_container'),
        bdCounter = document.querySelector('.bd_counter'),
        bdInfoContainer = document.querySelector('.bd_info_container'),
        bdInfo = document.querySelector('.bd_celebration_info'),
        steps = document.querySelectorAll('.step_container');

let shiftX;

bdSliderHandler.addEventListener('pointerdown', (event) => {
    shiftX = event.clientX - bdSliderHandler.getBoundingClientRect().x;
    bdSliderHandler.setPointerCapture(event.pointerId);
        console.log(shiftX);
        bdSliderHandler.addEventListener('pointermove', handleMovement);
})

bdSliderHandler.addEventListener('pointerup', (event) => {
    bdSliderHandler.removeEventListener('pointermove', handleMovement);
})

let stepTime = 2000;
function handleMovement (event) {
    let newLeft = event.clientX - bdSliderWindow.getBoundingClientRect().x - shiftX;
        if (window.matchMedia("(max-width: 768px)").matches) {
            if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft > 110) {
                newLeft = 110;
            } 
        } else {
            if (newLeft < 0) {
                newLeft = 0;
            } else if (newLeft > 150) {
                newLeft = 150;
            }
        }
        bdSliderTape.style.left = newLeft+'px';
            if (newLeft < 60) {
                counterContainer.style.cssText = 'height: 100px';
                    setTimeout(()=>{bdCounter.style.cssText = 'display: block'}, 1100);
                    if (window.matchMedia("(max-width: 768px)").matches) {
                        setTimeout(()=>{
                            bdInfoContainer.style.cssText = 'height: 850px'
                            yearsCounter();
                        }, 1400);
                    } else {
                        setTimeout(()=>{
                            bdInfoContainer.style.cssText = 'height: 450px'
                            yearsCounter();
                        }, 1400);
                    }
                        
                            setTimeout(()=>{bdInfo.style.cssText = 'display: block; opacity: 1'}, 1800);
                
                            steps.forEach((element) => {
                                 setTimeout(()=>{
                                    element.style.cssText = 'transform: translateX(0)'
                                }, stepTime)
                                stepTime += 600;
                })
            }
}

let years = 0;
function yearsCounter () {
    setInterval(() => {
        if (years < 1000) {
            years += 1;
                bdCounter.innerHTML = `${years} лет`;
        }
    }, 50)
}

// Блок мобильного меню

const mobileMenu = document.querySelector('.burger_menu'),
      mobileMenuBlock = document.querySelector('.mobile_menu_block');

      let mobileMenuStatus = {
        opened: false,
      }

mobileMenu.addEventListener('click', (event) => {
    if (!mobileMenuStatus.opened) {
        mobileMenuBlock.style.cssText = 'display: block';
            mobileMenuStatus.opened = true;
    } else if (mobileMenuStatus.opened) {
        mobileMenuBlock.style.cssText = 'display: none';
            mobileMenuStatus.opened = false;
    }
})