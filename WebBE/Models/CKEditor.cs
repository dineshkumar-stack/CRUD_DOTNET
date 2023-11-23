using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace WebBE.Models
{
	public class CKEditor
	{
		public int id { get; set; }
		public string  content { get; set; } = "";
		public DateTime created_at { get; set; }
	}
}
