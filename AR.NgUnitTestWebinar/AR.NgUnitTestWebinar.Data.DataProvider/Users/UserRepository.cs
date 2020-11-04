namespace AR.NgUnitTestWebinar.Data.DataProvider.Users
{
  public class UserRepository:BaseRepository<UserEntity>,IUserRepository
  {
    public UserRepository(string dataFile): base(dataFile)
    {
      
    }
  }
}
