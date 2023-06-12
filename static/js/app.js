const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
// Fetch the JSON data, console log it, and call initMyPage function
d3.json(url).then(function (importedData) {
  console.log (importedData);
  initMyPage(importedData)
})
//Declare a variable to be able to use the data outside of the initMyPage function
let globalData = []
//Define initMyPage function
function initMyPage(data) {
    globalData = data
//Declare variables for the initial dashboard values
    let otu_ids=data.samples[0]["otu_ids"];
    let values=data.samples[0]["sample_values"]
    let toolTip=data.samples[0]["otu_labels"]
    let metadata=data.metadata[0]
//Code for a bar chart
    let traceData = [{y:otu_ids.slice(0,10).reverse().map(row=>"OTU "+row),
      x:values.slice(0,10).reverse(),
      type:"bar",
      text: toolTip.slice(0,10).reverse(),
      orientation:'h'
    }];
    // Apply a title to the layout
      let layout = {
        title:{ 
        text: "Ten Top OTUs",
        font: {
          size: 20
        }
      }
    };
    // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bar",traceData, layout);
//Select the dropdown with id "selDataset"
      var select = document.getElementById("selDataset");
      //Loop through the data to get ids for the dropdown
      for(var i = 0; i < data.samples.length; i++) {
        var id = data.samples[i]["id"];
        //Create option elements for Select element
        var option = document.createElement("option");
        //Set text content for the option
        option.textContent = id;
        //Set value property for the option
        option.value = i;
        //Append option to the select element
        select.append(option);
    }
  //Code for a bubble chart
    let traceData2 = [{x:otu_ids,
      y:values,
      mode:"markers",
      text: toolTip,
      marker: {
        size:values,
        color: otu_ids,
        colorscale: 'YlGnBu',
        sizeref: 0.03,
        sizemode: 'area'
       
      }}];
    // Apply a title to the layout
    let layout2 = {
        font: {
          family: 'Calibri, monospace',
          size: 16
        },
      xaxis: {
        title: {
          text: 'OTU ID',
          font: {
            family: 'Calibri, monospace',
            size: 14
          }
        },
      },
    };
    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble",traceData2, layout2);

    //Code for displaying metadata
    info.innerHTML = `id: ${metadata.id} </br> ethnicity: ${metadata.ethnicity} </br> gender: ${metadata.gender} </br> age: ${metadata.age} \
    </br> location: ${metadata.location} </br> bbtype: ${metadata.bbtype} </br> wfreq: ${metadata.wfreq}`;
    }
//Grab sample-metadata id to initilize and change the metadata     
let info = document.getElementById("sample-metadata");
//Define a function that gets called on event "change" for dropdown
function optionChanged(value){
  let values=globalData.samples[value]["sample_values"]
  let otu_ids=globalData.samples[value]["otu_ids"]
  let metadata = globalData.metadata[value]
  let gaugeInfo = globalData.metadata[value]["wfreq"]
  //Set x and y to the new values for the charts
  x = values;
  y = otu_ids.map(row=>"OTU "+row);
  // Restyle the charts and change metadata
  Plotly.restyle("bar", "x", [values.slice(0,10).reverse()]);
  Plotly.restyle("bar", "y", [otu_ids.map(row=>"OTU "+row).slice(0,10).reverse()]);
  Plotly.restyle("bubble", "x",[otu_ids]);
  Plotly.restyle("bubble", "y", [values]);
  Plotly.restyle("gauge", "value", [gaugeInfo]);
  //Assign the values to the metadata that get displayed on event "change"
  info.innerHTML = `id: ${metadata.id} </br> ethnicity: ${metadata.ethnicity} </br> gender: ${metadata.gender} </br> age: ${metadata.age} \
 </br> location: ${metadata.location} </br> bbtype: ${metadata.bbtype} </br> wfreq: ${metadata.wfreq}`;
}


























// function D (data) {
//   let otu_ids=data.samples[0]["otu_ids"];
//   let values=data.samples[0]["sample_values"].reverse();
//   let toolTip=data.samples[0]["otu_labels"].reverse();

//   let traceData = [{y:otu_ids.map(row=>"OTU "+row),
//   x:values,
//   type:"bar",
//   orientation:'h'
// }];
// // Apply a title to the layout
//   let layout = {title: "Top OTUs"};
// // Render the plot to the div tag with id "plot"
//   Plotly.newPlot("bar",traceData, layout);

//   var select = document.getElementById("selDataset");
//   for(var i = 0; i < input_data.samples.length; i++) {
//     var id = input_data.samples[i]["id"];
//     var option = document.createElement("option");
//     option.textContent = id;
//     option.value = i;
//     select.append(option);
// }
// let traceData2 = [{x:otu_ids,
//   y:values,
//   mode:"markers",
//   marker: {
//     size:values,
//     color: otu_ids,
//     // color: [35, 10, 50, 40, 18, 30],
//     colorscale: 'YlGnBu',
//     sizemode: 'area'
//   }}];
// // Apply a title to the layout
// let layout2 = {
//   title: {
//     text:'Bubble Chart',
//     font: {
//       family: 'Courier New, monospace',
//       size: 24
//     },
//   },
//   xaxis: {
//     title: {
//       text: 'otu_ids',
//       font: {
//         family: 'Courier New, monospace',
//         size: 18,
//         color: '#7f7f7f'
//       }
//     },
//   },
// };
// // Render the plot to the div tag with id "plot"
// Plotly.newPlot("bubble",traceData2, layout2);
// // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   let dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   let dataset = dropdownMenu.property("value");
// }
// let values=input_data.samples[dataset]["sample_values"].reverse()
// let otu_ids=input_data.samples[dataset]["otu_ids"].reverse()
// let toolTip=input_data.samples[dataset]["otu_labels"].reverse()

// x = values;
// y = otu_ids.map(row=>"OTU "+row);
// // Note the extra brackets around 'x' and 'y'
// Plotly.restyle("bar", "x", [x]);
// Plotly.restyle("bar", "y", [y]);
// Plotly.restyle("bubble", "x", [otu_ids]);
// Plotly.restyle("bubble", "y", [values]);
// }
// init();
// }

// //   let sData=data.sort(function compareFunction(a, b) {
// //     // resulting order is (3, 2, 1)
// //     return b.samples.otu_ids - a.samples.otu_ids;
// //   });
// // console.log(sData);