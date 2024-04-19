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
    
    ev.target.innerHTML = '';
    ev.target.appendChild(draggedElement);
  }