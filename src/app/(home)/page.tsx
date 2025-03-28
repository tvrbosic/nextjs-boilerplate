// COMPONENTS
import Header from '@/components/layout/header';
import Hero from '@/app/(home)/components/hero';
import Featured from '@/app/(home)/components/featured';
import Footer from '@/components/layout/footer';

export default function Page() {
  return (
    <div className="relative">
      <Header />
      <Hero />
      <Featured />
      <Footer />
    </div>
  );
}
