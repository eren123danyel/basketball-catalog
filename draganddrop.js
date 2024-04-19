function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.outerHTML);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/plain");
    var draggedElement = new DOMParser().parseFromString(data, "text/html").body.firstChild;

    // Get the original target
    var originalTarget = ev.target.closest('[id^="one"], [id^="two"], [id^="three"], [id^="four"], [id^="five"]');

    originalTarget.innerHTML = '';

    draggedElement.classList.add('dropped');
    originalTarget.appendChild(draggedElement);
  }