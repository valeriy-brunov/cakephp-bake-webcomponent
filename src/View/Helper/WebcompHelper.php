<?php
declare(strict_types=1);

namespace App\View\Helper;

use Cake\View\Helper;
use Cake\View\View;
use Cake\Error\Debugger;

/**
 * Webcomp helper
 */
class WebcompHelper extends Helper
{
    /**
     * Default configuration.
     *
     * @var array<string, mixed>
     */
    protected $_defaultConfig = [];

	/**
	 * Настройка помошника.
	 */
	public function initialize( array $config ): void
    {}

    /**
     * Метод __call
     *
     * При вызове не существующего метода, срабатывает данный метод.
     */
    public function __call( $name, array $arr ): string
    {
		// Если массив не пуст.
		if ( !empty($arr) ) {
			if ( !array_key_exists( 'js', $arr[0] ) ) {
				// Устанавливаем значение по-умолчанию.
				$arr[0]['js'] = false;
			}
		}
		else {
			// Устанавливаем значение по-умолчанию.
			$arr[0]['js'] = false;
		}

		$name = strtolower( preg_replace('/([A-Z]{1})/', '-$1', $name ) );

		return $this->getView()->element( '/components/' . $name, ['attr' => $arr] );
	}

	/**
	 * Метод addattr
	 * 
	 * Создает из массива строку Html с атрибутуми и их значениями.
     *
     * @param {array} $arr
     *    Массив, содержащий атрибуты и их значения:
     *       ['атрибут' => значение]
	 */
    public function addattr( array $arr ): string
    {
		if ( array_key_exists( 'js', $arr ) ) {
			unset($arr['js']);
		}

		if ( array_key_exists( 'content', $arr ) ) {
			unset($arr['content']);
		}

		// Если массив не пуст.
		if ( !empty($arr) ) {
			foreach ( $arr as $key => $val ) {
				$str[] = $key . '=' . $val;
			}

			if ( count($str) == 1 ) {
				return ' ' . $str[0];
			}
			else {
				return ' ' . implode( ' ', $str );
			}
		}
		else return '';
	}

	/**
	 * Возвращает переданную строку, содержащую Html код, без тегов <script...></script>.
	 * 
	 * @param {string} $fetch
	 * 		Строка, содержащая Html код.
	 * @param {boolean} $js
	 * 		Выключает фильтрацию Html кода на наличие тегов <script...></script>.
	 */
	public function filterScript( $fetch, $js ): string
	{
		if ( $js ) return $fetch;

		$arr = explode( '<script', $fetch );
		if ( count($arr) == 2 ) {
			$arr_= explode( '</script>', $arr[1] );
			return $arr[0] . $arr_[1];
		}
		else return $arr[0];
	}
}
