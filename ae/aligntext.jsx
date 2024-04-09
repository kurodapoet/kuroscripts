var comp = app.project.activeItem;
if (comp != null && (comp instanceof CompItem)) {
    var textLayer = comp.selectedLayers[0]; // Assumes the text layer is selected

    // Add the "Separate XYZ Position" effect to the text layer
    var effect = textLayer.property("Effects").addProperty("Separate XYZ Position");

    // Add expressions to the Position and Anchor Point properties
    textLayer.property("Position").expression = 'value + [effect("Separate XYZ Position")("X Position"), effect("Separate XYZ Position")("Y Position"), effect("Separate XYZ Position")("Z Position")]';
    textLayer.property("Anchor Point").expression = 's=sourceRectAtTime();[0,s.top-45+s.height/2]+value';

    // Align the text layer to the center vertically
    textLayer.property("Position").setValue([comp.width/2, comp.height/2]);
} else {
    alert("Please select a composition and a text layer.");
}
