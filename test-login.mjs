// Test admin login
const response = await fetch('http://localhost:5000/api/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123'
  })
});

console.log('Status:', response.status);
const data = await response.json();
console.log('Response:', data);
