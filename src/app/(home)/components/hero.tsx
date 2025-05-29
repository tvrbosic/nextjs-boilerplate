// LIBRARY
import Image from 'next/image';

// ASSETS
import CodingConceptPng from '@/assets/images/coding-concept.png';

export default function Hero() {
  return (
    <div className="relative">
      {/** Backgrounds container */}
      <div className="grid h-dvh grid-cols-12">
        <div className="bg-tertiary col-span-4"></div>
        <div className="bg-primary col-span-8"></div>
      </div>

      {/** Floating container */}
      <div className="absolute inset-0 flex justify-center">
        {/** Content container */}
        <div className="flex w-6xl items-center justify-center gap-20">
          <div className="w-3/6">
            <Image src={CodingConceptPng} alt="Laptop, folders and windows landing page graphic" />
          </div>

          <div className="flex w-3/6 flex-col gap-6">
            <h1 className="text-7xl text-teal-900 dark:text-stone-100">Next.js boilerplate project</h1>

            <p className="text-xl text-teal-600 dark:text-teal-200">
              Full-stack app starter built on Next.js 15, React 19, and Tailwind CSS 4. Comes with JWT-based
              authentication & authorization, soft delete mechanism, audit log system, global error-handling middleware
              and more. DX is enhanced with ESLint, Prettier, Husky, and lint-staged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
