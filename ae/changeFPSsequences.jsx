// Prompt the user for the new frame rate
var newFrameRate = parseFloat(prompt("Enter the new frame rate (e.g., 24, 30, 60, etc.):"));

if (!isNaN(newFrameRate)) {
  // Get the selected items in the project
  var selectedItems = app.project.selection;
  
  if (selectedItems.length > 0) {
    for (var i = 0; i < selectedItems.length; i++) {
      if (selectedItems[i] instanceof FootageItem) {
        var selectedFootage = selectedItems[i];
        
        // Set the new frame rate
        selectedFootage.mainSource.conformFrameRate = newFrameRate;
        
        // Reload the footage to apply the new frame rate
        selectedFootage.mainSource.reload();
      }
    }
    
    alert("Frame rate changed to " + newFrameRate + " frames per second for selected footage items.");
  } else {
    alert("Please select one or more footage items in your project.");
  }
} else {
  alert("Invalid frame rate. Please enter a valid number.");
}