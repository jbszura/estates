/************* pobieranie lokali *************/
fetch("https://alfa.propertygrouppoland.pl/q/joannacios/getAll")
  .then(resp => resp.json())
  .then(resp => {

    resp.data.forEach(estate => {
      const estateBox = $('#estate_adverts');
      const cardBox = document.createElement('div');
      const card = document.createElement('div');
      const cardHeader = document.createElement('div');
      const cardContent = document.createElement('div');
      const pCity = document.createElement('p');
      pCity.textContent = estate.city;
      const h3Street = document.createElement('h3');
      if (estate.apartment !== '') {
        h3Street.textContent = estate.street + ' ' + estate.property + '\xa0/\xa0' + estate.apartment;
      } else {
        h3Street.textContent = estate.street + ' ' + estate.property;
      }
      const spanProperty = document.createElement('span');
      spanProperty.textContent = estate.property;
      const spanApartment = document.createElement('span');
      spanApartment.textContent = estate.apartment;
      const pPrice = document.createElement('p');
      pPrice.textContent = estate.price + '\xa0PLN';
      const pType = document.createElement('p');
      pType.textContent = 'Typ: ' + estate.type;
      const pDescription = document.createElement('p');
      pDescription.textContent = estate.description;

      estateBox.append(cardBox);
      cardBox.classList.add('card_container', 'col-md-4', 'col-sm-6', 'col-12')
      cardBox.append(card);
      card.classList.add('card', 'col-12')
      card.append(cardHeader, cardContent);
      cardHeader.classList.add('card-header', 'row');
      cardContent.classList.add('card-content', 'w-100');
      pPrice.classList.add('estate_price');
      cardHeader.append(pCity);
      cardContent.append(h3Street, pDescription, pType, pPrice);
    })
    const updateIdGroup = $('#updateIdGroup');
    const updateIdSelect = document.createElement('select');

    updateIdSelect.classList.add('form-control', 'custom-field', 'col-12');
    updateIdSelect.setAttribute('id', 'updateId');
    updateIdGroup.append(updateIdSelect);

    const deleteIdGroup = $('#deleteIdGroup');
    const deleteIdSelect = document.createElement('select');

    deleteIdSelect.classList.add('form-control', 'custom-field', 'col-12');
    deleteIdSelect.setAttribute('id', 'deleteId');
    deleteIdGroup.append(deleteIdSelect);

    resp.data.forEach(estate => {
      const optionId = document.createElement('option');
      optionId.setAttribute('value', estate.id);
      if (estate.apartment !== '') {
        optionId.textContent = estate.street + ' ' + estate.property + '\xa0/\xa0' + estate.apartment;
      } else {
        optionId.textContent = estate.street + ' ' + estate.property;
      }
      updateIdSelect.append(optionId);
    })
    resp.data.forEach(estate => {
      const optionId = document.createElement('option');
      optionId.setAttribute('value', estate.id);
      if (estate.apartment !== '') {
        optionId.textContent = estate.street + ' ' + estate.property + '\xa0/\xa0' + estate.apartment;
      } else {
        optionId.textContent = estate.street + ' ' + estate.property;
      }
      deleteIdSelect.append(optionId);
    })
  })

function refreshPage() {
  window.location.reload();
}

const apiUrl = "https://alfa.propertygrouppoland.pl/q/joannacios/";

/************* dodawanie lokali *************/
  
const $sendingForm = $('#sendingForm');
const $sendCity = $('#sendCity');
const $sendStreet = $('#sendStreet');
const $sendProperty = $('#sendProperty');
const $sendApartment = $('#sendApartment');
const $sendPrice = $('#sendPrice');
const $sendType = $('#sendType');
const $sendDescription = $('#sendDescription');

sendingForm.addEventListener('submit', function(e){
  e.preventDefault();

  const dataToSend = {
    city: $sendCity.val(),
    street: $sendStreet.val(),
    property: $sendProperty.val(),
    apartment: $sendApartment.val(),
    price: $sendPrice.val(),
    type: $sendType.val(),
    description: $sendDescription.val()
  }
  $.ajax({
    async: false,
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    url: apiUrl + 'create',
    data: JSON.stringify(dataToSend)
  }).done(function() {
    refreshPage();
  })
})

/************* edycja lokali *************/

const $updatingForm = $('#updatingForm');

const $updateId = $('#updateId');
const $updateCity = $('#updateCity');
const $updateStreet = $('#updateStreet');
const $updateProperty = $('#updateProperty');
const $updateApartment = $('#updateApartment');
const $updatePrice = $('#updatePrice');
const $updateType = $('#updateType');
const $updateDescription = $('#updateDescription');

updatingForm.addEventListener('submit', function(e){
  e.preventDefault();

  const apiId = $updateId.val();
  
  const updateUrl = '%7B' + apiId + '%7D';

  const dataToSend = {
    id: $updateId.val(),
    city: $updateCity.val(),
    street: $updateStreet.val(),
    property: $updateProperty.val(),
    apartment: $updateApartment.val(),
    price: $updatePrice.val(),
    type: $updateType.val(),
    description: $updateDescription.val()
  }
  $.ajax({
    async: false,
    method: 'PUT',
    contentType: 'application/json',
    dataType: 'json',
    url: apiUrl + 'update/' + updateUrl,
    data: JSON.stringify(dataToSend)
  }).done(function() {
    refreshPage();
  })
})

/************* usuwanie lokali *************/


const $deletingForm = $('#deletingForm');

deletingForm.addEventListener('submit', function(e){
  e.preventDefault();

  const apiId = $('#deleteId').val();
  
  const deleteUrl = '%7B' + apiId + '%7D';

  $.ajax({
    async: false,
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    url: apiUrl + 'delete/' + deleteUrl,
  }).done(function() {
    refreshPage();
  }) 
})

$("#deleteAll").on('click', function () {
  $.ajax({
    async: false,
    type: 'DELETE',
    contentType: 'application/json',
    dataType: 'json',
    url: apiUrl + 'deleteAll'
  }).done(function() {
    refreshPage();
  }) 
})