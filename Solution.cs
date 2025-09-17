
using System;
using System.Collections.Generic;

public class Solution
{
    private static readonly string NOT_FOUND = "";
    private static readonly char REPLACEMENT_FOR_VOWELS = '*';

    private readonly HashSet<string> originalWords = [];
    private readonly Dictionary<string, int> caseMismatchWords = [];
    private readonly Dictionary<string, int> vowelMismatchWords = [];

    public string[] Spellchecker(string[] wordList, string[] queries)
    {
        initializeSetOriginalWords(wordList);
        initializeMapCaseMismatchWords(wordList);
        initializeMapVowelMismatchWords(wordList);
        return createResultsForQueries(wordList, queries);
    }

    private void initializeSetOriginalWords(string[] wordList)
    {
        for (int i = 0; i < wordList.Length; ++i)
        {
            originalWords.Add(wordList[i]);
        }
    }

    private void initializeMapCaseMismatchWords(string[] wordList)
    {
        for (int i = 0; i < wordList.Length; ++i)
        {
            string lowerCase = wordList[i].ToLower();
            if (!caseMismatchWords.ContainsKey(lowerCase))
            {
                caseMismatchWords.Add(lowerCase, i);
            }
        }
    }

    private void initializeMapVowelMismatchWords(string[] wordList)
    {
        for (int i = 0; i < wordList.Length; ++i)
        {
            string vowelsReplacedWithAsteriskToLowerCase = ReplaceVowelsWithAsteriskAndTransformToLowerCase(wordList[i]);
            if (!vowelMismatchWords.ContainsKey(vowelsReplacedWithAsteriskToLowerCase))
            {
                vowelMismatchWords.Add(vowelsReplacedWithAsteriskToLowerCase, i);
            }
        }
    }

    private string[] createResultsForQueries(string[] wordList, string[] queries)
    {
        string[] resultsForQueries = new string[queries.Length];

        for (int i = 0; i < queries.Length; ++i)
        {
            string word = queries[i];

            if (originalWords.Contains(word))
            {
                resultsForQueries[i] = word;
                continue;
            }

            string lowerCase = word.ToLower();
            if (caseMismatchWords.ContainsKey(lowerCase))
            {
                int index = caseMismatchWords[lowerCase];
                resultsForQueries[i] = wordList[index];
                continue;
            }

            string vowelsReplacedWithAsteriskToLowerCase = ReplaceVowelsWithAsteriskAndTransformToLowerCase(word);
            if (vowelMismatchWords.ContainsKey(vowelsReplacedWithAsteriskToLowerCase))
            {
                int index = vowelMismatchWords[vowelsReplacedWithAsteriskToLowerCase];
                resultsForQueries[i] = wordList[index];
                continue;
            }

            resultsForQueries[i] = NOT_FOUND;
        }

        return resultsForQueries;
    }

    private string ReplaceVowelsWithAsteriskAndTransformToLowerCase(string word)
    {
        StringBuilder vowelsReplacedWithAsteriskToLowerCase = new StringBuilder();
        foreach (char letter in word.ToLower())
        {
            if (!IsVowel(letter))
            {
                vowelsReplacedWithAsteriskToLowerCase.Append(letter);
                continue;
            }
            vowelsReplacedWithAsteriskToLowerCase.Append(REPLACEMENT_FOR_VOWELS);
        }
        return vowelsReplacedWithAsteriskToLowerCase.ToString();
    }

    private bool IsVowel(char letter)
    {
        return letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u';
    }
}
