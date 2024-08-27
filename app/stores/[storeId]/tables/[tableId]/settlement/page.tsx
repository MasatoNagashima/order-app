'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/layouts/tab';
import { BigButton } from '@/components/uiParts/big-button';
import { getCustomerStatus } from '@/lib/customer/actions';
import { getStore } from '@/lib/store/actions'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react';


export default function SettlementPage() {
    // 店名と空席確認
    const {storeId, tableId} = useParams<{ storeId: string; tableId: string }>();
    const [storeName, setStoreName] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        const fetchStoreNameAndTableAvailability = async () => {
            const initialStoreName = await getStore(Number(storeId));
            setStoreName(initialStoreName);
            const { customerId, paymentStatus } = await getCustomerStatus(Number(storeId), Number(tableId));
            if (customerId == null) {
                router.push(`/stores/${storeId}/tables/${tableId}/login`)
            } else if (paymentStatus === 'PROCESSING') {
                router.push(`/stores/${storeId}/tables/${tableId}/payment`)
            }
        };
    
        fetchStoreNameAndTableAvailability();
    }, []);

    return (
    <main className=''>
        <Header>{storeName}</Header>
        <Tabs value='login'>
            <TabsList>
                <TabsTrigger value='login'>
                    テーブル {tableId}
                </TabsTrigger>
            </TabsList>
            <TabsContent value='login'>
                <div className='flex justify-center font-bold text-2xl mt-24'>
                    ご注文
                </div> 
                <div className='flex justify-center font-bold text-2xl mb-24'>
                    ありがとうございました
                </div> 
                <div className='flex justify-center'>
                    <BigButton href={`/stores/${storeId}/tables/${tableId}/menu-items`}>
                        メニューに戻る
                    </BigButton>  
                </div>    
            </TabsContent>
        </Tabs>
       
    </main>
    )
}