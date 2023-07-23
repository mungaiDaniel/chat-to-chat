import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'
import './payrol.css'

const Payrol = () => {
    const [user_role, setUserId] = useState('premium'); // Default to mobile money
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [premum, setPremim] = useState(false)

    const handlePaymentMethodChange = (event) => {
        setUserId(event.target.value);
      };

    const user_id = window.localStorage.getItem('id')

    const handlePayment = async () =>{
        setLoading(true);
        setError('')

        const response = await axios.put(`https://chat-fs55.onrender.com/api/v1/premium`, { user_role },
        {
            headers:
              {
                  Authorization : `Bearer ${localStorage.getItem("token")}`
              }
          }
        )
        .then((res) =>{
          console.log(res)
          localStorage.setItem("user_role", res.data.data.user_role)
            alert("successfully upgraded to premium")
            setPremim(true)
            
            setLoading(false)

        }).catch((err) =>{
            console.log(err)
        })
        

    }


  return (
    <> 
      <div className='container payrol'>
      <h2 className='h2'>Upgrade User Role</h2>
      <p>Select Payment Method:</p>
      <label className='checklable'>
        <input
          type="radio"
          value="premium"
          checked={user_role === 'premum'}
          onChange={() => setUserId('premium')}
        />
        Mobile Money
      </label>
      <label className='checklable'>
        <input
          type="radio"
          value="premium"
          checked={user_role === 'premium'}
          onChange={() => setUserId('premium')}
        />
        Mock Payment
        </label>
      <br />
      {error && <p>{error}</p>}
      <button className='btn' onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Upgrade Now'}
      </button>
      </div>
    </>
  )
}

export default Payrol