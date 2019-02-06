/**
 * TODO
 * 1. список меняется при измении карты
 * 2. маркер без надписи
 * 3. другой балун
 * 4. перетаскивание списка
 * 5. рефакторинг
 * 6. тесты
 * 7. реакт
 * 8. тесты для реакт
 */

const KEY_CODE_ENTER = 13;
const POINTS_LIST_ELEM = document.getElementById('address-list');
const ADDRESS_INPUT_ELEM = document.getElementById('add-new-point');

class RouteMap {
	constructor() {
		this.myMap = null;
		this.multiRoute = null;
		this.suggestView = null;
		this.suggestItemSelected = false;
		this.routePointsArr = [];
		this.init();
	}

	init() {
		this.createMap();
		this.createMultiRoute();
		this.createSuggestView();
		this.bindEvents();
	}

	createMap() {
		// Создание карты.
		this.myMap = new ymaps.Map('map', {
			// Координаты центра карты.
			center: [55.76, 37.64],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 7,
			controls: [ 'zoomControl']
		});
	}

	createMultiRoute() {
		this.multiRoute = new ymaps.multiRouter.MultiRoute(
			{
				referencePoints: []
			},
			{
				boundsAutoApply: true,
				// balloonLayout: myBalloonLayout,
				balloonPanelMaxMapArea: 0
		
			}
		);
		// Включение режима редактирования.
		this.multiRoute.editor.start();
		
		// Добавление маршрута на карту.
		this.myMap.geoObjects.add(this.multiRoute);
	}

	createSuggestView() {
		this.suggestView = new ymaps.SuggestView('add-new-point');
	}

	/**
	 * 
	 * @param {string} address - адрес новой точки
	 */
	addNewPoint(address) {
		// добавляем новый адрес в наш список
		this.routePointsArr.push(address);
		// рисуем наш маршрут заново с новым список
		this.multiRoute.model.setReferencePoints(this.routePointsArr);
		// добавляем адрес в список на странице
		this.createNewItemOfAddressList(address);
		ADDRESS_INPUT_ELEM.value = '';

		// вешаем обработчик собития на удаление
		document.querySelector(`.address-list__remove-btn[data-address="${address}"]`)
			.addEventListener('click', event => {
				const target = event.currentTarget;
				const address = target.getAttribute('data-address');
				this.routePointsArr = this.routePointsArr.filter(item => item !== address);
				POINTS_LIST_ELEM.removeChild(target.parentNode);
				this.multiRoute.model.setReferencePoints(this.routePointsArr);
			});
	}

	createNewItemOfAddressList(address) {
		const removeBtnTemplate = `
			<div class="address-list__item">
				<span class="address-list__point-name">${address}</span>
				<button class="address-list__remove-btn" type="button" data-address="${address}">X</button>
			</div>
		`;
		POINTS_LIST_ELEM.insertAdjacentHTML('beforeend', removeBtnTemplate);
	}

	bindEvents() {
		// вешаем обработчик события на выбор адреса
		this.suggestView.events.add('select', event => {
			this.suggestItemSelected = true;
			const address = event.get('item').value;
			this.addNewPoint(address);
		});

		// на случай если пользователь ничего не выбрал, а просто нажал интер
		ADDRESS_INPUT_ELEM.addEventListener('keypress', event => {
			const val = event.currentTarget.value;
			if (event.keyCode !== KEY_CODE_ENTER || !val || this.suggestItemSelected) {
				this.suggestItemSelected = false;
				return;
			}
			const address = this.suggestView.state.get('items')[ 0 ].value;
			this.addNewPoint(address);
		});

		this.multiRoute.events.add('boundschange', () => {
			if (this.routePointsArr.length) {
				this.myMap.setBounds(this.multiRoute.getBounds(), {
					checkZoomRange: true
				});
			} else {
				this.myMap.setCenter([55.76, 37.64], 7, {
					checkZoomRange: true
				});
			}
		});
	}

	changePointsView() {
		// var yandexWayPoint = multiRoute.getWayPoints().get(1);
		// // Создаем балун у метки второй точки.
		// ymaps.geoObject.addon.balloon.get(yandexWayPoint);
		// yandexWayPoint.options.set({
		// 	preset: "islands#grayStretchyIcon",
		// 	iconContentLayout: ymaps.templateLayoutFactory.createClass(
		// 		'<span style="color: red;">Я</span>ндекс'
		// 	),
		// 	balloonContentLayout: ymaps.templateLayoutFactory.createClass(
		// 		'{{ properties.address|raw }}'
		// 	)
		// });
	}
}

const app = () => new RouteMap();

export default app;
