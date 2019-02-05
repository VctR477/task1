/**
 * TODO
 * 1. Первый в попапе по дефолту
 * 2. маркер без надписи
 * 3. другой балун
 * 4. перетаскивание списка
 * 5. список меняется при измении карты
 * 6. рефакторинг
 * 7. тесты
 * 8. реакт
 * 9. тесты для реакт
 */



// import { createNewPoint, createRoute } from './modules';

const POINTS_LIST_ELEM = document.getElementById('address-list');
const ADDRESS_INPUT_ELEM = document.getElementById('add-new-point');

const _createNewItemOfAddressList = (address) => {
	const removeBtnTemplate = `
		<div class="address-list__item">
			<span class="address-list__point-name">${address}</span>
			<button class="address-list__remove-btn" type="button" data-address="${address}">X</button>
		</div>
	`;
	POINTS_LIST_ELEM.insertAdjacentHTML('beforeend', removeBtnTemplate);
};

let referencePoints = [];

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
		zoom: 7,
		controls: [ 'zoomControl']
	});

	const multiRoute = new ymaps.multiRouter.MultiRoute(
		{
			referencePoints: referencePoints
		},
		{
			boundsAutoApply: true,
			// balloonLayout: myBalloonLayout,
			balloonPanelMaxMapArea: 0
	
		}
	);
	// Включение режима редактирования.
	multiRoute.editor.start();
	
	// Добавление маршрута на карту.
	myMap.geoObjects.add(multiRoute);

	// подключаем попап с подсказками адресов для нашего инпута
	const suggestView = new ymaps.SuggestView('add-new-point');

	// вешаем обработчик события на выбор адреса
	suggestView.events.add('select', event => {
		const address = event.get('item').value;
		referencePoints.push(address);
		multiRoute.model.setReferencePoints(referencePoints);
		_createNewItemOfAddressList(address);
		ADDRESS_INPUT_ELEM.value = '';

		// вешаем обработчик собития на удаление
		document.querySelector(`.address-list__remove-btn[data-address="${address}"]`).addEventListener('click', event => {
			const target = event.currentTarget;
			const address = target.getAttribute('data-address');
			referencePoints = referencePoints.filter(item => item !== address);
			multiRoute.model.setReferencePoints(referencePoints);
			POINTS_LIST_ELEM.removeChild(target.parentNode);
		});
	});

	multiRoute.events.add('boundschange', function() {
		myMap.setBounds(multiRoute.getBounds(), {
			checkZoomRange: true
		});
	});
};

export default app;
