import { createNewPoint } from './modules';

const REMOVE_POINT_BTN_CLASS = 'address-list__remove-btn';

const _bindEvents = () => {
	document.getElementById('address-list').addEventListener('click', event => {
		const target = event.target;
		if (target.classList.contains(REMOVE_POINT_BTN_CLASS)) {
			console.log(Number(target.getAttribute('data-index')));
		}
	});
};

const app = () => { 
	// Создание карты.    
	const myMap = new ymaps.Map('map', {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [55.76, 37.64],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 7
	});

	// подключаем попап с подсказками адресов для нашего инпута
	const suggestView = new ymaps.SuggestView('add-new-point');

	// вешаем обработчик события на выбор адреса
	suggestView.events.add('select', event => {
		const address = event.get('item').value;
		createNewPoint(myMap, address);
	});

	_bindEvents();
};

export default app;
