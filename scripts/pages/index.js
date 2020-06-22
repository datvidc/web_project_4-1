import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileAddButton = document.querySelector('.profile__button_type_add');
const forms = Array.from(document.querySelectorAll('.form'));
const imagePopup = new PopupWithImage('.popup_content_picture');
const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});
const initialCards = [
  {
    text: 'Lake Louise',
    imgLink: './images/lake-louise.jpg',
  },
  {
    text: 'Bald Mountains',
    imgLink: './images/bald-mountains.jpg',
  },
  {
    text: 'Latemar',
    imgLink: './images/latemar.jpg',
  },
  {
    text: 'Vanois National...',
    imgLink: './images/vanois-national.jpg',
  },
  {
    text: 'Lago di Braies',
    imgLink: './images/lago-di-braies.jpg',
  },
  {
    text: 'Yosemite Valley',
    imgLink: './images/yosemite-valley.jpg',
  },
];
const settingsObject = {
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active',
};

function handleCardClick(data) {
  imagePopup.open(data);
}

function createCard(cardData) {
  const card = new Card(
    { ...cardData, popup: imagePopup, handleCardClick },
    '#element-template',
  );
  return card.generateCard();
}

const cards = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      cards.addItem(card);
    },
  },
  '.elements__list',
);
cards.renderItems();

function editFormSubmitHandler({ 'name-field': name, 'job-field': job }) {
  profileInfo.setUserInfo({ name, job });
}

function addCardFormSubmitHandler({
  'title-field': text,
  'img-link-field': imgLink,
}) {
  cards.addItem(createCard({ text, imgLink }));
}

forms.forEach((form) => {
  const newFormValidator = new FormValidator(settingsObject, form);
  newFormValidator.enableValidation();
});

const addCardFormPopup = new PopupWithForm(
  addCardFormSubmitHandler,
  '.popup_content_add-card-form',
);

const editProfileFormPopup = new PopupWithForm(
  editFormSubmitHandler,
  '.popup_content_edit-profile-form',
);

imagePopup.setEventListeners();
addCardFormPopup.setEventListeners();
editProfileFormPopup.setEventListeners();
profileEditButton.addEventListener('click', () => editProfileFormPopup.open());
profileAddButton.addEventListener('click', () => addCardFormPopup.open());
