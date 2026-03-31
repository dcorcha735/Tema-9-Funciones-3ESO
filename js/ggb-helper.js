
function createApplet(containerId, onLoad, extra = {}) {
  const params = Object.assign({
    id: containerId + "_applet",
    appName: "graphing",
    width: extra.width || 920,
    height: extra.height || 460,
    showToolBar: false,
    showAlgebraInput: false,
    showMenuBar: false,
    showZoomButtons: true,
    showResetIcon: true,
    enableShiftDragZoom: true,
    enableLabelDrags: false,
    useBrowserForJS: true,
    language: "es",
    appletOnLoad: onLoad
  }, extra);
  const applet = new GGBApplet(params, true);
  window.addEventListener("load", () => applet.inject(containerId));
  return applet;
}
function setAxes(api, xmin, xmax, ymin, ymax) {
  api.setCoordSystem(xmin, xmax, ymin, ymax);
  try { api.setAxesVisible(true, true); } catch(e) {}
  try { api.setGridVisible(true); } catch(e) {}
}
function hideLabels(api, objects){ objects.forEach(name => { try { api.setLabelVisible(name, false); } catch(e) {} }); }
function stylePoint(api, name, r, g, b, size = 5){ try { api.setColor(name, r, g, b); api.setPointStyle(name, 0); api.setPointSize(name, size); } catch(e) {} }
function styleLine(api, name, r, g, b, thickness = 5, style = 0){ try { api.setColor(name, r, g, b); api.setLineThickness(name, thickness); api.setLineStyle(name, style); } catch(e) {} }
function bindRange(inputId, outputId, callback, digits = 1){
  const input = document.getElementById(inputId); const output = document.getElementById(outputId);
  const render = () => { const value = Number(input.value); if (output) output.textContent = Number.isInteger(value) ? value : value.toFixed(digits); callback(value); };
  input.addEventListener("input", render); render();
}
function safeEval(api, commands){ commands.forEach(cmd => { try { api.evalCommand(cmd); } catch(e) { console.log('GeoGebra command error', cmd, e); } }); }
function safeSetNumeric(api, name, value){ try { api.setValue(name, Number(value)); } catch(e) { try { api.evalCommand(name + '=' + Number(value)); } catch(err) {} } }
function rerenderMath(){ if (window.MathJax && window.MathJax.typesetPromise) { MathJax.typesetPromise(); } }

function showLabels(api, objects){ objects.forEach(name => { try { api.setLabelVisible(name, true); } catch(e) {} }); }
