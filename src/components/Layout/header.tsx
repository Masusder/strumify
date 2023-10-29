import Link from 'next/link';
import Image from 'next/image';
import { CircleFlag } from 'react-circle-flags';
import { Separator } from "~/components/ui/separator"
import { ThemeToggle } from '~/components/Theme/theme-toggle';
import { Button } from '~/components/ui/button';
import { NavigationMenuCustom } from './navigation';
import styles from './header.module.css';

function Header() {
    return (
        <header className='flex pr-2 pl-2 h-14 bg-zinc-800 items-center sticky top-0'>
            <div className='w-full h-auto'>
                <Link href='/' className='block' style={{ width: "49px", height: "45px" }}>
                    <Image src="/assets/images/Logo/StrumifyLogoIcon.png" priority className='drop-shadow-md' alt="Logo" width={48} height={45} />
                </Link>
            </div>
            <nav className='flex justify-end gap-4 items-center'>
                <Button style={{ width: "40px", height: "36px" }} size="icon">
                    <CircleFlag alt='Country flag' countryCode="es" width={24} height="auto" className={styles.dropShadow} />
                </Button>
                <ThemeToggle />
                <Separator orientation='vertical' style={{ height: "24px", backgroundColor: "#5b5b5b" }} />
                <NavigationMenuCustom />
            </nav>
        </header>
    );
};

export default Header;