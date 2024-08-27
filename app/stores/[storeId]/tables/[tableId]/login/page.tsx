'use client'
import { Header } from '@/components/layouts/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/layouts/tab';
import { createCustomer, getCustomerStatus } from '@/lib/customer/actions';
import { getStore } from '@/lib/store/actions'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    customerNum: number;
    submit: any;
  };

export default function LoginPage() {
    // 店名と空席確認
    const {storeId, tableId} = useParams<{ storeId: string; tableId: string }>();
    const [storeName, setStoreName] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        const fetchStoreNameAndTableAvailability = async () => {
            const initialStoreName = await getStore(Number(storeId));
            setStoreName(initialStoreName);
            const { customerId } = await getCustomerStatus(Number(storeId), Number(tableId));
            if (customerId != null) {
                router.push(`/stores/${storeId}/tables/${tableId}/menu-items`)
            }
        };
    
        fetchStoreNameAndTableAvailability();
    }, []);

    // フォーム設定
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const customerId = createCustomer(data.customerNum, Number(storeId), Number(tableId))
        router.push(`/stores/${storeId}/tables/${tableId}/menu-items`)
    };

    return (
    <main className=''>
        <Header>{storeName}</Header>
        <Tabs value='login'>
            <TabsList>
                <TabsTrigger value='login'>
                    いらっしゃいませ
                </TabsTrigger>
            </TabsList>
            <TabsContent value='login'>
                <div className='flex justify-center font-bold text-2xl my-24'>
                    来客数
                </div>                 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex justify-center items-center'>
                        <input
                        type='text'
                        className='mx-3  h-16 rounded-full duration-150 font-bold text-2xl border-4 text-center'
                        {...register("customerNum", {
                            required: "",
                          })}
                        />
                        <div className='font-bold text-2xl'>人</div>
                    </div>
                    {errors.customerNum?.message && (
                        <p className="">{errors.customerNum?.message}</p>
                    )}
                    <div className='flex justify-center my-24'>
                        <input type='submit' value='確定' className='py-5 px-24 h-16 rounded-full duration-150 text-white bg-red-500 font-bold'/>
                    </div>
                </form>
            </TabsContent>
        </Tabs>
       
    </main>
    )
}