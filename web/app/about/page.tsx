import { AboutPage } from '@/components/about-page';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function About() {
  return (
    <div className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <Header showBackButton={true} />
      <div className="w-full max-w-3xl">
        <AboutPage />
      </div>
      <Footer />
    </div>
  );
}
