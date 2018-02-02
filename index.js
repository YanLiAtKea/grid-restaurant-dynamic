/* display extra info accordingly  */


let soldOuts = document.querySelectorAll('.sold-out-status');

////////////////check extra info /////////////////
let discount = document.querySelectorAll('.discount-price');
//let soldOut = document.querySelectorAll('.sold-out-status');
let vegetar = document.querySelectorAll('.veg-status');
let alcohol = document.querySelectorAll('.alcohol-status');
let allergens = document.querySelectorAll('.allergens');

// if extra info exists in database, then display
function checkContent(a){
    if(a.textContent){
        a.style.display = "inherit";
        a. textContent += " *";
    }
}
discount.forEach(checkContent);
//soldOut.forEach(checkContent);
vegetar.forEach(checkContent);
alcohol.forEach(checkContent);
allergens.forEach(checkContent);

// if has discount price, then original price use line-through
discount.forEach(checkDiscount);
function checkDiscount(d){
    if(/\d/.test(d.textContent)){
        let newPrice = d.textContent.slice(0, -1); // remove the * set by previous fn
        let originalPrice = d.previousElementSibling;
        originalPrice.style.textDecoration = "line-through";
        originalPrice.style.fontSize = ".7em";
        d.textContent = "Now: " + newPrice;
    } else {

    }
}

///////////////// show long description when click on read-more ///////////////
let readMore = document.querySelectorAll('.read-more');
readMore.forEach(clickReadMore);
function clickReadMore(r){
    r.addEventListener('click', showLongDes);
    function showLongDes(){
        let longDescription = r.parentElement.nextElementSibling; // ?????????? nextSibling vs nextElementSibling. nextSibling needs 2 times to reach element. see below as well
        longDescription.style.zIndex = "-1";
        console.log(longDescription);
    }
}

///////////////// hide long description when click on X ///////////////
let closeReadMore = document.querySelectorAll('.close-read-more');
closeReadMore.forEach(clickCloseReadMore);
function clickCloseReadMore(r){
    r.addEventListener('click', hideLongDes);
    function hideLongDes(){
        let longDescription = r.parentElement.previousSibling.previousSibling; // ?????????? why previous previous is the img???
        longDescription.style.zIndex = "2";
        console.log(longDescription);
    }
}

