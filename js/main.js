/* eslint-disable no-unused-vars */
/* global data */
/* exported data */

var $image = document.querySelector('#image');
var $title = document.querySelector('#title');
var $message = document.querySelector('#message');
var $photoURL = document.querySelector('#photo-url');
var $submit = document.querySelector('#submit');
var $form = document.querySelector('#form');

$photoURL.addEventListener('input', handleImageSwap);
$form.addEventListener('submit', handleFormSubmit);

function handleImageSwap(event) {
  $image.src = event.target.value;
}

function handleFormSubmit(event) {
  event.preventDefault();
  var formValues = {
    title: $title.value,
    photoURL: $photoURL.value,
    message: $message.value,
    nextEntryId: data.nextEntryId + 1
  };
  data.nextEntryId++;
  data.entries.push(formValues);
  $form.reset();
  $image.src = 'images/placeholder-image-square.jpg';
}

/*
-call the create element method of document with DIV as it's argument and assign it's value to var imgDiv
-call the create element method of document with IMG as it's argument and assign it's value to var img
-call the create element method of document with DIV as it's argument and assign it's value to var textDiv
-call the create element method of document with h3 as it's argument and assign it's value to var entryTitle
-call the create element method of document with p as it's argument and assign it's value to var entryText

*/

function renderEntries(entry) {
  var $entryRow = document.createElement('ROW');
  var $imgDiv = document.createElement('DIV');
  var $entryImg = document.createElement('IMG');
  var $textDiv = document.createElement('DIV');
  var $entryTitle = document.createElement('H3');
  var $entryText = document.createElement('P');

  $entryRow.className = 'row';
  $imgDiv.className = 'column-half';
  $textDiv.className = 'column-half';

  $entryImg.setAttribute('src', entry.photoURL);
  $entryTitle.textContent = entry.title;
  $entryText.textContent = entry.message;

  $entryRow.appendChild($textDiv);
  $entryRow.appendChild($imgDiv);
  $imgDiv.appendChild($entryImg);
  $textDiv.appendChild($entryText);
  $textDiv.appendChild($entryTitle);
  return $entryRow;
}
