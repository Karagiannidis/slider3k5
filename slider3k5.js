

//create and return the arrow container with prev and next arrows
function createArrows() {
    //create the arrows container
    let arrowsContainer = document.createElement("div");
    arrowsContainer.classList.add("slider3k5__btns");
    //create prev arrow
    let prevArrow = document.createElement("div")
    prevArrow.classList.add("slider3k5__btn");
    prevArrow.id = `prev`;
    prevArrow.innerHTML = `⬅`;
    //create next arrow
    let nextArrow = document.createElement("div")
    nextArrow.classList.add("slider3k5__btn");
    nextArrow.id = `next`;
    nextArrow.innerHTML = `➡`;
    //appends arrows to container
    arrowsContainer.appendChild(prevArrow);
    arrowsContainer.appendChild(nextArrow);

    //add nextArrow Functionality
    nextArrow.addEventListener('click', () => {
        const activeSlide = document.querySelector('.slider3k5__slide.active');
        let nextSlide = activeSlide.nextElementSibling;
        
        if(nextSlide == null || !nextSlide.classList.contains('slider3k5__slide')){
            nextSlide = activeSlide.parentNode.getElementsByClassName('slider3k5__slide')[0];
        }

        if(nextSlide.classList.contains('slider3k5__slide')) {
            activeSlide.classList.remove('active');
            nextSlide.classList.add('active');
        }

        //synchornize arrows with dots
        const activeDot = document.querySelector('.slider3k5__dot.active');
        let allDots = document.getElementsByClassName('slider3k5__dot');
        for (let i = 0; i < allDots.length; i++) {
            if(allDots[i]==activeDot){
                allDots[i].classList.remove('active');
                if(i<allDots.length -1){
                    allDots[i+1].classList.add('active');
                }else {
                    allDots[0].classList.add('active');
                }
            }
        }

    })

    //add prevArrow Functionality
    prevArrow.addEventListener('click', () => {
        const activeSlide = document.querySelector('.slider3k5__slide.active');
        let nextSlide = activeSlide.previousElementSibling;
        
        if(nextSlide == null || !nextSlide.classList.contains('slider3k5__slide')){
            nextSlide = activeSlide.parentNode.getElementsByClassName('slider3k5__slide')[activeSlide.parentNode.getElementsByClassName('slider3k5__slide').length -1];
        }

        if(nextSlide.classList.contains('slider3k5__slide')) {
            activeSlide.classList.remove('active');
            nextSlide.classList.add('active');
        }

        //synchornize arrows with dots
        const activeDot = document.querySelector('.slider3k5__dot.active');
        let allDots = document.getElementsByClassName('slider3k5__dot');
        for (let i = 0; i < allDots.length; i++) {
            if(allDots[i]==activeDot){
                allDots[i].classList.remove('active');
                if(i==0){
                    allDots[allDots.length-1].classList.add('active');
                }else {
                    allDots[i-1].classList.add('active');
                }
            }
        }

    })

    //return container
    return arrowsContainer;
}

//appends arrows to every slider except if data-arrows is set to false
function appendArrows() {
    Array.from(document.getElementsByClassName("slider3k5")).forEach(singleSlider => {
        if(singleSlider.dataset.arrows != "false"){
            singleSlider.appendChild(createArrows());
        }
    });
}


//creates slider, first parameter is the Parent Id, second param is options
//available options: hasArrows
async function createSlider(targetId, options) {
    targetDiv = document.getElementById(targetId);
    let sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider3k5");
    if(options.hasArrows == false) {
        sliderContainer.dataset.arrows = false;
    }else{
        sliderContainer.dataset.arrows = true;
    }
    if(options.hasDots == false) {
        sliderContainer.dataset.dots = false;
    }else{
        sliderContainer.dataset.dots = true;
    }
    targetDiv.appendChild(sliderContainer);
    
    if(options.slidesFile) {
        await createSlides(options.slidesFile, sliderContainer);
        appendArrows();
        if(options.autoplayMode != false){
            if(options.autoplayDirection == 'rtl'){
                if(Number.isInteger(options.autoplaySpeed)){
                    sliderAutoplay(options.autoplaySpeed, options.autoplayDirection);
                }else{
                    sliderAutoplay(3000, options.autoplayDirection);
                }
            }else {
                sliderAutoplay(options.autoplaySpeed);
            }
        }
        

    }else {
        console.log('Slides File not specified.')
    }
}

function createSlides(jsonFileUrl, sliderContainer) {
    let firstSlide;
    let lastSlide;
    fetch(jsonFileUrl)
	.then(response => response.json())
	.then(parsed => {
        parsed.forEach(({title, description, url}, i) => {
            let newSlide = document.createElement("div");
            newSlide.classList.add("slider3k5__slide");
            newSlide.style.backgroundImage = "url('"+url+"')";
            if(i==0){
                firstSlide=newSlide;
                newSlide.classList.add("active");
            }else if(i+1==parsed.length){
                lastSlide=newSlide;
            }
            sliderContainer.appendChild(newSlide);
            
        });
        if (sliderContainer.dataset.dots != "false") {
            sliderContainer.appendChild(createDots(parsed.length));
        }
        
    });
}

//creates dots for slider
function createDots(slidesCounter) {
    let dotsContainer = document.createElement("div");
    dotsContainer.classList.add("slider3k5__dots");
    // console.log(dotsContainer);
    for (let i = 0; i < slidesCounter; i++) {
        let newDot = document.createElement("div");
        newDot.classList.add("slider3k5__dot");
        newDot.innerHTML = '⚫';

        if(i==0){
            newDot.classList.add('active');
        }

        newDot.addEventListener('click', () => {
            // const activeDot = document.querySelector('.slider3k5__dot.active');
            // let nextDot = activeDot.previousElementSibling;
            
            // if(nextDot == null || !nextDot.classList.contains('slider3k5__dot')){
            //     nextDot = activeDot.parentNode.getElementsByClassName('slider3k5__dot')[activeDot.parentNode.getElementsByClassName('slider3k5__dot').length -1];
            // }
    
            // if(nextDot.classList.contains('slider3k5__dot')) {
            //     activeDot.classList.remove('active');
            //     nextDot.classList.add('active');
            // }

            const activeDot = document.querySelector('.slider3k5__dot.active');
            let nextDot = newDot;
            
            activeDot.classList.remove('active');
            nextDot.classList.add('active');


            const activeSlide = document.querySelector('.slider3k5__slide.active');
            let nextSlide = document.getElementsByClassName('slider3k5__slide');
            if(activeSlide!=nextSlide[i]) {
                activeSlide.classList.remove('active');
                nextSlide[i].classList.add('active');
            }
    
    
        })

        dotsContainer.appendChild(newDot);

        
    }
    return dotsContainer;
}


function sliderAutoplay(speed, direction){
    if(direction!='rtl'){
        let nextArrow = document.querySelector('.slider3k5__btn#next');
        setInterval(()=>{
            nextArrow.click();
        },speed);
    }else{
        let prevArrow = document.querySelector('.slider3k5__btn#prev');
        setInterval(()=>{
            prevArrow.click();
        },speed);
    }
}

