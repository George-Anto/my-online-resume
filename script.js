"use strict";
import "core-js/stable";
import "regenerator-runtime/runtime";

const modal = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".close-modal");
const btnShowModal = document.querySelector(".show-modal");

const motivationalQuote = document.querySelector(".quote");
const motivationalQuoteAuthor = document.querySelector(".author");

const btnDownloadCV = document.querySelector(".downloadCV");

const btnGreek = document.querySelector(".btn-greek");
const btnEnglish = document.querySelector(".btn-english");

//DOM elemtents for translation
const headerEl1 = document.querySelector(".h-el1");
const headerEl2 = document.querySelector(".h-el2");
const headerEl3 = document.querySelector(".h-el3");
const headerEl6 = document.querySelector(".h-el6");
const personalInfoEl = document.querySelector("#personal-info");
const personalInfoEl1 = document.querySelector("#personal-info1");
const personalInfoEl2 = document.querySelector("#personal-info2");
const personalInfoEl3 = document.querySelector("#personal-info3");
const educationEl = document.querySelector("#education");
const educationEl1 = document.querySelector("#education1");
const educationEl2 = document.querySelector("#education2");
const educationEl3 = document.querySelector("#education3");
const educationEl4 = document.querySelector("#education4");
const educationEl5 = document.querySelector("#education5");
const knowledgeEl = document.querySelector("#knowledge");
const workEl = document.querySelector("#work");
const workEl1 = document.querySelector("#work1");
const linkEl = document.querySelector("#my-link");
const modalTitleEl = document.querySelector(".modal-title");
const cellphoneEl = document.querySelector("#cellphone");

const elementsForTranslation = [];

elementsForTranslation.push(headerEl1);
elementsForTranslation.push(headerEl2);
elementsForTranslation.push(headerEl3);
elementsForTranslation.push(headerEl6);
elementsForTranslation.push(personalInfoEl);
elementsForTranslation.push(personalInfoEl1);
elementsForTranslation.push(personalInfoEl2);
elementsForTranslation.push(personalInfoEl3);
elementsForTranslation.push(educationEl);
elementsForTranslation.push(educationEl1);
elementsForTranslation.push(educationEl2);
elementsForTranslation.push(educationEl3);
elementsForTranslation.push(educationEl4);
elementsForTranslation.push(educationEl5);
elementsForTranslation.push(knowledgeEl);
elementsForTranslation.push(workEl);
elementsForTranslation.push(workEl1);
elementsForTranslation.push(linkEl);
elementsForTranslation.push(modalTitleEl);
elementsForTranslation.push(cellphoneEl);

let isGreek = true;

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

const showModal = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const fetchQuotes = async function () {
	try {
		//Does NOT work
		// const responce = await fetch("resources/testQuote.json");
		// const quotes = await JSON.parse(JSON.stringify(responce));
		// console.log(quotes);

		return fetch("resources/data/quotes.json")
			.then(responce => responce.json())
			.then(data => {
				return data;
			});
	} catch (error) {
		console.error(`Custom Error1: ${error}`);
	}
};

const insertQuoteInDOM = async function () {
	try {
		const quoteObj = await fetchQuotes();

		const randomQuoteNumber = Math.floor(Math.random() * 102) + 1;

		motivationalQuote.innerHTML = "";
		motivationalQuote.innerHTML = `${quoteObj.quotes[randomQuoteNumber].quote}`;

		motivationalQuoteAuthor.innerHTML = "";
		motivationalQuoteAuthor.innerHTML = `${quoteObj.quotes[randomQuoteNumber].author}`;
	} catch (error) {
		console.error(`Custom Error2: ${error}`);
	}
};

const fetchTranslations = async function () {
	try {
		return fetch("resources/data/translate.json")
			.then(responce => responce.json())
			.then(translations => {
				return translations;
			});
	} catch (error) {
		console.error(`Custom Error2: ${error}`);
	}
};

const translateTo = async function (language) {
	try {
		const translationObj = await fetchTranslations();

		elementsForTranslation.forEach(
			(elementForTranslation, index) =>
				(elementForTranslation.innerHTML = translationObj.translations[index][language])
		);
	} catch (err) {
		console.error(err);
	}
};

const pdfCVNotReady = async function () {
	try {
		const translationObj = await fetchTranslations();
		alert(
			translationObj.translations[translationObj.translations.length - 1][isGreek ? "greek" : "english"]
		);
	} catch (err) {
		console.error(err);
	}
};

btnShowModal.addEventListener("click", showModal);

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (keyEventObj) {
	if (keyEventObj.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

btnDownloadCV.addEventListener("click", pdfCVNotReady);

btnGreek.addEventListener("click", function () {
	this.blur();
	if (isGreek) return;

	translateTo("greek");
	isGreek = true;
	this.classList.toggle("tr-btn-selected");
	btnEnglish.classList.toggle("tr-btn-selected");
});

btnEnglish.addEventListener("click", function () {
	this.blur();
	if (!isGreek) return;

	translateTo("english");
	isGreek = false;
	this.classList.toggle("tr-btn-selected");
	btnGreek.classList.toggle("tr-btn-selected");
});

insertQuoteInDOM();
