import { Suspense } from "react";
import MainServices from "@/components/services/MainServices";
import Loading from "@/components/ui/Loading";
import ServicesHero from "@/components/services/ServicesHero";

export default function ServicesPage() {
  return (
    <>
      {/* Hero can use suspense */}
      <Suspense fallback={<Loading />}>
        <ServicesHero />
      </Suspense>

      {/* Sticky scroll MUST be outside Suspense */}
      <MainServices />
    </>
  );
}
