/* eslint-disable no-unused-vars */
/* global data */
/* exported data */

var $image = document.querySelector('#image');
var $title = document.querySelector('#title');
var $message = document.querySelector('#message');
var $photoURL = document.querySelector('#photo-url');
var $submit = document.querySelector('#submit');
var $form = document.querySelector('#form');
var $entriesList = document.querySelector('#entries-list');

$photoURL.addEventListener('input', handleImageSwap);
$form.addEventListener('submit', handleFormSubmit);
window.addEventListener('DOMContentLoaded', handleDOMEntries);

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
  data.entries.unshift(formValues);
  $form.reset();
  $image.src = 'images/placeholder-image-square.jpg';
}

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
  $entryTitle.className = 'title-margin-top';

  $entryImg.setAttribute('src', entry.photoURL);
  $entryTitle.textContent = entry.title;
  $entryText.textContent = entry.message;

  $entryRow.appendChild($imgDiv);
  $entryRow.appendChild($textDiv);
  $imgDiv.appendChild($entryImg);
  $textDiv.appendChild($entryTitle);
  $textDiv.appendChild($entryText);
  return $entryRow;
}

function handleDOMEntries(event) {

  for (var i = 0; i < data.entries.length; i++) {
    $entriesList.prepend(renderEntries(data.entries[i]));
  }
}
