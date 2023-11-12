using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace WebBE.Models
{
    public class Company
    {
        public int id { get; set; }
        public string companyName { get; set; } = "";
        public string formType { get; set; } = "";
        public int versionNumber { get; set; }
        public DateTime created_at { get; set; }
    }
}
