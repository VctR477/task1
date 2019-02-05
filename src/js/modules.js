const _createNewItemOfAddressList = (address) => {
	const removeBtnTemplate = `
		<div class="address-list__item">
			<span class="address-list__point-name">${address}</span>
			<button class="address-list__remove-btn" type="button">X</button>
		</div>
	`;
	const listELem = document.getElementById('address-list');
	listELem.insertAdjacentHTML('beforeend', removeBtnTemplate);
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

	_createNewItemOfAddressList(address);
};
