using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Tessellation.Models;
using BCrypt.Net;

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
            //hash the password
            string myPassword = user.Password;
            string mySalt = BCrypt.Net.BCrypt.GenerateSalt();
            string myHash = BCrypt.Net.BCrypt.HashPassword(myPassword, mySalt);
     

            //get the user and send it to the db
            //connect to the db
            //insert
            string connectionString = _configuration.GetConnectionString("MyConnectionString");
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            //sqlConnection.Open();
            //string insertQuery = "INSERT INTO [dbo].[users]([name],[password]) VALUES(@name, @password)";
            //SqlCommand sqlCommand = new SqlCommand(insertQuery, sqlConnection);
            //sqlCommand.Parameters.AddWithValue("@name", user.Name);
            //sqlCommand.Parameters.AddWithValue("@password", myHash);
            //sqlCommand.ExecuteNonQuery();
            //sqlConnection.Close();

            //select
            sqlConnection.Open();
            string selectQuery = "SELECT [password] FROM[dbo].[users] WHERE name = @name";
            SqlCommand sqlSelectCommand = new SqlCommand(selectQuery, sqlConnection);
            sqlSelectCommand.Parameters.AddWithValue("@name", user.Name);

            //jo
            using (SqlDataReader reader = sqlSelectCommand.ExecuteReader())
            {
                if (reader.Read())
                {
                    bool doesPasswordMatch = BCrypt.Net.BCrypt.Verify(user.Password, reader["password"].ToString());
                }
            }

            sqlConnection.Close();
            

            return View(user);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }
}
