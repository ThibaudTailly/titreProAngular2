using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Alimevo2.Models
{
    
    public class Article
    {
        
        public int Id { get; set; }
        
        public string Title { get; set; }
        public string Abstract { get; set; }
        public string Picture { get; set; }
        public string Body { get; set; }
        public DateTime DateOfCreation { get; set; }
        public DateTime DateOfModification { get; set; }
        public int FK_cook_user { get; set; }
    }
}
