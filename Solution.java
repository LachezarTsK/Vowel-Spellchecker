
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Solution {

    private static final String NOT_FOUND = "";
    private static final char REPLACEMENT_FOR_VOWELS = '*';

    private final Set<String> originalWords = new HashSet<>();
    private final Map<String, Integer> caseMismatchWords = new HashMap<>();
    private final Map<String, Integer> vowelMismatchWords = new HashMap<>();

    public String[] spellchecker(String[] wordList, String[] queries) {
        initializeSetOriginalWords(wordList);
        initializeMapCaseMismatchWords(wordList);
        initializeMapVowelMismatchWords(wordList);
        return createResultsForQueries(wordList, queries);
    }

    private void initializeSetOriginalWords(String[] wordList) {
        for (int i = 0; i < wordList.length; ++i) {
            originalWords.add(wordList[i]);
        }
    }

    private void initializeMapCaseMismatchWords(String[] wordList) {
        for (int i = 0; i < wordList.length; ++i) {
            String lowerCase = wordList[i].toLowerCase();
            if (!caseMismatchWords.containsKey(lowerCase)) {
                caseMismatchWords.put(lowerCase, i);
            }
        }
    }

    private void initializeMapVowelMismatchWords(String[] wordList) {
        for (int i = 0; i < wordList.length; ++i) {
            String vowelsReplacedWithAsteriskToLowerCase = replaceVowelsWithAsteriskAndTransformToLowerCase(wordList[i]);
            if (!vowelMismatchWords.containsKey(vowelsReplacedWithAsteriskToLowerCase)) {
                vowelMismatchWords.put(vowelsReplacedWithAsteriskToLowerCase, i);
            }
        }
    }

    private String[] createResultsForQueries(String[] wordList, String[] queries) {
        String[] resultsForQueries = new String[queries.length];

        for (int i = 0; i < queries.length; ++i) {
            String word = queries[i];

            if (originalWords.contains(word)) {
                resultsForQueries[i] = word;
                continue;
            }

            String lowerCase = word.toLowerCase();
            if (caseMismatchWords.containsKey(lowerCase)) {
                int index = caseMismatchWords.get(lowerCase);
                resultsForQueries[i] = wordList[index];
                continue;
            }

            String vowelsReplacedWithAsteriskToLowerCase = replaceVowelsWithAsteriskAndTransformToLowerCase(word);
            if (vowelMismatchWords.containsKey(vowelsReplacedWithAsteriskToLowerCase)) {
                int index = vowelMismatchWords.get(vowelsReplacedWithAsteriskToLowerCase);
                resultsForQueries[i] = wordList[index];
                continue;
            }

            resultsForQueries[i] = NOT_FOUND;
        }

        return resultsForQueries;
    }

    private String replaceVowelsWithAsteriskAndTransformToLowerCase(String word) {
        StringBuilder vowelsReplacedWithAsteriskToLowerCase = new StringBuilder();
        for (char letter : word.toCharArray()) {
            letter = Character.toLowerCase(letter);
            if (!isVowel(letter)) {
                vowelsReplacedWithAsteriskToLowerCase.append(letter);
                continue;
            }
            vowelsReplacedWithAsteriskToLowerCase.append(REPLACEMENT_FOR_VOWELS);
        }
        return vowelsReplacedWithAsteriskToLowerCase.toString();
    }

    private boolean isVowel(char letter) {
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u';
    }
}
