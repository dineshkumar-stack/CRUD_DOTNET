﻿using System.ComponentModel.DataAnnotations;

namespace WebFE.Models
{
	public class CkeditorViewModel
	{
			public int id { get; set; }
		[Required]
		public string content { get; set; } = "";

			public DateTime created_at { get; set; }
	}
}