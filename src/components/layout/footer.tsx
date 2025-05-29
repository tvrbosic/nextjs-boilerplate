'use client';
// LIBRARY
import { FaSquareTwitter, FaLinkedin, FaSquareFacebook } from 'react-icons/fa6';

// COMPONENTS
import LogoIpsum from '@/components/logo/logo-ipsum';
import IconButton from '@/components/button/icon-button';
import ActionInput from '@/components/input/action-input';
import NavLink from '@/components/nav-link/nav-link';

export default function Footer() {
  return (
    <div className="bg-primary pt-6">
      <div className="flex justify-around gap-[40px] px-[40px] py-[20px]">
        {/** ================================| COMPANY |================================ */}
        <div className="flex w-lg flex-col items-center gap-5">
          <LogoIpsum />

          <span className="text-main text-center text-xl">
            Full-stack app starter built on Next.js 15, React 19, and Tailwind CSS 4.
          </span>

          <div className="flex gap-5">
            <IconButton icon={<FaSquareTwitter />} onClick={() => {}} />

            <IconButton icon={<FaLinkedin />} onClick={() => {}} />

            <IconButton icon={<FaSquareFacebook />} onClick={() => {}} />
          </div>
        </div>
        {/** ================================| SUBSCRIBE |================================ */}
        <div className="flex w-lg flex-col items-center gap-5">
          <h2 className="text-title text-2xl">Newsletter</h2>

          <span className="text-main text-center">Subscribe to newsletter for latest project updates.</span>

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

      <div className="text-main pt-3 pb-6 text-center">Ipsum, @2025</div>
      <div className="text-main pt-3 pb-6 text-center">
        <NavLink href="https://www.freepik.com/free-vector/hand-drawn-flat-design-sql-illustration_22112356.htm#fromView=search&page=2&position=20&uuid=7ee20737-851d-471a-905b-42acb9df1aaf&new_detail=true&query=laptop+programming">
          Hero image by freepik
        </NavLink>
      </div>
    </div>
  );
}
