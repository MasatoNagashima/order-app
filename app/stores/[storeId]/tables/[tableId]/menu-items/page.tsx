'use client'
import { Header } from '@/components/layouts/header';
import MenuItemCard from '@/components/layouts/menu-item-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/layouts/tab';
import { getStore, getTableAvailability } from '@/lib/store/actions'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react';


export default function MenuItemsPage() {
    // 店名と空席確認
    const {storeId, tableId} = useParams<{ storeId: string; tableId: string }>();
    const [storeName, setStoreName] = useState('');
    const menuTypes: string[] = [
        'KUSHIYAKI', 
        'RARE_PARTS', 
        'SCROLLED', 
        'VEGETABLE', 
        'CHICKEN_FOOD', 
        'SALAD', 
        'CARBS', 
        'ALCHOL', 
        'SOFT_DRINK'
    ]
    const [selectedTab, setSelectedTab] = useState(menuTypes[0]);
    const menuTypeToName: { [key: string]: string; } = {
        'KUSHIYAKI': '串焼き',
        'RARE_PARTS': '希少部位',
        'SCROLLED': '巻き物',
        'VEGETABLE': '野菜焼き',
        'CHICKEN_FOOD': '鶏料理', 
        'SALAD': 'サラダ', 
        'CARBS': '飯物', 
        'ALCHOL': 'アルコール', 
        'SOFT_DRINK': 'ソフトドリンク'
    }
    
    useEffect(() => {
        const fetchStoreNameAndTableAvailability = async () => {
            const initialStoreName = await getStore(Number(storeId));
            setStoreName(initialStoreName);
            const isTableAvailable = await getTableAvailability(Number(storeId), Number(tableId));
            if (isTableAvailable === false) {
                // router.push(`/stores/${storeId}/tables/${tableId}/menu-items`)
            }
        };
    
        fetchStoreNameAndTableAvailability();
    }, [storeId, tableId]);

    return (
    <main className=''>
        <Header>{storeName}</Header>
        <Tabs orientation='horizontal' value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
               {menuTypes.map((menuType) =>{
                    return <TabsTrigger value={menuType}>{menuTypeToName[menuType]}</TabsTrigger>
                }
                )}
            </TabsList>
            {menuTypes.map((menuType) => {
                return <>
                <TabsContent value={menuType}>
                    <div className='flex flex-wrap justify-start max-w-full'>
                        <MenuItemCard/>
                        <MenuItemCard/> 
                        <MenuItemCard/> 
                        <MenuItemCard/> 
                        <MenuItemCard/>            
                    </div>
                </TabsContent>
                </>
            })
            }
        </Tabs>
    </main>
    )
}