// ==========================================
// EDITOR STATE MANAGEMENT
// ==========================================
const editorState = {
  activeTool: "move", 
  pages: [{ id: 'page-1', name: 'Page 1', elements: [] }],
  activePageId: 'page-1',
  
  // Design System
  variables: [], // { id, name, value, type }
  styles: [], // { id, name, styleObj }
  
  selectedElementId: null,
  mode: "idle", 
  canvas: { width: 0, height: 0 },
  startPos: { x: 0, y: 0 },
  viewport: { x: 0, y: 0, zoom: 1 },
  resizeHandle: null,
  tempElement: null
};

// ... (getActiveElements logic) ...

// ... (createElement logic) ...

// ... (updateElement logic) ...

// ... (loadState logic) ...
function loadState() {
  const saved = localStorage.getItem("figma-editor-state");
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.pages) {
        editorState.pages = parsed.pages;
        editorState.activePageId = parsed.activePageId || parsed.pages[0].id;
    } else if (parsed.elements) {
        editorState.pages[0].elements = parsed.elements;
    }
    
    // Load Design System
    editorState.variables = parsed.variables || [];
    editorState.styles = parsed.styles || [];
    
    renderElements();
    updateLayersPanel();
    updatePagesPanel();
    updateVariablesPanel();
    updateStylesPanel();
  }
}

function saveState() {
  localStorage.setItem("figma-editor-state", JSON.stringify({
    pages: editorState.pages,
    activePageId: editorState.activePageId,
    variables: editorState.variables,
    styles: editorState.styles
  }));
}

// ... (updatePagesPanel logic) ...

// ==========================================
// VARIABLES & STYLES LOGIC
// ==========================================

function updateVariablesPanel() {
    const list = document.getElementById('variables-list');
    if (!list) return;
    list.innerHTML = '';
    
    editorState.variables.forEach(v => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-2 px-2 py-1 text-[11px] hover:bg-[#383838] cursor-pointer text-gray-300';
        item.innerHTML = `
            <div class="w-3 h-3 rounded-full border border-gray-600" style="background-color: ${v.value}"></div>
            <span>${v.name}</span>
        `;
        item.addEventListener('click', () => {
            if (editorState.selectedElementId) {
                // Apply color variable
                updateElement(editorState.selectedElementId, { styles: { backgroundColor: v.value } });
            }
        });
        list.appendChild(item);
    });
}

function updateStylesPanel() {
    const list = document.getElementById('styles-list');
    if (!list) return;
    list.innerHTML = '';
    
    editorState.styles.forEach(s => {
        const item = document.createElement('div');
        item.className = 'flex items-center gap-2 px-2 py-1 text-[11px] hover:bg-[#383838] cursor-pointer text-gray-300';
        item.innerHTML = `
            <div class="w-3 h-3 rounded-sm border border-gray-600 bg-gray-500"></div>
            <span>${s.name}</span>
        `;
        item.addEventListener('click', () => {
             if (editorState.selectedElementId) {
                 updateElement(editorState.selectedElementId, { styles: s.styleObj });
             }
        });
        list.appendChild(item);
    });
}

document.getElementById('add-variable-btn')?.addEventListener('click', () => {
    // Create variable from selected element's color
    const elements = getActiveElements();
    const el = elements.find(e => e.id === editorState.selectedElementId);
    if (!el) return;
    
    const color = el.styles.backgroundColor;
    const newVar = {
        id: crypto.randomUUID(),
        name: `Color ${editorState.variables.length + 1}`,
        value: color,
        type: 'color'
    };
    editorState.variables.push(newVar);
    updateVariablesPanel();
    saveState();
});

document.getElementById('add-style-btn')?.addEventListener('click', () => {
     // Create style from selected element
    const elements = getActiveElements();
    const el = elements.find(e => e.id === editorState.selectedElementId);
    if (!el) return;
    
    const newStyle = {
        id: crypto.randomUUID(),
        name: `Style ${editorState.styles.length + 1}`,
        styleObj: { ...el.styles }
    };
    editorState.styles.push(newStyle);
    updateStylesPanel();
    saveState();
});

// ==========================================
// RENDERING ENGINE
// ==========================================
// ... (rest of file) ...
const canvas = document.getElementById("canvas");

