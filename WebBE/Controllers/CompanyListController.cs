using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using WebBE.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CompanyListController : ControllerBase
    {
        private readonly String connectionString;
        public CompanyListController(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:CompanyDB"] ?? "";
        }
        [HttpPost]
        public IActionResult CreateCompany(Companydto companydto)
        {
            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    string sql = "INSERT INTO dbo.CompanyList(companyName,formType,versionNumber) " +
                        "VALUES (@companyName, @formType , @versionNumber)" +
                        "INSERT INTO  dbo.ckeditor(content) VALUES  ('');"
                        ;
                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@companyName", companydto.companyName);
                        command.Parameters.AddWithValue("@formType", companydto.formType);
                        command.Parameters.AddWithValue("@versionNumber", companydto.versionNumber);
                        command.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Company", "error");
                return BadRequest(ModelState);
            }
            return Ok();
        }

        [HttpGet]
        public IActionResult GetCompany()
        {
            List<Company> company = new List<Company>();

        try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    string sql = "SELECT * FROM dbo.CompanyList";
                    using (var command = new SqlCommand(sql, connection))
                    {
                        using(var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Company company1 = new Company();

                                company1.id = reader.GetInt32(0);
                                company1.companyName = reader.GetString(1);
                                company1.formType = reader.GetString(2);
                                company1.versionNumber = reader.GetInt32(3);
                                company1.created_at = reader.GetDateTime(4);

                                company.Add(company1);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Company", "error");
                return BadRequest(ModelState);
            }
            return Ok(company);
        }
        
        [HttpGet("{id}")]
        public IActionResult GetCompanybyId(int id)
        {
            Company company1 = new Company();

            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    string sql = "SELECT * FROM dbo.CompanyList WHERE id=@id";
                    using (var command = new SqlCommand(sql, connection))

                    {
                        command.Parameters.AddWithValue("@id", id);
                        using (var reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                company1.id = reader.GetInt32(0);
                                company1.companyName = reader.GetString(1);
                                company1.formType = reader.GetString(2);
                                company1.versionNumber = reader.GetInt32(3);
                                company1.created_at = reader.GetDateTime(4);
                            }
                            else
                            {
                                return NotFound();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Company", "error");
                return BadRequest(ModelState);
            }
            return Ok(company1);
        }
        
        [HttpPut("{id}")]
        public IActionResult PutCompanybyId(int id, Companydto  companydto)
        {
            try
            {
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    string sql = "UPDATE dbo.CompanyList " +
                        "SET companyName = @companyName, formType=@formType, versionNumber=@versionNumber" +
                        " WHERE id = @id";
                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@companyName", companydto.companyName);
                        command.Parameters.AddWithValue("@formType", companydto.formType);
                        command.Parameters.AddWithValue("@versionNumber", companydto.versionNumber);
                        command.Parameters.AddWithValue("@id", id);
                        command.ExecuteNonQuery();

                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Company", "error");
                return BadRequest(ModelState);
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCompanybyId(int id)
        {
            try
            {
                using( var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    string sql = "DELETE FROM dbo.ckeditor WHERE id=@id; DELETE FROM dbo.companyList WHERE id=@id;"
						;
                    using (var command = new SqlCommand(sql,connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
						command.ExecuteNonQuery ();
                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("Company", "error");
                return BadRequest(ModelState);
            }

            return Ok();
        }
    }
}


