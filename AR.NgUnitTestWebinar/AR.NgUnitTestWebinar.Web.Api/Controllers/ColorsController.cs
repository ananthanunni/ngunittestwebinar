using AR.NgUnitTestWebinar.Data.DataProvider.Colors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AR.NgUnitTestWebinar.Web.Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ColorsController : ControllerBase
  {
    private readonly IColorRepository _colorRepository;

    public ColorsController(IColorRepository colorRepository)
    {
      this._colorRepository = colorRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ColorEntity>>> Get() => Ok(await _colorRepository.GetAll());
  }
}
