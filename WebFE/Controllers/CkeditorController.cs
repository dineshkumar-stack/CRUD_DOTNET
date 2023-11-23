using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using WebFE.Models;

namespace ckeditor_main.Controllers
{
    public class CkeditorController : Controller
    {
		Uri baseAddress = new Uri("https://localhost:7087/api");

		private readonly HttpClient _client;

		public CkeditorController()
		{
			_client = new HttpClient();
			_client.BaseAddress = baseAddress;
		}

		[HttpGet]
		public IActionResult EditorNew(int id)
		{
			try
			{
				CkeditorViewModel company = new CkeditorViewModel();
				HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/Ckeditor/GetById/" + id).Result;

				if (response.IsSuccessStatusCode)
				{
					string data = response.Content.ReadAsStringAsync().Result;
					company = JsonConvert.DeserializeObject<CkeditorViewModel>(data);
				}
				return View(company);

			}
			catch (Exception ex)
			{
				TempData["errorMessage"] = ex.Message;
				return View();
			}
		}

	}
}
