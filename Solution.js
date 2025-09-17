
/**
 * @param {string[]} wordList
 * @param {string[]} queries
 * @return {string[]}
 */
var spellchecker = function (wordList, queries) {
    const utils = new Utils();
    initializeSetOriginalWords(wordList, utils);
    initializeMapCaseMismatchWords(wordList, utils);
    initializeMapVowelMismatchWords(wordList, utils);
    return createResultsForQueries(wordList, queries, utils);
};

/**
 * @param {string[]} wordList
 * @param {Utils} utils
 * @return {void}
 */
function initializeSetOriginalWords(wordList, utils) {
    for (let i = 0; i < wordList.length; ++i) {
        utils.originalWords.add(wordList[i]);
    }
}

/**
 * @param {string[]} wordList
 * @param {Utils} utils
 * @return {void}
 */
function initializeMapCaseMismatchWords(wordList, utils) {
    for (let i = 0; i < wordList.length; ++i) {
        const lowerCase = wordList[i].toLowerCase();
        if (!utils.caseMismatchWords.has(lowerCase)) {
            utils.caseMismatchWords.set(lowerCase, i);
        }
    }
}

/**
 * @param {string[]} wordList
 * @param {Utils} utils
 * @return {void}
 */
function initializeMapVowelMismatchWords(wordList, utils) {
    for (let i = 0; i < wordList.length; ++i) {
        const vowelsReplacedWithAsteriskToLowerCase = replaceVowelsWithAsteriskAndTransformToLowerCase(wordList[i]);
        if (!utils.vowelMismatchWords.has(vowelsReplacedWithAsteriskToLowerCase)) {
            utils.vowelMismatchWords.set(vowelsReplacedWithAsteriskToLowerCase, i);
        }
    }
}

/**
 * @param {string[]} wordList
 * @param {string[]} queries
 * @param {Utils} utils
 * @return {string[]}
 */
function createResultsForQueries(wordList, queries, utils) {
    const resultsForQueries = new Array(queries.length);

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

/**
 * @param {string} word
 * @return {string}
 */
function replaceVowelsWithAsteriskAndTransformToLowerCase(word) {
    const vowelsReplacedWithAsteriskToLowerCase = new Array();
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

/**
 * @param {string} letter
 * @return {boolean}
 */
function isVowel(letter) {
    return letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u';
}

class Utils {

    static NOT_FOUND = "";
    static REPLACEMENT_FOR_VOWELS = '*';

    // Set<string>
    originalWords = new Set();

    // Map<string, number>
    caseMismatchWords = new Map();

    // Map<string, number>
    vowelMismatchWords = new Map();
}
