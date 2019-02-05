import { createNewPointOnMap } from './modules';

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
		createNewPointOnMap(myMap, address);
	});
};

export default app;
