import Link from 'next/link';
import Image from 'next/image';
import { Separator } from "~/components/ui/separator";
import { ThemeToggle } from '~/components/Theme/theme-toggle';
import { NavigationMenuCustom } from './navigation';
import LocalizationButton from './Localization/localization-button';
import { ProfileButton } from './HeaderItems';

import { getServerAuthSession } from '~/server/auth';

async function Header({
    params: { lang },
  }: {
    params: { lang: Locale }
  }) {
    const session = await getServerAuthSession();

    return (
        <header className='flex pr-2 pl-2 h-14 bg-zinc-800 items-center sticky top-0 z-50 border-b-[1px] border-primary/90'>
            <div className='w-full h-auto'>
                <Link href={`/${lang}`} className='block' style={{ width: "49px", height: "45px" }}>
                    <Image src="/assets/images/Logo/StrumifyLogoIcon.png" priority className='drop-shadow-md' alt="Logo" width={48} height={45} />
                </Link>
            </div>
            <nav className='flex justify-end gap-3 items-center'>
                <LocalizationButton lang={lang} />
                <ThemeToggle />
                <Separator orientation='vertical' style={{ height: "24px", backgroundColor: "#5b5b5b" }} />
                <NavigationMenuCustom lang={lang} />
                <Separator orientation='vertical' style={{ height: "24px", backgroundColor: "#5b5b5b" }} />
                <ProfileButton session={session} lang={lang} />
            </nav>
        </header>
    );
};

export default Header;