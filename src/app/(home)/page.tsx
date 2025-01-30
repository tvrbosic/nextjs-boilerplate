// COMPONENTS
import Header from '@/app/(home)/components/header';
import Hero from '@/app/(home)/components/hero';
import Featured from '@/app/(home)/components/featured';
import Footer from '@/app/(home)/components/footer';

export default function Page() {
  return (
    <div>
      <Header />
      <Hero />
      <Featured />
      <Footer />
    </div>
  );
}
