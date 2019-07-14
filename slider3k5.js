

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
        
        if(nextSlide == null){
            nextSlide = activeSlide.parentNode.getElementsByClassName('slider3k5__slide')[0];
        }

        if(nextSlide.classList.contains('slider3k5__slide')) {
            activeSlide.classList.remove('active');
            nextSlide.classList.add('active');
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
function createSlider(targetId, options) {
    targetDiv = document.getElementById(targetId);
    let sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider3k5");
    if(options.hasArrows == false) {
        sliderContainer.dataset.arrows = false;
    }else{
        sliderContainer.dataset.arrows = true;
    }
    targetDiv.appendChild(sliderContainer);
    appendArrows();
    if(options.slidesFile) {
        createSlides(options.slidesFile, sliderContainer);
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
        
    });
}