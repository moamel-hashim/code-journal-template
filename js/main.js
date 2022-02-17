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

  const $img = document.querySelector('.image');
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  noEntries();
  switchView('entries');
  $form.reset();
  if (data.editing !== null) {
    form.entryId = data.editing.entryId;
    const $lis = document.querySelectorAll('li');
    for (let i = 0; i < $lis.length; i++) {
      const replaceElement = $lis[i];
      const liEntryId = parseInt($lis[i].getAttribute('data-entry-id'));
      if (liEntryId === form.entryId) {
        const editEntries = domTree(form);
        replaceElement.replaceWith(editEntries);
        for (let j = 0; j < data.entries.length; j++) {
          if (form.entryId === data.entries[j].entryId) {
            data.entries[j] = form;
          }
        }
      }
    }
    data.editing = null;
  } else {
    form.entryId = data.nextEntryId++;
    data.entries.unshift(form);
    $ul.prepend(domTree(form));
  }
}

const $ul = document.querySelector('.ul');
function domTree(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'margin');
  $li.setAttribute('data-entry-id', entry.entryId);
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
  $h2.setAttribute('class', 'position-relative');
  $textContainer.appendChild($h2);
  const $p = document.createElement('p');
  $p.textContent = entry.text;
  $textContainer.appendChild($p);
  const $span = document.createElement('span');
  $span.setAttribute('class', 'position-absolute');
  $h2.appendChild($span);
  const $i = document.createElement('i');
  $i.setAttribute('class', 'fas fa-pen color-purple');
  $span.appendChild($i);
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
  const $h1 = document.querySelector('h1');
  $h1.textContent = 'New Entry';
  const $img = document.querySelector('.image');
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
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
  $form.reset();
}

$ul.addEventListener('click', handleEdit);
function handleEdit(event) {
  if (event.target.matches('i')) {
    const $h1 = document.querySelector('h1');
    $h1.textContent = 'Edit Entry';
    const getEntryIds = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === getEntryIds) {
        data.editing = data.entries[i];
      }
    }
    $form.elements.title.value = data.editing.title;
    $form.elements.photoUrl.value = data.editing.image;
    $form.elements.notes.value = data.editing.text;
    const $img = document.querySelector('.image');
    $img.setAttribute('src', $photoURL.value);
    switchView('entry-form');
  }
}
