// Sort the data by Greek search results descending
console.log(input_data);
// let sData=input_data.sort(function compareFunction(a, b) {
//     // resulting order is (3, 2, 1)
//     return b.sample_values - a.sample_values;
//   });
// console.log(sData);
let values=input_data.samples[0]["sample_values"].reverse()
let otu_ids=input_data.samples[0]["otu_ids"].reverse()
let toolTip=input_data.samples[0]["otu_labels"].reverse()



// // data.sort((a, b) => b.greekSearchResults - a.greekSearchResults);
// // console.log(data);

// // Slice the first 10 objects for plotting
// let ten = sData.slice(0,10);
// console.log(ten);
// // Reverse the array to accommodate Plotly's defaults
// ten.reverse();
// console.log(ten);

// // Trace for the Greek Data
// let trace1 = {y:labels.map(row=>row.greekName),
//     x:ten.map(row=>row.greekSearchResults),
//     type:"bar",
//     orientation:'h'};

let trace1 = {y:otu_ids.map(row=>"OTU "+row),
  x:values,
  type:"bar",
  orientation:'h'};


// // Data array
let traceData =[trace1];

// // Apply a title to the layout

let layout = {title: "Top OTUs"};
// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot",traceData, layout);

//Bubble chart
let trace2 = {y:otu_ids,
  x:values,

  mode:"markers",
  marker: {
    size:values,
    color: otu_ids,
    // color: [35, 10, 50, 40, 18, 30],
    colorscale: 'YlGnBu',
    sizemode: 'area'
  }
  };
   // Data array
let traceData2 =[trace2];
// Apply a title to the layout
let layout2 = {
  title: {
    text:'Bubble Chart',
    font: {
      family: 'Courier New, monospace',
      size: 24
    },
  },
  xaxis: {
    title: {
      text: 'otu_ids',
      font: {
        family: 'Courier New, monospace',
        size: 18,
        color: '#7f7f7f'
      }
    },
  },
};
// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot",traceData2, layout2);

//Demographic information
let demInfo=input_data.metadata[0]
console.log(demInfo);