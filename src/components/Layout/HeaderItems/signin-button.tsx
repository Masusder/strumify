"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '~/components/ui/button';

import { UserCircle } from "lucide-react"

function ProfileButton({ session, lang, nextUrl }: any) {
  const router = useRouter();

  const signIn = () => {
    if (!session) {
      router.push(`/auth/sign-in?callbackUrl=${nextUrl}/${lang}`);
    } else {
      router.push(`/${lang}/profile`)
    }
  }

  let profileAvatar = null;
  if (session) {
    profileAvatar = session.user.image;
  }
  console.log(session)

  return (
    <button className='w-[56px] h-[56px]'
      onClick={signIn}
    >
      {session && profileAvatar ?
        <Image className='border-2 rounded-full border-primary' src={profileAvatar} alt="Avatar" height={56} width={56} />
        : <UserCircle className=' bg-background w-[36px] h-[36px] p-1 rounded-full' />
      }
    </button>
  );
}

export default ProfileButton;