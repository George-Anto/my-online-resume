"use strict";
// import "core-js/stable";
// import "regenerator-runtime/runtime";

const modal = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".close-modal");
const btnShowModal = document.querySelector(".show-modal");

const motivationalQuote = document.querySelector(".quote");
const motivationalQuoteAuthor = document.querySelector(".author");

const btnDownloadCV = document.querySelector(".downloadCV");

const btnGreek = document.querySelector(".btn-greek");
const btnEnglish = document.querySelector(".btn-english");

const elementsForTranslation = [];

//Helper function
const selectEl = function (DOMEl) {
	return document.querySelector(DOMEl);
};

//DOM elemtents for translation
elementsForTranslation.push(selectEl(".h-el1"));
elementsForTranslation.push(selectEl(".h-el2"));
elementsForTranslation.push(selectEl(".h-el3"));
elementsForTranslation.push(selectEl(".h-el6"));
elementsForTranslation.push(selectEl("#personal-info"));
elementsForTranslation.push(selectEl("#personal-info1"));
elementsForTranslation.push(selectEl("#personal-info2"));
elementsForTranslation.push(selectEl("#personal-info3"));
elementsForTranslation.push(selectEl("#summary"));
elementsForTranslation.push(selectEl("#summary1"));
elementsForTranslation.push(selectEl("#education"));
elementsForTranslation.push(selectEl("#education1"));
elementsForTranslation.push(selectEl("#education2"));
elementsForTranslation.push(selectEl("#education3"));
elementsForTranslation.push(selectEl("#education4"));
elementsForTranslation.push(selectEl("#education5"));
elementsForTranslation.push(selectEl("#knowledge"));
elementsForTranslation.push(selectEl("#work"));
elementsForTranslation.push(selectEl("#work1"));
elementsForTranslation.push(selectEl("#my-link"));
elementsForTranslation.push(selectEl(".modal-title"));
elementsForTranslation.push(selectEl("#cellphone"));

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

btnDownloadCV.addEventListener("click", function () {
	this.blur();
	pdfCVNotReady();
});

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
