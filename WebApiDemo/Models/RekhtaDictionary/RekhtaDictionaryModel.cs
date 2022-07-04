using RekhtaDictionary.Constants;
using HtmlAgilityPack;
using System.Text.RegularExpressions;

namespace Models.RekhtaDictionary
{
    public class RekhtaDictionaryModel
    {
        public string InputWord { get; set; }
        public HtmlDocument Document { get; set; }

        public RekhtaDictionaryModel(string word)
        {
            this.InputWord = word;

            HtmlWeb web = new HtmlWeb();
            this.Document = web.Load(string.Concat(Constants.WebsiteDomain,
                                                Constants.MeaningQueryPath,
                                                this.InputWord,
                                                Constants.KeywordParameter,
                                                this.InputWord));
        }

        public DictionaryResponse GetWebsiteOutput()
        {
            DictionaryResponse response = new DictionaryResponse();
            
            response.Origin = GetWordOrigin();
            response.Vazn = GetVazn();

            return response;
        }

        private string GetVazn()
        {
            var nodes = Utils.GetNodesWithClassName(Document, Constants.WordVaznClassName);
            if (nodes.Any())
            {
                return ParseVaznFromNode(nodes.First());
            }

            return string.Empty;
        }

        private string GetWordOrigin()
        {
            var nodes = Utils.GetNodesWithClassName(Document, Constants.WordOriginClassName);
            if (nodes.Any())
            {
                return ParseOriginFromNode(nodes.First());
            }

            return string.Empty;
        }

        private string ParseOriginFromNode(HtmlNode node)
        {
            string result = "";
            Regex regex = new Regex(":");
            string[] substrings = regex.Split(node.InnerHtml);
            int i = 0;
            foreach (string match in substrings)
            {
                if (i == 1)
                {
                    Regex reg = new Regex("\r");
                    string[] substring = reg.Split(match);
                    if(substring.Length > 0)
                    {
                        result = substring[0];
                    }
                }
                i += 1;
            }

            result = result.Trim();
            return result;
        }

        private string ParseVaznFromNode(HtmlNode node)
        {
            string result = "";
            Regex regex = new Regex(":");
            string[] substrings = regex.Split(node.InnerHtml);
            int i = 0;
            foreach (string match in substrings)
            {
                if (i == 1)
                {
                    Regex reg = new Regex("\r");
                    string[] substring = reg.Split(match);
                    if (substring.Length > 0)
                    {
                        result = substring[0];
                    }
                }
                i += 1;
            }

            result = result.Trim();
            return result;
        }
    }
}
