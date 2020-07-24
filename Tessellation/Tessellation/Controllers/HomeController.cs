using System.Collections.Generic;
using System.Diagnostics;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
            ViewBag.Message = TempData["message"];
            ViewBag.User = HttpContext.Session.GetString("sessionUser");

            return View();
        }


        //[Authorize]
        public IActionResult Editor()
        {
            return View();
        }


        //I have to finish this 
        public void Authenticate(string userName)
        {
            var tessellationClaims = new List<Claim>() {
                    new Claim(ClaimTypes.Name, userName)
                };
            var tessellationIdentity = new ClaimsIdentity(tessellationClaims, "Tessellation Identity");
            var userPrincipal = new ClaimsPrincipal(tessellationIdentity);
            HttpContext.SignInAsync(userPrincipal);
        }


        public IActionResult Register(User user)
        {
            if (user.Password.Equals(user.ConfirmPassword))
            {
                QueryHandler.connect(_configuration);

                if (QueryHandler.executePasswordSelect(user.Name).Equals("NULL"))
                {
                    //registration was succesfull;
                    QueryHandler.insertUsernameAndPassword(user.Name, user.Password);
                    HttpContext.Session.SetString("sessionUser", user.Name);
                }
                else
                {
                    //try to register with existing username
                    TempData["message"] = "username is not available";
                    return RedirectToAction("Index");
                }
                return Login(user);
            }
            else
            {
                TempData["message"] = "password and confirm password are note the same!";
                return RedirectToAction("Index");
            }
        }


        public IActionResult Login(User user)
        {
            QueryHandler.connect(_configuration);

            if ((PasswordHandler.verifyPassword(user.Name, user.Password)))
            {
                HttpContext.Session.SetString("sessionUser", user.Name);
                //Authenticate(user.Name);
                return RedirectToAction("Editor");
            }
            else
            {

                return RedirectToAction("Index");
            }
        }


        public IActionResult LoginAsGuest(string guest)
        {
            //Authenticate(guest);
            HttpContext.Session.SetString("sessionUser", guest);
            return RedirectToAction("Editor");
        }


        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
