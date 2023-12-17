"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// UI
import { UserCircle } from "lucide-react"
// Types
import { Session } from 'next-auth';

interface ProfileButtonProps {
  session: Session | null;
  lang: Locale;
}

function ProfileButton({ session, lang }: ProfileButtonProps) {
  const router = useRouter();

  const signIn = (): void => {
    if (!session) {
      router.push(`/auth/sign-in`);
    } else {
      router.push(`/${lang}/profile`)
    }
  }

  let profileAvatar: string | null | undefined = null;
  if (session) {
    profileAvatar = session.user.image;
  }

  return (
    <button className='w-[56px] h-[56px]' onClick={signIn}>
      <AvatarDisplay session={session} profileAvatar={profileAvatar} />
    </button>
  );
}

export default ProfileButton;

interface AvatarDisplayProps {
  session: Session | null;
  profileAvatar: string | null | undefined;
}

function AvatarDisplay({ session, profileAvatar }: AvatarDisplayProps) {
  if (session && profileAvatar) {
    return <Image className='border-2 rounded-full border-primary hover:border-primary/70 transition-colors' src={profileAvatar} alt="Avatar" height={56} width={56} />;
  }

  return <UserCircle className='bg-background w-[36px] h-[36px] p-1 rounded-full' />;
}