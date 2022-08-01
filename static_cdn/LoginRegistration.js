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

/***/ "./LogMe_app/static/js/index.js":
/*!**************************************!*\
  !*** ./LogMe_app/static/js/index.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// Function to move an element after the parent\nfunction insertAfter(referenceNode, newNode) {\n  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);\n} // assigns user_icon_001.png to email icon element in the HTML\n\n\nvar email_logo = new Image(25, 25);\nemail_logo.src = '/static/img/user_icon_001.png';\nvar emg = document.createElement(\"img\").appendChild(email_logo);\nemg.setAttribute(\"id\", \"email_icon\");\nvar email_icon = document.getElementById(\"email_logo\"); // email_icon.appendChild(email_logo);\n\ninsertAfter(email_icon, emg); // assign password logo to password_icon element in the HTML\n\nvar password_logo = new Image(25, 25);\npassword_logo.src = '/static/img/pw.png';\nvar pmg = document.createElement(\"img\").appendChild(password_logo);\npmg.setAttribute(\"id\", \"password_icon\");\nvar password_icon = document.getElementById(\"pw_logo\");\ninsertAfter(password_icon, pmg);\n\n//# sourceURL=webpack://self_proj/./LogMe_app/static/js/index.js?");

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
/******/ 	__webpack_modules__["./LogMe_app/static/js/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;