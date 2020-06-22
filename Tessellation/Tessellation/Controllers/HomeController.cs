using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Owin.Security.Cookies;
using Tessellation.Models;
using Tessellation.Services;
using System.Web;
using Newtonsoft.Json;

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

        //public IActionResult Page2(User user)
        //{
        //    QueryHandler.connect(_configuration);

        //    //register
        //    if (QueryHandler.executePasswordSelect(user.Name).Equals("NULL"))
        //    {
        //        QueryHandler.insertUsernameAndPassword(user.Name, user.Password);
        //        return View(user);
        //    }
        //    else
        //    //login
        //    {
        //        if((PasswordHandler.verifyPassword(user.Name, user.Password)))
        //        {
        //            user.Password = user.Password + " =Verified";
        //            return View(user);
        //        }
        //        else
        //        {
        //            return View(user);
        //        }
        //    }
        //}


        //[Authorize]
        public IActionResult Editor()
        {
            return View();
        }


        //public IActionResult Authenticate()
        //{
        //    var grandmaClaims = new List<Claim>()
        //    {
        //        new Claim(ClaimTypes.Name, "Tommer"),
        //        new Claim(ClaimTypes. "t@tmail.com"),
        //        new Claim("Grandma.Says", "very nice boy.")
        //    };

        //    var grandmaIdentity = new ClaimsIdentity(grandmaClaims, "Grandma Identity");
        //    var userPrincipal = new ClaimsPrincipal(grandmaIdentity);

        //    HttpContext.SignInAsync(userPrincipal);

        //    return RedirectToAction("Index");
        //}

        public IActionResult Register(User user)
        {
            if (user.Password.Equals(user.ConfirmPassword))
            {
                QueryHandler.connect(_configuration);

                if (QueryHandler.executePasswordSelect(user.Name).Equals("NULL"))
                {
                    QueryHandler.insertUsernameAndPassword(user.Name, user.Password);
                    //TempData["message"] = "registration was succesfull";
                    HttpContext.Session.SetString("sessionUser", user.Name);
                }
                else
                {
                    //try to register with existing username
                    TempData["message"] = "username is not available";


                    return RedirectToAction("Index");
                }
                //az authentikációt át kellene rakni a loginba
                var tessellationClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.Name)
            };

                var tessellationIdentity = new ClaimsIdentity(tessellationClaims, "Tessellation Identity");
                var userPrincipal = new ClaimsPrincipal(tessellationIdentity);

                HttpContext.SignInAsync(userPrincipal);


                //decrypt cookie
                //var provider = DataProtectionProvider.Create(new DirectoryInfo(@"C:\temp-keys\"));

                //string cookieValue = HttpContext.Request.Cookies["Tessellation.Cookie"];
                //string userName = System.Security.Principal.WindowsIdentity.GetCurrent().Name;

                //var dataProtector = provider.CreateProtector(
                //typeof(CookieAuthenticationMiddleware).FullName, "MyCookie", "v2");

                //UTF8Encoding specialUtf8Encoding = new UTF8Encoding(false, true);
                //byte[] protectedBytes = Base64UrlTextEncoder.Decode(cookieValue);
                //byte[] plainBytes = dataProtector.Unprotect(protectedBytes);
                //string plainText = specialUtf8Encoding.GetString(plainBytes);

                //return Content(plainText);

                return RedirectToAction("Editor");
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
                return RedirectToAction("Editor");
            }
            else
            {

                return RedirectToAction("Index");
            }
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
