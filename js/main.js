/* global data */
/* exported data */
const $photoURL = document.querySelector('#image');
$photoURL.addEventListener('input', inputHandler);
function inputHandler(event) {
  const $img = document.querySelector('.image');
  $img.setAttribute('src', $photoURL.value);
  if ($photoURL.value === '') {
    $img.setAttribute('src', './images/placeholder-image-square.jpg');
  }
}

const $form = document.querySelector('form');
$form.addEventListener('submit', formHandler);
function formHandler(event) {
  event.preventDefault();
  const form = {
    title: $form.elements.title.value,
    image: $form.elements.photoUrl.value,
    text: $form.elements.notes.value,
    entryId: data.nextEntryId++
  };
  const domTreeReturnValue = domTree(form);
  data.entries.unshift(form);
  $ul.prepend(domTreeReturnValue);
  const $img = document.querySelector('.image');
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  noEntries();
  switchView('entries');
  $form.reset();
}

const $ul = document.querySelector('.ul');
function domTree(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'margin');
  $ul.appendChild($li);
  const $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'row container');
  $li.appendChild($secondRow);
  const $divHalf = document.createElement('div');
  $divHalf.setAttribute('class', 'column-half');
  $secondRow.appendChild($divHalf);
  const $imgContainer = document.createElement('div');
  $imgContainer.setAttribute('class', 'img-container');
  $divHalf.appendChild($imgContainer);
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.image);
  $img.setAttribute('class', 'border-radius');
  $imgContainer.appendChild($img);
  const $secondDivHalf = document.createElement('div');
  $secondDivHalf.setAttribute('class', 'column-half');
  $secondRow.appendChild($secondDivHalf);
  const $textContainer = document.createElement('div');
  $textContainer.setAttribute('class', 'text-container');
  $secondDivHalf.appendChild($textContainer);
  const $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  $textContainer.appendChild($h2);
  const $p = document.createElement('p');
  $p.textContent = entry.text;
  $textContainer.appendChild($p);
  return $li;
}

window.addEventListener('DOMContentLoaded', handleDomContent);
function handleDomContent(event) {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(domTree(data.entries[i]));
  }
  switchView(data.view);
  noEntries();
}

const $new = document.querySelector('.new');
$new.addEventListener('click', handleNewButton);
function handleNewButton(event) {
  switchView('entry-form');
}
const $view = document.querySelectorAll('[data-view]');

function switchView(viewName) {
  data.view = viewName;
  for (let i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === viewName) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'hidden view';
    }
  }
}

function noEntries() {
  if (data.entries.length > 0) {
    const $p = document.querySelector('.no-entry');
    $p.className = 'no-entry text-align-center hidden';
  }
}

var $anchor = document.querySelector('a');
$anchor.addEventListener('click', anchor);

function anchor(event) {
  event.preventDefault();
  switchView('entries');
}
