'use client';
// LIBRARY
import Image from 'next/image';
import { FaSquareTwitter, FaLinkedin, FaSquareFacebook } from 'react-icons/fa6';

// ASSETS
import LogoIpsumSvg from '@/app/(home)/assets/logo-ipsum.svg';

// COMPONENTS
import IconButton from '@/components/button/icon-button';
import ActionInput from '@/components/action-input/action-input';

export default function Footer() {
  return (
    <div className="bg-deepRuby pt-6">
      <div className="flex justify-around px-[40px] py-[20px]  gap-[40px]">
        {/** ================================| COMPANY |================================ */}

        <div className="w-lg flex flex-col items-center gap-5">
          <Image src={LogoIpsumSvg} alt="Page logo" />

          <span className="text-center text-stone-100 text-xl">
            Full-stack app starter built on Next.js 15, React 19, and Tailwind
            CSS 4.
          </span>

          <div className="flex gap-5">
            <IconButton icon={<FaSquareTwitter />} onClick={() => {}} />

            <IconButton icon={<FaLinkedin />} onClick={() => {}} />

            <IconButton icon={<FaSquareFacebook />} onClick={() => {}} />
          </div>
        </div>
        {/** ================================| SUBSCRIBE |================================ */}
        <div className="w-lg flex flex-col items-center gap-5">
          <h2 className="text-purpleLavander text-2xl underline underline-offset-4">
            Newsletter
          </h2>

          <span className="text-center text-stone-200 text-md">
            Subscribe to newsletter for latest project updates.
          </span>

          <div className="w-full">
            <ActionInput actionButtonLabel="Subscribe" onClick={() => {}} />
          </div>
        </div>
      </div>

      <div className="text-center text-stone-200 pt-3 pb-6">Ipsum, @2025</div>
      <div className="text-center text-stone-200 pt-3 pb-6">
        <a
          className="hover:underline hover:cursor-pointer hover:text-teal-200"
          href="https://www.freepik.com/free-vector/hand-drawn-flat-design-sql-illustration_22112356.htm#fromView=search&page=2&position=20&uuid=7ee20737-851d-471a-905b-42acb9df1aaf&new_detail=true&query=laptop+programming"
        >
          Hero image by freepik
        </a>
      </div>
    </div>
  );
}
