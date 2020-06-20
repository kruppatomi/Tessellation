using System.Collections.Generic;
using System.Diagnostics;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Tessellation.Models;
using Tessellation.Services;

namespace Tessellation.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;

        public HomeController(ILogger<HomeController> logger, IConfiguration config)
        {
            _logger = logger;
            _configuration = config;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Page2(User user)
        {
            QueryHandler.connect(_configuration);

            if (QueryHandler.executePasswordSelect(user.Name).Equals("NULL"))
            {
                QueryHandler.insertUsernameAndPassword(user.Name, user.Password);
            }

            if (PasswordHandler.verifyPassword(user.Name, user.Password))
            {
                user.Password = user.Password + " =Verified";
            }

            return View(user);
        }


        [Authorize]
        public IActionResult Secret()
        {
            return View();
        }


        public IActionResult Authenticate()
        {
            var grandmaClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, "Tommer"),
                new Claim(ClaimTypes.Email, "t@tmail.com"),
                new Claim("Grandma.Says", "very nice boy.")
            };

            var grandmaIdentity = new ClaimsIdentity(grandmaClaims, "Grandma Identity");
            var userPrincipal = new ClaimsPrincipal(grandmaIdentity);

            HttpContext.SignInAsync(userPrincipal);

            return RedirectToAction("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }
}