function renderElements() {
  canvas.innerHTML = "";
  const elements = getActiveElements();
  
  elements.forEach(el => {
    const div = document.createElement("div");
    div.dataset.id = el.id;
    div.style.position = "absolute";
    div.style.left = `${el.x + editorState.viewport.x}px`;
    div.style.top = `${el.y + editorState.viewport.y}px`;
    div.style.width = `${el.width}px`;
    div.style.height = `${el.height}px`;
    div.style.transform = `rotate(${el.rotation}deg)`;
    div.style.zIndex = el.zIndex;
    div.style.cursor = "move"; 
    
    // Default Styles
    Object.assign(div.style, el.styles);

    // Shape Specific Rendering
    if (el.type === 'polygon') {
        div.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'; // Triangle default
    }
    if (el.type === 'star') {
        div.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    }
    if (el.type === 'arrow') {
         // Render line with arrowhead using generic div? 
         // For simplicity, let's just make it a line for now or SVG
         div.style.height = '2px';
         const arrowHead = document.createElement('div');
         arrowHead.style.position = 'absolute';
         arrowHead.style.right = '-5px';
         arrowHead.style.top = '-4px';
         arrowHead.style.borderTop = '5px solid transparent';
         arrowHead.style.borderBottom = '5px solid transparent';
         arrowHead.style.borderLeft = `10px solid ${el.styles.backgroundColor}`;
         div.appendChild(arrowHead);
    }
    
    // Selection State
    if (editorState.selectedElementId === el.id) {
       div.style.outline = "2px solid #0d99ff";
       // Disable outline for line/arrow to look better? kept for consistency
       
       const handles = ['nw', 'ne', 'sw', 'se'];
       handles.forEach(h => {
           const handle = document.createElement('div');
           handle.className = `absolute w-2 h-2 bg-white border border-[#0d99ff] rounded-full z-50`;
           handle.dataset.handle = h;
           handle.style.cursor = `${h}-resize`;
           
           if (h.includes('n')) handle.style.top = '-4px';
           if (h.includes('s')) handle.style.bottom = '-4px';
           if (h.includes('w')) handle.style.left = '-4px';
           if (h.includes('e')) handle.style.right = '-4px';
           
           div.appendChild(handle);
       });
    }

    if (el.type === 'text') {
        div.innerText = el.text;
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        
        // Double Click to Edit
        div.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            div.contentEditable = true;
            div.focus();
            div.style.outline = '2px dashed white';
        });
        
        div.addEventListener('blur', () => {
             div.contentEditable = false;
             div.style.outline = editorState.selectedElementId === el.id ? '2px solid #0d99ff' : 'none';
             updateElement(el.id, { text: div.innerText });
        });
    }

    // Image Handling
    if (el.type === 'image' && el.src) {
        div.style.backgroundImage = `url(${el.src})`;
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';
    } else if (el.type === 'image') {
        div.style.backgroundColor = '#ccc';
        div.innerText = 'Double click to upload';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.fontSize = '10px';
        div.style.color = '#555';
        
        div.addEventListener('dblclick', () => {
             const input = document.createElement('input');
             input.type = 'file';
             input.accept = 'image/*';
             input.onchange = (e) => {
                 const file = e.target.files[0];
                 if (file) {
                     const reader = new FileReader();
                     reader.onload = (ev) => {
                         updateElement(el.id, { src: ev.target.result });
                     };
                     reader.readAsDataURL(file);
                 }
             };
             input.click();
        });
    }

    canvas.appendChild(div);
  });
}

// ... Interaction Logic ...

canvas.addEventListener('mousedown', (e) => {
   // ... existing rect logic ...
   const rect = canvas.getBoundingClientRect();
   const mouseX = e.clientX - rect.left;
   const mouseY = e.clientY - rect.top;
   
   if (editorState.activeTool === 'hand' || e.buttons === 4) { 
       editorState.mode = 'panning';
       editorState.startPos = { x: e.clientX, y: e.clientY };
       canvas.style.cursor = 'grabbing';
       return;
   }

   const target = e.target;
   const elementDiv = target.closest('[data-id]');
   const handle = target.dataset.handle;

   if (handle && elementDiv) {
       editorState.mode = 'resizing';
       editorState.resizeHandle = handle;
       editorState.selectedElementId = elementDiv.dataset.id; 
       editorState.startPos = { x: mouseX, y: mouseY };
       e.stopPropagation();
       return;
   }

   if (elementDiv) {
       const id = elementDiv.dataset.id;
       editorState.selectedElementId = id;
       
       if (editorState.activeTool === 'move') {
           editorState.mode = 'dragging';
           editorState.startPos = { x: mouseX, y: mouseY };
       }
       renderElements();
       updatePropertiesPanel();
       updateLayersPanel();
       e.stopPropagation();
       return;
   }

   if (editorState.activeTool === 'move') {
       editorState.selectedElementId = null;
       renderElements();
       updatePropertiesPanel();
       updateLayersPanel();
   } else if (editorState.activeTool === 'rectangle' || editorState.activeTool === 'text') {
       editorState.mode = 'drawing';
       editorState.startPos = { x: mouseX, y: mouseY };
       e.preventDefault();
   }
});

