'use client';
// LIBRARY
import { useRouter } from 'next/navigation';
import { PiTreeStructureBold } from 'react-icons/pi';
import { FaGears } from 'react-icons/fa6';
import { BiSolidComponent } from 'react-icons/bi';

// COMPONENTS
import Button from '@/components/button';

export default function Featured() {
  const router = useRouter();

  return (
    <div className="bg-englishViolet py-[150px]">
      <div className="flex justify-center gap-[3vw]">
        {/** ================================| PROJECT STRUCTURE |================================ */}
        <div className="w-md border-gray-800 border-1 rounded-lg">
          <div className="flex flex-col h-full justify-between px-[40px] py-[20px] border-t-[10px] border-blue-300 rounded-t-md">
            <div className="flex justify-around items-center mb-3">
              <span className="text-stone-200 underline text-2xl">
                Project structure
              </span>

              <span className="text-stone-200 text-5xl">
                <PiTreeStructureBold />
              </span>
            </div>

            <p className="text-teal-100 ">
              Explore the foundational setup of the project, including file
              organization, folder structure, and the best practices followed
              for clean, scalable, and maintainable architecture.
            </p>

            <div className="text-end">
              <Button onClick={() => router.push('/project-structure')}>
                Read more
              </Button>
            </div>
          </div>
        </div>

        {/** ================================| CUSTOM COMPONENTS |================================ */}
        <div className="w-md border-gray-800 border-1 rounded-lg">
          <div className="flex flex-col h-full justify-between px-[40px] py-[20px] border-t-[10px] border-orange-300 rounded-t-md">
            <div className="flex justify-around items-center mb-3">
              <span className="text-stone-200 underline text-2xl">
                Custom components
              </span>

              <span className="text-stone-200 text-5xl">
                <BiSolidComponent />
              </span>
            </div>

            <p className="text-teal-100 ">
              Check out a showcase of reusable components built with Next.js and
              Tailwind CSS, designed to accelerate development and maintain
              consistency across your application.
            </p>

            <div className="text-end">
              <Button onClick={() => router.push('/custom-components')}>
                Read more
              </Button>
            </div>
          </div>
        </div>

        {/** ================================| FEATURES AND MECHANISMS |================================ */}
        <div className="w-md border-gray-800 border-1 rounded-lg">
          <div className="flex flex-col h-full justify-between px-[40px] py-[20px] border-t-[10px] border-green-300 rounded-t-md">
            <div className="flex justify-around items-center mb-3">
              <span className="text-stone-200 underline text-2xl">
                Features and mechanisms
              </span>

              <span className="text-stone-200 text-5xl">
                <FaGears />
              </span>
            </div>

            <p className="text-teal-100 ">
              Learn about the key features and advanced mechanisms implemented
              in the project, such as soft delete, audit logs, error handling
              middleware, JWT authentication and more...
            </p>

            <div className="text-end">
              <Button onClick={() => router.push('/features-and-mechanisms')}>
                Read more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
