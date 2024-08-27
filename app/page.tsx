'use client'

import { createCustomer, updateCustomer } from '@/lib/customer/actions';
import { createOrder } from '@/lib/order/actions';

export default async function LoginPage() {
    
    return (
    <main className=''>
      <div className='text-red-500'>
        <button onClick={() => { createCustomer(1,1,1) }}>Create Customer</button>
      </div>
      <div className='text-red-500'>
        <button onClick={() => { updateCustomer(1,'PAID') }}>Update Customer</button>
      </div>
      <div className='text-blue-500'>
        <button onClick={() => { createOrder(1,1,1) }}>Create Order</button>
      </div>
    </main>
    )
}
