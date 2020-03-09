using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Alimevo2.Models;
using Alimevo2.Services;
using Alimevovf.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Alimevo2.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService userSrv;

        public UserController()
        {
            this.userSrv = new UserService();
        }
        [HttpGet("all")]
        public List<Models.User> ListUser()
        {
            return this.userSrv.GetAllUsers();
        }
        public List<Models.User> Get()
        {
            return this.userSrv.GetAllUsers();
        }
        [HttpPost("create")]
        public bool Create(User user )
        {
 
            user.NameEtablisement = "BlizzardEntertainment";
            user.PhoneNumber = "";
            user.ProRole = 1;
            user.Location = 1;
            user.UserRole = UserRole.STANDARD;
            
            return this.userSrv.AddUser(user);
        }

        [HttpGet("add")]
        public bool Add()
        {
            User user = new User();
            user.LastName = "john";
            user.FirstName = "doe";
            user.NameEtablisement = "poipoi";
            user.Email = "poipoi";
            user.PhoneNumber = "06323232";
            user.ProRole = 1;
            user.Location = 1;
            user.UserRole = UserRole.STANDARD;
            user.Password = "azerty";
            return this.userSrv.AddUser(user);
        }
        [HttpGet("delete")]
        public bool Delete(int id)
        {
            return this.userSrv.DeleteUser(id);
        }
        [HttpGet("updateName")]
        public bool UpdateName(int id, string name)
        {
            User user = new User();
            user.Id = id;
            user.LastName = name;
            return this.userSrv.UpdateUser(user);
        }
    }
}