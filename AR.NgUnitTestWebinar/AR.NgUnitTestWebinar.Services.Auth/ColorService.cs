using AR.NgUnitTestWebinar.Data.DataProvider.Colors;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AR.NgUnitTestWebinar.Services.Auth
{
  public class ColorService:IColorService
  {
    private readonly IColorRepository _colorRepository;

    public ColorService(IColorRepository colorRepository)
    {
      this._colorRepository = colorRepository;
    }

    public Task<IEnumerable<ColorEntity>> GetColors() => this._colorRepository.GetAll();
  }
}
