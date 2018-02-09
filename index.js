/*
to do:
update category  height when click on filter button, so that close button can be replaced accordingly
fix:

rem:
*/


/*****************dynamic******************/
// generate categories & display courses within each category
const categoryLink = "http://kea-alt-del.dk/t5/api/categories";
fetch(categoryLink).then(categories=>categories.json()).then(cate=>showCate(cate));
function showCate(c){
    c.forEach(
        cat=>{
            // could also use createElement for each category in stead of using template
            const categoryTemplate = document.querySelector('.category-template').content;
            const categoryClone = categoryTemplate.cloneNode(true);
            categoryClone.querySelector('.category').classList.add(cat);
            categoryClone.querySelector('.category').setAttribute('id', cat);
            categoryClone.querySelector('.category a').setAttribute('href', "#"+cat);
            categoryClone.querySelector('a p').textContent = cat.toUpperCase() + ".";
            const categoryList = document.querySelector('#category-list');
            categoryList.appendChild(categoryClone);
            /* get courses and show only courses within category*/
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
                        eachCourse.discount !==0 ? courseClone.querySelector('.discount-price').textContent = "Now: " + Math.ceil(eachCourse.price*(100 - eachCourse.discount)/100)  + "kr.": courseClone.querySelector('.discount-price').textContent = "";
                        // if has discount price, then original price use line-through and smaller font
                        courseClone.querySelector('.discount-price').textContent !=="" ? (courseClone.querySelector('.discount-price').previousElementSibling.style.textDecoration = "line-through", courseClone.querySelector('.discount-price').previousElementSibling.style.fontSize = ".7em" ): (courseClone.querySelector('.discount-price').previousElementSibling.style.textDecoration = "none");
                        // check if has alcohol, only display if yes
                        eachCourse.alcohol !==0 ? courseClone.querySelector('.alcohol-status').textContent = "*** Alcohol: " + eachCourse.alcohol + "%": courseClone.querySelector('.alcohol-status').textContent = "";
                        // check if vegetar, only display if yes
                        eachCourse.vegetarian === true ? courseClone.querySelector('.veg-status').textContent = "*** Vegetar" : courseClone.querySelector('.veg-status').textContent = "";
                        // check if sold out, edit html + display label
                        eachCourse.soldout == true ? (courseClone.querySelector('.sold-out-status').textContent = "sold-out", courseClone.querySelector('.sold-out-status').style.display = "none", courseClone.querySelector('p.sold-out').style.display = "inherit") : courseClone.querySelector('p.sold-out').style.display = "none";
                        // cource img src and alt
                        courseClone.querySelector('img').src = "http://kea-alt-del.dk/t5/site/imgs/small/" + eachCourse.image + "-sm.jpg";
                        courseClone.querySelector('img').setAttribute('alt', 'couse picture');
                        // generate background img for the category
                        backgroundImg += "url(http://kea-alt-del.dk/t5/site/imgs/small/" + eachCourse.image + "-sm.jpg) "+ 41*backgroundImgNr +"px 0px no-repeat, ";
                        backgroundImgNr ++;
                        // fetch details from API basd on course id
                        let detailLink = "http://kea-alt-del.dk/t5/api/product?id=";
                        let readMore = courseClone.querySelector('p.read-more');
                        let closeReadMoreButton = courseClone.querySelector('.close-read-more');
                        let longDes = courseClone.querySelector('.long-description p:last-of-type');
                        let stars = courseClone.querySelector('p.stars');
                        fetch(detailLink+eachCourse.id).then(res=>res.json()).then(detail=>getDetail(detail));
                        function getDetail(d){
                            if(d.longdescription){
                                readMore.classList.remove('hide'); // only show "read more" when there is a long description for this course
                                readMore.addEventListener('click', showLongDesc);
                                function showLongDesc(){
                                    readMore.parentElement.nextElementSibling.nextElementSibling.classList.remove('hide');
                                    readMore.parentElement.nextElementSibling.style.zIndex = "-1";
                                    longDes.textContent = d.longdescription;
                                    closeReadMoreButton.addEventListener('click', closeReadMore)
                                    function closeReadMore(){
                                        closeReadMoreButton.parentElement.classList.add('hide');
                                    }
                                }
                            }
                        // set stars
                        let filledStar = "&starf; ";
                        let emptyStar = "&star; ";
                        let allFilled = filledStar.repeat(d.stars);
                        let allEmpty = emptyStar.repeat(5-d.stars);
                        stars.innerHTML = allFilled + allEmpty;
                        }

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
            expandAllButton.innerHTML = "collapse";
            if(window.innerWidth > 960){
                document.querySelector('#category-list').style.gridTemplateColumns = "1fr"; // if screen width > 960px
            }
        } else {
            expandAllButton.innerHTML = "&#9776; &nbsp; expand all";
            closeAllCategory();
        }
    }
    function closeAllCategory(){
        as.forEach(a=>{a.parentElement.classList.remove('expand')});
        if(window.innerWidth > 960){
            document.querySelector('#category-list').style.gridTemplateColumns = "1fr 1fr"; // only if screen width > 960px
        }
    }
    as.forEach(a=>{
        a.addEventListener('click', expandCate);
        function expandCate(){
            expandAllButton.innerHTML = "collapse";
            closeAllCategory(); // close all first
            a.parentElement.classList.add("expand"); // then only expand the one that's clicked
            a.parentElement.parentElement.style.gridTemplateColumns = "1fr"; // only need to change this when screen is wider than 960px, but no need to add if, cuz with other screen widths, default is 1fr
            // scroll
            categoryHeight = a.parentElement.clientHeight;
            windowScrollY = window.scrollY; // get window scroll offset when each a is clicked, in order to be able to calculate difference later
            elemScrollY = 0; // elem scroll is 0 by default when category expands
            window.addEventListener('scroll', getOffsetY);
            function getOffsetY(){
                elemScrollY = window.scrollY - windowScrollY; // window scroll difference is the element scroll distance
                if (elemScrollY < (categoryHeight - 252)){

                    a.nextElementSibling.style.top = (191 + elemScrollY) + "px";
//                    console.log(a.nextElementSibling.style.top);
                } else {
                    a.nextElementSibling.style.top = (categoryHeight - 61) + "px";
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
            expandAllButton.innerHTML = "&#9776; &nbsp; expand all";
            if(window.innerWidth > 960){
                cA.previousElementSibling.parentElement.parentElement.style.gridTemplateColumns = "1fr 1fr"; // if screen width > 960px
            }
            as.forEach(a=>{a.parentElement.classList.remove('expand')});
            elemScrollY = 0;
        };
    })
}
/****************** end of dynamic *******************/


// show/hide about site info
let aboutSiteButton = document.querySelector('footer>p');
aboutSiteButton.addEventListener('click', ()=>aboutSiteButton.nextElementSibling.classList.add('on'));
let aboutSite = document.querySelector('div.about');
aboutSite.addEventListener('click', ()=>aboutSite.classList.remove('on'));

let backgroundImg = "";
let backgroundImgNr = 0;

//************** filters
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
// *************** end of filters

// window width
window.addEventListener('resize', mediaQ);
function mediaQ(){
    if(window.innerWidth >= 960 && document.querySelector('sub').textContent.indexOf('collapse') < 0){ //so that when downsize from >960px and category is expanded, category-list doesn't change to 3fr
        document.querySelector('#category-list').style.gridTemplateColumns = "1fr 1fr";
    } else {
        document.querySelector('#category-list').style.gridTemplateColumns = "1fr";
    }
}
