using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Alimevo2.Models;
using Alimevo2.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

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

        [HttpPost("create")]
        public bool AddArticle([FromBody]JObject data

            )
        {

            Article article = new Article();
            article.Title = data["title"].ToString();
            article.Picture = data["picture"].ToString();
            article.Body = data["body"].ToString();
            article.DateOfCreation =  DateTime.Today;
            article.DateOfModification = DateTime.Today;
            article.FK_cook_user = Convert.ToInt32(data["fkCookUser"].ToString());
            return this.articleSrv.AddArticle(article);
        }
    //    [HttpPost("create")]
    //    public bool AddArticle(
    //        string title,
    //        string picture,
    //        string body,
    //        int cookUser
    //        )
    //    {
    //        var test = Request.Body;
    //        Article article = new Article();
    //        article.Title = Request.Form["title"];
    //        article.Picture = picture;
    //        article.Body = body;
    //        article.DateOfCreation = DateTime.Today;
    //        article.DateOfModification = DateTime.Today;
    //        article.FK_cook_user = cookUser;

            


    //        return this.articleSrv.AddArticle(article);


    //    }
    }

}