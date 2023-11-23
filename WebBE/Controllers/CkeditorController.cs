using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using WebBE.Models;

namespace WebBE.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class CkeditorController : Controller
	{
		private readonly String connectionString;
		public CkeditorController(IConfiguration configuration)
		{
			connectionString = configuration["ConnectionStrings:CompanyDB"] ?? "";
		}

		[HttpGet]
		public IActionResult Get()
		{
			List<CKEditor> CKE = new List<CKEditor>();

			try
			{
				using (var connection = new SqlConnection(connectionString))
				{
					connection.Open();
					string sql = "SELECT * FROM dbo.ckeditor";
					using (var command = new SqlCommand(sql, connection))
					{
						using (var reader = command.ExecuteReader())
						{
							while (reader.Read())
							{
								CKEditor editorData = new CKEditor();
								editorData.id = reader.GetInt32(0);
								editorData.content = reader.GetString(1);
								editorData.created_at = reader.GetDateTime(2);

								CKE.Add(editorData);
							}
						}
					}
				}
			}
			catch (Exception ex)
			{
				ModelState.AddModelError("CKEditor", "error");
				return BadRequest(ModelState);
			}
			return Ok(CKE);
		}


		[HttpGet("{id}")]
		public IActionResult GetById(int id)
		{
			CKEditor CKE = new CKEditor();

			try
			{
				using (var connection = new SqlConnection(connectionString))
				{
					connection.Open();

					string sql = "SELECT * FROM dbo.ckeditor WHERE id=@id";
					using (var command = new SqlCommand(sql, connection))

					{
						command.Parameters.AddWithValue("@id", id);
						using (var reader = command.ExecuteReader())
						{
							if (reader.Read())
							{
								CKE.id = reader.GetInt32(0);
								CKE.content = reader.GetString(1);
								CKE.created_at = reader.GetDateTime(2);
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
				ModelState.AddModelError("CKEditor", "error");
				return BadRequest(ModelState);
			}
			return Ok(CKE);
		}


	}
}
