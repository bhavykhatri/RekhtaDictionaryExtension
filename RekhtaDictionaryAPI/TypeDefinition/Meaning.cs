using RekhtaDictionary.Constants;
using HtmlAgilityPack;

namespace RekhtaDictionaryAPI.TypeDefinition
{
    public class Meaning
    {
        public List<string> PartOfSpeech { get; set; }

        public List<string> Description { get; set; }

        public string word { get; set; }

    }
}