window.addEventListener('mousemove', (e) => {
    if (editorState.mode === 'idle') return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    if (editorState.mode === 'panning') {
        const dx = e.clientX - editorState.startPos.x;
        const dy = e.clientY - editorState.startPos.y;
        editorState.viewport.x += dx;
        editorState.viewport.y += dy;
        editorState.startPos = { x: e.clientX, y: e.clientY };
        renderElements();
        return;
    }
    
    const elements = getActiveElements(); // GET ACTIVE

    if (editorState.mode === 'drawing') {
        if (!editorState.selectedElementId) {
             const startX = editorState.startPos.x - editorState.viewport.x;
             const startY = editorState.startPos.y - editorState.viewport.y;
             
             const newEl = createElement(editorState.activeTool, startX, startY, 1, 1);
             elements.push(newEl); // PUSH TO ACTIVE
             setActiveElements(elements); // UPDATE STATE
             editorState.selectedElementId = newEl.id;
        } 
        
        const el = elements.find(e => e.id === editorState.selectedElementId);
        if (el) {
             const currentX = mouseX - editorState.viewport.x;
             const currentY = mouseY - editorState.viewport.y;
             const startX = editorState.startPos.x - editorState.viewport.x;
             const startY = editorState.startPos.y - editorState.viewport.y;
             
             if (el.type === 'line' || el.type === 'arrow') {
                 // For lines, we might want to just set width and rotation, or keep it simple
                 // Simple implementation: Just change width based on x-distance for now, 
                 // or allow box-selection. Let's force height to 2 for now.
                 el.x = Math.min(startX, currentX);
                 el.y = Math.min(startY, currentY);
                 el.width = Math.abs(currentX - startX);
                 // Keep height fixed for lines to avoid box effect, unless user wants box
                 el.height = 2; 
             } else {
                 el.x = Math.min(startX, currentX);
                 el.y = Math.min(startY, currentY);
                 el.width = Math.abs(currentX - startX);
                 el.height = Math.abs(currentY - startY);
             }
             
             setActiveElements(elements);
        }
        
        renderElements();
        updatePropertiesPanel();
        updateLayersPanel();
        return;
    }

    const el = elements.find(el => el.id === editorState.selectedElementId);
    if (el) {
        const dx = mouseX - editorState.startPos.x;
        const dy = mouseY - editorState.startPos.y;

        if (editorState.mode === 'dragging') {
            el.x += dx;
            el.y += dy;
            editorState.startPos = { x: mouseX, y: mouseY };
            setActiveElements(elements);
            renderElements();
            updatePropertiesPanel();
        } 
        else if (editorState.mode === 'resizing') {
            const handle = editorState.resizeHandle;
            if (handle.includes('e')) el.width += dx;
            if (handle.includes('s')) el.height += dy;
            if (handle.includes('w')) { el.width -= dx; el.x += dx; }
            if (handle.includes('n')) { el.height -= dy; el.y += dy; }
            
            editorState.startPos = { x: mouseX, y: mouseY };
            setActiveElements(elements);
            renderElements();
            updatePropertiesPanel();
        }
    }
});

window.addEventListener('mouseup', () => {
    if (editorState.mode === 'drawing') {
        const elements = getActiveElements();
        const el = elements.find(e => e.id === editorState.selectedElementId);
        if (el && (el.width < 5 || el.height < 5)) {
            el.width = 100;
            el.height = 100;
            setActiveElements(elements);
        } else if (!editorState.selectedElementId) {
             const startX = editorState.startPos.x - editorState.viewport.x;
             const startY = editorState.startPos.y - editorState.viewport.y;
             const newEl = createElement(editorState.activeTool, startX, startY);
             elements.push(newEl);
             setActiveElements(elements);
             editorState.selectedElementId = newEl.id;
        }
        
        editorState.activeTool = 'move';
        document.querySelectorAll('.main-icon').forEach(i => i.classList.remove('bg-blue-500', 'text-white'));
        document.getElementById('move-tool-btn').querySelector('.main-icon').classList.add('bg-blue-500', 'text-white');
        
        renderElements();
        updateLayersPanel();
        updatePropertiesPanel();
    }
    
    if (editorState.mode !== 'idle') {
        saveState();
    }
    
    canvas.style.cursor = 'default';
    editorState.mode = 'idle';
    editorState.resizeHandle = null;
});

