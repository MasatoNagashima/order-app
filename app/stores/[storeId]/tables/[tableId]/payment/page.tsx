'use client'
import { Footer } from '@/components/layouts/footer';
import { Header } from '@/components/layouts/header';
import OrderItemCard from '@/components/layouts/order-item-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/layouts/tab';
import { BigButton } from '@/components/uiParts/big-button';
import { getCustomerStatus, updateCustomer } from '@/lib/customer/actions';
import { getCompletedOrders } from '@/lib/order/actions';
import { getStore } from '@/lib/store/actions'
import { OrderItem } from '@/lib/util/constants';
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';

export default function CartPage() {
    const {storeId, tableId} = useParams<{ storeId: string; tableId: string }>();
    const router = useRouter();

    const [storeName, setStoreName] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    let customerIdRef = useRef(0)
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [customerNumber, setCustomerNumber] = useState(1);
    const [selectedTab, setSelectedTab] = useState('CHECK_OUT');

    // 店名取得
    useEffect(() => {
        const fetchStoreNameAndTableAvailability = async () => {
            const initialStoreName = await getStore(Number(storeId));
            setStoreName(initialStoreName);
            const { customerId, customerNumber, paymentStatus} = await getCustomerStatus(Number(storeId), Number(tableId));
            if (customerId == null || customerNumber == null || paymentStatus == null) {
              router.push(`/stores/${storeId}/tables/${tableId}/login`)
            } else{
              customerIdRef.current = customerId;
              setPaymentStatus(paymentStatus);
              const initialOrderItems = await getCompletedOrders(customerId);
              const initialTotalAmount = initialOrderItems.reduce((sum, order) => {
                return sum + (Number(order.menuItemNumber) * Number(order.price));
              }, 0);
              setOrderItems(initialOrderItems);
              setCustomerNumber(customerNumber);
              setTotalAmount(initialTotalAmount);
            }
        };   
        fetchStoreNameAndTableAvailability();
    }, []);

    const handleCheckOutOrder = async() => {
      await updateCustomer(customerIdRef.current, 'PROCESSING');
      setPaymentStatus('PROCESSING');
    }

    const handleCompleteOrder = async() => {
      await updateCustomer(customerIdRef.current, 'COMPLETED');
      router.push(`/stores/${storeId}/tables/${tableId}/login`);
    }

    return (
    <>
        <Header>{storeName}</Header>
        <Tabs orientation='horizontal' value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
               <TabsTrigger value='CHECK_OUT' key='CHECK_OUT'>決済</TabsTrigger>
               <TabsTrigger value='ORDER_HISTORY' key='ORDER_HISTORY'>注文履歴</TabsTrigger>
            </TabsList>
            <TabsContent value='CHECK_OUT' key='CHECK_OUT'>
              <div className='flex justify-between'>
                <div className='font-bold text-2xl mt-24 mb-12 mx-auto'>総額</div>
                <div className='font-bold text-2xl mt-24 mb-12 mx-auto'>{totalAmount.toLocaleString('ja-JP')}円</div>
              </div>
              <div className='flex justify-between'>
                <div className='font-bold text-2xl my-12 mx-auto'>人数</div>
                <div className='font-bold text-2xl my-12 mx-auto'>{customerNumber.toLocaleString('ja-JP')}人</div>
              </div>
              <div className='flex justify-between'>
                <div className='font-bold text-2xl mt-12 mb-24 mx-auto'>一人当たり</div>
                <div className='font-bold text-2xl mt-12 mb-24 mx-auto'>{(totalAmount/customerNumber).toLocaleString('ja-JP')}円</div>
              </div>
              {paymentStatus === 'ORDERING' &&
              <div className='flex justify-center'>
                <div className='py-5 px-24 h-16 rounded-full duration-150 text-white bg-red-500 font-bold' onClick={handleCheckOutOrder}>
                  決済確定
                </div>
              </div>
              }
              {paymentStatus === 'PROCESSING' &&
                <div className='flex justify-center'>
                  <div className='my-5 py-5 px-12 h-16 rounded-full duration-150 text-white bg-gray-500 font-bold' onClick={handleCompleteOrder}>
                    会計終了
                  </div>
                </div>
              }              
            </TabsContent>
            <TabsContent value='ORDER_HISTORY' key='ORDER_HISTORY'>
              <div className='p-4 space-y-2'>
                {orderItems.map((orderItem) => {
                  return <OrderItemCard 
                    menuItemName={orderItem.menuItemName} 
                    menuItemNumber={orderItem.menuItemNumber} 
                    price={orderItem.price} 
                    imgPath='/image/Yakitori.png'/>
                })}
              </div>
            </TabsContent>
        </Tabs>
        {
          paymentStatus === 'ORDERING' &&
          <Footer 
            menuLink={`/stores/${storeId}/tables/${tableId}/menu-items`}
            cartLink={`/stores/${storeId}/tables/${tableId}/cart`}
          />
        }
        
    </>
    )
}
