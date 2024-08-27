'use client'
import { Footer } from '@/components/layouts/footer';
import { Header } from '@/components/layouts/header';
import MenuItemCard from '@/components/layouts/menu-item-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/layouts/tab';
import { getCustomerStatus } from '@/lib/customer/actions';
import { getMenuItems } from '@/lib/menu/actions';
import { getStore } from '@/lib/store/actions'
import { MenuItem, menuTypeToName } from '@/lib/util/constants';
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function MenuItemsPage() {
    const {storeId, tableId} = useParams<{ storeId: string; tableId: string }>();
    const [storeName, setStoreName] = useState('');
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const router = useRouter();
    const menuTypes = Object.keys(menuTypeToName)
    const [selectedTab, setSelectedTab] = useState(menuTypes[0]);

    
    // 店名取得
    useEffect(() => {
        const fetchStoreNameAndTableAvailability = async () => {
            const initialStoreName = await getStore(Number(storeId));
            setStoreName(initialStoreName);
            const initialMenuItems = await getMenuItems();
            setMenuItems(initialMenuItems);
            const {customerId, paymentStatus} = await getCustomerStatus(Number(storeId), Number(tableId));
            if (customerId == null) {
                router.push(`/stores/${storeId}/tables/${tableId}/login`)
            } else if (paymentStatus === 'PROCESSING') {
                router.push(`/stores/${storeId}/tables/${tableId}/payment`)
            }
        };
    
        fetchStoreNameAndTableAvailability();
    }, [storeId, tableId]);

    return (
    <>
        <Header>{storeName}</Header>
        <Tabs orientation='horizontal' value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
               {menuTypes.map((menuType) =>{
                    return <TabsTrigger value={menuType} key={menuType}>{menuTypeToName[menuType]}</TabsTrigger>
                }
                )}
            </TabsList>
            {menuTypes.map((menuType) => {
                return <TabsContent value={menuType} key={menuType}>
                    <div className='flex flex-wrap justify-start max-w-full'>
                    {menuItems.flatMap((menuItem) => (menuItem.menuType === menuType ?
                            <MenuItemCard 
                                menuName={menuItem.menuItemName} 
                                price={menuItem.price} 
                                link={`/stores/${storeId}/tables/${tableId}/menu-items/${menuItem.menuItemId}`}/>:[]))}
                    </div>
                </TabsContent>
            })
            }
        </Tabs>
        <Footer 
            cartLink={`/stores/${storeId}/tables/${tableId}/cart`}
            paymentLink={`/stores/${storeId}/tables/${tableId}/payment`}
        />
    </>
    )
}