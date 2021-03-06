const POINTS_LIST_ELEM = document.getElementById('address-list');

const _createNewItemOfAddressList = (address, index) => {
	const removeBtnTemplate = `
		<div class="address-list__item">
			<span class="address-list__point-name">${address}</span>
			<button class="address-list__remove-btn" type="button" data-index="${index}">X</button>
		</div>
	`;
	POINTS_LIST_ELEM.insertAdjacentHTML('beforeend', removeBtnTemplate);
};


/**
 * Создает новый балун на карте и новый адрес в списке
 * 
 * @param {Object} map  - объект карты
 * @param {string} address - адрес из поисковой строки
 */

export const createNewPoint = (map, address) => {
	ymaps.geocode(address, {
		results: 1
	}).then(function (res) {
		// Выбираем первый результат геокодирования.
		const firstGeoObject = res.geoObjects.get(0);

		// Координаты геообъекта. (не использ!! пока оставлю)
		const coords = firstGeoObject.geometry.getCoordinates();

		firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
		// Получаем строку с адресом и выводим в иконке геообъекта.
		firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

		const geoObjCounter = map.geoObjects.getLength();
		_createNewItemOfAddressList(address, geoObjCounter);

		// вешаем обработчик собития на удаление
		document.querySelector(`.address-list__remove-btn[data-index="${geoObjCounter}"]`).addEventListener('click', event => {
			const target = event.currentTarget;
			const idx = Number(target.getAttribute('data-index'));
			const addressPoint = map.geoObjects.get(idx);
			map.geoObjects.remove(addressPoint);
			POINTS_LIST_ELEM.removeChild(target.parentNode);
		});

		// Добавляем первый найденный геообъект на карту.
		map.geoObjects.add(firstGeoObject);

		// Область видимости всех геообъектов на карет.
		const bounds = map.geoObjects.getBounds();
		
		// Масштабируем карту на область видимости геообъекта.
		map.setBounds(bounds, {
			// Проверяем наличие тайлов на данном масштабе.
			checkZoomRange: true
		});
	});
};

/**
 * Строит маршрут на карте
 * 
 * @param {Array} pointsArr - массив точек на карте
 * @param {Object} map - объект карты
 */
export const createRoute = (pointsArr, map) => {

	ymaps.route(pointsArr, {
		mapStateAutoApply: true
	}).then(function (route) {
		route.getPaths().options.set({
			// в балуне выводим только информацию о времени движения с учетом пробок
			balloonContentBodyLayout: ymaps.templateLayoutFactory.createClass('$[properties.humanJamsTime]'),
			// можно выставить настройки графики маршруту
			strokeColor: '0000ffff',
			opacity: 0.9
		});
		// добавляем маршрут на карту
		map.geoObjects.add(route);
	});
};
