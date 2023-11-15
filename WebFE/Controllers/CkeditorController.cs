using Microsoft.AspNetCore.Mvc;

namespace ckeditor_main.Controllers
{
    public class CkeditorController : Controller
    {
        public IActionResult Editor()
        {
            return View();
        }
    }
}
