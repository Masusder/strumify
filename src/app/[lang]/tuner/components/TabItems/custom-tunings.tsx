"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "~/components/ui/use-toast";
// UI
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import {
    Command,
    CommandItem,
} from "~/components/ui/command";
import { Input } from "~/components/ui/input";
import { Check } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton"
import { Button } from '~/components/ui/button';
import styles from '../../tuner.module.css';

// Other
import { InstrumentType } from '~/models/instruments';
import { noteStrings } from '~/constants/noteData';
import { cn } from '~/lib/utils';

import { api } from '~/trpc/react';

// Types
import { Session } from 'next-auth';

interface CustomTuningsProps {
    selectedInstrument: InstrumentType;
    session: Session | null;
}

function CustomTunings({ selectedInstrument, session }: CustomTuningsProps) {
    const router = useRouter();
    const nameInput = useRef<HTMLInputElement>(null);
    const [selectedNotesIndexes, setSelectedNotesIndexes] = useState<number[]>([])
    const { toast } = useToast()


    useEffect(() => {
        switch (selectedInstrument) {
            case "acoustic":
            case "electric":
                setSelectedNotesIndexes([-1, -1, -1, -1, -1, -1]);
                break;
            case "ukulele":
            case "bass":
                setSelectedNotesIndexes([-1, -1, -1, -1]);
                break;
            default:
                break;
        }
    }, [selectedInstrument])

    const signIn = () => {
        if (!session) {
            router.push(`/auth/sign-in`);
        }
    }


    if (!session) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Create custom tunings</CardTitle>
                    <CardDescription>
                        Create your own custom tunings.
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex justify-center flex-col items-center'>
                    You need to sign-in in order to create your own tunings for free.
                    <Button className='mt-2' onClick={signIn}>
                        Sign-in
                    </Button>
                </CardContent>
            </Card>
        );
    }

    // const { data: userTunings, isLoading, isError } = api.post.getUserTunings.useQuery(
    //     { instrument: selectedInstrument },
    //     {
    //         queryKey: ['post.getUserTunings', { instrument: selectedInstrument }],
    //         staleTime: 60000
    //     }
    // );

    function changeNote(newNoteIndex: number, i: number): void {
        setSelectedNotesIndexes(prevNotesIndexes => {
            const newSelectedNotesIndexes = [...prevNotesIndexes];
            newSelectedNotesIndexes[i] = newNoteIndex;
            return newSelectedNotesIndexes;
        });
    }

    function showToast(): void {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Your custom tuning is missing something.",
        })
    }

    function validateNoteIndexes(): boolean {
        let expectedLength: number;

        switch (selectedInstrument) {
            case 'acoustic':
            case 'electric':
                expectedLength = 6;
                break;
            case 'bass':
            case 'ukulele':
                expectedLength = 4;
                break;
            default:
                showToast();
                return false;
        }

        if (selectedNotesIndexes.length !== expectedLength) {
            showToast();
            return false;
        }

        for (const index of selectedNotesIndexes) {
            if (index < 0 || index > 11) {
                showToast();
                return false;
            }
        }

        return true;
    };

    async function saveTuning(): Promise<void> {
        const input = nameInput.current;
        if (!input) {
            return;
        }

        const inputValue = input.value;
        console.log(inputValue)

        if (!inputValue || inputValue.trim().length === 0) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Your custom tuning doesn't have a name.",
            })
            return;
        }

        if (inputValue.length > 30) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Your custom tuning name is too long.",
            })
            return;
        }

        const isTuningValid = validateNoteIndexes();

        if (isTuningValid) {
            toast({
                variant: "default",
                title: "Saved tuning successfully.",
                description: "Check Tunings tab, your own tuning should now appear there.",
            })
        }
    }

    console.log(selectedNotesIndexes)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create custom tunings</CardTitle>
                <CardDescription>
                    Create your own custom tunings.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* {isLoading &&
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                }
                {isError && "Error: Failed to load tunings"} */}
                {/* {JSON.stringify(userTunings)} */}
                <div className='pl-2 pr-2 pt-0 flex flex-col items-center justify-center gap-3'>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input ref={nameInput} type="input" placeholder="Tuning name" />
                        <Button onClick={() => saveTuning()} type="submit">Save tuning</Button>
                    </div>
                    <div className='flex gap-1'>
                        {selectedNotesIndexes.map((noteIndex: number, i: number) => {
                            return (
                                <Popover key={i}>
                                    <PopoverTrigger asChild>
                                        <button className={`${styles.tuningNote}`}>{noteIndex !== -1 ? noteStrings[noteIndex] : <div className='text-[9px]'>{`String ${i + 1}`}</div>}</button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[150px] p-0">
                                        <Command className='grid grid-cols-2 p-1'>
                                            {noteStrings.map((note: string, stringIndex: number) => (
                                                <CommandItem
                                                    className='cursor-pointer'
                                                    value={note}
                                                    key={note}
                                                    onSelect={() => {
                                                        changeNote(stringIndex, i)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            stringIndex === selectedNotesIndexes[i]
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {note}
                                                </CommandItem>
                                            ))}
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CustomTunings;