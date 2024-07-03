import axios from 'axios';

export async function login(username, password) {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        name: username,
        password: password,
        
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