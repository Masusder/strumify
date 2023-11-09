type GuitarData = {
    tuningFrequency: number[],
    tuningNotation: string[],
    imageSrc: string
}
  
type Locale = 'en' | 'de' | 'pl' | 'fr' | 'es' | 'pt' | 'ru' | 'ja' | 'ko' | 'zh';

type LocalizationData = {
    [componentName: string]: {
        [key: string]: string;
    };
};