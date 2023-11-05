import GuitarTuner from "./_components/guitar-tuner";
import { getLocales } from "~/get-dictionary";

async function Tuner({ params }: any) {
    const t = await getLocales(params.lang);

    return (
        <GuitarTuner t={t} />
    );
}

export default Tuner;