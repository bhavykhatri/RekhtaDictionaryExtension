using RekhtaDictionary.Constants;
using HtmlAgilityPack;
using System.Text.RegularExpressions;
using RekhtaDictionaryAPI.TypeDefinition;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace Models.RekhtaDictionary
{
    public class RekhtaDictionaryModel
    {
        public string InputWord { get; set; }
        public HtmlDocument Document { get; set; }

        async public static Task<RekhtaDictionaryModel> BuildViewModelAsync(string word)
        {
            HtmlWeb web = new HtmlWeb();
            var document = await web.LoadFromWebAsync(string.Concat(Constants.WebsiteDomain,
                                                Constants.MeaningQueryPath,
                                                word,
                                                Constants.KeywordParameter,
                                                word));

            return new RekhtaDictionaryModel(word, document);
        }

        public RekhtaDictionaryModel(string word, HtmlDocument document)
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
            response.MeaningByLanguage = GetMeaningByLanguage();
            response.Status = (response.MeaningByLanguage.Count()==0? ResponseStatus.NoResponse: ResponseStatus.Ok);

            if (response.Status == ResponseStatus.NoResponse)
            {
                response.RelatedWords = FindRelatedWords();
            }

            return response;
        }

        public List<string> FindRelatedWords()
        {
            var result = new List<string>();
            var nodes = Utils.GetNodesWithClassName(Document, "rdEngSrchWordContnr");
            
            var descNodes = nodes!=null && nodes.Count()!=0 ? nodes?.First()?.SelectNodes(".//li/a") : null;

            if(descNodes != null)
            {
                foreach (var desNode in descNodes)
                {
                    result.Add(System.Web.HttpUtility.HtmlDecode(desNode.InnerText).Replace("\'", ""));
                }
            }
            
            return result;
        }

        private Dictionary<Utils.SupportedLanguage, Meaning> GetMeaningByLanguage()
        {
            var meaningByLang = new Dictionary<Utils.SupportedLanguage, Meaning>();
            var nodes = Utils.GetNodesWithClassName(Document, Constants.PartsOfSpeechContainer);

            foreach(var node in nodes)
            {
                if (DoesContainMeaning(node))
                {
                    var language = FindLanguageOfMeaning(node);

                    var meaning = new Meaning();
                    meaning.PartOfSpeech = FindPartOfSpeech(node);
                    meaning.Description = FindDescription(node);
                    meaning.word = FindWord(node);

                    meaningByLang.Add(language, meaning);
                }
            }

            return meaningByLang;
        }
        private string FindWord(HtmlNode node)
        {
            var x = node?.Descendants(0).Where(n => n.HasClass("WordMeaningEng"));
            var final = x?.First()?.ChildNodes?["span"];

            if(final != null)
            {
                return final.InnerText;
            }

            return string.Empty;
        }

        private List<string> FindDescription(HtmlNode node)
        {
            var description = new List<string>();

            var x = node?.ChildNodes.Where(n => n.HasClass(Constants.MeaningContainer));
            //var descNodes = x?.First()?.Descendants(0).Where(n => n.HasClass("seemeaning"));

            var descNodes = x?.First()?.SelectNodes(".//li");

            foreach (var descNode in descNodes)
            {
                var text = descNode.InnerText.Replace(System.Environment.NewLine, string.Empty);
                text = Regex.Replace(text, " {2,}", string.Empty);
                description.Add(text);
            }

            return description;
        }

        private List<string> FindPartOfSpeech(HtmlNode node)
        {
            var result = new List<string>();

            var x = node?.ChildNodes.Where(n => n.HasClass(Constants.MeaningContainer));
            var y = x?.First()?.Descendants(0).Where(n => n.HasClass("rdwordOrigin"));

            // var y = x?.First()?.ChildNodes.Where(n => n.HasClass("rdwordOrigin"));
            var z = y?.First()?.ChildNodes?["span"];
            var posNode = z?.FirstChild;
            
            if(posNode != null)
            {
                result.Add(posNode.InnerText);
            }

            return result;
        }

        private Utils.SupportedLanguage FindLanguageOfMeaning(HtmlNode node)
        {
            Utils.SupportedLanguage language;
            string lang  = string.Empty;

            var langLabelNode = node?.ChildNodes.Where(n => n.HasClass(Constants.LanguageOfMeaningClass))?.First()?.ChildNodes["label"];

            if(langLabelNode != null)
            {
                var attr = langLabelNode.GetAttributes();
                foreach(var attribute in attr)
                {
                    if(attribute.Name == "data-lang")
                    {
                        lang = attribute.Value;
                    }
                }
            }

            if(lang == "English")
            {
               return Utils.SupportedLanguage.English;

            }
            else if(lang == "Hindi"){
                return Utils.SupportedLanguage.Hindi;
            }

            return Utils.SupportedLanguage.Urdu;
        }

        private bool DoesContainMeaning(HtmlNode node)
        {
            int count = 0;

            if (node.HasChildNodes && node.ChildNodes.Count >= 2)
            {
                var childNodes = node.ChildNodes;

                foreach(var childNode in childNodes)
                {
                    if (childNode.HasClass(Constants.LanguageOfMeaningClass) 
                        || childNode.HasClass(Constants.MeaningContainer))
                    {
                        count++;
                    }
                }
            }

            if(count == 2)
            {
                return true;
            }

            return false;
        }

        private string GetVazn()
        {
            var nodes = Utils.GetNodesWithClassName(Document, Constants.WordVaznClassName);
            if (nodes.Any())
            {
                return ParseOriginOrVaznFromNode(nodes.First());
            }

            return string.Empty;
        }

        private string GetWordOrigin()
        {
            var nodes = Utils.GetNodesWithClassName(Document, Constants.WordOriginClassName);
            if (nodes.Any())
            {
                return ParseOriginOrVaznFromNode(nodes.First());
            }

            return string.Empty;
        }

        private string ParseOriginOrVaznFromNode(HtmlNode node)
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

    }
}
