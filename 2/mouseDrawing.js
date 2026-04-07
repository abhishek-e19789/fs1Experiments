const drawingBoard=document.getElementById('drawingArea');
let currentPath;
let isDrawing = false;

drawingBoard.addEventListener('mousedown', (e)=>{
    isDrawing = true;
    currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    currentPath.setAttribute('stroke', 'blue');
    currentPath.setAttribute('fill', 'none');
    currentPath.setAttribute('stroke-width', '2');
    currentPath.setAttribute('d', `M ${e.offsetX}, ${e.offsetY}`);
    drawingBoard.appendChild(currentPath);
    console.log(drawingBoard);
});

drawingBoard.addEventListener('mousemove', (e)=>{
    if(!isDrawing) return;
    const dimension = currentPath.getAttribute("d");
    currentPath.setAttribute("d", `${dimension} L${e.offsetX},${e.offsetY}`);
});

drawingBoard.addEventListener('mouseup', (e)=>{
    isDrawing = false;
});