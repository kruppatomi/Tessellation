namespace Tessellation.Services
{
    public class PasswordHandler
    {
        public static string hashPassword(string password)
        {
            string myPassword = password;
            string mySalt = BCrypt.Net.BCrypt.GenerateSalt();
            string myHash = BCrypt.Net.BCrypt.HashPassword(myPassword, mySalt);

            return myHash;
        }


        public static bool verifyPassword(string userName, string userPassword)
        {
            bool doesPasswordMatch = false;

            doesPasswordMatch = BCrypt.Net.BCrypt.Verify(userPassword, QueryHandler.executePasswordSelect(userName));

            return doesPasswordMatch;
        }
    }
}
