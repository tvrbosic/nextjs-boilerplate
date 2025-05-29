// LIBRARY
import Link from 'next/link';
import { PiTreeStructureBold } from 'react-icons/pi';
import { FaGears } from 'react-icons/fa6';
import { BiSolidComponent } from 'react-icons/bi';

// COMPONENTS
import Button from '@/components/button/button';

export default function Featured() {
  return (
    <div className="bg-secondary py-[150px]">
      <div className="flex justify-center gap-[3vw]">
        {/** ================================| PROJECT STRUCTURE |================================ */}
        <div className="w-md rounded-lg border-1 border-gray-500 dark:border-gray-800">
          <div className="flex h-full flex-col justify-between rounded-t-md border-t-[10px] border-blue-300 px-[40px] py-[20px]">
            <div className="mb-3 flex items-center justify-around">
              <h2 className="text-2xl text-white underline underline-offset-4">Project structure</h2>

              <span className="text-5xl text-white">
                <PiTreeStructureBold />
              </span>
            </div>

            <p className="text-white">
              Explore the foundational setup of the project, including file organization, folder structure, and the best
              practices followed for clean, scalable, and maintainable architecture.
            </p>

            <div className="text-end">
              <Link href={'/project-structure'}>
                <Button>Read more</Button>
              </Link>
            </div>
          </div>
        </div>

        {/** ================================| CUSTOM COMPONENTS |================================ */}
        <div className="w-md rounded-lg border-1 border-gray-500 dark:border-gray-800">
          <div className="flex h-full flex-col justify-between rounded-t-md border-t-[10px] border-orange-300 px-[40px] py-[20px]">
            <div className="mb-3 flex items-center justify-around">
              <h2 className="text-2xl text-white underline underline-offset-4">Custom components</h2>

              <span className="text-5xl text-white">
                <BiSolidComponent />
              </span>
            </div>

            <p className="text-white">
              Check out a showcase of reusable components built with Next.js and Tailwind CSS, designed to accelerate
              development and maintain consistency across your application.
            </p>

            <div className="text-end">
              <Link href={'/custom-components'}>
                <Button>Read more</Button>
              </Link>
            </div>
          </div>
        </div>

        {/** ================================| FEATURES AND MECHANISMS |================================ */}
        <div className="w-md rounded-lg border-1 border-gray-500 dark:border-gray-800">
          <div className="flex h-full flex-col justify-between rounded-t-md border-t-[10px] border-green-300 px-[40px] py-[20px]">
            <div className="mb-3 flex items-center justify-around">
              <h2 className="text-2xl text-white underline underline-offset-4">Features and mechanisms</h2>

              <span className="text-5xl text-white">
                <FaGears />
              </span>
            </div>

            <p className="text-white">
              Learn about the key features and advanced mechanisms implemented in the project, such as soft delete,
              audit logs, error handling middleware, JWT authentication and more...
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
