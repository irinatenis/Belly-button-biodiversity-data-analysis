
// Fetch the JSON data, console log it, and call initMyPage1 function for creating a gauge chart
d3.json(url).then(function (importedData) {
  console.log (importedData);
  initMyPage1(importedData)
})
//Define the function for creating a gauge chart
function initMyPage1(data) {
    //Declare a variable for the initial gauge chart value
    let gaugeInfo=data.metadata[0]["wfreq"]
    //Code for the gauge chart
    var traceData3 = [
        {
        domain: { x: [0,1], y: [0,1] },
        value: gaugeInfo,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week</br>"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [0, 9] },
            steps: [
            { range: [0, 1], color: "rgb(248,243,236)" },
            { range: [1,2], color: "rgb(244,241,228)" },
            { range: [2,3], color: "rgb(233,231,201)" },
            { range: [3,4], color: "rgb(229,232,176)" },
            { range: [4,5], color: "rgb(213,229,153)" },
            { range: [5,6], color: "rgb(183,205,143)" },
            { range: [6,7], color: "rgb(139,192,134)" },
            { range: [7,8], color: "rgb(137,188,141)" },
            { range: [8,9], color: "rgb(132,181,137)" }
            ],
            // 
        }
        
        }
    ];
    var layout3 = {
        width: 400, 
        height: 300
    };
     // Render the plot to the div tag with id "gauge"
    Plotly.newPlot("gauge", traceData3, layout3);
}