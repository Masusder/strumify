import React from 'react';

// UI
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/components/ui/tooltip";
import { PackagePlus } from 'lucide-react';

// Components
import CustomTunings from './custom-tunings';

// Other
import { InstrumentType } from '~/models/instruments';
import { Session } from 'next-auth';

interface CreaTuningDialogProps {
    selectedInstrument: InstrumentType;
    session: Session | null;
}

function CreateTuningDialog({ selectedInstrument, session }: CreaTuningDialogProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
                                <PackagePlus />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Create custom tuning</p>
                        </TooltipContent>
                    </Tooltip></TooltipProvider>
            </DialogTrigger>
            <DialogContent className='w-[95%] rounded-lg'>
                <DialogHeader>
                    <DialogTitle>Create custom tuning</DialogTitle>
                    <div>
                        <CustomTunings selectedInstrument={selectedInstrument} session={session} />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
}

export default CreateTuningDialog;