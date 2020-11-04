namespace AR.NgUnitTestWebinar.Data.DataProvider.Users
{
  public class UserRepository:BaseRepository<User>,IUserRepository
  {
    public UserRepository(string dataFile): base(dataFile)
    {
      
    }
  }
}
