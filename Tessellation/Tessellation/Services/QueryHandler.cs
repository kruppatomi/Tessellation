using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Tessellation.Services
{
    public class QueryHandler
    {
        private static SqlConnection sqlConnection;


        public static void connect(IConfiguration config)
        { 
            string connectionString = config.GetConnectionString("MyConnectionString");
            sqlConnection = new SqlConnection(connectionString);
        }


        public static string executePasswordSelect(string userName)
        {
            string result = "NULL";
            sqlConnection.Open();
            string selectQuery = "SELECT [password] FROM[dbo].[users] WHERE name = @name";
            SqlCommand sqlSelectCommand = new SqlCommand(selectQuery, sqlConnection);
            sqlSelectCommand.Parameters.AddWithValue("@name", userName);

            using (SqlDataReader reader = sqlSelectCommand.ExecuteReader())
            {
                if (reader.Read())
                {
                    result = reader["password"].ToString();
                }
            }
            sqlConnection.Close();

            return result;
        }


        public static void insertUsernameAndPassword(string userName, string userPassword)
        {
            sqlConnection.Open();
            string insertQuery = "INSERT INTO [dbo].[users]([name],[password]) VALUES(@name, @password)";
            SqlCommand sqlCommand = new SqlCommand(insertQuery, sqlConnection);
            sqlCommand.Parameters.AddWithValue("@name", userName);
            sqlCommand.Parameters.AddWithValue("@password", PasswordHandler.hashPassword(userPassword));
            sqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
        }
    }
}
