using RekhtaDictionary.Constants;
using HtmlAgilityPack;
using Models.RekhtaDictionary;

namespace RekhtaDictionaryAPI.TypeDefinition
{
    public enum ResponseStatus
    {
        NoResponse,
        Ok
    }
    public class DictionaryResponse
    {
        public string Origin { get; set; }

        public string Vazn { get; set; }

        public Dictionary<Utils.SupportedLanguage, Meaning> MeaningByLanguage { get; set; }

        public List<string> RelatedWords { get; set; }

        public ResponseStatus Status { get; set; }

    }
}
