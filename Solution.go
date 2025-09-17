
package main
import "strings"

const NOT_FOUND = ""
const REPLACEMENT_FOR_VOWELS = '*'

var originalWords HashSet
var caseMismatchWords map[string]int
var vowelMismatchWords map[string]int

func spellchecker(wordList []string, queries []string) []string {
    initializeSetOriginalWords(wordList)
    initializeMapCaseMismatchWords(wordList)
    initializeMapVowelMismatchWords(wordList)
    return createResultsForQueries(wordList, queries)
}

func initializeSetOriginalWords(wordList []string) {
    originalWords = NewHashSet()
    for i := range wordList {
        originalWords.Add(wordList[i])
    }
}

func initializeMapCaseMismatchWords(wordList []string) {
    caseMismatchWords = map[string]int{}
    for i := range wordList {
        lowerCase := strings.ToLower(wordList[i])
        if _, has := caseMismatchWords[lowerCase]; !has {
            caseMismatchWords[lowerCase] = i
        }
    }
}

func initializeMapVowelMismatchWords(wordList []string) {
    vowelMismatchWords = map[string]int{}
    for i := range wordList {
        vowelsReplacedWithAsteriskToLowerCase := replaceVowelsWithAsteriskAndTransformToLowerCase(wordList[i])
        if _, has := vowelMismatchWords[vowelsReplacedWithAsteriskToLowerCase]; !has {
            vowelMismatchWords[vowelsReplacedWithAsteriskToLowerCase] = i
        }
    }
}

func createResultsForQueries(wordList []string, queries []string) []string {
    resultsForQueries := make([]string, len(queries))

    for i := range queries {
        word := queries[i]

        if originalWords.Contains(word) {
            resultsForQueries[i] = word
            continue
        }

        lowerCase := strings.ToLower(word)
        if _, has := caseMismatchWords[lowerCase]; has {
            index := caseMismatchWords[lowerCase]
            resultsForQueries[i] = wordList[index]
            continue
        }

        vowelsReplacedWithAsteriskToLowerCase := replaceVowelsWithAsteriskAndTransformToLowerCase(word)
        if _, has := vowelMismatchWords[vowelsReplacedWithAsteriskToLowerCase]; has {
            index := vowelMismatchWords[vowelsReplacedWithAsteriskToLowerCase]
            resultsForQueries[i] = wordList[index]
            continue
        }

        resultsForQueries[i] = NOT_FOUND
    }

    return resultsForQueries
}

func replaceVowelsWithAsteriskAndTransformToLowerCase(word string) string {
    vowelsReplacedWithAsteriskToLowerCase := make([]byte, 0)
    word = strings.ToLower(word)
    for i := range word {
        if !isVowel(word[i]) {
            vowelsReplacedWithAsteriskToLowerCase = append(vowelsReplacedWithAsteriskToLowerCase, word[i])
            continue
        }
        vowelsReplacedWithAsteriskToLowerCase = append(vowelsReplacedWithAsteriskToLowerCase, REPLACEMENT_FOR_VOWELS)
    }
    return string(vowelsReplacedWithAsteriskToLowerCase)
}

func isVowel(letter byte) bool {
    return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u'
}

type HashSet struct {
    conainer map[string]bool
}

func NewHashSet() HashSet {
    return HashSet{conainer: map[string]bool{}}
}

func (this *HashSet) Contains(value string) bool {
    return this.conainer[value]
}

func (this *HashSet) Add(value string) {
    this.conainer[value] = true
}

func (this *HashSet) Remove(value string) {
    delete(this.conainer, value)
}
