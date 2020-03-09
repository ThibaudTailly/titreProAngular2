using Alimevovf.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alimevo2.Models
{
    public class User
    {
        public int Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string NameEtablisement { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int ProRole { get; set; }
        public int Location { get; set; }
        public UserRole UserRole { get; set; }

        public string Password { get; set; }

        public override string ToString()
        {
            return ("mon objet user: " + Id + "son nom " + LastName + " firstname " + FirstName + " " + Email + " " + UserRole);
        }
    }
   
}
