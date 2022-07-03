using Microsoft.AspNetCore.Mvc;
using Models.RekhtaDictionary;
using RekhtaDictionary;

namespace WebApiDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RekhtaDictionaryController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public RekhtaDictionaryController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "RekhtaDictionary")]
        public DictionaryResponse GetInteger(string word)
        {
            var rekhtaDicModel = new RekhtaDictionaryModel(word);
            return rekhtaDicModel.GetWebsiteOutput();
        }
    }
}