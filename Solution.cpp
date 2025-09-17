
#include <cctype>
#include <ranges>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_set>
#include <unordered_map>
using namespace std;

class Solution {

    inline const static string NOT_FOUND = "";
    const static char REPLACEMENT_FOR_VOWELS = '*';

    unordered_set<string> originalWords;
    unordered_map<string, int> caseMismatchWords;
    unordered_map<string, int> vowelMismatchWords;

public:
    vector<string> spellchecker(vector<string>& wordList, vector<string>& queries) {
        initializeSetOriginalWords(wordList);
        initializeMapCaseMismatchWords(wordList);
        initializeMapVowelMismatchWords(wordList);
        return createResultsForQueries(wordList, queries);
    }

private:
    void initializeSetOriginalWords(const vector<string>& wordList) {
        for (int i = 0; i < wordList.size(); ++i) {
            originalWords.insert(wordList[i]);
        }
    }

    void initializeMapCaseMismatchWords(const vector<string>& wordList) {
        for (int i = 0; i < wordList.size(); ++i) {
            string lowerCase = wordList[i];
            ranges::transform(lowerCase, lowerCase.begin(), ::tolower);
            if (!caseMismatchWords.contains(lowerCase)) {
                caseMismatchWords[lowerCase] = i;
            }
        }
    }

    void initializeMapVowelMismatchWords(const vector<string>& wordList) {
        for (int i = 0; i < wordList.size(); ++i) {
            string vowelsReplacedWithAsteriskToLowerCase = replaceVowelsWithAsteriskAndTransformToLowerCase(wordList[i]);
            if (!vowelMismatchWords.contains(vowelsReplacedWithAsteriskToLowerCase)) {
                vowelMismatchWords[vowelsReplacedWithAsteriskToLowerCase] = i;
            }
        }
    }

    vector<string> createResultsForQueries(const vector<string>& wordList, const vector<string>& queries) const {
        vector<string> resultsForQueries(queries.size());

        for (int i = 0; i < queries.size(); ++i) {
            string word = queries[i];

            if (originalWords.contains(word)) {
                resultsForQueries[i] = word;
                continue;
            }

            string lowerCase = word;
            ranges::transform(lowerCase, lowerCase.begin(), ::tolower);
            if (caseMismatchWords.contains(lowerCase)) {
                int index = caseMismatchWords.at(lowerCase);
                resultsForQueries[i] = wordList[index];
                continue;
            }

            string vowelsReplacedWithAsteriskToLowerCase = replaceVowelsWithAsteriskAndTransformToLowerCase(word);
            if (vowelMismatchWords.contains(vowelsReplacedWithAsteriskToLowerCase)) {
                int index = vowelMismatchWords.at(vowelsReplacedWithAsteriskToLowerCase);
                resultsForQueries[i] = wordList[index];
                continue;
            }

            resultsForQueries[i] = NOT_FOUND;
        }

        return resultsForQueries;
    }

    string replaceVowelsWithAsteriskAndTransformToLowerCase(string word) const {
        string vowelsReplacedWithAsteriskToLowerCase;
        for (auto& letter : word) {
            letter = tolower(letter);
            if (!isVowel(letter)) {
                vowelsReplacedWithAsteriskToLowerCase.push_back(letter);
                continue;
            }
            vowelsReplacedWithAsteriskToLowerCase.push_back(REPLACEMENT_FOR_VOWELS);
        }
        return vowelsReplacedWithAsteriskToLowerCase;
    }

    bool isVowel(char letter) const {
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u';
    }
};
