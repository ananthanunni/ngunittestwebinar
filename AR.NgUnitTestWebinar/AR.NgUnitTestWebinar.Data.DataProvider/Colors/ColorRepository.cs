namespace AR.NgUnitTestWebinar.Data.DataProvider.Colors
{
  public class ColorRepository:BaseRepository<ColorEntity>, IColorRepository
  {
    public ColorRepository(string dataFile) : base(dataFile)
    {
    }
  }
}
