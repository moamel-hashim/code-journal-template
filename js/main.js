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
  data.entries.unshift(form);
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
}
