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

const $ul = document.querySelector('ul');
function domTree(entry) {
  const $li = document.createElement('li');
  $ul.appendChild($li);
  const $container = document.createElement('div');
  $container.setAttribute('class', 'container');
  $ul.appendChild($container);
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row justify-content-space-between align-items-center');
  $container.appendChild($row);
  const $divEntries = document.createElement('div');
  $row.appendChild($divEntries);
  const $h1 = document.createElement('h1');
  $h1.textContent = 'Entries';
  $divEntries.appendChild($h1);
  const $divButton = document.createElement('div');
  $row.appendChild($divButton);
  const $button = document.createElement('button');
  $button.textContent = 'new';
  $divButton.appendChild($button);
  const $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'row');
  $container.appendChild($secondRow);
  const $divHalf = document.createElement('div');
  $divHalf.setAttribute('class', 'column-half');
  $secondRow.appendChild($divHalf);
  const $imgContainer = document.createElement('div');
  $imgContainer.setAttribute('class', 'img-container');
  $divHalf.appendChild($imgContainer);
  const $img = document.createElement('img');
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  $img.setAttribute('class', 'border-radius');
  $imgContainer.appendChild($img);
  const $secondDivHalf = document.createElement('div');
  $secondDivHalf.setAttribute('class', 'column-half');
  $secondRow.appendChild($secondDivHalf);
  const $textContainer = document.createElement('div');
  $textContainer.setAttribute('class', 'text-container');
  $secondDivHalf.appendChild($textContainer);
  const $h2 = document.createElement('h2');
  $h2.textContent = 'Ada lovelace';
  $textContainer.appendChild($h2);
  const $p = document.createElement('p');
  $p.textContent = 'hello';
  $textContainer.appendChild($p);
  return $li;
}

domTree();
