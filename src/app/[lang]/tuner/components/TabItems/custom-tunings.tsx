import React from 'react';
// UI
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton"

// Other
import { InstrumentType } from '~/models/instruments';

import { api } from '~/trpc/react';

interface CustomTuningsProps {
    selectedInstrument: InstrumentType;
}

function CustomTunings({ selectedInstrument }: CustomTuningsProps) {
    const { data: userTunings, isLoading, isError } = api.post.getUserTunings.useQuery(
        { instrument: selectedInstrument },
        {
            queryKey: ['post.getUserTunings', { instrument: selectedInstrument }],
            staleTime: 60000
        }
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create custom tunings</CardTitle>
                <CardDescription>
                    Create your own custom tunings.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading &&
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                }
                {isError && "Error: Failed to load tunings"}
                {JSON.stringify(userTunings)}

                {/* TODO: make creation for tunings, tunings you create will be shown in this component
                Form draft:
                - input tuning name 
                - show notes the same way as in settings, but when you click dialog pops-up where you can select note
                */}
            </CardContent>
        </Card>
    );
}

export default CustomTunings;