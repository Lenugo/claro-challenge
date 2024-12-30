using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
  private readonly IBookService _bookService;

  public BooksController(IBookService bookService)
  {
    _bookService = bookService;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
  {
    try
    {
      var books = await _bookService.GetAllBooksAsync();
      return Ok(books);
    }
    catch (HttpRequestException)
    {
      return StatusCode(StatusCodes.Status503ServiceUnavailable);
    }
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Book>> GetBook(int id)
  {
    try
    {
      var book = await _bookService.GetBookByIdAsync(id);
      if (book == null)
      {
        return NotFound();
      }
      return Ok(book);
    }
    catch (HttpRequestException)
    {
      return StatusCode(StatusCodes.Status503ServiceUnavailable);
    }
  }

  [HttpPost]
  public async Task<ActionResult<Book>> CreateBook(Book book)
  {
    try
    {
      var createdBook = await _bookService.CreateBookAsync(book);
      return CreatedAtAction(nameof(GetBook), new { id = createdBook.Id }, createdBook);
    }
    catch (HttpRequestException)
    {
      return StatusCode(StatusCodes.Status503ServiceUnavailable);
    }
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateBook(int id, Book book)
  {
    if (id != book.Id)
    {
      return BadRequest();
    }

    try
    {
      var updatedBook = await _bookService.UpdateBookAsync(id, book);
      return Ok(updatedBook);
    }
    catch (HttpRequestException)
    {
      return StatusCode(StatusCodes.Status503ServiceUnavailable);
    }
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteBook(int id)
  {
    try
    {
      var result = await _bookService.DeleteBookAsync(id);
      if (!result)
      {
        return NotFound();
      }
      return NoContent();
    }
    catch (HttpRequestException)
    {
      return StatusCode(StatusCodes.Status503ServiceUnavailable);
    }
  }
}
