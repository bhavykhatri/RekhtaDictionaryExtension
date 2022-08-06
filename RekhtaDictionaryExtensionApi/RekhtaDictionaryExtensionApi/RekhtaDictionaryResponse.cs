using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Models.RekhtaDictionary;
using RekhtaDictionary;
using RekhtaDictionaryAPI.TypeDefinition;
using System.Collections.Generic;
using System.Linq;

namespace RekhtaDictionaryExtensionApi
{
    public static class RekhtaDictionaryResponse
    {
        [FunctionName("RekhtaDictionaryResponse")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string word = req.Query["word"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            word = word ?? data?.word;

            /*string responseMessage = string.IsNullOrEmpty(word)
                ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
                : $"Hello, {word}. This HTTP triggered function executed successfully.";
*/
            var response = new DictionaryResponse();
            if (!string.IsNullOrEmpty(word))
            {
                var rekhtaDicModel = await RekhtaDictionaryModel.BuildViewModelAsync(word);
                response = rekhtaDicModel.GetWebsiteOutput();

                if (response.Status == ResponseStatus.NoResponse)
                {
                    if (response.RelatedWords != null && response.RelatedWords.Any())
                    {
                        rekhtaDicModel = await RekhtaDictionaryModel.BuildViewModelAsync(response.RelatedWords[0]);
                        var relatedWordResponse = rekhtaDicModel.GetWebsiteOutput();
                        response = relatedWordResponse;
                    }
                }
            }

            log.LogInformation(word, response);

            return new OkObjectResult(response);
        }
    }
}
