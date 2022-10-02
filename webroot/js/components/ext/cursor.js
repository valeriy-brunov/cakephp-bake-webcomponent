/**
 * Cursor.
 *
 * Устанавливает или получает местоположение курсора в текстовом поле.
 */
export default {

  /**
   * Устанавливает курсор в нужную позицию внутри формы.
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

  /**
   * Метод получает позицию курсора внутри формы.
   *
   * @param {object} input
   *     Объект элемента поля ввода номера телефона.
   */
  getCursorPosition( input ) {
	  if ( input.selectionStart ) {
	    // Стандартные браузеры MazillaFireFox, Opera, Chrom.
      return input.selectionStart;
	  }
	  else if ( document.selection ) {
      // IE.
      input.focus();
      var sel = document.selection.createRange();
      var selLen = document.selection.createRange().text.length;
      sel.moveStart( 'character', -input.value.length );
      return sel.text.length - selLen;
	  }
  }
}

