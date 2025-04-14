let bookList = [
    {
      title: "Harry Potter",
      author: "JK Rowling",
      year: 1995,
      genre: "Fantasy"
    }
  ];

  function renderBooks() {
    let tbody = document.getElementById("bookTableBody");
    let html = "";

    for (let i = 0; i < bookList.length; i++) {
      let book = bookList[i];
      html += `
        <tr>
          <td>${i + 1}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.year}</td>
          <td>${book.genre}</td>
          <td>
            <button class="btn edit-btn" onclick="editBook(${i})">Sửa</button>
            <button class="btn delete-btn" onclick="deleteBook(${i})">Xoá</button>
          </td>
        </tr>
      `;
    }

    tbody.innerHTML = html;
  }

  function addBook(event) {
    event.preventDefault();
    let title = document.getElementById("title").value.trim();
    let author = document.getElementById("author").value.trim();
    let year = parseInt(document.getElementById("year").value.trim());
    let genre = document.getElementById("genre").value.trim();

    if (!title || !author || !year || !genre) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    bookList.push({ title, author, year, genre });
    event.target.reset();
    renderBooks();
  }

  function deleteBook(index) {
    if (confirm("Bạn chắc chắn muốn xoá sách này?")) {
      bookList.splice(index, 1);
      renderBooks();
    }
  }

  function editBook(index) {
    let book = bookList[index];
    let row = document.querySelectorAll("tbody tr")[index];

    row.innerHTML = `
      <td>${index + 1}</td>
      <td><input type="text" value="${book.title}" id="editTitle${index}" /></td>
      <td><input type="text" value="${book.author}" id="editAuthor${index}" /></td>
      <td><input type="number" value="${book.year}" id="editYear${index}" /></td>
      <td><input type="text" value="${book.genre}" id="editGenre${index}" /></td>
      <td>
        <button class="btn edit-btn" onclick="saveBook(${index})">Lưu</button>
        <button class="btn delete-btn" onclick="renderBooks()">Huỷ</button>
      </td>
    `;
  }

  function saveBook(index) {
    let title = document.getElementById(`editTitle${index}`).value.trim();
    let author = document.getElementById(`editAuthor${index}`).value.trim();
    let year = parseInt(document.getElementById(`editYear${index}`).value.trim());
    let genre = document.getElementById(`editGenre${index}`).value.trim();

    if (!title || !author || !year || !genre) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    bookList[index] = { title, author, year, genre };
    renderBooks();
  }

  function filterBooks() {
    let keyword = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
      let title = row.children[1].textContent.toLowerCase();
      row.style.display = title.includes(keyword) ? "" : "none";
    });
  }

  renderBooks();
  
