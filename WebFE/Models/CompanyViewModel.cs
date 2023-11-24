using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebFE.Models
{
    public class CompanyViewModel
    {
        public int id { get; set; }
        [Required]
        [DisplayName("Company Name")]
        public string companyName { get; set; } = "";
        [Required]
        [DisplayName("Form Type")]
        public string formType { get; set; } = "";

        [Required]
        [DisplayName("Version")]
        public int versionNumber { get; set; }
        [Required]
        [DisplayName("Created")]
        public DateTime created_at { get; set; }
    }
}
