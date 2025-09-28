import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { UssdAccordionList } from '@/components/ussd-accordion-list';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <Header />
      <div className="w-full max-w-3xl">
        <UssdAccordionList />
      </div>
      <Footer />
    </div>
  );
}
