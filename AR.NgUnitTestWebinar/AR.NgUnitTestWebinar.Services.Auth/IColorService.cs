using System.Collections.Generic;
using System.Threading.Tasks;
using AR.NgUnitTestWebinar.Data.DataProvider.Colors;

namespace AR.NgUnitTestWebinar.Services.Auth
{
  public interface IColorService
  {
    Task<IEnumerable<ColorEntity>> GetColors();
  }
}
