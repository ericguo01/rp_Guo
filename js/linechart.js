/*
    This script file will demonstrate how to create a scatter plot.
*/

async function getData() {
    const response = await fetch('data/planaria_data.csv');
    const data = await response.text();
    // console.log(data);

    const xDay = []; //x-axis labels = years
    const y1 = []; //y-axis labels = global temperatures
    const y2 = []; //y-axis labels = northern hemisphere temperatures
    const y3 = []; //y-axis labels = southern hemisphere temperatures
    const y4 = []; //y-axis labels = southern hemisphere temperatures
    const y5 = []; //y-axis labels = southern hemisphere temperatures


    // \n new line character
    // spint('\n') will seperate the table into an array of individual rows
    // slice(start, end) - return a new array starting at index 'start' up to but not including 'end'
    const table = data.split('\n').slice(1);
    //console.log(table);
    table.forEach(row => {
        const columns = row.split(',');
        const day = columns[0].trim();
        xDay.push(day);

        const y1Length = parseFloat(columns[1]);
        y1.push(y1Length);

        const y2Length = parseFloat(columns[2]);
        y2.push(y2Length);

        const y3Length = parseFloat(columns[3]);
        y3.push(y3Length);

        const y4Length = parseFloat(columns[4]);
        y4.push(y4Length);

        const y5Length = parseFloat(columns[5]);
        y5.push(y5Length);

        console.log(day, y1Length, y2Length, y3Length, y4Length, y5Length);
    });
    return { xDay, y1, y2, y3, y4, y5 }
}

async function createChart() {
    const data = await getData();
    const lineChart = document.getElementById('lineChart');     // Get the html element that will hold the chart
    const degreeSymbol = String.fromCharCode(176);  // degree symbol for chart title

    const myChart = new Chart(lineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xDay,        // x-axis labels
            datasets: [
                {
                    label: `Planaria Length Under 0.000% w/v Theobromine`,     // Dataset label for legend
                    data: data.y1,    // Reference to array of y-values
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(255, 0, 132, 0.2)',    // Color for data marker
                    borderColor: 'rgba(255, 0, 132, 1)',      // Color for data marker border
                    borderWidth: 1   // Data marker border width
                },
                {
                    label: `Planaria Length Under 0.111% w/v Theobromine`,     // Dataset label for legend
                    data: data.y2,    // Reference to array of y-values
                    fill: -1,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(38, 23, 167, 0.2)',    // Color for data marker
                    borderColor: 'rgba(38, 23, 167, 1)',      // Color for data marker border
                    borderWidth: 1,  // Data marker border width
                    tension: 0.4
                },
                {
                    label: `Planaria Length Under 0.222% w/v Theobromine`,     // Dataset label for legend
                    data: data.y3,    // Reference to array of y-values
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(0, 153, 51, 0.2)',    // Color for data marker
                    borderColor: 'rgba(0, 153, 51, 1)',      // Color for data marker border
                    borderWidth: 1,  // Data marker border width
                    tension: 0.4
                },
                {
                    label: `Planaria Length Under 0.333% w/v Theobromine`,     // Dataset label for legend
                    data: data.y4,    // Reference to array of y-values
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(226, 134, 42, 0.2)',    // Color for data marker
                    borderColor: 'rgb(231, 167, 18)',      // Color for data marker border
                    borderWidth: 1,  // Data marker border width
                    tension: 0.4
                },
                {
                    label: `Planaria Length Under 0.444% w/v Theobromine`,     // Dataset label for legend
                    data: data.y5,    // Reference to array of y-values
                    fill: false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor: 'rgba(34, 78, 167, 0.2)',    // Color for data marker
                    borderColor: 'rgb(30, 146, 200)',      // Color for data marker border
                    borderWidth: 1,  // Data marker border width
                    tension: 0.4
                },
            ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Day',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {
                        callback: function (value) {
                            const day = this.getLabelForValue(value);
                            return ['12/3', '12/4', '12/8', '12/10', '12/15', '12/16', '12/17'].includes(day) ? day : '';
                        },
                        font: {
                            size: 14
                        },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,
                        text: 'Planaria Length (mm)',     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        maxTicksLimit: data.y1.length,        // Actual value can be set dynamically
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Planaria Length vs. Day Under Different Concentrations of Theobromine',     // Chart title
                    font: {
                        size: 24,
                    },
                    color: '#000000',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: true,
                    align: 'start',
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

createChart();