import ChatPage from '@/components/Blog';

const Page = ({ params }: { params: { chatId: string } }) => {  // Match the expected 'id'
  return <ChatPage chatId={params.chatId} />
    // "38ff95368beda88a2a89f36da53315a65ee076ef"}} />  
}

export default Page;

