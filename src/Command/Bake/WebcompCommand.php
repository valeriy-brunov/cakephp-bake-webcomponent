<?php
declare(strict_types=1);

namespace App\Command\Bake;

use Bake\Command\SimpleBakeCommand;
use Bake\Utility\TemplateRenderer;
use Cake\Console\Arguments;
use Cake\Console\ConsoleIo;
use Cake\Console\ConsoleOptionParser;
use Cake\Core\Configure;
use Cake\Utility\Inflector;

class WebcompCommand extends SimpleBakeCommand
{
    /**
     * Путь, где будет размещён файл.
     * 
     * @var array
     */
    public $arrayPathFragment = [
		'../templates/element/components/',
		'../webroot/js/components/',
		'../webroot/js/components/',
	];

    /**
     * Имя шаблона в формате twig.
     * 
     * @var array
     */
    public $fName = [
		'compTemplate',
		'jsTemplate',
		'templateTemplate',
	];

    /**
     * Значение переменной {{ name }} в шаблоне.
     * 
     * @var array
     */
    public $valName = 'Имя!!!';

    /**
     * Имя файла с расширением. При формировании файла к этому имени
     * дбавиться имя из командной строки после команды webcomp.
     * 
     * @var array
     */
    public $n = [
		'.php',
		'.js',
		'template.js',
	];

    /**
     * Переменная, которая используется для перебора массива.
     * 
     * @var int
     */
    public $i = 0;

    /**
     * Стандартные методы. Изменять ничего не требуется, всё уже настроено.
     */
    public $pathFragment = '';

    public function name(): string
    {
        return $this->valName;
    }

    public function template(): string
    {
        return $this->fName[$this->i];
    }

    public function fileName(string $name): string
    {
        if ( $this->i == 2 ) return $this->n[$this->i];
        else return $name . $this->n[$this->i];
    }

    /**
     * Execute the command.
     *
     * @param \Cake\Console\Arguments $args The command arguments.
     * @param \Cake\Console\ConsoleIo $io The console io
     * @return int|null The exit code or null for success
     */
    public function execute(Arguments $args, ConsoleIo $io): ?int
    {
        $this->extractCommonProperties($args);
        $name = $args->getArgumentAt(0);
        if (empty($name)) {
            $io->err('Вы должны указать имя: ' . $this->name());
            $this->abort();
        }
        $name = $this->_getName($name);
        $name = Inflector::camelize($name);
        $name = mb_strtolower($name);

        $this->pathFragment = $this->arrayPathFragment[0];

        do {
            $this->bake($name, $args, $io);
            $this->bakeTest($name, $args, $io);
            $this->i++;
            $this->pathFragment = $this->arrayPathFragment[$this->i] ?? '';
            if ( $this->i == 1 or $this->i == 2 ) $this->pathFragment.= "$name/";
        } while ($this->i < count($this->n));

        return static::CODE_SUCCESS;
    }
}
