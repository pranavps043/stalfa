import { Suspense } from 'react';
import Blog from '@/components/blog/MainBlogs';
import Loading from '@/components/ui/Loading';
import BlogHero from '@/components/blog/BlogHero';

export default function BlogPage() {
  return (
    <Suspense fallback={<Loading />}>
      <>
        <BlogHero />
        <Blog />
      </>
    </Suspense>
  );
}