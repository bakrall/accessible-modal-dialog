const $modalTriggerButton = $('.modal-trigger'),
	$dialog = $('.dialog'),
	$dialogMask = $dialog.find('.dialog__mask'),
	$dialogWindow = $dialog.find('.dialog__window'),
	$dialogButtons = $dialog.find('button'),
	$closeButton = $dialog.find('.close-button'),
	$okButton = $dialog.find('.ok-button'),
	KEYCODE = {
		ESC: 27,
		TAB: 9,
		SHIFT: 16
	};

let previousActiveElement;

$modalTriggerButton.on('click', openDialog);

function openDialog() {
	//Whenever I open the dialog, I look at the document's active element and I save that in a variable
	previousActiveElement = document.activeElement;

	$('body').children().each((idx, child) => {
		if (child != $dialog.get(0)) {
			child.inert = true;
		}
	});

	$dialog.addClass('opened');

	$dialogMask.on('click', closeDialog);

	$dialogButtons.on('click', closeDialog);

	$dialogButtons.on('keydown', loopFocusInsideModal);
	
	$(document).on('keydown', checkCloseDialog);

	$dialog.find('button').get(0).focus();
}


function checkCloseDialog(e) {
	if (e.keyCode === KEYCODE.ESC) {
		closeDialog();
	}
}

function closeDialog() {
	//Clean up any event listeners
	$dialogMask.unbind('click');
	$dialogWindow.find('button').each((idx, btn) => {
		$(btn).unbind('click');
	});
	$(document).unbind('keydown', checkCloseDialog);	

	$('body').children().each((idx, child) => {
		if (child != $dialog.get(0)) {
			child.inert = false;
		}
	});

	$dialog.removeClass('opened');

	previousActiveElement.focus();
}

function loopFocusInsideModal(e) {
	const target = $(e.target),
		tabPressed = e.keyCode === KEYCODE.TAB,
		shiftPressed = e.keyCode === KEYCODE.SHIFT,
		indexOfButton = $dialogButtons.index(target);

		if (tabPressed || shiftPressed && tabPressed) {
			if (indexOfButton === 1) {
				$dialogButtons.get(0).focus();
			} else if (indexOfButton === 0) {
				$dialogButtons.get(1).focus();
			}
		}
}

function printToConsole() {
	console.log('key was pressed');	
}

$(document).on('keydown', printToConsole);