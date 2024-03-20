import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/admin', express.static(path.join(__dirname, './admin')));
app.use('/utils', express.static(path.join(__dirname, './utils')));

app.get('/data', async (req, res) => {
  try {
   
    const response = await fetch('http://35.75.145.100:1234/api/1.0/order/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched order data:', data);

    res.json(data);
  } catch (error) {
    console.error('Error fetching order data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

