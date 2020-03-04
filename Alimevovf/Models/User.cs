using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alimevo2.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Firstname { get; set; }
        public string Name_etablisement { get; set; }
        public string email { get; set; }
        public int phoneNumber { get; set; }
        public int prorole { get; set; }
        public int location { get; set; }
        public int userrole { get; set; }

        public string password { get; set; }

        public override string ToString()
        {
            return ("mon objet user: " + Id + "son nom " + Name + " firstname " + Firstname + " " + email + " " + userrole);
        }
    }
   
}
