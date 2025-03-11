// LIB
import {
  FaSyncAlt,
  FaClock,
  FaEnvelope,
  FaExclamationTriangle,
} from 'react-icons/fa';
import Link from 'next/link';

// COMPONENTS
import Button from '@/components/button/button';

export default function GlobalErrorFallback() {
  return (
    <div className="relative">
      {/** Background */}
      <div className="bg-darkStone h-dvh w-full" />
      {/** Floating container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/** Content container */}
        <div className="bg-deepRuby flex h-[525px] w-[625px] flex-col items-center justify-center rounded-2xl">
          <div className="mt-2 flex w-full flex-grow items-center justify-around px-8">
            <FaExclamationTriangle className="h-16 w-16 text-red-300" />

            <h1 className="text-2xl text-stone-100 underline underline-offset-4">
              Oops! Server encountered error.
            </h1>
          </div>

          <div className="flex w-full flex-grow items-center justify-center px-8">
            <p className="text-lg text-teal-100">
              We are sorry for the inconvenience. We are actively working to fix
              this problem.
            </p>
          </div>

          <div className="bg-englishViolet flex w-full flex-grow flex-col items-center justify-center px-8 pt-2 pb-4">
            <p className="mb-4 w-full text-left text-stone-100">
              Here is what you can do:
            </p>

            <ul className="space-y-1 text-stone-100">
              <li className="flex items-center">
                <FaSyncAlt className="mr-2 h-5 w-5 text-green-400" />
                Refresh the page (sometimes this helps)
              </li>
              <li className="flex items-center">
                <FaClock className="mr-2 h-5 w-5 text-orange-300" />
                Try again in 30 minutes
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 h-5 w-5 text-blue-400" />
                Contact support if problem persists: support@email.com
              </li>
            </ul>
          </div>

          <div className="mb-4 flex w-full flex-grow items-center justify-center text-center">
            <Link href={'/'}>
              <Button size="lg">Go Back</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
