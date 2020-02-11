using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Alimevo2.Models;
using Alimevo2.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Alimevo2.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserServiceClass userSrv;

        public UserController()
        {
            this.userSrv = new UserServiceClass();
        }
        [HttpGet]
        public List<Models.User> ListUser()
        {
            return this.userSrv.GetAllUsers();
        }
        public List<Models.User> Get()
        {
            return this.userSrv.GetAllUsers();
        }
        [HttpGet("add")]
        public bool Add()
        {
             User user = new User();
             user.Name = "john";
             user.Firstname = "doe";
             user.Name_etablisement = "poipoi";
             user.email = "poipoi";
             user.phoneNumber = 06323232;
             user.prorole = 1;
             user.location = 1;
             user.userrole = 1;
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
            user.Name = name;
            return this.userSrv.UpdateUser(user);
        }
    }
}