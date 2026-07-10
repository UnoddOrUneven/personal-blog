import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
export default function LoginForm() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const validate = () => {
    if (!name) return 'Name is required';
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');
    console.log('Logging in with', {name, password});
    const response = await fetch("api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, password })
    }
    )
    if (await response.status === 200) {  
      console.log("Login successful");
      navigate('/admin');
    }
    else{
      setError("Wrong password or username");
    }
  };

  return (
    <div style={{maxWidth: 420, margin: '40px auto', padding: 20}}>
      <h2 style={{marginTop:0}}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:12}}>
          <label style={{display:'block', marginBottom:6}}>Name</label>
          <input
            type="name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{width:'100%', padding:8, boxSizing:'border-box'}}
          />
        </div>
        <div style={{marginBottom:12}}>
          <label style={{display:'block', marginBottom:6}}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{width:'100%', padding:8, boxSizing:'border-box'}}
          />
        </div>
        {error &&   <div style={{color:'crimson', marginBottom:12}}>{error}</div>}
        <button type="submit" style={{background:'transparent', border:' solid black', cursor:'pointer', padding:'8px 16px'}}>Sign in</button>
      </form>
    </div>
  );
}
