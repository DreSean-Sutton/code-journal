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
var $entryFormSection = document.querySelector('[data-view="entry-form"]');
var $entriesSection = document.querySelector('[data-view="entries"]');
var $entriesButton = document.querySelector('#entries-button');
var $newButton = document.querySelector('#new-button');
var $h1 = document.querySelector('H1');

$photoURL.addEventListener('input', handleImageSwap);
$form.addEventListener('submit', handleFormSubmit);
window.addEventListener('DOMContentLoaded', handleDOMEntries);
$entriesButton.addEventListener('click', showEntries);
$newButton.addEventListener('click', showEntryForm);

function handleImageSwap(event) {
  $image.src = event.target.value;
}

function handleFormSubmit(event) {
  event.preventDefault();
  var formValues = {
    title: $title.value,
    photoURL: $photoURL.value,
    message: $message.value,
    nextEntryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push(formValues);
  $form.reset();
  $image.src = 'images/placeholder-image-square.jpg';
  showEntries();
  $entriesList.prepend(renderEntries(data.entries[data.entries.length - 1]));
}

function showEntries() {
  data.view = 'entries';
  $entryFormSection.classList.add('hidden');
  $entriesSection.classList.remove('hidden');
  $h1.textContent = 'entries';
  $newButton.classList.remove('hidden');
}

function showEntryForm() {
  data.view = 'entry-form';
  $entryFormSection.classList.remove('hidden');
  $entriesSection.classList.add('hidden');
  $h1.textContent = 'new entry';
  $newButton.classList.add('hidden');
}

function stayOnSamePageAfterRefresh() {
  if (data.view === 'entries') {
    showEntries();
  } else {
    showEntryForm();
  }
}

stayOnSamePageAfterRefresh();

function renderEntries(entry) {
  var $entryRow = document.createElement('ROW');
  var $imgDiv = document.createElement('DIV');
  var $entryImg = document.createElement('IMG');
  var $textDiv = document.createElement('DIV');
  var $entryTitle = document.createElement('H3');
  var $entryText = document.createElement('P');

  $entryRow.className = 'row dom-row-layout';
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

function handleDOMEntries(entries) {

  for (var i = 0; i < data.entries.length; i++) {
    $entriesList.prepend(renderEntries(data.entries[i]));
  }
}
