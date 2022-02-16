/* eslint-disable no-unused-vars */
/* global data */
/* exported data */
var currentEntryId = 0;

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
var $noEntriesDiv = document.querySelector('.no-entries-div');

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
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.push(formValues);
    currentEntryId = data.nextEntryId - 2;
    $entriesList.prepend(renderEntries(data.entries[data.entries.length - 1]));
  } else {
    // debugger;
    var editsEntryId = data.editing.getAttribute('data-entry-id') * 1;
    data.entries[editsEntryId].title = formValues.title;
    data.entries[editsEntryId].photoURL = formValues.photoURL;
    data.entries[editsEntryId].message = formValues.message;
    for (var i = $entriesList.children.length - 1; i >= 0; i--) {
      if ($entriesList.children[i].getAttribute('data-entry-id') * 1 === editsEntryId) {
        $entriesList.children[i].replaceWith(renderEntries(data.entries[editsEntryId]));
        $entriesList.children[i].setAttribute('data-entry-id', editsEntryId);
        break;
      }
    }
    data.editing = null;
  }
  $image.src = 'images/placeholder-image-square.jpg';
  showEntries();
  $form.reset();
}

function showEntries() {
  data.view = 'entries';
  $entryFormSection.classList.add('hidden');
  $entriesSection.classList.remove('hidden');
  $h1.textContent = 'entries';
  $newButton.classList.remove('hidden');
  $form.reset();
  $image.src = 'images/placeholder-image-square.jpg';
  data.editing = null;
  if (data.entries.length === 0) {
    $noEntriesDiv.classList.remove('hidden');
  } else {
    $noEntriesDiv.classList.add('hidden');
  }
}

function showEntryForm() {
  data.view = 'entry-form';
  $entryFormSection.classList.remove('hidden');
  $entriesSection.classList.add('hidden');
  $h1.textContent = 'new entry';
  $newButton.classList.add('hidden');
  $noEntriesDiv.classList.add('hidden');
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
  var $h3AndEditRow = document.createElement('ROW');
  var $titleDiv = document.createElement('DIV');
  var $entryTitle = document.createElement('H3');
  var $iconDiv = document.createElement('DIV');
  var $editIcon = document.createElement('I');
  var $entryText = document.createElement('P');

  $entryRow.className = 'row dom-row-layout';
  $imgDiv.className = 'column-half';
  $textDiv.className = 'column-half';
  $h3AndEditRow.className = 'row title-edit-layout';
  $titleDiv.className = 'title-div-layout';
  $editIcon.className = 'fas fa-pen';
  $entryTitle.className = 'title-margin-top';

  $entryImg.setAttribute('src', entry.photoURL);
  $entryRow.setAttribute('data-entry-id', currentEntryId);
  $entryTitle.textContent = entry.title;
  $entryText.textContent = entry.message;

  $entryRow.appendChild($imgDiv);
  $imgDiv.appendChild($entryImg);
  $entryRow.appendChild($textDiv);
  $textDiv.appendChild($h3AndEditRow);
  $h3AndEditRow.appendChild($titleDiv);
  $h3AndEditRow.appendChild($iconDiv);
  $titleDiv.appendChild($entryTitle);
  $iconDiv.appendChild($editIcon);
  $textDiv.appendChild($entryText);

  $entryRow.addEventListener('click', handleEdit);

  function handleEdit(event) {
    // debugger;
    if (event.target !== $editIcon) {
      return;
    }
    showEntryForm();
    var entriesParent = event.target.closest('.dom-row-layout');
    var entriesParentId = entriesParent.getAttribute('data-entry-id') * 1;

    for (var i = 0; i < data.entries.length; i++) {
      if (entriesParentId === data.entries[i].nextEntryId - 1) {
        data.editing = entriesParent;
        $image.src = data.entries[i].photoURL;
        $title.value = data.entries[i].title;
        $photoURL.value = data.entries[i].photoURL;
        $message.value = data.entries[i].message;
        break;
      }
    }
  }

  return $entryRow;
}

function handleDOMEntries(entries) {
  for (var i = 0; i < data.entries.length; i++) {
    $entriesList.prepend(renderEntries(data.entries[i]));
    currentEntryId++;
  }
}
