/*
to do:
update category  height when click on filter button, so that close button can be replaced accordingly
fix:

rem:

*/

let backgroundImg = "";
let backgroundImgNr = 0;

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
// filter effect
const buttons = document.querySelectorAll('button');
const hr = document.querySelector('hr');
buttons.forEach(b=>{
    b.addEventListener('click', filterE);
    function filterE(){
        hr.classList.add('filter');
        hr.addEventListener('animationend', resetHr);
        function resetHr(){
            hr.classList.remove("filter");
        }
    }
})
// vegetar
let vegetarButton = document.querySelector('button.vegetar');
vegetarButton.addEventListener('click', filterVegetar);
function filterVegetar(){
    // remove other filters
    //allergentButton.classList.remove('on');
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
/*
//allergens
let allergentButton = document.querySelector('button.allergen');
//allergentButton.addEventListener('click', filterAllergens);
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
*/
//alcohol
let alcoholButton = document.querySelector('button.alcohol');
alcoholButton.addEventListener('click', filterAlcohol);
function filterAlcohol(){
    // remove other filters
    vegetarButton.classList.remove('on');
    //allergentButton.classList.remove('on');
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
let soldOutButton = document.querySelector('button.sold-out');
soldOutButton.addEventListener('click', filterSoldOut);
function filterSoldOut(){
    // remove other filters
    vegetarButton.classList.remove('on');
    alcoholButton.classList.remove('on');
    //allergentButton.classList.remove('on');
    discountButton.classList.remove('on');
    // when filter on, border turns red
    soldOutButton.classList.toggle('on');
    let soldOuts = document.querySelectorAll('.sold-out-status');
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
let discountButton = document.querySelector('button.discount');
discountButton.addEventListener('click', filterDiscount);
function filterDiscount(){
    // remove other filters
    vegetarButton.classList.remove('on');
    alcoholButton.classList.remove('on');
    //allergentButton.classList.remove('on');
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
    } else {
        n.innerHTML = "&star; &star; &star; &star; &star;";
    }
}

/*****************dynamic******************/
// generate categories, display courses within each category
const categoryLink = "http://kea-alt-del.dk/t5/api/categories";
fetch(categoryLink).then(categories=>categories.json()).then(cate=>showCate(cate));
function showCate(c){
    c.forEach(
        cat=>{
            const categoryTemplate = document.querySelector('.category-template').content;
            const categoryClone = categoryTemplate.cloneNode(true);
            categoryClone.querySelector('.category').classList.add(cat);
            categoryClone.querySelector('.category').setAttribute('id', cat);
            categoryClone.querySelector('.category a').setAttribute('href', "#"+cat);
            categoryClone.querySelector('a p').textContent = cat.toUpperCase() + ".";
            const categoryList = document.querySelector('#category-list');
            categoryList.appendChild(categoryClone);
            /* show only courses with in category*/
            const courseLink = "http://kea-alt-del.dk/t5/api/productlist";
            fetch(courseLink).then(course=>course.json()).then(c=>showCourse(c));
            function showCourse(course){
                course.forEach(eachCourse=>{
                    if(eachCourse.category === cat){
                        const courseTemplate = document.querySelector('.course-template').content;
                        const courseClone = courseTemplate.cloneNode(true);
                        let courseList = document.querySelector('.category.' + cat + ' .course-list');
                        courseClone.querySelector('h4').textContent = eachCourse.name;
                        courseClone.querySelector('.short-description').textContent = eachCourse.shortdescription;
                        courseClone.querySelector('p.price').textContent = "Price: " + eachCourse.price + "kr.";
                        // check if has discount
                        eachCourse.discount !==0 ? courseClone.querySelector('.discount-price').textContent = "Now: " + eachCourse.discount  + "kr.": courseClone.querySelector('.discount-price').textContent = "";
                        // if has discount price, then original price use line-through and smaller font
                        courseClone.querySelector('.discount-price').textContent !=="" ? (courseClone.querySelector('.discount-price').previousElementSibling.style.textDecoration = "line-through", courseClone.querySelector('.discount-price').previousElementSibling.style.fontSize = ".7em" ): (courseClone.querySelector('.discount-price').previousElementSibling.style.textDecoration = "none");
                        // check if has alcohol, only display if yes
                        eachCourse.alcohol !==0 ? courseClone.querySelector('.alcohol-status').textContent = "* Alcohol: " + eachCourse.alcohol : courseClone.querySelector('.alcohol-status').textContent = "";
                        // check if vegetar, only display if yes
                        eachCourse.vegetarian === true ? courseClone.querySelector('.veg-status').textContent = "* Vegetar" : courseClone.querySelector('.veg-status').textContent = "";
                        // check if sold out, edit html + display label
                        eachCourse.soldout == true ? (courseClone.querySelector('.sold-out-status').textContent = "sold-out", courseClone.querySelector('.sold-out-status').style.display = "none", courseClone.querySelector('p.sold-out').style.display = "inherit") : courseClone.querySelector('p.sold-out').style.display = "none";
                        // cource img src
                        courseClone.querySelector('img').src = "http://kea-alt-del.dk/t5/site/imgs/small/" + eachCourse.image + "-sm.jpg";
                        // generate background img for the category
                        backgroundImg += "url(http://kea-alt-del.dk/t5/site/imgs/small/" + eachCourse.image + "-sm.jpg) "+ 41*backgroundImgNr +"px 0px no-repeat, ";
                        backgroundImgNr ++;
                        courseList.appendChild(courseClone);
                    }
                })
                // use combi of all imgs from the catefory as the background img of a
                document.querySelector('.category.' + cat +' a').style.background = backgroundImg.slice(0, -2); // cuz of space after, so slice 2 characters
                // clear value for each catefory
                backgroundImg = "";
                backgroundImgNr = 0;
            }
        })
    let elemScrollY; // elem vertical offset while scrolling
    let windowScrollY;
    let categoryHeight;
    // click on catefory title, expand category and move close arrow down while scrolling
    let as = document.querySelectorAll('a');
    // expand/collapse all categories by clicking button
    let expandAllButton = document.querySelector('sub');
    expandAllButton.addEventListener('click', expandAllCategory);
    function expandAllCategory(){
        if(expandAllButton.textContent.indexOf('expand')>-1){
            as.forEach(a=>{a.parentElement.classList.add('expand')})
            expandAllButton.innerHTML = "&#9776; collapse";
        } else {
            expandAllButton.innerHTML = "&#9776; expand all";
            closeAllCategory();
        }
    }
    function closeAllCategory(){
        as.forEach(a=>{a.parentElement.classList.remove('expand')})
    }
    as.forEach(a=>{
        a.addEventListener('click', expandCate);
        function expandCate(){
            expandAllButton.innerHTML = "&#9776; collapse";
            closeAllCategory(); // close all first
            a.parentElement.classList.add("expand"); // then only expand the one that's clicked
            categoryHeight = a.parentElement.clientHeight;
            windowScrollY = window.scrollY; // get window scroll offset when a clicked, in order to be able to calculate difference later
            elemScrollY = 0; // elem scroll is 0 by default when category expands
            window.addEventListener('scroll', getOffsetY);
            function getOffsetY(){
                elemScrollY = window.scrollY - windowScrollY; // window scroll difference is the element scroll distance
                if (elemScrollY < (categoryHeight - 212)){
                    a.nextElementSibling.style.top = (192 + elemScrollY) + "px";
//                    console.log(a.nextElementSibling.style.top);
                } else {
                    a.nextElementSibling.style.top = (categoryHeight - 20) + "px";
//                    console.log(a.nextElementSibling.style.top);
                }
            }
        };
    });
    // click on close arrow, close expanded category
    let closeArrows = document.querySelectorAll('p.close');
    closeArrows.forEach(cA=>{
        cA.addEventListener('click', closeExpand);
        function closeExpand(){
            expandAllButton.innerHTML = "&#9776; expand all";
            as.forEach(a=>{a.parentElement.classList.remove('expand')});
            elemScrollY = 0;
        };
    })
}
/****************** end of dynamic *******************/
