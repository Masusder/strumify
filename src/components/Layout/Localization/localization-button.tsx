"use client";

import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { CircleFlag } from 'react-circle-flags';
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

import { cn } from '~/lib/utils';

function LocalizationButton() {
    const [language, setLanguage] = useState("en");
    const [flag, setFlag] = useState("us");

    const checkLanguageCode = () => {
        if (language) {
            const langCode = languages.find((lang) => lang.value === language)?.value;
            if (langCode) {
                return flag;
            }
        }

        return "us";
    }

    const changeLanguage = (lang: string, code: string) => {
        setLanguage(lang);
        setFlag(code);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button style={{ width: "60px", height: "36px" }} size="icon">
                    <CircleFlag alt='Country flag' countryCode={checkLanguageCode()} width={24} height="auto" className={styles.dropShadow} />
                    <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                        {languages.map((lang) => (
                            <CommandItem
                                className='cursor-pointer'
                                value={lang.label}
                                key={lang.value}
                                onSelect={() => {
                                    changeLanguage(lang.value, lang.flagCode)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        lang.value === language
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {lang.label}
                                <CircleFlag alt='Country flag' countryCode={lang.flagCode} width={12} height="auto" className={cn(styles.dropShadow, "ml-2")} />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default LocalizationButton;