import { Suspense } from 'react';
import MainCareers from '@/components/careers/MainCareers';
import Loading from '@/components/ui/Loading';

export default function CareersPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MainCareers />
    </Suspense>
  );
}