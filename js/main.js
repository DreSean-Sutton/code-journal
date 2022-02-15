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
