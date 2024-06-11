import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), 
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

            
            setRegistrationSuccess(true);
            setTimeout(() => {
              navigate('/login');
            }, 2000); 
          } catch (error) {
            console.error('Registration error:', error.message);
          }
        };
      

        return (
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleRegister}>
              {/* Registration success message */}
              {registrationSuccess && (
                <div className="bg-green-200 text-green-800 rounded p-2 mb-4">
                  Registration successful! Redirecting to login page...
                </div>
              )}
      
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Register
              </button>
            </form>
          </div>
        );
      };
      
      export default Register;