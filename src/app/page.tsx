'use client'

import { ThreeBackground, SplineSceneBasic } from '@/components/ui/spline-scene-basic';
import { ChooseUs } from '@/components/ChooseUs';
import ServicesSection from '@/components/ServicesSection';
import AboutUs from '@/components/AboutUs';
import { StaggerTestimonials } from '@/components/OurProducts';



export default function Home() {
  return (
    <div className="min-h-screen text-white relative">
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        <ThreeBackground />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      Semi-transparent overlay for better readability
      <div className="fixed inset-0 bg-black/30 -z-[5]" />
      
      <main className="relative z-10">
        <div className="min-h-screen flex items-center justify-center">
          <SplineSceneBasic />
        </div>
        
        <AboutUs />
        
      
        
        <div className="relative z-10">
          <ChooseUs />
          <ServicesSection />
        </div>
    <div className="relative z-10">
            <StaggerTestimonials />
          </div>
      </main>
    </div>
  );
}