/////////// filters
// vegetar
let onlyShowVegetar = false;
let vegetarButton = document.querySelector('button.vegetar');
vegetarButton.addEventListener('click', filterVegetar);
function filterVegetar(){
    // remove other filters
    allergentButton.classList.remove('on');
    alcoholButton.classList.remove('on');
    soldOutButton.classList.remove('on');
    discountButton.classList.remove('on');
    // when filter on, border turns red
    vegetarButton.classList.toggle('on');
    let vegetars = document.querySelectorAll('.veg-status');
    vegetars.forEach(toggleVegetar);
    function toggleVegetar(v){
        if(v.textContent && vegetarButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "inherit";
        } else if(!v.textContent && vegetarButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "none";
        } else if (!vegetarButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "inherit";
        }
    }
}
//allergens
let onlyShowNoAllergens = false;
let allergentButton = document.querySelector('button.allergen');
allergentButton.addEventListener('click', filterAllergens);
function filterAllergens(){
    // remove other filters
    vegetarButton.classList.remove('on');
    alcoholButton.classList.remove('on');
    soldOutButton.classList.remove('on');
    discountButton.classList.remove('on');
    // when filter on, border turns red
    allergentButton.classList.toggle('on');
    let allergens = document.querySelectorAll('.allergens');
    allergens.forEach(toggleAllergens);
    function toggleAllergens(v){
        if(!v.textContent && allergentButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "inherit";
        } else if(v.textContent && allergentButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "none";
        } else if (!allergentButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "inherit";
        }
    }
}
//alcohol
let onlyShowNoalcohol = false;
let alcoholButton = document.querySelector('button.alcohol');
alcoholButton.addEventListener('click', filterAlcohol);
function filterAlcohol(){
    // remove other filters
    vegetarButton.classList.remove('on');
    allergentButton.classList.remove('on');
    soldOutButton.classList.remove('on');
    discountButton.classList.remove('on');
    // when filter on, border turns red
    alcoholButton.classList.toggle('on');
    let alcohols = document.querySelectorAll('.alcohol-status');
    alcohols.forEach(toggleAlcohols);
    function toggleAlcohols(v){
        if(!v.textContent && alcoholButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "inherit";
        } else if(v.textContent && alcoholButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "none";
        } else if (!alcoholButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "inherit";
        }
    }
}
//sold-out
let onlyShowNotSoldOut = false;
let soldOutButton = document.querySelector('button.sold-out');
soldOutButton.addEventListener('click', filterSoldOut);
function filterSoldOut(){
    // remove other filters
    vegetarButton.classList.remove('on');
    alcoholButton.classList.remove('on');
    allergentButton.classList.remove('on');
    discountButton.classList.remove('on');
    // when filter on, border turns red
    soldOutButton.classList.toggle('on');
    soldOuts.forEach(toggleSoldOut);
    function toggleSoldOut(v){
        if(!v.textContent && soldOutButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "inherit";
        } else if(v.textContent && soldOutButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "none";
        } else if (!soldOutButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "inherit";
        }
    }
}
// discount
let onlyShowDiscount = false;
let discountButton = document.querySelector('button.discount');
discountButton.addEventListener('click', filterDiscount);
function filterDiscount(){
    // remove other filters
    vegetarButton.classList.remove('on');
    alcoholButton.classList.remove('on');
    allergentButton.classList.remove('on');
    soldOutButton.classList.remove('on');
    // when filter on, border turns red
    discountButton.classList.toggle('on');
    let discounts = document.querySelectorAll('.discount-price');
    discounts.forEach(toggleDiscount);
    function toggleDiscount(v){
        if(v.textContent && discountButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "inherit";
        } else if(!v.textContent && discountButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "none";
        } else if (!soldOutButton.classList.contains('on')){
            v.parentElement.parentElement.style.display = "inherit";
        }
    }
}
// end of filters

// sold-outs when shown
soldOuts.forEach(dimSoldOut);
function dimSoldOut(s){
    if(s.textContent){
        s.parentElement.parentElement.style.opacity = ".5";
    }
}

// if long desc is empty, hide "read more"
let longDescP = document.querySelectorAll('.long-description p:nth-of-type(2)');
longDescP.forEach(checkLongDescP);
function checkLongDescP(l){
    if(!l.textContent){
        l.parentElement.previousElementSibling.previousElementSibling.lastElementChild.style.display = "none";
    }
}

//show nr of stars based on nr from database
let starNr = document.querySelectorAll('.stars');
starNr.forEach(showStars);
function showStars(n){
    if(/\d/.test(n.textContent)){
        let filledStar = "&starf; ";
        let emptyStar = "&star; ";
        let filledStarNr = parseInt(n.textContent);
        let allFilled = filledStar.repeat(filledStarNr);
        let allEmpty = emptyStar.repeat(5-filledStarNr);
        n.innerHTML = allFilled + allEmpty;

    /* !!!!!!! if only change innerHtml using html entities, the entity will be displayed as text. SOMETIMES
        let filledStar = document.createTextNode('&starf; '); // !!!!!!! if only change innerHtml using html entities, the entity will be displayed as text// turns out it's working
        let filledStarNr = parseInt(n.textContent);
        console.log(filledStar);
        let allFilled = filledStar.data.repeat(filledStarNr);
        let emptyStar = document.createTextNode('&star; ');
        let allEmpty = emptyStar.data.repeat(5-filledStarNr);
        n.innerHTML = allFilled + allEmpty;
    */
    } else {
        n.innerHTML = "&star; &star; &star; &star; &star;";
    }
}
