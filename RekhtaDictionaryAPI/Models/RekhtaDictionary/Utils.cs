using RekhtaDictionary.Constants;
using HtmlAgilityPack;

namespace Models.RekhtaDictionary
{
    public static class Utils
    {
        public enum SupportedLanguage
        {
            English,
            Hindi,
            Urdu
        }

        public static IEnumerable<HtmlNode> GetNodesWithClassName(HtmlDocument document, string className)
        {
            return document.DocumentNode.Descendants(0).Where(n => n.HasClass(className));
        }

    }
}
