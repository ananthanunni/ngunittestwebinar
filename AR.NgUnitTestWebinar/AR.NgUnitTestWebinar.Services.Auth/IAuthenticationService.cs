using System.Threading.Tasks;
using AR.NgUnitTestWebinar.Data.DataProvider.Users;

namespace AR.NgUnitTestWebinar.Services.Auth
{
  public interface IAuthenticationService
  {
    Task<UserEntity> Authenticate(string userId, string password);
  }
}
