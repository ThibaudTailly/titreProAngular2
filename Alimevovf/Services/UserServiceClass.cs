using Alimevo2.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;

namespace Alimevo2.Services
{
    public class UserServiceClass
    {
        public static string HashPassword(string password)
        {
            SHA256 hashMdp = SHA256.Create();

            byte[] hashValue = hashMdp.ComputeHash(Encoding.UTF8.GetBytes(password + "AlimEvo"));
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < hashValue.Length; i++)
            {
                builder.Append(hashValue[i].ToString("x2"));
            }
            string hashed = builder.ToString();
            return hashed;
        }

        public bool Authentifier(string mail, string password)
        {
            bool flag = false;
            // Cryptage du mot de passe
            string hashed = HashPassword(password);
            // Création d'une connexion SGBD

            SqlConnection conn = Database.GetConnexion();
            // Définition de la requête à exécuter
            SqlCommand oCommand = new SqlCommand("SELECT * FROM Utilisateurs WHERE email='" + mail + "'", conn);
            try
            {
                // Ouverture de la connexion et exécution de la requête
                conn.Open();
                SqlDataReader drUtilisateur = oCommand.ExecuteReader();
                // Parcours de la liste des utilisateurs
                while (drUtilisateur.Read())
                {
                    if (drUtilisateur["motdepasse"].ToString() == hashed)
                    {
                        flag = true; break;
                    }
                }
            }
            catch
            {
                flag = false;
            }
            conn.Close();
            return flag;
        }
        public List<User> GetAllUsers()
        {
            List<User> listuser = new List<User>();
            try
            {
                SqlConnection conn = Database.GetConnexion();
                String req = "SELECT * FROM cook_user";
                SqlCommand cmd = new SqlCommand(req, conn);
                conn.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    User user = new User();
                    user.Id = Convert.ToInt32(rdr["id"]);
                    user.Firstname = rdr["firstname"].ToString();
                    user.Name = rdr["Name"].ToString();
                    user.Name_etablisement = rdr["Name_establishment"].ToString();
                    user.email = rdr["email"].ToString();
                    user.phoneNumber = Convert.ToInt32(rdr["phonenumber"]);
                    user.prorole = Convert.ToInt32(rdr["id_cook_prorole"]);
                    user.location = Convert.ToInt32(rdr["id_cook_location"]);
                    user.userrole = Convert.ToInt32(rdr["id_cook_userrole"]);
                    listuser.Add(user);
                    Console.WriteLine(user);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("erreur suivante s'est produite" + e.Message);
            }
            return listuser;
        }
        public bool AddUser(User user)
        {
            SqlConnection conn = Database.GetConnexion();
            String req = "INSERT INTO cook_user VALUES (@Name,@Firstname,@Name_establishment,@email,@phoneNumber,@prorole,@location,@userrole,@password)";          
            
            SqlCommand cmd = new SqlCommand(req, conn);
            cmd.Parameters.AddWithValue("@Name", user.Name);
            cmd.Parameters.AddWithValue("@Firstname", user.Firstname);
            cmd.Parameters.AddWithValue("@Name_establishment", user.Name_etablisement);
            cmd.Parameters.AddWithValue("@email", user.email);
            cmd.Parameters.AddWithValue("@phoneNumber", user.phoneNumber);
            cmd.Parameters.AddWithValue("@prorole", user.prorole);
            cmd.Parameters.AddWithValue("@location", user.location);
            cmd.Parameters.AddWithValue("@userrole", user.userrole);
            cmd.Parameters.AddWithValue("@password", HashPassword(user.password));

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }
        public bool DeleteUser(int id)
        {
            SqlConnection conn = Database.GetConnexion();
            String req = "DELETE FROM cook_user WHERE id = @id";
          
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
        public bool UpdateUser(User user)
        {
            SqlConnection conn = Database.GetConnexion();
            string req = "UPDATE cook_user SET name = @name WHERE id = @id";
            
            SqlCommand cmd = new SqlCommand(req, conn);
            cmd.Parameters.AddWithValue("@id", user.Id);
            cmd.Parameters.AddWithValue("@name", user.Name);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }
    }
}
