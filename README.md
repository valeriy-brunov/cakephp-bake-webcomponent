### Как начать работать с веб-компонентами для CakePHP.

Необходимо скопировать папки в одноимённые директории CakePHP. Это можно сделать вручную.

### Создание веб-компонента через консоль bake.

Для создания файлов нового веб-компонента:

```bash
$ bin/cake bake Webcomp имя-веб-компонента
```

Имя веб-компонента - это строка, которая может состоять как из одного слова, так и
нескольких слов через дефис "-".

### Вызов веб-компонента в html файле.

```php
<?= $this->Webcomp->имя-веб-компонента() ?>
```

Если имя веб-компонента состоит из нескольких слов через дефис, то необходимо использовать
горбатую запись (верблюжью) запись. Например, для имени веб-компонента:

```txt
my-comp-valera
```

горбатая запись будет:

```txt
myCompValera
```

А вызов веб-компонента с таким именем:

```php
<?= $this->Webcomp->myCompValera() ?>
```

### Подключение js к родительскому и дочернему веб-компоненту.

По умолчанию родительский веб-компонент подгружает js код при помощи тега <script>.
У дочерних веб-компонентов первого уровня удаляются теги <script>, а загрузка js кода
происходит через import... в js коде родительского веб-компонента.

Если же возникла необходимость подключить у дочернего веб-компонента js код
через тег <script>, то необходимо при вызове веб-компонента родителя указать параметр
'js' => true. Например:

```php
<?= $this->Webcomp->myLife( ['js' => true] ) ?>
```

### Добавление контента внутрь тега "template".

Для этого используйте параметр 'content' => 'содержимое'

```php
<?= $this->Webcomp->myLife( ['content' => 'Содержимое'] ) ?>
```

