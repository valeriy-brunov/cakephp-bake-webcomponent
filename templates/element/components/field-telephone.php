<?php
/**
 * CakePHP элемент "field-telephone" для генерации одноимённого веб-компонента.
 *
 * Отображает на экране текстовое поле, которое помогает набирать пользователю
 * сотовый номер телефона.
 *
 * Используйте <?= $this->Webcomp->fieldTelephone() ?>
 *
 * Настройки веб-компонента:
 *	view =>
 *		'black' - чёрный вид;
 *		'red'   - сделайте красный вид.
 */
?>

<?php $this->start('wc-field-telephone') ?>

	<?= $this->Form->text('tel', ['class' => 'user-tel']) ?>

<?php $this->end() ?>

<?php echo
	$this->Html->script('components/field-telephone/field-telephone', [
		'block' => 'js-field-telephone',
		'type' => 'module',
	]);
?>

<brunov-field-telephone<?= $this->Webcomp->addattr( $attr[0] ) ?>>
	<template class="field-telephone">
		<?= $attr[0]['content'] ?? '' ?>
		<?= $this->Webcomp->filterScript( $this->fetch('wc-field-telephone'), $attr[0]['js'] ) ?>
	</template>
	<?= $this->fetch('js-field-telephone') ?>
</brunov-field-telephone>
