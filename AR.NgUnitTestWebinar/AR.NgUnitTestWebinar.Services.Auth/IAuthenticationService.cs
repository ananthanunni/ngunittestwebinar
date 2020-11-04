using System.Threading.Tasks;

namespace AR.NgUnitTestWebinar.Services.Auth
{
  public interface IAuthenticationService
  {
    Task<string> Authenticate(string userId, string password);
  }
}
