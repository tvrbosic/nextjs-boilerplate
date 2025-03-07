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
      <div className="w-full h-dvh bg-darkStone" />
      {/** Floating container */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/** Content container */}
        <div className="w-[625px] h-[525px] flex flex-col items-center justify-center bg-deepRuby rounded-2xl">
          <div className="w-full px-8 flex-grow flex items-center justify-around mt-2">
            <FaExclamationTriangle className="w-16 h-16 text-red-300" />

            <h1 className="text-stone-100 text-2xl underline underline-offset-4">
              Oops! Server encountered error.
            </h1>
          </div>

          <div className="w-full px-8 flex-grow flex items-center justify-center">
            <p className="text-teal-100 text-lg">
              We are sorry for the inconvenience. We are actively working to fix
              this problem.
            </p>
          </div>

          <div className="w-full bg-englishViolet px-8 pt-2 pb-4 flex-grow flex flex-col items-center justify-center text-md">
            <p className="text-stone-100 mb-4 text-left w-full">
              Here is what you can do:
            </p>

            <ul className="text-stone-100 space-y-1">
              <li className="flex items-center">
                <FaSyncAlt className="w-5 h-5 mr-2 text-green-400" />
                Refresh the page (sometimes this helps)
              </li>
              <li className="flex items-center">
                <FaClock className="w-5 h-5 mr-2 text-orange-300" />
                Try again in 30 minutes
              </li>
              <li className="flex items-center">
                <FaEnvelope className="w-5 h-5 mr-2 text-blue-400" />
                Contact support if problem persists: support@email.com
              </li>
            </ul>
          </div>

          <div className="w-full text-center flex-grow flex items-center justify-center mb-4">
            <Link href={'/'}>
              <Button size="lg">Go Back</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
