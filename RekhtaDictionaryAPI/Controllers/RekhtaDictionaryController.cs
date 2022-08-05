using Microsoft.AspNetCore.Mvc;
using Models.RekhtaDictionary;
using RekhtaDictionary;
using RekhtaDictionaryAPI.TypeDefinition;

namespace WebApiDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RekhtaDictionaryController : ControllerBase
    {
        private readonly ILogger<RekhtaDictionaryController> _logger;

        public RekhtaDictionaryController(ILogger<RekhtaDictionaryController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "RekhtaDictionary")]
        public DictionaryResponse GetInteger(string word)
        {
            var rekhtaDicModel = new RekhtaDictionaryModel(word);
            var response = rekhtaDicModel.GetWebsiteOutput();

            if(response.Status == ResponseStatus.NoResponse)
            {
                if(response.RelatedWords != null && response.RelatedWords.Any())
                {
                    rekhtaDicModel = new RekhtaDictionaryModel(response.RelatedWords[0]);
                    var relatedWordResponse = rekhtaDicModel.GetWebsiteOutput(); 
                    return relatedWordResponse;
                }
            }
            return response;
        }
    }
}