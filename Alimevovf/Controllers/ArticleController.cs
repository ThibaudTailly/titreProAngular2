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
        public List<Models.Article> Get(int amount, int page, string order, bool asc)
        {
            return this.articleSrv.GetArticles(amount, page, ArticleService.Orders.BY_ID, asc);
        }
        [HttpGet("all")]
        public List<Models.Article> Get()
        {              
            return this.articleSrv.GetAllArticles();
        }
        [HttpGet("{id}")]
        public Article GetArticleById(int id)
        {
            return this.articleSrv.GetArticleById(id);
        }

        [HttpPost("create")]
        public bool AddArticle([FromBody]Article darticle

            )
        {

            //Article article = new Article();
            //article.Title = data["title"].ToString();
            //article.Picture = data["picture"].ToString();
            //article.Body = data["body"].ToString();
            darticle.DateOfCreation =  DateTime.Today;
            darticle.DateOfModification = DateTime.Today;
            //article.FK_cook_user = Convert.ToInt32(data["fkCookUser"].ToString());
            return this.articleSrv.AddArticle(darticle);
        }
        [HttpPost("update")]
        public bool UpdateArticle([FromBody]Article darticle

            )
        {

            //Article article = new Article();
            //article.Title = data["title"].ToString();
            //article.Picture = data["picture"].ToString();
            //article.Body = data["body"].ToString();
            //darticle.DateOfCreation = DateTime.Today;
            darticle.DateOfModification = DateTime.Today;
            //article.FK_cook_user = Convert.ToInt32(data["fkCookUser"].ToString());
            return this.articleSrv.UpdateArticle(darticle);
        }
        [HttpPost("createtest")]
        public bool AddArticleTest()
        {
            Article article = new Article();
            article.Title = "loremIpsum";
            article.Picture = "https://www.colonialkc.org/wp-content/uploads/2015/07/Placeholder.png";
            article.Body = "body";
            article.DateOfCreation = DateTime.Today;
            article.DateOfModification = DateTime.Today;
            article.FK_cook_user = 1;
            return this.articleSrv.AddArticle(article);
        }
        [HttpDelete("{id}")]
        public bool DeleteArticleById (int id)
        {
            return this.articleSrv.DeleteArticleById(id);
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