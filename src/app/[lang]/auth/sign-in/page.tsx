"use client"
import React from 'react';
import { signIn } from 'next-auth/react'

async function SignIn() {

    return (
        <div>
            Custom login page

            <button onClick={() => signIn('discord')}>Sign in with Discord</button>
        </div>
    );
}

export default SignIn;