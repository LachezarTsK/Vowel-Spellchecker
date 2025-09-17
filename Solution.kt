
class Solution {

    private companion object {
        const val NOT_FOUND = ""
        const val REPLACEMENT_FOR_VOWELS = '*'
    }

    private val originalWords = mutableSetOf<String>()
    private val caseMismatchWords = mutableMapOf<String, Int>()
    private val vowelMismatchWords = mutableMapOf<String, Int>()

    fun spellchecker(wordList: Array<String>, queries: Array<String>): Array<String> {
        initializeSetOriginalWords(wordList)
        initializeMapCaseMismatchWords(wordList)
        initializeMapVowelMismatchWords(wordList)
        return createResultsForQueries(wordList, queries)
    }

    private fun initializeSetOriginalWords(wordList: Array<String>) {
        for (i in wordList.indices) {
            originalWords.add(wordList[i])
        }
    }

    private fun initializeMapCaseMismatchWords(wordList: Array<String>) {
        for (i in wordList.indices) {
            val lowerCase = wordList[i].lowercase()
            if (!caseMismatchWords.containsKey(lowerCase)) {
                caseMismatchWords[lowerCase] = i
            }
        }
    }

    private fun initializeMapVowelMismatchWords(wordList: Array<String>) {
        for (i in wordList.indices) {
            val vowelsReplacedWithAsteriskToLowerCase = replaceVowelsWithAsteriskAndTransformToLowerCase(wordList[i])
            if (!vowelMismatchWords.containsKey(vowelsReplacedWithAsteriskToLowerCase)) {
                vowelMismatchWords[vowelsReplacedWithAsteriskToLowerCase] = i
            }
        }
    }

    private fun createResultsForQueries(wordList: Array<String>, queries: Array<String>): Array<String> {
        val resultsForQueries = Array<String>(queries.size) { "" }

        for (i in queries.indices) {
            val word = queries[i]

            if (originalWords.contains(word)) {
                resultsForQueries[i] = word
                continue
            }

            val lowerCase = word.lowercase()
            if (caseMismatchWords.containsKey(lowerCase)) {
                val index = caseMismatchWords[lowerCase]!!
                resultsForQueries[i] = wordList[index]
                continue
            }

            val vowelsReplacedWithAsteriskToLowerCase = replaceVowelsWithAsteriskAndTransformToLowerCase(word)
            if (vowelMismatchWords.containsKey(vowelsReplacedWithAsteriskToLowerCase)) {
                val index = vowelMismatchWords[vowelsReplacedWithAsteriskToLowerCase]!!
                resultsForQueries[i] = wordList[index]
                continue
            }

            resultsForQueries[i] = NOT_FOUND
        }

        return resultsForQueries
    }

    private fun replaceVowelsWithAsteriskAndTransformToLowerCase(word: String): String {
        val vowelsReplacedWithAsteriskToLowerCase = StringBuilder()
        for (letter in word.lowercase()) {
            if (!isVowel(letter)) {
                vowelsReplacedWithAsteriskToLowerCase.append(letter)
                continue
            }
            vowelsReplacedWithAsteriskToLowerCase.append(REPLACEMENT_FOR_VOWELS)
        }
        return vowelsReplacedWithAsteriskToLowerCase.toString()
    }

    private fun isVowel(letter: Char): Boolean {
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u'
    }
}
