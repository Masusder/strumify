import React from 'react';
import Image from 'next/image';
import styles from './tuner.module.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"

function GuitarTuner() {
    return (
        <div className='m-auto bg-customBg'>
            <div className='flex justify-center max-w-screen-2xl m-auto'>
                <div className='mt-4' style={{ width: "560px" }}>
                    <Image src="/assets/images/Tuner/GuitarHeadstock.png" priority className='drop-shadow-md' alt="Guitar headstock" width={368.35} height={500} />
                </div>
                <Tabs defaultValue="instruments" className="w-[400px] my-4">
                    <TabsList>
                        <TabsTrigger value="instruments">Instruments</TabsTrigger>
                        <TabsTrigger value="password">Select tuning</TabsTrigger>
                    </TabsList>
                    <TabsContent value="instruments">
                        <Card>
                            <CardHeader>
                                <CardTitle>Select instrument</CardTitle>
                                <CardDescription>
                                    Choose instrument you would like to tune.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Instrument 1</Label>

                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Instrument 2</Label>

                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you'll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>

                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>

                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div className={'block bg-rose-600 h-6 w-full shadow-md ' + styles.blockShadow} />
        </div>
    );
}

export default GuitarTuner;