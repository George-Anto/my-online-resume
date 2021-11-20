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

const headerEl1 = document.querySelector(".h-el1");
const headerEl2 = document.querySelector(".h-el2");
const headerEl3 = document.querySelector(".h-el3");
const headerEl6 = document.querySelector(".h-el6");

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

const pdfCVNotReady = function () {
	alert(
		`Το ηλεκτρονικό αντίτυπο του βιογραφικού που θα είναι διαθέσιμο για λήψη, δεν έχει ολοκληρωθεί ακόμα.`
	);
};

const translateToGreek = function () {};

const translateToEnglish = function () {};

btnShowModal.addEventListener("click", showModal);

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (keyEventObj) {
	if (keyEventObj.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

btnDownloadCV.addEventListener("click", pdfCVNotReady);

insertQuoteInDOM();
