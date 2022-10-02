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
          
        // Значения по умолчанию:
        // Зашита от "залипания" клавиш.
        this.stick = false;
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
            valueFirstTel: this.disInp(),
            posValueFirstTel: this.templTel.indexOf('_'),
            countNumberTemplTel: this.templTel.match(/[0-9]/g).length,
        }
    }

    /**
     * Возвращает шаблон для вставки в текстовое поле при фокусе.
     */
    disInp() {
        if ( this.displayInput == 'full' ) {
            return this.filterReplace( this.templTel );
        }
        if ( this.displayInput == 'left-to-right' ) {
            return this.filterLeftToRight( this.templTel );
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
        return '_';
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
        return 'false';
    }

    /**
     * Браузер вызывает этот метод при добавлении элемента в документ.
     * (может вызываться много раз, если элемент многократно добавляется/удаляется).
     */
    connectedCallback() {
        // СОБЫТИЯ:
        this.dom.fieldTel.addEventListener('focus', (e) => this.eventFieldFocus());
        this.dom.fieldTel.addEventListener('blur', (e) => this.eventFieldBlur());
        this.dom.fieldTel.addEventListener('keydown', (e) => {
            if ( e.code == 'Backspace' ) {
                this.eventKeyDownDelete();
            }
            else {
                if ( /[0-9]/.test(e.key) ) {
                    this.eventKeyDown(e);
                }
            }
        });
        this.dom.fieldTel.addEventListener('keyup', (e) => this.eventKeyUp(e));
    }

    /**
     * Текстовое поле в фокусе.
     */
    eventFieldFocus() {
        if ( this.clearFocusLost == 'true' || this.dom.fieldTel.value.length === 0 ) {
            this.dom.fieldTel.value = this.cashe.valueFirstTel;
            //this.setCursorPosition( this.dom.fieldTel, this.cashe.posValueFirstTel, this.cashe.posValueFirstTel );
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
            if ( this.cashe.countNumberTemplTel == this.dom.fieldTel.value.match(/[0-9]/g).length ) {
                this.dom.fieldTel.value = '';
            }
        }
    }

    /**
     * Нажата клавиша на клавиатуре.
     * 
     * @param {object} e
     *      Event событие.
     */
    eventKeyDown( e ) {
        if ( this.stick ) return;
        this.numbersArr = this.dom.fieldTel.value.match(/[0-9]/g);
        this.numbersArr[this.numbersArr.length] = e.key;
        this.dom.fieldTel.classList.add('user-tel_show');
        this.stick = true;
    }

    /**
     * Отпущена клавиша на клавиатуре.
     */
    eventKeyUp() {
        this.dom.fieldTel.classList.remove('user-tel_show');
        this.insertIntoTemplate( this.numbersArr );
        this.stick = false;
    }

    /**
     * Вставляет строку цифр в шаблон и выводит её в текстовое поле, а также
     * устанавливает в нужную позицию курсор.
     * 
     * @param {array} numbers
     *      Строка цифр номера телефона в виде массива.
     */
    insertIntoTemplate( numbers ) {
        let tmpl = this.templTel;
        numbers.forEach( function(item, index, array) {
            if ( index > 0 ) {
                tmpl = tmpl.replace('_', item);
            }
        });
        let pos = tmpl.indexOf('_');
        this.dom.fieldTel.value = this.filterReplace( this.filterLeftToRight( tmpl ) );
        this.setCursorPosition( this.dom.fieldTel, pos, pos );
    }
    
    /**
     * Фильтр "left-to-right".
     * 
     * @param {string} tmpl
     *      Шаблон из геттера displayInput.
     */
    filterLeftToRight( tmpl ) {
        if ( this.displayInput == 'left-to-right' ) {
            let pos = tmpl.indexOf('_');
            if ( pos === -1 ) {
                return tmpl;
            }
            else {
                tmpl = tmpl.slice(0, pos);
            }
            return tmpl;
        }
        else return tmpl;
    }

    /**
     * Фильтр "replace".
     * 
     * @param {string} tmpl
     *      Шаблон из геттера displayInput.
     */
    filterReplace( tmpl ) {
        if ( this.simbolDisplay != '_' ) {
            return tmpl = tmpl.replace(/_/g, this.simbolDisplay);
        }
        else return tmpl;
    }

    /**
     * Нажата клавиша "Delete" на клавиатуре.
     */
    eventKeyDownDelete() {
        if ( this.stick ) return;
        this.dom.fieldTel.classList.add('user-tel_show');
        this.numbersArr = this.dom.fieldTel.value.match(/[0-9]/g).slice(0,-1);
        this.stick = true;
    }

    /**
     * Метод устанавливает курсор в нужную позицию внутри формы.
     *
     * @param {object) oInput
     * 	Объект элемента поля ввода номера телефона.
     * @param {int} oStart
     *      Позиция начала выделения текста в поле формы.
     * @param {int} oEnd
     *      Позиция конца выделения текста в поле формы.
     *
     * При совпадении oStart и oEnd курсор устанавливается в указанную позицию.
     */
    setCursorPosition( oInput, oStart, oEnd ) {
        if ( oInput.setSelectionRange ) {
            oInput.setSelectionRange( oStart, oEnd );
        }
        else if ( oInput.createTextRange ) {
            range = oInput.createTextRange();
            range.collapse( true );
            range.moveEnd( 'character', oEnd );
            range.moveStart( 'character', oStart );
            range.select();
        }
    }
}

/**
 * Регистрация веб-компонента.
 */
if ( !customElements.get( 'brunov-field-telephone' ) ) {
  customElements.define( 'brunov-field-telephone', FieldTelephone );
}
