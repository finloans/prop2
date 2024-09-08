// Add event listeners for real-time feedback on size input
document.getElementById('size').addEventListener('input', function() {
    var size = document.getElementById('size').value;
    var feedback = document.getElementById('feedback');
    console.log('Size input:', size);
    if (size < 300) {
        feedback.innerText = "Warning: Property size is quite small. Consider reevaluating.";
    } else if (size > 5000) {
        feedback.innerText = "Notice: Property size is quite large. Ensure market values reflect this.";
    } else {
        feedback.innerText = "";
    }
});

// Add event listener for the Calculate button
document.getElementById('calculateButton').addEventListener('click', calculateValue);

function calculateValue() {
    console.log('Calculate button clicked');
    
    // Get the values from the input fields
    var state = document.getElementById('state').value;
    var benchmark = parseFloat(document.getElementById('benchmark').value);
    var marketPrice = parseFloat(document.getElementById('marketPrice').value);
    var location = document.getElementById('location').value;
    var propertyType = document.getElementById('propertyType').value;
    var size = parseFloat(document.getElementById('size').value);
    var age = parseInt(document.getElementById('age').value);

    // Log inputs for debugging
    console.log('State:', state);
    console.log('Benchmark:', benchmark);
    console.log('Market Price:', marketPrice);
    console.log('Location:', location);
    console.log('Property Type:', propertyType);
    console.log('Size:', size);
    console.log('Age:', age);

    // Validate if required fields are filled
    if (isNaN(benchmark) || isNaN(marketPrice) || isNaN(size)) {
        document.getElementById('result').innerText = "Please fill in all the required fields.";
        console.log('Missing fields');
        return;
    }

    // Use the higher value between benchmark and market price per square foot
    var pricePerSqFt = Math.max(benchmark, marketPrice);
    console.log('Price per sq. ft.:', pricePerSqFt);

    // Base value calculation using property size and price per square foot
    var baseValue = size * pricePerSqFt;
    console.log('Base Value:', baseValue);

    // Adjust base value based on the location
    var locationFactor = 1;
    if (location === 'urban') {
        locationFactor = 1.5; // Urban increases value by 50%
    } else if (location === 'suburban') {
        locationFactor = 1.2; // Suburban increases value by 20%
    } else {
        locationFactor = 0.8; // Rural decreases value by 20%
    }
    baseValue *= locationFactor;
    console.log('Location Factor:', locationFactor, 'Adjusted Base Value:', baseValue);

    // Adjust base value based on property type
    if (propertyType === 'commercial') {
        baseValue *= 1.3; // Increase value by 30% for commercial properties
        console.log('Commercial Property Adjustment:', baseValue);
    }

    // Decrease value for older properties
    if (age > 10) {
        baseValue *= 0.8; // Decrease value by 20% for properties older than 10 years
        console.log('Age Adjustment:', baseValue);
    }

    // Display the result with a breakdown of the calculation
    var resultText = "Estimated Property Value in " + state + ": ₹" + baseValue.toFixed(2) + "\n\n";
    resultText += "Breakdown:\n";
    resultText += "- Base Value: ₹" + (size * pricePerSqFt).toFixed(2) + " (Size: " + size + " sq. ft.)\n";
    resultText += "- Location Factor: " + locationFactor + " (Location: " + location + ")\n";
    if (propertyType === 'commercial') {
        resultText += "- Commercial Adjustment: +30%\n";
    }
    if (age > 10) {
        resultText += "- Age Adjustment: -20% for properties older than 10 years\n";
    }

    // Output the result in the result div
    document.getElementById('result').innerText = resultText;
    console.log('Final Result:', resultText);
}



