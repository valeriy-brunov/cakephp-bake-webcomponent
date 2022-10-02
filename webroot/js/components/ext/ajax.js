/**
 * AJAX-запрос.
 */
export default {
    /**
     * Параметры запроса по умолчанию.
     */
    get DEFAULT_PARAMS() {
	return {
	    url: '',
	    method: 'GET',
	    async: true,
	    success: function(html) {},
	    beforeSend: function() {},
	    error: function(status, statusText) {
		if (status != 200) {
		    console.log('Ошибка запроса' + status + ':' + statusText);
		}
	    },
	    errorConnect: function() {
		console.log('Ошибка соединения!');
	    },
	    progress: function(e) {
		/*
		if ( e.lengthComputable ) {
		    alert('Получено ${e.loaded} из ${e.total} байт');
		}
		else {
		    alert('Получено ${e.loaded} байт');
		}
		*/
	    },
	    complete: function( request ) {
		// Готово, получили ${request.response.length} байт.
		// Если ответ в виде JSON: request.response.имя_литерала
	    },
	}
    },

    /**
     * XMLHttpRequest-запрос.
     * 
     * @param {object} param
     *     Параметры запроса:
     *         url: адрес запроса;
     * 	   method: метод запроса GET или POST;
     * 	   async: асинхронно или синхронно;
     * 	   data: данные передоваемые в запросе (строка или объект).
     *     Параметры, прикреплённые к событиям:
     * 	   success: ответ от сервера успешно получен вместе с кодом html;
     * 	   beforeSend: функция срабатывает перед AJAX-запросом;
     * 	   complete: срабатывает по окончанию запроса;
     * 	   progress: отслеживает загрузку;
     * 	   errorConnect: срабатывает, если произошла ошибка соединения;
     * 	   error: сработывает, если произошла ошибка запроса.
     */
    connect( params ) {
	if ( "url" in params ) {
	    let p = this.DEFAULT_PARAMS;
	    Object.assign( p, params );

	    p.beforeSend();

	    const request = new XMLHttpRequest();
	    request.open( p.method, p.url, p.async );
	    request.addEventListener( 'load', (e) => {
		p.success( e.target.response );
	    });
	    if ( "data" in p ) {
		request.send( p.data );
	    }
	    else {
		request.send();
	    }

	    request.onload = () => {
		if (request.status != 200) {
		    p.error( request.status, request.statusText );
		}
		else {
		    p.complete( request );
		}
	    };

	    request.onprogress = ( event ) => p.progress( event );

	    request.onerror = () => p.errorConnect();
	}
	else {
	    console.log('Не указан адрес запроса url!');
	}
    },
}

