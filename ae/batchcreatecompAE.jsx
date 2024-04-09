// Check if there are selected items
if (app.project.selection.length === 0) {
    alert("Please select one or more media files in the project panel.");
} else {
    var delay = 100; // Delay in milliseconds (0.1 second)

    // Create an array to store the selected media items
    var selectedMedia = [];
    
    // Loop through the selected items and filter out media items
    for (var i = 0; i < app.project.selection.length; i++) {
        var selectedItem = app.project.selection[i];
        
        // Check if the selected item is a FootageItem (media file)
        if (selectedItem instanceof FootageItem) {
            selectedMedia.push(selectedItem);
        }
    }

    // Loop through the filtered media items
    for (var j = 0; j < selectedMedia.length; j++) {
        var selectedFootage = selectedMedia[j];

        // Get the width and height of the selected media
        var width = selectedFootage.width;
        var height = selectedFootage.height;

        // Remove the file extension from the composition name
        var compName = removeExtension(selectedFootage.name); // Function to remove extension

        // Create a new composition with the same size
        var newComp = app.project.items.addComp(compName, width, height, selectedFootage.pixelAspect, selectedFootage.duration, selectedFootage.frameRate);

        // Add the selected media to the composition
        var footageLayer = newComp.layers.add(selectedFootage);
        footageLayer.startTime = 0;

        // You can add more customization or manipulations here as needed

        // Deselect the media item
        selectedFootage.selected = false;

        // Add a delay before processing the next media item
        if (j < selectedMedia.length - 1) {
            $.sleep(delay);
        }
    }
}

// Function to remove file extension
function removeExtension(filename) {
    return filename.replace(/\.[^.]*$/, "");
}