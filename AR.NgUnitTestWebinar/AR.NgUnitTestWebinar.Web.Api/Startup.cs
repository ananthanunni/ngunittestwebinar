using System.IO;
using AR.NgUnitTestWebinar.Data.DataProvider.Colors;
using AR.NgUnitTestWebinar.Data.DataProvider.Users;
using AR.NgUnitTestWebinar.Services.Auth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace AR.NgUnitTestWebinar.Web.Api
{
  public class Startup
  {
    public Startup(IConfiguration configuration, IWebHostEnvironment env)
    {
      Configuration = configuration;
      Environment = env;
    }

    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Environment { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();
      services.AddCors(options =>
      {
        options.AddPolicy(name: "AllowAnyOrigin",
          builder =>
          {
            builder.AllowAnyOrigin();
            builder.AllowAnyHeader();
            builder.AllowAnyMethod();
          });
      });

      // Register repositories
      var dataFileDirectory = Path.Combine(Environment.ContentRootPath, "Data");
      services.AddTransient<IUserRepository>(sp => new UserRepository(Path.Combine(dataFileDirectory, "Users.json")));
      services.AddTransient<IColorRepository>(sp =>
        new ColorRepository(Path.Combine(dataFileDirectory, "Colors.json")));

      // Register serivces
      services.AddTransient<IAuthenticationService, AuthenticationService>();
      services.AddTransient<IColorService, ColorService>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();

      app.UseRouting();
      app.UseCors("AllowAnyOrigin");

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
