import { Header } from '@/components/layouts/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/layouts/tab';

export default async function PaymentTab({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;

  return (
    <>
    <Header> 小竹向原駅前店 </Header>
    <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
        </TabsList>
      <TabsContent value="all">
        a
      </TabsContent>
    </Tabs>
    </>
  );
}