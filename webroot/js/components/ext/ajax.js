/**
 * AJAX-запросы.
 */
export default {
	
	/**
	 * Заменяет внутри селектора всё содержимое.
	 */
	inner( url, selector ) {
		const request = new XMLHttpRequest();
		request.open( 'GET', url, true );
		request.addEventListener( 'load', (e) => {
			selector.innerHTML = e.target.response;
		});
		request.send();
		request.onload = function() {
			if (request.status != 200) {
				alert('Ошибка ${request.status}: ${request.statusText}');
			}
			else {
				alert('Готово, получили ${request.response.length} байт');
			}
		};
		request.onprogress = function( event ) {
			if ( event.lengthComputable ) {
				alert('Получено ${event.loaded} из ${event.total} байт');
			}
			else {
				alert('Получено ${event.loaded} байт');
			}
		};
		request.onerror = function() {
			alert('Ошибка соединения!');
		};
	},
	
	
}
