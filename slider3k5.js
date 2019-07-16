

//create and return the arrow container with prev and next arrows
function createArrows(sliderContainerId) {
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
    nextArrow.addEventListener("click", ()=>{
        addClickFunctionality(0, sliderContainerId);
    })

    //add prevArrow Functionality
    prevArrow.addEventListener("click", ()=>{
        addClickFunctionality(-1, sliderContainerId);
    })

    //return container
    return arrowsContainer;
}

//appends arrows to slider except if data-arrows is set to false
function appendArrows(sliderContainerId) {
    sliderContainer = document.getElementById(sliderContainerId);
    Array.from(sliderContainer.getElementsByClassName("slider3k5")).forEach(singleSlider => {
        if(singleSlider.dataset.arrows != "false"){
            singleSlider.appendChild(createArrows(sliderContainerId));
        }
    });
};


//creates slider, first parameter is the Parent Id, second param is options
//available options: hasArrows
function createSlider(targetId, options) {
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
        createSlides(options.slidesFile, sliderContainer, targetId);
        appendArrows(targetId);
        if(options.autoplayMode != false){
            if(options.autoplayDirection == 'rtl'){
                if(Number.isInteger(options.autoplaySpeed)){
                    sliderAutoplay(options.autoplaySpeed, options.autoplayDirection, targetId);
                }else{
                    sliderAutoplay(3000, options.autoplayDirection, targetId);
                }
            }else {
                sliderAutoplay(options.autoplaySpeed, options.autoplayDirection, targetId);
            }
        }
        if(!options.animationStyle){
            createAnimationStyle(0, targetId);
        }else {
            createAnimationStyle(options.animationStyle, targetId);
        }
        

    }else {
        console.log('Slides File not specified.')
    }
}

function createSlides(jsonFileUrl, sliderContainer, sliderContainerId) {
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
            sliderContainer.appendChild(createDots(parsed.length, sliderContainerId));
        }
        
    });
}

//creates dots for slider
function createDots(slidesCounter, sliderContainerId) {
    let dotsContainer = document.createElement("div");
    dotsContainer.classList.add("slider3k5__dots");
    for (let i = 0; i < slidesCounter; i++) {
        let newDot = document.createElement("div");
        newDot.classList.add("slider3k5__dot");
        newDot.innerHTML = '⚫';

        if(i==0){
            newDot.classList.add('active');
        }

        newDot.addEventListener('click', () => {

            let activeDot = document.querySelector('#'+sliderContainerId+' .slider3k5__dot.active');
            let nextDot = newDot;
            activeDot.classList.remove('active');
            nextDot.classList.add('active');


            const activeSlide = document.querySelector('#'+sliderContainerId+' .slider3k5__slide.active');
            let nextSlide = activeSlide.parentElement.getElementsByClassName('slider3k5__slide');
            if(activeSlide!=nextSlide[i]) {
                activeSlide.classList.remove('active');
                nextSlide[i].classList.add('active');
            }

        });

        dotsContainer.appendChild(newDot);

        
    }
    return dotsContainer;
}

//sets the autoplay speed and dir
function sliderAutoplay(speed, direction, sliderContainerId){
    if(direction!='rtl'){
        let nextArrow = document.querySelector('#'+sliderContainerId+' .slider3k5__btn#next');
        setInterval(()=>{
            nextArrow.click();
        },speed);
    }else{
        let prevArrow = document.querySelector('#'+sliderContainerId+' .slider3k5__btn#prev');
        setInterval(()=>{
            prevArrow.click();
        },speed);
    }
}

//updates dots on arrow click depending on which arrow is pressed
function updateDotOnArrowClick(arrow, sliderContainerId) {
    const activeDot = document.querySelector('#'+sliderContainerId+' .slider3k5__dot.active');
    let allDots = activeDot.parentElement.getElementsByClassName('slider3k5__dot');
    for (let i = 0; i < allDots.length; i++) {
        if(allDots[i]==activeDot){
            allDots[i].classList.remove('active');
            if(arrow=="prev")
            {
                if(i==0){
                    allDots[allDots.length-1].classList.add('active');
                }else {
                    allDots[i-1].classList.add('active');
                }
            }else{
                if(i<allDots.length -1){
                    allDots[i+1].classList.add('active');
                }else {
                    allDots[0].classList.add('active');
                }
            }
            
        }
    }
}

//adds click functionallity on arrow depending the arrow (0 for next, -1 for prev)
function addClickFunctionality(i, sliderContainerId) {
    let activeSlide = document.querySelector('#'+sliderContainerId+' .slider3k5__slide.active');
    let nextSlide;
    if(i==0){
        nextSlide = activeSlide.nextElementSibling;
    }else {
        nextSlide = activeSlide.previousElementSibling;
    }
    if(nextSlide == null || !nextSlide.classList.contains('slider3k5__slide')){
        if(i==0){
            nextSlide = activeSlide.parentElement.getElementsByClassName('slider3k5__slide')[i];
        }else {
            nextSlide = activeSlide.parentElement.getElementsByClassName('slider3k5__slide')[activeSlide.parentElement.getElementsByClassName('slider3k5__slide').length-1];

        }
    }
    if(nextSlide.classList.contains('slider3k5__slide')) {
        activeSlide.classList.remove('active');
        nextSlide.classList.add('active');
    }

    //synchornize arrows with dots
    if(i==0){
        updateDotOnArrowClick("next", sliderContainerId);
    }else{
        updateDotOnArrowClick("prev", sliderContainerId);
    }
};


//creates the css rules for the selected animation
function createAnimationStyle(animation, sliderContainerId) {
    let slider = document.getElementById(sliderContainerId).querySelector(".slider3k5");    
    if(Number.isInteger(animation) && animation != 0){
        switch (animation) {
            case 1:
                slider.classList.add('slider3k5Animation1');
                break;
            case 2:
                slider.classList.add('slider3k5Animation2');
                break;
            case 3:
                slider.classList.add('slider3k5Animation3');
                break;
            case 4:
                slider.classList.add('slider3k5Animation4');
                break;
            case 5:
                slider.classList.add('slider3k5Animation5');
                break;
        
            default:
                //default animation
                break;
        }
    }else {
        //default animation
    }
}