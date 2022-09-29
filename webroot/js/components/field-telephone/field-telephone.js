/**
 * Веб-компонент "brunov-field-telephone".
 */

import Template from './template.js';

/**
 * Класс FieldTelephone
 */
export default class FieldTelephone extends HTMLElement {

    /**
     * Конструктор.
     */
    constructor() {

		super();

		// Теневая модель:
		this.root = this.attachShadow( {mode: 'open'} );

		// Подключаем CSS:
		this.root.innerHTML = Template.render();

		// Преносим содержимое в теневую модель:
		this.moveContent();

		// Подключаем кеширование:
		this.dom = Template.mapDom( this.root );
		this.cashe = this.casheValue();
    }
    
    /**
     * Клонируем с шаблона содержимое.
     */
    cloneContent() {
		const template = this.querySelector( '.field-telephone' );
		const clone = template.content.cloneNode( true );
		this.root.appendChild( clone );
	}
	
	/**
	 * Все содержимое переносим в теневую модель, оставляя тег <template> пустым.
	 */
	moveContent() {
		const template = this.querySelector( '.field-telephone' );
		const fragment = document.createDocumentFragment();
		fragment.appendChild( template.content );
		this.root.appendChild( fragment );
	}

	/**
	 * Кеширование значений.
	 */
	casheValue() {
		return {
			valueFirstTel: this.templTel.substr( 0, this.templTel.indexOf('_') ),
		}
	}

	/**
	 * Шаблон телефонного номера.
	 */
	get templTel() {
		if ( this.getAttribute( 'templtel' ) ) {
			return this.getAttribute( 'templtel' );
		}
		else return FieldTelephone.DEFAULT_TEMPLTEL;
	}

	/**
	 * Значение по умолчанию геттера "templTel".
	 */
	static get DEFAULT_TEMPLTEL() {
		return '+7 (___) ___-__-__';
	}

	/**
	 * Символ замены при отображение шаблона в текстлвом поле.
	 */
	get simbolDisplay() {
		if ( this.getAttribute( 'simboldisplay' ) ) {
			return this.getAttribute( 'simboldisplay' );
		}
		else return FieldTelephone.DEFAULT_SIMBOLDISPLAY;
	}

	/**
	 * Значение по умолчанию геттера "simbolDisplay".
	 */
	static get DEFAULT_SIMBOLDISPLAY() {
		return ' ';
	}

	/**
	 * Как отображать шаблон в текстовом поле при вводе цифр.
	 */
	get displayInput() {
		if ( this.getAttribute( 'displayinput' ) ) {
			return this.getAttribute( 'displayinput' );
		}
		else return FieldTelephone.DEFAULT_DISPLAYINPUT;
	}
	
	/**
	 * Значение по умолчанию геттера "displayInput".
	 */
	static get DEFAULT_DISPLAYINPUT() {
		return 'left-to-right';
	}
	
	/**
	 * Очищать ли текстовое поле при потери фокуса, если там даже набран
	 * номер телефона.
	 */
	get clearFocusLost() {
		if ( this.getAttribute( 'clearFocusLost' ) !== null ) {
			return this.getAttribute( 'clearFocusLost' );
		}
		else return FieldTelephone.DEFAULT_CLEARFOCUSLOST;
	}
	
	/**
	 * Значение по умолчанию для геттера "clearFocusLost".
	 */
	static get DEFAULT_CLEARFOCUSLOST() {
		return 'true';
	}

    /**
     * Определяем, за какими атрибутами необходимо наблюдать.
     */
    static get observedAttributes() {
		//return ['Имя атрибута'];
	}

	/**
	 * Следим за изменениями этих атрибутов и отвечаем соответственно.
	 */
	attributeChangedCallback( name, oldVal, newVal )
	{
		switch( name ) {
			case 'Имя атрибута':
				// Выполняемый код.
				break;
			case 'Имя атрибута':
				// Выполняемый код.
				break;
		}
	}

	/**
	 * Браузер вызывает этот метод при добавлении элемента в документ.
	 * (может вызываться много раз, если элемент многократно добавляется/удаляется).
	 */
    connectedCallback() {
		// СОБЫТИЯ:
		this.dom.fieldTel.addEventListener('focus', (e) => this.eventFieldFocus());
		this.dom.fieldTel.addEventListener('input', (e) => this.eventInput());
		this.dom.fieldTel.addEventListener('keydown', (e) => this.eventKeyDown());
		this.dom.fieldTel.addEventListener('blur', (e) => this.eventFieldBlur());
    }

    /**
     * Текстовое поле в фокусе.
     */
    eventFieldFocus() {
		if ( this.clearFocusLost == 'true' || this.dom.fieldTel.value.length === 0 ) {
			this.dom.fieldTel.value = this.cashe.valueFirstTel;
			this.dinamicTemplTel = this.cashe.valueFirstTel;
		}
	}

	/**
	 * Текстовое поле потеряло фокус.
	 */
	eventFieldBlur() {
		if ( this.clearFocusLost == 'true' ) {
			this.dom.fieldTel.value = '';
		}
		if ( this.clearFocusLost == 'false' ) {
			if ( this.dom.fieldTel.value.length == this.cashe.valueFirstTel.length ) {
				this.dom.fieldTel.value = '';
			}
		}
	}

	/**
	 * Нажата клавиша на клавиатуре (идёт первым событием).
	 */
	eventKeyDown() {
		this.dom.fieldTel.classList.add('user-tel_show');
		this.numbersArr = this.dom.fieldTel.value.match(/[0-9]/g);
		this.dom.fieldTel.value = '';
	}

	/**
	 * Изменения в текстовом поле (идёт вторым событием). Этот метод используется
	 * для чтения символов с клавиатуры.
	 */
	eventInput() {
		let simbol = this.dom.fieldTel.value;
		this.dom.fieldTel.value = '';
		let arr = this.numbersArr;
		arr[this.numbersArr.length] = simbol;
		this.insertIntoTemplate( arr );
		this.dom.fieldTel.classList.remove('user-tel_show');
	}
	
	/**
	 * Вставляет строку цифр в шаблон.
	 */
	insertIntoTemplate( numbers ) {
		let tmpl = this.templTel;
		numbers.forEach( function(item, index, array) {
			if ( index > 0 ) {
				tmpl = tmpl.replace('_', item);
			}
		});
this.dom.fieldTel.value = tmpl;
	}
}

/**
 * Регистрация веб-компонента.
 */
if ( !customElements.get( 'brunov-field-telephone' ) ) {
    customElements.define( 'brunov-field-telephone', FieldTelephone );
}
