'use client'
import { Footer } from '@/components/layouts/footer';
import { Header } from '@/components/layouts/header';
import OrderItemCard from '@/components/layouts/order-item-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/layouts/tab';
import { getCustomerStatus } from '@/lib/customer/actions';
import { getOrdersInCart, updateOrders } from '@/lib/order/actions';
import { getStore } from '@/lib/store/actions'
import { OrderItem } from '@/lib/util/constants';
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function CartPage() {
    const router = useRouter();
    const {storeId, tableId} = useParams<{ storeId: string; tableId: string }>();
    const [storeName, setStoreName] = useState('');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    // 店名取得
    useEffect(() => {
        const fetchStoreNameAndTableAvailability = async () => {
            const initialStoreName = await getStore(Number(storeId));
            setStoreName(initialStoreName);
            const {customerId, paymentStatus} = await getCustomerStatus(Number(storeId), Number(tableId));
            if (customerId == null) {
                router.push(`/stores/${storeId}/tables/${tableId}/login`)
            } else if (paymentStatus === 'PROCESSING') {
                router.push(`/stores/${storeId}/tables/${tableId}/payment`)
            }
            else{
                const initialOrderItems = await getOrdersInCart(customerId)
                setOrderItems(initialOrderItems);
            }
        };
    
        fetchStoreNameAndTableAvailability();
    }, []);

    const handleCheckOutCart = async() => {
        const orderIds = orderItems.map((orderItem) => orderItem.orderId);
        await updateOrders(orderIds, 'COMPLETED');
        router.push(`/stores/${storeId}/tables/${tableId}/settlement`)
    }
    
    return (
    <>
        <Header>{storeName}</Header>
        <Tabs orientation='horizontal' value='ORDER_STATUS'>
            <TabsList>
               <TabsTrigger value='ORDER_STATUS' key='ORDER_STATUS'>注文状況</TabsTrigger>
            </TabsList>
            <TabsContent value='ORDER_STATUS' key='ORDER_STATUS'>
                <div className='p-4 space-y-2'>
                    {
                        orderItems.map((orderItem) => {
                            return <OrderItemCard 
                                menuItemName={orderItem.menuItemName} 
                                menuItemNumber={orderItem.menuItemNumber} 
                                price={orderItem.price} 
                                imgPath='/image/Yakitori.png'
                                key={orderItem.orderId}
                                />
                        })
                    }
                </div>
            </TabsContent>
        </Tabs>
        <Footer 
            menuLink={`/stores/${storeId}/tables/${tableId}/menu-items`}
            paymentLink={`/stores/${storeId}/tables/${tableId}/payment`}
            buttonLink={`/stores/${storeId}/tables/${tableId}/settlement`}
            onClick = {handleCheckOutCart}
        />
    </>
    )
}