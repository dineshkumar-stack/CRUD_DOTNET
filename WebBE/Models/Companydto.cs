using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace WebBE.Models
{
    public class Companydto
    {
        [Required]
        public string companyName { get; set; } = "";
        [Required]
        public string formType { get; set; } = "";
        [Required]
        public int versionNumber { get; set; }
    }
}
