
// Your Code Here

async function displayBookName(){

    let response = await fetch('http://localhost:3001/listBooks', {
        method: "GET"
    });

    let books = await response.json();
    console.log(books);

    books.forEach(createBookList)
}


function createBookList(book){
    let rootDiv = document.getElementById('root');
    let li = document.createElement('li');
    li.textContent = book.title;
    rootDiv.append(li);
    let input = document.createElement('input');
    input.type = 'number';
    li.appendChild(input);
    let submitButton = document.createElement('input');
    submitButton.type = "submit";
    submitButton.value = 'Submit';
    li.appendChild(submitButton);

   submitButton.addEventListener('click', async () => {
        let newBook = await fetch('http://localhost:3001/updateBook', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": book.id,
                "quantity": input.value,
            }),
    });
    let bookStorage = await newBook.json();
    console.log(bookStorage);
})
}



displayBookName()












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