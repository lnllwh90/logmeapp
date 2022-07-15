/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./LogMe_app/static/js/welcome.js":
/*!****************************************!*\
  !*** ./LogMe_app/static/js/welcome.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// js File for homepage\nfunction insertAfter(referenceNode, newNode) {\n  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);\n} //add meal logo\n\n\nvar meal_cal_logo = new Image();\nmeal_cal_logo.src = '/static/img/meal_cal_logo.png'; //Create img element with a meal_logo id\n\nvar mcal_logo = document.createElement(\"img\").appendChild(meal_cal_logo);\nmcal_logo.setAttribute(\"id\", \"meal_logo\"); //reference the parent node\n\nvar meal_logo = document.getElementById(\"meal_cal\").parentNode; //add img element before the parent\n\nmeal_logo.insertBefore(mcal_logo, meal_logo.childNodes[1]); // insertAfter(meal_logo, mcal_logo)\n//add Workout logo\n\nvar wo_cal_logo = new Image();\nwo_cal_logo.src = '/static/img/chain.jpg'; //Create img element with a wo_logo id\n\nvar wocal_logo = document.createElement(\"img\").appendChild(wo_cal_logo);\nwocal_logo.setAttribute(\"id\", \"wo_logo\"); //reference the parent node\n\nvar wo_logo = document.getElementById(\"wo_cal\").parentNode; //add img element before the parent\n\nwo_logo.insertBefore(wocal_logo, wo_logo.childNodes[1]); // insertAfter(meal_logo, mcal_logo)\n//add goal logo\n\nvar goal_view_logo = new Image();\ngoal_view_logo.src = '/static/img/lifegoals.png'; //Create img element with a goal_logo id\n\nvar goal_logo = document.createElement(\"img\").appendChild(goal_view_logo);\ngoal_logo.setAttribute(\"id\", \"goal_logo\"); //reference the parent node\n\nvar goals_logo = document.getElementById(\"goals\").parentNode; //add img element before the parent\n\ngoals_logo.insertBefore(goal_logo, goals_logo.childNodes[1]); // insertAfter(meal_logo, mcal_logo)\n\nvar banner_img = new Image();\nbanner_img.src = '/static/img/goals.jpeg';\nvar banners = document.createElement(\"img\").appendChild(banner_img);\nbanners.setAttribute(\"id\", \"welcome_banners\");\nvar banner_ele = document.getElementById(\"descriptions\"); // banner_ele.insertBefore(banners, banner_ele.childNodes[0]);\n\ninsertAfter(banner_ele, banners);\n\n//# sourceURL=webpack://self_proj/./LogMe_app/static/js/welcome.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./LogMe_app/static/js/welcome.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;