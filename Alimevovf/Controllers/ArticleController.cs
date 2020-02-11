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
    [Route("api/article")]
    [ApiController]
    public class ArticleController : Controller
    {

        private ArticleService articleSrv;
        public ArticleController()
        {
            this.articleSrv = new ArticleService();
        }
        [HttpGet]
        public List<Models.Article> Get()
        {
            return this.articleSrv.GetAllArticles();
        }

        [HttpGet("{id}")]
        public Article GetArticleid(int id)
        {
            return this.articleSrv.GetArticleById(id);
        }
    }

}