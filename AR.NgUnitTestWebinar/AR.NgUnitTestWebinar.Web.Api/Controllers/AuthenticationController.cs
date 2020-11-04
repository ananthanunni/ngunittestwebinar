using System.Threading.Tasks;
using AR.NgUnitTestWebinar.Services.Auth;
using AR.NgUnitTestWebinar.Web.Api.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace AR.NgUnitTestWebinar.Web.Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthenticationController : ControllerBase
  {
    private readonly IAuthenticationService _authenticationService;

    public AuthenticationController(IAuthenticationService authService)
    {
      this._authenticationService = authService;
    }

    [HttpPost]
    [Route("authenticate")]
    public async Task<ActionResult<string>> Authenticate(AuthenticationRequest credentials)
    {
      var user = await _authenticationService.Authenticate(credentials.UserId, credentials.Password);

      await Task.Delay(3000);

      if (user == null)
        return Unauthorized();

      return Ok(user);
    }
  }
}
