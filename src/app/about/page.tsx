import { Suspense } from 'react';
import MainAboutUs from '@/components/aboutus/mainAboutus';
import Loading from '@/components/ui/Loading';
import AboutusHero from '@/components/aboutus/AboutusHero';
export default function AboutPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AboutusHero />
      </Suspense>
      <MainAboutUs />
    </>
  );
}