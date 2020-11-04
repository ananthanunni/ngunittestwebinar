using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AR.NgUnitTestWebinar.Data.DataProvider
{
  public abstract class BaseRepository<T> : IRepository<T>
  where T : new()
  {
    private string _file;

    protected BaseRepository(string dataFile)
    {
      this._file = dataFile;
    }

    public Task<IEnumerable<T>> GetAll() => GetDataAsCollection();

    public async Task<T> First(Func<T, bool> predicate)
    {
      var all = await GetDataAsCollection();
      return all.FirstOrDefault(predicate);
    }

    protected async Task<IEnumerable<T>> GetDataAsCollection()
    {
      return Newtonsoft.Json.JsonConvert.DeserializeObject<IEnumerable<T>>(await GetRawData());
    }

    protected async Task<string> GetRawData() => await File.ReadAllTextAsync(this._file) ?? "[]";
  }
}
