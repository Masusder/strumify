import Link from 'next/link';
import Image from 'next/image';
import { CircleFlag } from 'react-circle-flags';
import { Separator } from "~/components/ui/separator"
import { ThemeToggle } from '~/components/Theme/theme-toggle';
import { Button } from '~/components/ui/button';
import { NavigationMenuDemo } from './navigation';
import styles from './header.module.css';

function Header() {
    return (
        <header className='flex px-5 h-12 bg-zinc-800 items-center sticky top-0'>
            <div className='w-full h-auto'>
                <Link href='/' className='block' style={{ width: "129px", height: "48px" }}>
                    <Image src="/assets/images/Logo/StrumifyLogo.png" priority className='drop-shadow-md' alt="Logo" width={129} height={48} />
                </Link>
            </div>
            <nav className='flex justify-end gap-4 items-center'>
                <Button style={{ width: "40px", height: "36px" }} size="icon">
                    <CircleFlag alt='Country flag' countryCode="es" width={24} height="auto" className={styles.dropShadow} />
                </Button>
                <ThemeToggle />
                <Separator orientation='vertical' style={{ height: "24px", backgroundColor: "#5b5b5b" }} />
                <NavigationMenuDemo />
            </nav>
        </header>
    );
};

export default Header;