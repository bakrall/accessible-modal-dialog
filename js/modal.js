const modalTriggerButton = document.querySelector('.modal-trigger'),
	dialog = document.querySelector('.dialog'),
	dialogMask = dialog.querySelector('.dialog__mask'),
	dialogWindow = dialog.querySelector('.dialog__window'),
	KEYCODE = {
		ESC: 27
	};

let previousActiveElement;

modalTriggerButton.addEventListener('click', openDialog);

function openDialog() {
	//Whenever I open the dialog, I look at the document's active element and I save that in a variable
	previousActiveElement = document.activeElement;

	Array.from(document.body.children).forEach(child => {
		if (child != dialog) {
			child.inert = true;
		}
	});

	dialog.classList.add('opened');

	dialogMask.addEventListener('click', closeDialog);
	dialogWindow.querySelectorAll('button').forEach(btn => {
		btn.addEventListener('click', closeDialog);
	});
	document.addEventListener('keydown', checkCloseDialog);

	dialog.querySelector('button').focus();
}

function checkCloseDialog(e) {
	if (e.keyCode === KEYCODE.ESC) {
		closeDialog();
	}
}

function closeDialog() {
	//Clean up any event listeners
	dialogMask.removeEventListener('click', closeDialog);
	dialogWindow.querySelectorAll('button').forEach(btn => {
		btn.removeEventListener('click', closeDialog);
	});
	document.removeEventListener('keydown', checkCloseDialog);	

	Array.from(document.body.children).forEach(child => {
		if (child != dialog);
			child.inert = false;
	});

	dialog.classList.remove('opened');

	previousActiveElement.focus();
}