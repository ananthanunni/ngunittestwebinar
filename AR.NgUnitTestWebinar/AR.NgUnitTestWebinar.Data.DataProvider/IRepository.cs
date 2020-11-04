using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AR.NgUnitTestWebinar.Data.DataProvider
{
  public interface IRepository<T>
  where T : new()
  {
    Task<IEnumerable<T>> GetAll();
    Task<T> First(Func<T, bool> predicate);
  }
}
