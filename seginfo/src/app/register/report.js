import axios from 'axios';

export async function createReport(title, value, description) {
    try {

      console.log('title:', title);
      console.log('value:', value);
      console.log('description:', description);
      const response = await axios.post('http://localhost:8000/reports/create', {
        title: title,
        value: value,
        description: description,
      }, { 
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true 
      });
      
      return response;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }