// 代码生成时间: 2025-08-27 20:13:36
 * interactive_chart_generator.js
 * A Node.js program that acts as an interactive chart generator.
 *
 * Features:
 * - Clear code structure
 * - Error handling
 * - Comments and documentation
 * - JS best practices
 * - Maintainability and extensibility
 */

const readline = require('readline');
const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const Chart = require('chart.js/auto');

// Initialize a ChartJS node canvas instance
const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width: 512,
  height: 512,
  beforeDraw: () => {
    console.log('Drawing chart...');
  }
});

// Function to create a bar chart
const createBarChart = async (data) => {
  const ctx = await chartJSNodeCanvas.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: data.datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Save the chart as a PNG file
  const stream = await chartJSNodeCanvas.renderToStream(chart);
  stream.pipe(fs.createWriteStream('bar_chart.png'));
  console.log('Bar chart saved as bar_chart.png');
};

// Function to collect user input for chart data
const collectChartData = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Ask for labels and dataset values
  const askQuestion = (question, callback) => {
    rl.question(question, (answer) => {
      callback(answer);
    });
  };

  askQuestion('Enter labels for your chart, separated by commas: ', (labels) => {
    const dataset = {
      label: 'Dataset',
      data: [],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1
    };

    labels = labels.split(',').map((label) => label.trim());
    dataset.data = new Array(labels.length).fill(0);

    // Ask for values for each label
    labels.forEach((label, index) => {
      askQuestion(`Enter value for ${label}: `, (value) => {
        dataset.data[index] = parseInt(value, 10) || 0;
        if (labels.indexOf(label) === labels.length - 1) {
          // All data collected, create the chart
          createBarChart({ labels, datasets: [dataset] });
          rl.close();
        }
      });
    });
  });
};

// Start the chart data collection process
collectChartData();