import { Header } from '@/components/layouts/header'
import { getStore, getTableAvailability } from '@/lib/store/actions'
import { redirect } from 'next/navigation'
import { useSearchParams } from "next/navigation";

export default async function LoginPage() {
    const searchParams = useSearchParams();
    const storeId = searchParams.get('storeId');
    const storeName = await getStore(storeId)
    // const isTableInUse = await getTableAvailability()

    // if (isTableInUse) {
    // redirect('/')
    // }

    return (
    <main className=''>
        <Header>{storeName}</Header>
    </main>
    )
}