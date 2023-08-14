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