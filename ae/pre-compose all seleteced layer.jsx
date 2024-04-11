{
    var comp = app.project.activeItem;
    if (comp != null && (comp instanceof CompItem)) {
        if (comp.selectedLayers.length > 0) {
            var selectedLayers = comp.selectedLayers;

            // Create a progress window
            var progressWindow = new Window("palette", "Precomposing Layers", undefined);
            progressWindow.bar = progressWindow.add("progressbar", undefined, 0, selectedLayers.length);
            progressWindow.bar.preferredSize.width = 300;
            progressWindow.show();

            for (var i = 0; i < selectedLayers.length; i++) {
                var layerIndex = [selectedLayers[i].index];
                comp.layers.precompose(layerIndex, selectedLayers[i].name, true);

                // Update the progress bar
                progressWindow.bar.value = i + 1;
                progressWindow.update();
            }

            progressWindow.close();
        } else {
            alert("No layers are selected for precomposing.");
        }
    } else {
        alert("Please select a composition.");
    }
}