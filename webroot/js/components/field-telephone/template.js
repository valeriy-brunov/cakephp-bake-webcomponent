/**
 * Шаблон для компонента "field-telephone".
 */
export default {

	render( props ) {
		return `${this.css( props )}`;
	},

	/**
	 * Кэширование элементов компонента для теневой модели.
	 */
	mapDom( scope ) {
		return {
		    fieldTel: scope.querySelector('.user-tel'),
		}
	},

	/**
	 * Перемещает стили в компонент.
	 */
	css( p ) { return `
		<style>
			:host { color: red; }
			.user-tel {
				color: black;
				background-color: #EEE;
			}
			.user-tel_show {
				color: #EEE;
				background-color: #EEE;
			}
		</style>`;
	},
}

