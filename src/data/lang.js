/** Multilingual content helper: pick a field for the active language
 *  with a Hindi → English fallback chain. */
export const pick = (obj, lang) => obj?.[lang] || obj?.hi || obj?.en || '';

export default pick;
