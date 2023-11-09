"use client";

import React from 'react';
import { Button } from '~/components/ui/button';
import { CircleFlag } from 'react-circle-flags';
import { usePathname, useRouter } from 'next/navigation';
import styles from '../header.module.css';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "~/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from '~/lib/utils';

const languages = [
    { label: "English", value: "en", flagCode: "us" },
    { label: "Polish", value: "pl", flagCode: "pl" },
    { label: "French", value: "fr", flagCode: "fr" },
    { label: "German", value: "de", flagCode: "de" },
    { label: "Spanish", value: "es", flagCode: "es" },
    { label: "Portuguese", value: "pt", flagCode: "pt" },
    { label: "Russian", value: "ru", flagCode: "ru" },
    { label: "Japanese", value: "ja", flagCode: "jp" },
    { label: "Korean", value: "ko", flagCode: "kr" },
    { label: "Chinese", value: "zh", flagCode: "cn" }
] as const

function LocalizationButton({ lang }: { lang: Locale }) {
    const router = useRouter();
    const pathName = usePathname();

    const checkLanguageCode = () => {
        if (lang) {
            const langCode = languages.find((_lang) => _lang.value === lang)?.flagCode;
            if (langCode) {
                return langCode;
            }
        }

        return "";
    }

    const changeLanguage = (lang: Locale) => {
        if (!pathName) router.push('/');
        const segments = pathName.split('/');
        segments[1] = lang;
        const newUrl = segments.join('/');

        router.push(newUrl);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className=' w-[60px] h-[36px]' size="icon">
                    <CircleFlag alt='Country flag' countryCode={checkLanguageCode()} width={24} height="auto" className={styles.dropShadow} />
                    <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                        {languages.map((_lang) => (
                            <CommandItem
                                className='cursor-pointer'
                                value={_lang.label}
                                key={_lang.value}
                                onSelect={() => {
                                    changeLanguage(_lang.value)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        _lang.value === lang
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {_lang.label}
                                <CircleFlag alt='Country flag' countryCode={_lang.flagCode} width={12} height="auto" className={cn(styles.dropShadow, "ml-2")} />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default LocalizationButton;