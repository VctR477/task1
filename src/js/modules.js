/**
 * Создает новый балун на карте
 * 
 * @param {Object} map  - объект карты
 * @param {string} address - адрес из поисковой строки
 */

export const createNewPointOnMap = (map, address) => {
	ymaps.geocode(address, {
		results: 1
	}).then(function (res) {
		// Выбираем первый результат геокодирования.
		const firstGeoObject = res.geoObjects.get(0),
			// Координаты геообъекта.
			coords = firstGeoObject.geometry.getCoordinates(),
			// Область видимости геообъекта.
			bounds = firstGeoObject.properties.get('boundedBy');

		firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
		// Получаем строку с адресом и выводим в иконке геообъекта.
		firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

		// Добавляем первый найденный геообъект на карту.
		map.geoObjects.add(firstGeoObject);
		// Масштабируем карту на область видимости геообъекта.
		map.setBounds(bounds, {
			// Проверяем наличие тайлов на данном масштабе.
			checkZoomRange: true
		});
	});
};
