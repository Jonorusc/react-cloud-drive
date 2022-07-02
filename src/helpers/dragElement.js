export default function dragElement(el) {
    console.log(el)
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
        el.onpointerdown = pointerDrag;

	function pointerDrag(e) {
		e.preventDefault();
		console.log(e);
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onpointermove = elementDrag;
		document.onpointerup = stopElementDrag;
	}

	function elementDrag(e) {
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		console.log(pos1, pos2, pos3, pos4);
		el.style.top = el.offsetTop - pos2 + 'px';
		el.style.left = el.offsetLeft - pos1 + 'px';
	}

	function stopElementDrag() {
		document.onpointerup = null;
		document.onpointermove = null;
	}
}