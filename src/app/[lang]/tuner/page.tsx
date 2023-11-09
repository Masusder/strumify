import GuitarTuner from "./guitar-tuner";
import { getLocales } from "~/get-dictionary";

async function Tuner({
    params: { lang },
  }: {
    params: { lang: Locale }
  }) {
    const t = await getLocales(lang);

    return (
        <GuitarTuner t={t} />
    );
}

export default Tuner;