// ==========================================
// PANELS & UI LOGIC
// ==========================================

function updatePropertiesPanel() {
  const elements = getActiveElements();
  const el = elements.find(e => e.id === editorState.selectedElementId);
  if (!el) {
    document.getElementById('input-x').value = '';
    document.getElementById('input-y').value = '';
    document.getElementById('input-width').value = '';
    document.getElementById('input-height').value = '';
    document.getElementById('input-rotation').value = '';
    document.getElementById('input-color').value = '#000000';
    document.getElementById('input-color-hex').value = '';
    return;
  }

  document.getElementById('input-x').value = Math.round(el.x);
  document.getElementById('input-y').value = Math.round(el.y);
  document.getElementById('input-width').value = Math.round(el.width);
  document.getElementById('input-height').value = Math.round(el.height);
  document.getElementById('input-rotation').value = Math.round(el.rotation);
  document.getElementById('input-color').value = el.styles.backgroundColor;
  document.getElementById('input-color-hex').value = el.styles.backgroundColor;
}

function updateLayersPanel() {
  const list = document.getElementById('layers-list');
  if (!list) return;

  list.innerHTML = '';
  const elements = getActiveElements();
  const reversed = [...elements].reverse();

  reversed.forEach(el => {
    const item = document.createElement('div');
    item.className = `flex items-center gap-2 px-2 py-1 text-[11px] hover:bg-[#383838] cursor-pointer ${el.id === editorState.selectedElementId ? 'bg-[#0d99ff] text-white' : 'text-gray-300'}`;
    item.innerHTML = `
      <span class="opacity-70">${el.type === 'rectangle' ? '⬜' : 'T'}</span>
      <span>${el.type === 'text' ? (el.text || 'Text') : 'Rectangle'}</span>
    `;
    item.addEventListener('click', (e) => {
      e.stopPropagation(); 
      editorState.selectedElementId = el.id;
      renderElements();
      updatePropertiesPanel();
      updateLayersPanel();
    });
    list.appendChild(item);
  });
}

// Property Inputs Binding
function bindInput(id, prop, nested = false) {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('input', (e) => {
        if (!editorState.selectedElementId) return;
        const val = e.target.value;
        const numeric = parseFloat(val);
        const updates = {};
        if (nested) {
            updates.styles = {};
            updates.styles[prop] = val;
        } else {
            updates[prop] = isNaN(numeric) ? val : numeric;
        }
        updateElement(editorState.selectedElementId, updates);
    });
}
bindInput('input-x', 'x');
bindInput('input-y', 'y');
bindInput('input-width', 'width');
bindInput('input-height', 'height');
bindInput('input-rotation', 'rotation');
bindInput('input-color', 'backgroundColor', true);
bindInput('input-color-hex', 'backgroundColor', true);

// Delete Button
document.getElementById('delete-btn')?.addEventListener('click', () => {
    if (editorState.selectedElementId) {
        let elements = getActiveElements();
        elements = elements.filter(el => el.id !== editorState.selectedElementId);
        setActiveElements(elements);
        editorState.selectedElementId = null;
        renderElements();
        updateLayersPanel();
        updatePropertiesPanel();
        saveState();
    }
});

// Dropdown Logic
function setupDropdown(btnId, menuId) {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('[id$="-dropdown"]').forEach(d => {
            if (d.id !== menuId) d.classList.add('hidden');
        });
        menu.classList.toggle('hidden');
    });
}
setupDropdown('move-tool-btn', 'move-dropdown');
setupDropdown('frame-tool-btn', 'frame-dropdown');
setupDropdown('shape-tool-btn', 'shape-dropdown');
setupDropdown('pen-tool-btn', 'pen-dropdown');

window.addEventListener('click', (e) => {
    if (!e.target.closest('.toolbar-btn') && !e.target.closest('[id$="-dropdown"]')) {
        document.querySelectorAll('[id$="-dropdown"]').forEach(d => d.classList.add('hidden'));
    }
});

