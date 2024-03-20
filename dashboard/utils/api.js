
export async function fetchOrderData() {
    //const apiUrl = process.env.API;
    const response = await fetch('http://localhost:3000/api/1.0/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  //process.env.API_URL ||
  //   const apiUrl = 'https://18.235.176.70/api/1.0/data';
  // 'http://localhost:3000/api/1.0/data'