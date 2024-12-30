public class Book
{
  public int Id { get; set; }
  public required string? Title { get; set; }
  public required string? Description { get; set; }
  public int PageCount { get; set; }
  public required string? Excerpt { get; set; }
  public DateTime PublishDate { get; set; }
}