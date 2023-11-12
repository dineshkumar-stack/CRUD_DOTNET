using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using WebFE.Models;

namespace WebFE.Controllers
{
    public class CompanyController : Controller
    {
        Uri baseAddress = new Uri("https://localhost:7087/api");

        private readonly HttpClient _client;

        public CompanyController()
        {
            _client = new HttpClient();
            _client.BaseAddress = baseAddress;
        }

        [HttpGet]
        public IActionResult Index()
        {
            List<CompanyViewModel> Companylist = new List<CompanyViewModel>();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/CompanyList/GetCompany").Result;
          
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Companylist = JsonConvert.DeserializeObject<List<CompanyViewModel>>(data);
            }
            return View(Companylist);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(CompanyViewModel model)
        {
            try
            {
                string data = JsonConvert.SerializeObject(model);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage response = _client.PostAsync(_client.BaseAddress + "/CompanyList/CreateCompany", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    TempData["successMessage"] = "Company Created.";
                    return RedirectToAction("Index");
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();
            }
            return View();
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            try
            {
                CompanyViewModel company = new CompanyViewModel();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/CompanyList/GetCompanybyId/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    company = JsonConvert.DeserializeObject<CompanyViewModel>(data);
                }
                return View(company);

            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();

            }


        }
        [HttpPost]
        public IActionResult Edit(CompanyViewModel model, int id)
        {
            try
            {
                string data = JsonConvert.SerializeObject(model);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage response = _client.PutAsync(_client.BaseAddress + "/CompanyList/PutCompanybyId/" + id, content).Result;


                if (response.IsSuccessStatusCode)
                {
                    TempData["successMessage"] = "Company details updated";
                    return RedirectToAction("Index");
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();
            }
            return View();
        }

        [HttpGet]
        public IActionResult Delete(int id)
        {
            try
            {
                CompanyViewModel company = new CompanyViewModel();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress +
                    "/CompanyList/GetCompanybyId/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    company = JsonConvert.DeserializeObject<CompanyViewModel>(data);
                }
                return View(company);

            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();
            }
        }
        [HttpPost, ActionName("Delete")]

        public IActionResult DeleteConfirmed(int id)
        {
            try
            {
                HttpResponseMessage response = _client.DeleteAsync(_client.BaseAddress + "/CompanyList/DeleteCompanybyId/" + id).Result;

                if (response.IsSuccessStatusCode)
                {
                    TempData["successMessage"] = "Company Deleted";
                    return RedirectToAction("Index");
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();
            }
            return View();
        }


    }
}
