using RekhtaDictionary.Constants;
using HtmlAgilityPack;
using Models.RekhtaDictionary;

namespace RekhtaDictionaryAPI.TypeDefinition
{
    public class DictionaryResponse
    {
        public string Origin { get; set; }

        public string Vazn { get; set; }

        public Dictionary<Utils.SupportedLanguage, Meaning> MeaningByLanguage { get; set; }

    }
}
