using Alimevo2.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;



namespace Alimevo2.Services
{

    public class ArticleService
    {
        public enum Orders{BY_ID,BY_NAME,BY_DATE_OF_MODIFICATION};

        public string GetColumnName(Orders order)
        {
            switch (order)
            {
                case Orders.BY_ID:
                    return "id";
                case Orders.BY_NAME:
                    return "title";
                case Orders.BY_DATE_OF_MODIFICATION:
                    return "date_of_modification";
                default:
                    return "id";
            }
        }

        public Article[] GetAllArticlestest()
        {
            // ligne 14 provisoire = appelle a la database
            return new Article[]
            {
                new Article{
                    Id=1,
                    Title="monPremier",
                    Body="body",
                    Picture="z",
                    DateOfCreation=new DateTime(),
                    DateOfModification=new DateTime()
                },
                new Article{
                    Id=2,
                    Title="mondeuxieme",
                    Body="body2",
                    Picture="z",
                    DateOfCreation=new DateTime(),
                    DateOfModification=new DateTime()
                }
            };
        }
        public List<Article> GetAllArticles()
        {
            List<Article> listarticle = new List<Article>();

            try {
            SqlConnection conn = Database.GetConnexion();
            String req = "SELECT * FROM cook_article";
            SqlCommand cmd = new SqlCommand(req, conn);
            conn.Open();
      
             SqlDataReader rdr = cmd.ExecuteReader();
             while (rdr.Read())
             {
                 Article article = new Article();
                 article.Id = Convert.ToInt32(rdr["id"]);
                 article.Title = rdr["title"].ToString();
                 article.Body = rdr["body"].ToString();
                 article.Picture = rdr["picture"].ToString();
                 article.DateOfCreation = Convert.ToDateTime(rdr["date_of_creation"]);
                 article.DateOfModification = Convert.ToDateTime(rdr["date_of_modification"]);
                 article.FK_cook_user = Convert.ToInt32(rdr["id_cook_user"]);
                 listarticle.Add(article);
             }
             }
             catch (Exception e)
             {
                 Console.WriteLine("erreur suivante s'est produite" + e.Message);
             }
            return listarticle;
        }
        public Article GetArticleById(int id)
        {
            Article article = new Article();
            SqlConnection conn = Database.GetConnexion();
            String req = "SELECT * FROM cook_article WHERE id= @id";
            SqlCommand cmd = new SqlCommand(req, conn);
            cmd.Parameters.AddWithValue("@id", id);
            conn.Open();
            SqlDataReader rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                article.Id = Convert.ToInt32(rdr["id"]);
                article.Title = rdr["title"].ToString();
                article.Body = rdr["body"].ToString();
                article.Picture = rdr["picture"].ToString();
                article.DateOfCreation = Convert.ToDateTime(rdr["date_of_creation"]);
                article.DateOfModification = Convert.ToDateTime(rdr["date_of_modification"]);
                article.FK_cook_user = Convert.ToInt32(rdr["id_cook_user"]);
            }
            
            
            conn.Close();
            return article;
        }
        public bool AddArticle(Article article)
        {
            SqlConnection conn = Database.GetConnexion();
            String req = "INSERT INTO cook_article VALUES (@Title,@Body,@Picture,@DateOfCreation,@DateOfModification,@FK_cook_user)";

            SqlCommand cmd = new SqlCommand(req, conn);
            cmd.Parameters.AddWithValue("@Title", article.Title);
            cmd.Parameters.AddWithValue("@Picture", article.Picture);
            cmd.Parameters.AddWithValue("@Body", article.Body);
            cmd.Parameters.AddWithValue("@DateOfCreation", article.DateOfCreation);
            cmd.Parameters.AddWithValue("@DateOfModification", article.DateOfModification);
            cmd.Parameters.AddWithValue("@FK_cook_user", article.FK_cook_user);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }
        public bool DeleteArticleById(int id)
        {
            SqlConnection conn = Database.GetConnexion();
            String req = "DELETE FROM cook_article WHERE id = @id";

            SqlCommand cmd = new SqlCommand(req, conn);
            cmd.Parameters.AddWithValue("@id", id);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();
            if (i >= 1)
                return true;
            else
                return false;
        }
        public bool UpdateArticle(Article article)
        {
            SqlConnection conn = Database.GetConnexion();
            string req = "UPDATE cook_article SET body = @body , title = @title, picture = @picture , date_of_modification = @dom" + 
                " WHERE id = @id";

            SqlCommand cmd = new SqlCommand(req, conn);
            cmd.Parameters.AddWithValue("@id", article.Id);
            cmd.Parameters.AddWithValue("@picture", article.Picture);
            cmd.Parameters.AddWithValue("@body", article.Body);
            cmd.Parameters.AddWithValue("@title", article.Title);
            cmd.Parameters.AddWithValue("@dom", article.DateOfModification);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }

        
        public List<Article> GetArticles(int amount, int page,Orders order, bool asc)
        {
            // TODO
            List<Article> listarticle = new List<Article>();

            try
            {
                SqlConnection conn = Database.GetConnexion();
                String req = "SELECT TOP 2 id, title, body, picture, date_of_creation, date_of_modification, id_cook_user FROM cook_article order by title";            
                SqlCommand cmd = new SqlCommand(req, conn);
                if(amount <= 0)
                {
                    amount = 1;    
                }
                if(page <= 0)
                {
                    page = 1;
                }
                int offset = (page - 1)*amount ;
                string column = GetColumnName(order);
                cmd.Parameters.AddWithValue("@amount", amount);
                //cmd.Parameters.AddWithValue("@offset", offset);
                cmd.Parameters.AddWithValue("@order", column);
                //cmd.Parameters.AddWithValue("@way", asc? "ASC":"DESC");
                conn.Open();
                
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Article article = new Article();
                    article.Id = Convert.ToInt32(rdr["id"]);
                    article.Title = rdr["title"].ToString();
                    article.Body = rdr["body"].ToString();
                    article.Picture = rdr["picture"].ToString();
                    article.DateOfCreation = Convert.ToDateTime(rdr["date_of_creation"]);
                    article.DateOfModification = Convert.ToDateTime(rdr["date_of_modification"]);
                    article.FK_cook_user = Convert.ToInt32(rdr["id_cook_user"]);
                    listarticle.Add(article);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("erreur suivante s'est produite" + e.Message);
            }
            return listarticle;
        }
        /* public List<Article> searchArticle(string searchString)
         {

             var article = from cook_article in _COOK_ALIMEVO
                          select cook_article;

             if (!String.IsNullOrEmpty(searchString))
             {
                 article = article.Where(s => s.Title.Contains(searchString));
             }

             return article;
         }*/



    }
}
