import { fetchOrderData } from '../utils/api.js';
import { renderStackedBarChart } from './StackedBarChart.js'; 


async function renderDashboard() {
    try {

        const data = await fetchOrderData();

        
        //console.log('fetch dat [0]', data);
        const totalRevenue = data.reduce((sum, order) => sum + order.total, 0);
        const totalRevenueContainer = document.getElementById('total-revenue');
        totalRevenueContainer.textContent = `Total Revenue: $${totalRevenue.toFixed(2)}`;

        const pieChartContainer = document.getElementById('PieChart');


//const colorData = {};
data.forEach(order => {
  const color = order.list[0].color.name; 
  const qty = order.list.reduce((totalQty, item) => totalQty + item.qty, 0); // 数量总和

  if (data[color]) {
    data[color] += qty;
  } else {
    data[color] = qty;
  }
});


const pieChartData = {
  labels: Object.keys(data), //color name as label
  values: Object.values(data), //value
  type: 'pie',
  marker: {
    colors: Object.keys(data), 
  },
};


Plotly.newPlot(pieChartContainer, [pieChartData]);


/* histogram */
const productPrices = [];
data.forEach(order => {
    order.list.forEach(item => {
        productPrices.push(item.price);
    });
});


const histogramData = {
    x: productPrices,
    type: 'histogram',
    xbins: {
        start: Math.min(...productPrices),
        end: Math.max(...productPrices),
        size: 100, 
    },
};


const layout = {
    title: 'Product Price Histogram',
    xaxis: { title: 'Price Range' },
    yaxis: { title: 'Quantity' },
};


const histogramContainer = document.getElementById('Histogram');
Plotly.newPlot(histogramContainer, [histogramData], layout);


renderStackedBarChart(data);


        console.log('Received data:', data[0]);
    } catch (error) {
        console.error('Error fetching order data:', error);
    }
}

renderDashboard();



