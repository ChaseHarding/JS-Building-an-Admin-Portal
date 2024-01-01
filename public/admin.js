// Your Code Here

async function displayBookName() {
  let response = await fetch("http://localhost:3001/listBooks", {
    method: "GET",
  });

  let books = await response.json();
  console.log(books);

  await books.forEach(createBookList);
}
//need to add notes

function createBookList(book) {
  let rootDiv = document.getElementById("root");
  let li = document.createElement("li");
  li.textContent = book.title;
  rootDiv.append(li);

  let input = document.createElement("input");
  input.type = "number";
  li.appendChild(input);

  let submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Submit";
  li.appendChild(submitButton);

  //creating a delete button
  let deleteButton = document.createElement("input");
  deleteButton.type = "submit";
  deleteButton.value = "BYE";
  deleteButton.magicId = book.id;
  // console.log(book.id);
  li.appendChild(deleteButton);
  //i tried to change the load order of the delete and submit buttons here.
  //thought it would move them visually on the admin page, but ran into errors.

  submitButton.addEventListener("click", async () => {
    let newBook = await fetch("http://localhost:3001/updateBook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: book.id,
        quantity: input.value,
      }),
    });
    let bookStorage = await newBook.json();
    console.log(bookStorage);
  });
  //event listener for delete button
  deleteButton.addEventListener("click", async () => {
    //coolest new concept of prompt to create a pop up to confirm before deleting a book
    let confirmation = prompt(
      `Are you sure you want to delete ${book.title}? Type exactly yes to confirm`
    );
    if (confirmation === "yes") {
    
    console.log(`http://localhost:3001/removeBook/${book.id}`);
    let deletedBook = await fetch(
      `http://localhost:3001/removeBook/${book.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: book.id,
        }),
      }
    );
    let deletedBookResponse = await deletedBook.json();
    console.log(deletedBookResponse);
    // testing
    //visually now
    li.remove();
  }
  });
}

displayBookName();

//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify ({
//         "id": 3,
//         "title": "Legends of Arathrae",
//     }),
// });

// let updatedBook = await response.json();
// console.log(updatedBook)
