import axios from 'axios';

export async function register(username, email, type, password) {
    try {

      console.log('username:', username);
      console.log('email:', email);
      console.log('type:', type);
      console.log('password:', password);
      const response = await axios.post('http://localhost:8000/register', {
        name: username,
        email: email,
        password: password,
        type: type,
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