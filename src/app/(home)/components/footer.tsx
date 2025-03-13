'use client';
// LIBRARY
import Image from 'next/image';
import { FaSquareTwitter, FaLinkedin, FaSquareFacebook } from 'react-icons/fa6';

// ASSETS
import LogoIpsumSvg from '@/assets/images/logo-ipsum.svg';

// COMPONENTS
import IconButton from '@/components/button/icon-button';
import ActionInput from '@/components/input/action-input';

export default function Footer() {
  return (
    <div className="bg-deepRuby pt-6">
      <div className="flex justify-around gap-[40px] px-[40px] py-[20px]">
        {/** ================================| COMPANY |================================ */}

        <div className="flex w-lg flex-col items-center gap-5">
          <Image src={LogoIpsumSvg} alt="Page logo" />

          <span className="text-center text-xl text-stone-100">
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
        <div className="flex w-lg flex-col items-center gap-5">
          <h2 className="text-purpleLavander text-2xl underline underline-offset-4">
            Newsletter
          </h2>

          <span className="text-center text-stone-200">
            Subscribe to newsletter for latest project updates.
          </span>

          <div className="w-full">
            <ActionInput
              inputType="email"
              placeholder="john.doe@email.com"
              actionButtonLabel="Subscribe"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      <div className="pt-3 pb-6 text-center text-stone-200">Ipsum, @2025</div>
      <div className="pt-3 pb-6 text-center text-stone-200">
        <a
          className="hover:cursor-pointer hover:text-teal-200 hover:underline"
          href="https://www.freepik.com/free-vector/hand-drawn-flat-design-sql-illustration_22112356.htm#fromView=search&page=2&position=20&uuid=7ee20737-851d-471a-905b-42acb9df1aaf&new_detail=true&query=laptop+programming"
        >
          Hero image by freepik
        </a>
      </div>
    </div>
  );
}
