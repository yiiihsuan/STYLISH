import { fetchOrderData } from '../utils/api.js';

export async function renderStackedBarChart() {
    try {
     
        const data = await fetchOrderData();
        console.log('Received data:', data);


        const productSales = {};
        data.forEach(order => {
            order.list.forEach(item => {
                const productId = item.id;
                const size = item.size;
                const qty = item.qty;

               
                if (!productSales[productId]) {
                    productSales[productId] = {
                        'S': 0,
                        'M': 0,
                        'L': 0,
                    };
                }

                
                productSales[productId][size] += qty;
            });
        });

  
        const sortedProducts = Object.keys(productSales).sort((a, b) => {
            const totalA = Object.values(productSales[a]).reduce((acc, val) => acc + val, 0);
            const totalB = Object.values(productSales[b]).reduce((acc, val) => acc + val, 0);
            return totalB - totalA;
        }).slice(0, 5);

 
        const stackedBarChartData = sortedProducts.map(productId => {
            const sizes = ['S', 'M', 'L'];
            const quantities = sizes.map(size => productSales[productId][size]);
            
            return {
                x: sizes,
                y: quantities,
                name: `Product ${productId}`,
                type: 'bar',
            };
        });

       
        const layout = {
            title: 'Top 5 Sold Products by Size',
            xaxis: { title: 'Size' },
            yaxis: { title: 'Quantity' },
            barmode: 'stack', 
        };


        const stackedBarChartContainer = document.getElementById('StackedBarChart');

        Plotly.newPlot(stackedBarChartContainer, stackedBarChartData, layout);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

renderStackedBarChart();
