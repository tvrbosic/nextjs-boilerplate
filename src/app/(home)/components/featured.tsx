'use client';
// LIBRARY
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PiTreeStructureBold } from 'react-icons/pi';
import { FaGears } from 'react-icons/fa6';
import { BiSolidComponent } from 'react-icons/bi';

// COMPONENTS
import Button from '@/components/button/button';

export default function Featured() {
  const router = useRouter();

  return (
    <div className="bg-englishViolet py-[150px]">
      <div className="flex justify-center gap-[3vw]">
        {/** ================================| PROJECT STRUCTURE |================================ */}
        <div className="w-md border-gray-800 border-1 rounded-lg">
          <div className="flex flex-col h-full justify-between px-[40px] py-[20px] border-t-[10px] border-blue-300 rounded-t-md">
            <div className="flex justify-around items-center mb-3">
              <h2 className="text-stone-200 text-2xl underline underline-offset-4">
                Project structure
              </h2>

              <span className="text-stone-200 text-5xl">
                <PiTreeStructureBold />
              </span>
            </div>

            <p className="text-teal-100">
              Explore the foundational setup of the project, including file
              organization, folder structure, and the best practices followed
              for clean, scalable, and maintainable architecture.
            </p>

            <div className="text-end">
              <Link href={'/project-structure'}>
                <Button>Read more</Button>
              </Link>
            </div>
          </div>
        </div>

        {/** ================================| CUSTOM COMPONENTS |================================ */}
        <div className="w-md border-gray-800 border-1 rounded-lg">
          <div className="flex flex-col h-full justify-between px-[40px] py-[20px] border-t-[10px] border-orange-300 rounded-t-md">
            <div className="flex justify-around items-center mb-3">
              <h2 className="text-stone-200 text-2xl underline underline-offset-4">
                Custom components
              </h2>

              <span className="text-stone-200 text-5xl">
                <BiSolidComponent />
              </span>
            </div>

            <p className="text-teal-100">
              Check out a showcase of reusable components built with Next.js and
              Tailwind CSS, designed to accelerate development and maintain
              consistency across your application.
            </p>

            <div className="text-end">
              <Link href={'/custom-components'}>
                <Button>Read more</Button>
              </Link>
            </div>
          </div>
        </div>

        {/** ================================| FEATURES AND MECHANISMS |================================ */}
        <div className="w-md border-gray-800 border-1 rounded-lg">
          <div className="flex flex-col h-full justify-between px-[40px] py-[20px] border-t-[10px] border-green-300 rounded-t-md">
            <div className="flex justify-around items-center mb-3">
              <h2 className="text-stone-200 text-2xl underline underline-offset-4">
                Features and mechanisms
              </h2>

              <span className="text-stone-200 text-5xl">
                <FaGears />
              </span>
            </div>

            <p className="text-teal-100">
              Learn about the key features and advanced mechanisms implemented
              in the project, such as soft delete, audit logs, error handling
              middleware, JWT authentication and more...
            </p>

            <div className="text-end">
              <Link href={'/features-and-mechanisms'}>
                <Button>Read more</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
