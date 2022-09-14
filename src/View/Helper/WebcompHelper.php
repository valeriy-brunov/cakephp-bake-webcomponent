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
				$arr[0]['js'] = true;
			}
		}
		else {
			$arr[0]['js'] = true;
		}

		return $this->getView()->element( '/components/' . $name, ['attr' => $arr] );
	}
	
	/**
	 * Метод addattr
	 * 
	 * Создает из массива строку Html с атрибутуми и их значениями.
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
}
