// js File for homepage
function insertAfter(referenceNode, newNode){
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//add meal logo
let meal_cal_logo = new Image();
meal_cal_logo.src = '/static/img/meal_cal_logo.png'

//Create img element with a meal_logo id
let mcal_logo = document.createElement("img").appendChild(meal_cal_logo);
mcal_logo.setAttribute("id", "meal_logo");
//reference the parent node
let meal_logo = document.getElementById("meal_cal").parentNode;

//add img element before the parent
meal_logo.insertBefore(mcal_logo, meal_logo.childNodes[1]);
// insertAfter(meal_logo, mcal_logo)

//add Workout logo
let wo_cal_logo = new Image();
wo_cal_logo.src = '/static/img/chain.jpg'

//Create img element with a wo_logo id
let wocal_logo = document.createElement("img").appendChild(wo_cal_logo);
wocal_logo.setAttribute("id", "wo_logo");
//reference the parent node
let wo_logo = document.getElementById("wo_cal").parentNode;

//add img element before the parent
wo_logo.insertBefore(wocal_logo, wo_logo.childNodes[1]);
// insertAfter(meal_logo, mcal_logo)

//add goal logo
let goal_view_logo = new Image();
goal_view_logo.src = '/static/img/lifegoals.png'

//Create img element with a goal_logo id
let goal_logo = document.createElement("img").appendChild(goal_view_logo);
goal_logo.setAttribute("id", "goal_logo");
//reference the parent node
let goals_logo = document.getElementById("goals").parentNode;

//add img element before the parent
goals_logo.insertBefore(goal_logo, goals_logo.childNodes[1]);
// insertAfter(meal_logo, mcal_logo)

let banner_img = new Image();
banner_img.src = '/static/img/goals.jpeg'

let banners = document.createElement("img").appendChild(banner_img);
banners.setAttribute("id", "welcome_banners");

let banner_ele = document.getElementById("descriptions");

// banner_ele.insertBefore(banners, banner_ele.childNodes[0]);
insertAfter(banner_ele, banners)
