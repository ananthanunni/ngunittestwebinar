using System.Threading.Tasks;
using AR.NgUnitTestWebinar.Data.DataProvider.Users;

namespace AR.NgUnitTestWebinar.Services.Auth
{
    public class AuthenticationService: IAuthenticationService
    {
      private readonly IUserRepository _userRepository;

      public AuthenticationService(IUserRepository userRepository)
      {
        this._userRepository = userRepository;
      }

      public async Task<string> Authenticate(string userId, string password)
      {
        var user = await _userRepository.First(r => r.UserId == userId && r.Password == password);
        return user?.Name;
      }
    }
}
