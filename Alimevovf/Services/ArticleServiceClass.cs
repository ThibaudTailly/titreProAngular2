﻿using Alimevo2.Models;
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

                // String strconn = "Data Source=localhost\\SQLEXPRESS; Initial Catalog=COOK_ALIMEVO; Integrated Security=true";
            SqlConnection conn = Database.GetConnexion();
            String req = "SELECT * FROM cook_article";
            
            //SqlConnection conn = new SqlConnection(strconn);
            //SqlDataAdapter da = new SqlDataAdapter(req, strconn);
            SqlCommand cmd = new SqlCommand(req, conn);
            //cmd.CommandType = CommandType.Text;
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
            String req = "INSERT INTO cook_article VALUES (@Title,@Picture,@Body,@DateOfCreation,@DateOfModification,@FK_cook_user)";

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
        public bool DeleteArticle(int id)
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
            string req = "UPDATE cook_article SET name = @name, body = @body , title = @title, picture = @picture" +
                " WHERE id = @id";

            SqlCommand cmd = new SqlCommand(req, conn);
            cmd.Parameters.AddWithValue("@id", article.Id);
            cmd.Parameters.AddWithValue("@picture", article.Picture);
            cmd.Parameters.AddWithValue("@body", article.Body);
            cmd.Parameters.AddWithValue("@title", article.Title);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }
       /* public List<Article> searchArticle(string searchString)
        {
            
            var article = from cook_article in COOK_ALIMEVO
                         select cook_article;

            if (!String.IsNullOrEmpty(searchString))
            {
                article = article.Where(s => s.Title.Contains(searchString));
            }

            return article;
        }*/



    }
}