document.querySelectorAll('.tool-item, .shape-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const parentDropdown = item.closest('[id$="-dropdown"]');
        if (parentDropdown) {
             parentDropdown.querySelectorAll('.check-icon').forEach(icon => icon.style.opacity = '0');
             const check = item.querySelector('.check-icon');
             if(check) check.style.opacity = '1';
             parentDropdown.classList.add('hidden');
        }
        
        // Tool Activate
        const tool = item.dataset.tool || item.dataset.shape;
        let btnId = '';
        
        if (item.dataset.tool) {
            if(['move','hand','scale'].includes(tool)) btnId = 'move-tool-btn';
            if(['frame','section','slice'].includes(tool)) btnId = 'frame-tool-btn';
            if(['pen','pencil'].includes(tool)) btnId = 'pen-tool-btn';
        } else if (item.dataset.shape) {
            btnId = 'shape-tool-btn';
        }

        if (btnId) {
            const btn = document.getElementById(btnId);
            // Update icon
            btn.querySelector('.main-icon').innerHTML = item.querySelector('svg:not(.check-icon)').outerHTML;
            // Set active tool
            editorState.activeTool = tool; 
            // Store selected tool on button for reactivation
            btn.dataset.selectedTool = tool;

            // Visual Active State update
            document.querySelectorAll('.main-icon').forEach(i => i.classList.remove('bg-blue-500', 'text-white'));
            btn.querySelector('.main-icon').classList.add('bg-blue-500', 'text-white');
        }
    });
});

// Toolbar Buttons Active State
document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.id;
        
        // Reactivate last selected tool for this group
        if (id === 'move-tool-btn') editorState.activeTool = btn.dataset.selectedTool || 'move';
        if (id === 'frame-tool-btn') editorState.activeTool = btn.dataset.selectedTool || 'frame';
        if (id === 'shape-tool-btn') editorState.activeTool = btn.dataset.selectedTool || 'rectangle';
        if (id === 'pen-tool-btn') editorState.activeTool = btn.dataset.selectedTool || 'pen';
        if (id === 'text-tool-btn') editorState.activeTool = 'text';
        if (id === 'hand-tool-btn') editorState.activeTool = 'hand'; // Just in case
        
        document.querySelectorAll('.main-icon').forEach(i => i.classList.remove('bg-blue-500', 'text-white'));
        const activeIcon = btn.querySelector('.main-icon');
        if (activeIcon) activeIcon.classList.add('bg-blue-500', 'text-white');
    });
});


// Layer Reordering
document.getElementById('layer-up-btn')?.addEventListener('click', () => {
    if (!editorState.selectedElementId) return;
    const elements = getActiveElements();
    const idx = elements.findIndex(e => e.id === editorState.selectedElementId);
    if (idx < elements.length - 1) {
        const temp = elements[idx];
        elements[idx] = elements[idx + 1];
        elements[idx + 1] = temp;
        setActiveElements(elements);
        renderElements();
        updateLayersPanel();
        saveState();
    }
});
document.getElementById('layer-down-btn')?.addEventListener('click', () => {
    if (!editorState.selectedElementId) return;
    const elements = getActiveElements();
    const idx = elements.findIndex(e => e.id === editorState.selectedElementId);
    if (idx > 0) {
        const temp = elements[idx];
        elements[idx] = elements[idx - 1];
        elements[idx - 1] = temp;
        setActiveElements(elements);
        renderElements();
        updateLayersPanel();
        saveState();
    }
});

// Export
document.getElementById('export-json-btn')?.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(editorState.pages, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = "design.json";
    a.click();
});

document.getElementById('export-html-btn')?.addEventListener('click', () => {
    let html = `<!DOCTYPE html><html><head><style>body{margin:0;position:relative;width:100vw;height:100vh;overflow:hidden;}</style></head><body>`;
    const elements = getActiveElements();
    elements.forEach(el => {
        let style = `position:absolute;left:${el.x}px;top:${el.y}px;width:${el.width}px;height:${el.height}px;background-color:${el.styles.backgroundColor};transform:rotate(${el.rotation}deg);z-index:${el.zIndex};`;
        html += `<div style="${style}">${el.type === 'text' ? el.text : ''}</div>`;
    });
    html += `</body></html>`;
    const blob = new Blob([html], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'design.html';
    a.click();
});

// Keyboard Deletion
window.addEventListener('keydown', (e) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
        if (editorState.selectedElementId) {
            let elements = getActiveElements();
            elements = elements.filter(el => el.id !== editorState.selectedElementId);
            setActiveElements(elements);
            editorState.selectedElementId = null;
            renderElements();
            updateLayersPanel();
            updatePropertiesPanel();
            saveState();
        }
    }
});

// Init
loadState();
updatePagesPanel();
updateLayersPanel();
renderElements();

const ro = new ResizeObserver(entries => {
    for (let entry of entries) {
        editorState.canvas.width = entry.contentRect.width;
        editorState.canvas.height = entry.contentRect.height;
    }
});
ro.observe(canvas);
