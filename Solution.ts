
function spellchecker(wordList: string[], queries: string[]): string[] {
    const utils = new Utils();
    initializeSetOriginalWords(wordList, utils);
    initializeMapCaseMismatchWords(wordList, utils);
    initializeMapVowelMismatchWords(wordList, utils);
    return createResultsForQueries(wordList, queries, utils);
};

function initializeSetOriginalWords(wordList: Array<string>, utils: Utils): void {
    for (let i = 0; i < wordList.length; ++i) {
        utils.originalWords.add(wordList[i]);
    }
}

function initializeMapCaseMismatchWords(wordList: Array<string>, utils: Utils): void {
    for (let i = 0; i < wordList.length; ++i) {
        const lowerCase = wordList[i].toLowerCase();
        if (!utils.caseMismatchWords.has(lowerCase)) {
            utils.caseMismatchWords.set(lowerCase, i);
        }
    }
}

function initializeMapVowelMismatchWords(wordList: Array<string>, utils: Utils): void {
    for (let i = 0; i < wordList.length; ++i) {
        const vowelsReplacedWithAsteriskToLowerCase = replaceVowelsWithAsteriskAndTransformToLowerCase(wordList[i]);
        if (!utils.vowelMismatchWords.has(vowelsReplacedWithAsteriskToLowerCase)) {
            utils.vowelMismatchWords.set(vowelsReplacedWithAsteriskToLowerCase, i);
        }
    }
}

function createResultsForQueries(wordList: Array<string>, queries: Array<string>, utils: Utils): Array<string> {
    const resultsForQueries = new Array<string>(queries.length);

    for (let i = 0; i < queries.length; ++i) {
        const word = queries[i];

        if (utils.originalWords.has(word)) {
            resultsForQueries[i] = word;
            continue;
        }

        const lowerCase = word.toLowerCase();
        if (utils.caseMismatchWords.has(lowerCase)) {
            const index = utils.caseMismatchWords.get(lowerCase);
            resultsForQueries[i] = wordList[index];
            continue;
        }

        const vowelsReplacedWithAsteriskToLowerCase = replaceVowelsWithAsteriskAndTransformToLowerCase(word);
        if (utils.vowelMismatchWords.has(vowelsReplacedWithAsteriskToLowerCase)) {
            const index = utils.vowelMismatchWords.get(vowelsReplacedWithAsteriskToLowerCase);
            resultsForQueries[i] = wordList[index];
            continue;
        }

        resultsForQueries[i] = Utils.NOT_FOUND;
    }

    return resultsForQueries;
}

function replaceVowelsWithAsteriskAndTransformToLowerCase(word: string): string {
    const vowelsReplacedWithAsteriskToLowerCase = new Array<string>();
    for (let letter of word) {
        letter = letter.toLowerCase();
        if (!isVowel(letter)) {
            vowelsReplacedWithAsteriskToLowerCase.push(letter);
            continue;
        }
        vowelsReplacedWithAsteriskToLowerCase.push(Utils.REPLACEMENT_FOR_VOWELS);
    }
    return vowelsReplacedWithAsteriskToLowerCase.join('');
}

function isVowel(letter: string): boolean {
    return letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u';
}

class Utils {

    static NOT_FOUND = "";
    static REPLACEMENT_FOR_VOWELS = '*';

    originalWords = new Set<string>();
    caseMismatchWords = new Map<string, number>();
    vowelMismatchWords = new Map<string, number>();
}
