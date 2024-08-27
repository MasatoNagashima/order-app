'use client'
import CartFooter from '@/components/layouts/cart-footer';
import { getStore } from '@/lib/store/actions'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { MenuHeader } from '@/components/layouts/menu-header';
import { getMenuItem } from '@/lib/menu/actions';
import { getCustomerStatus } from '@/lib/customer/actions';


export default function MenuItemPage() {
    const router = useRouter();
    const {storeId, tableId, menuItemId} = useParams<{ storeId: string; tableId: string; menuItemId: string; }>();
    const [menuItemName, setMenuItemName] = useState('');
    const [price, setPrice] = useState('');
    let customerIdRef = useRef(0)
    
    // 店名取得
    useEffect(() => {
        const fetchMenuItem = async () => {
            const {customerId} = await getCustomerStatus(Number(storeId), Number(tableId));
            if (customerId == null) {
                router.push(`/stores/${storeId}/tables/${tableId}/login`)
            } else {
                customerIdRef.current = customerId;
            }
            const menuItem = await getMenuItem(menuItemId);
            setMenuItemName(menuItem.menuItemName);
            setPrice(menuItem.price);
        };
    
        fetchMenuItem();
    }, []);

    return (
    <>
        <MenuHeader storeId={storeId} tableId={tableId}>{menuItemName}</MenuHeader>
            <Image src="/image/Yakitori.png" width={200} height={200} alt="minus icon" className="mx-auto my-12"/>
        <CartFooter 
            price={price} 
            customerId={customerIdRef.current}
            menuItemId={Number(menuItemId)}
            storeId={storeId}
            tableId={Number(tableId)}
        />
    </>
    )
}