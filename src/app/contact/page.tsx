import { Suspense } from 'react';
import MainContact from '@/components/contact/ContactForm';
import Loading from '@/components/ui/Loading';
import ContactHero from "@/components/contact/ContactHero";
import { ThreeBackground } from '@/components/ui/spline-scene-basic';

export default function ContactUsPage() {
  return (
    <div className="w-full relative min-h-screen">
       {/* Background layers */}
       <div className="fixed inset-0 z-0">
        <ThreeBackground />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* HERO SECTION */}
        <ContactHero />

        {/* CONTACT SECTION */}
        <Suspense fallback={<Loading />}>
          <MainContact />
        </Suspense>
      </div>
      
    </div>
  );
}
