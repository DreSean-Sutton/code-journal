/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', saveToLocalStorage);

function saveToLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}

var previousdataJSON = localStorage.getItem('javascript-local-storage');
if (previousdataJSON !== null) {
  data = JSON.parse(previousdataJSON);
}
