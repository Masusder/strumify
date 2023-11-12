import GuitarTuner from "./guitar-tuner";
import { getLocales } from "~/get-dictionary";

import { getServerAuthSession } from "~/server/auth";

async function Tuner({
    params: { lang },
  }: {
    params: { lang: Locale }
  }) {
    const t = await getLocales(lang);
    const session = await getServerAuthSession();

    return (
        <GuitarTuner t={t} session={session} />
    );
}

export default Tuner;