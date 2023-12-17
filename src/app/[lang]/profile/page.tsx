import React from 'react';
import { getServerAuthSession } from '~/server/auth';

async function Profile() {
    const session = await getServerAuthSession();

    return (
        <div>
            This is your profile<br/>
            {session && <span>Logged in as {session.user?.name}</span>}
        </div>
    );
}

export default Profile;