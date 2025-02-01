// LIBRARY
import Image from 'next/image';

// ASSETS
import CodingConceptPng from '@/app/(home)/assets/coding-concept.png';

export default function Hero() {
  return (
    <div className="relative">
      {/** Backgrounds container */}
      <div className="grid grid-cols-12 h-dvh">
        <div className="col-span-4 bg-darkStone"></div>
        <div className="col-span-8 bg-deepRuby"></div>
      </div>

      {/** Floating container */}
      <div className="absolute inset-0 flex justify-center">
        {/** Content container */}
        <div className="flex w-6xl justify-center items-center gap-20">
          <div className="w-3/6">
            <Image
              src={CodingConceptPng}
              alt="Laptop, folders and windows landing page graphic"
            />
          </div>

          <div className="w-3/6 flex flex-col gap-6">
            <h1 className="text-7xl text-stone-100">
              Next.js boilerplate project
            </h1>

            <p className="text-xl text-teal-100">
              Full-stack app starter built on Next.js 15, React 19, and Tailwind
              CSS 4. Comes with JWT-based authentication & authorization, soft
              delete mechanism, audit log system, global error-handling
              middleware and more. DX is enhanced with ESLint, Prettier, Husky,
              and lint-staged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
