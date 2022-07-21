//untuk tampilan form
window.addEventListener('load', function () {
    style();
})

function style() {
    const check = document.querySelector('.kotak1');

    check.addEventListener('mouseenter', function () {
        check.style.cursor = 'pointer';
    });
    check.addEventListener('mouseleave', function () {
        check.style.cursor = 'default';
    });

    const submit = document.querySelector('.submit');
    submit.addEventListener('mouseenter', function () {
        submit.style.cursor = 'pointer';
        submit.style.backgroundColor = 'rgba(255, 221, 0, 0.7)';
    });
    submit.addEventListener('mouseleave', function () {
        submit.style.backgroundColor = 'rgba(255, 221, 0, 1)';
    });

    const buttonCari = document.querySelector('.buttoncari');
    buttonCari.addEventListener('mouseenter', function () {
        buttonCari.style.cursor = 'pointer';
    });

    const buttonHapusCari = document.querySelector('.buttonHapusCari');
    buttonHapusCari.addEventListener('mouseenter', function () {
        buttonHapusCari.style.cursor = 'pointer';
    });
}

//form

//array
let books = [];

//untuk perubahan data
const RENDER_EVENT = 'render-event';


//submit
const submit = document.querySelector('.submit');
submit.addEventListener('click', function (e) {
    e.preventDefault();
    addBook();
    clear();
});

//tambah data buku ke array
function addBook() {
    const id = generateId();
    const title = document.querySelector('.judulbuku').value;

    var ambilTitle = [];

    for (let i = 0; i < books.length; i++) {
        ambilTitle.push(books[i].title);
    }

    var findTitle = function (x) {
        return x == title;
    }

    const author = document.querySelector('.penulisbuku').value;
    const year = document.querySelector('.tahunbuku').value;
    const isCompleted = document.querySelector('.kotak1').checked;

    const objectBook = generateBookObject(id, title, author, year, isCompleted);
    books.push(objectBook);


    if (title == ambilTitle.find(findTitle)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Buku Sudah Terdapat Pada Rak',
        })
        books.pop();
    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Buku Berhasil Ditambahkan',
            showConfirmButton: false,
            timer: 1500
        })
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }
}

//untuk id
function generateId() {
    return +new Date();
}

//ini objek buku
function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

//event untuk render_event 
document.addEventListener(RENDER_EVENT, function () {

    const isi1 = document.querySelector('.isi1');
    isi1.innerHTML = '';

    const isi2 = document.querySelector('.isi2');
    isi2.innerHTML = '';

    for (let i = 0; i < books.length; i++) {
        if (books[i].isCompleted === false) {
            const bookItem = books[i];
            const bookElement = makeBook(bookItem);
            isi1.append(bookElement);
        } else {
            const bookItem = books[i];
            const bookElement = makeBook(bookItem);
            isi2.append(bookElement);
        }
    }

});


//menampilkan buku 

//fungsi untuk membuat element list buku
function makeBook(objectBook) {
    const detailBelum = document.createElement('div');
    detailBelum.classList.add('detailbelum');
    detailBelum.setAttribute('id', `${objectBook.id}`);

    const detailJudul = document.createElement('p');
    detailJudul.classList.add('detailjudul');
    detailJudul.innerText = objectBook.title;

    const detailPenulis = document.createElement('p');
    detailPenulis.classList.add('detailpenulis');
    detailPenulis.innerText = objectBook.author;

    const detailTahun = document.createElement('p');
    detailTahun.classList.add('detailtahun');
    detailTahun.innerText = objectBook.year;

    detailBelum.append(detailJudul);
    detailBelum.append(detailPenulis);
    detailBelum.append(detailTahun);

    if (objectBook.isCompleted === false) {
        const fitur = document.createElement('div');
        fitur.classList.add('fitur');

        const buttonDone = document.createElement('img');
        buttonDone.classList.add('fitur1');
        buttonDone.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACA0lEQVRIie3Wv2+NURgH8A9GGlsT+iNpXdpdYjNImBASA9XRRGIorb+CP6AmxNCqpggJCTGJiHTqwEIiTAjRCtq6reE8b26H1/u+995GDP0mZ7jn+T7f73nPuec5Dxv4R9jUBHcnTuIQaujFD3zFHB7jLt6v1+K6cBN1rJaMRYyjp13TU1hYIzqBIQxga4yBmJsMziq+4EirphewEkK30V8hZxemI2cF55s1PRGJv3Gx2WSMSkdTx7GqSX2Yl1bdimmGsdBYwI4qCdc0trddzITW1TJin7S9i6qdaRlqobUs3Y6/YkRa4USTBv14gSc5sVuhebZI4FGQhpow3Y9PkfcsJz4csftFIu+CtLui6Wn8jJyH2J7DGYj46yKhrFh05MSeYxad2ILLGhXrSszloSM480XGvwqMZyM2J21bVs3OFAlWNX4TpD05sc4wzb7yMw6UmMJg8F+tndycYwx7cwQ+4qD05S+xD08rGGdab4tI2XWarCBYFVOhea6I1CvV10Wp4LeLGpakAtJdRr4urXB6HYzvhNZ4FXI3vkfCaBuml0Ljm4qPBOlZzJ61sRZNs/yjzSaPaDQCM9J5laGmsb11LTQCGY5rvM1LUsEflu7mthiDMTcVnGx7W259MnRJf45l5c1eHTdUONNm2tseqY05LL3b3WH2QSoOD3Avfm/g/8Efw52hBm1c1HQAAAAASUVORK5CYII=');


        buttonDone.addEventListener('click', function () {
            moveBookCompleted(objectBook.id);
        });

        const buttonSampah = document.createElement('img');
        buttonSampah.classList.add('fitur2');
        buttonSampah.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAxElEQVRIieWUTQrCQAyFPwRXHkb3/t1Er+LSI/Q+4kHUhdID6MJi3XSgTVNNoqDiB1kMzHsvaZjCv7ACSlHriNFWMfLWpm7YEwG3SFeC8g0eX05G/Ptn0kzuAODwQnN7S0DrEjAGpg/OCVNzc9qjJ7rOqWbSzDqBFZO2DxT4JygqbQNtgitwMvXb5FhpnwYA7AIBqqYrILIHVfOxgMhjUzXWHUyUO/KhuaYe4f8PDT0BA+DiMD9XGhdLIDeY58DCa/473AElqHJBF+OU9wAAAABJRU5ErkJggg==');

        buttonSampah.addEventListener('click', function () {
            removeBook(objectBook.id);
        });

        fitur.append(buttonDone);
        fitur.append(buttonSampah);
        detailBelum.append(fitur);
    } else {
        const fitur = document.createElement('div');
        fitur.classList.add('fitur');

        const buttonX = document.createElement('img');
        buttonX.classList.add('fitur1');
        buttonX.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB5UlEQVRYhe3WvW4TURAF4A8qEC4pABMBJsL08BaxQ0vIEwChQIlEhyhp6QjiASKTIEGAV0EUhgLoIZFAxhhT3LHWsvyzuw40yZFGtu89c2bu7PrOcITDjmMF+Qu4gSVcjN/wGZ/wFq/w5aASHKCKTXTRn2E9tHDhoIIvYy/EO9jCTdRxKqyOldjrBHcPzXmD35NO1JdOdSmHTw3bsmqslQ2+HAK/cb+E/3r49pSoRFVW9jLBh5Po4zvOFnF8Liv7vNgJrc28DgtS6TrGP/PdEGwMrTVibXcM/3JodaXKzsRaiG1N2K/hJ9o4EdaOtdoEn1Zo3smTwLsgr0zhPArOw7B+rE3CanDe5EngQ5CvTOGclE79I6wda5NQD833eRLYD3JlBq8pu/0aM7iV4O2PbhwfQ+7PzrEwBnH+5CH/10cwrgLt+Lw2RfCB9MY/DqvF2iRcH9Geirv+3d/wdp4EzkuXRmeCYNGLaFHBiwieheB2XocpeBlaT4s4nZM1o/U5gm+ExjecKerclLXjMklsyNrxUgl/pL4wGEh2pMYyC4uysvekl3ouNKR+PhjJWriFq9INV4nvq3iBX7Kylz75KE7jiXxDaVfq/bkGkKJjeVUa1RrSrDA8ln+UxvLX+FpQ9wiHGH8BlHSioBTJeucAAAAASUVORK5CYII=');

        buttonX.addEventListener('click', function () {
            movePositionBook(objectBook.id);
        });

        const buttonSampah = document.createElement('img');
        buttonSampah.classList.add('fitur2');
        buttonSampah.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAxElEQVRIieWUTQrCQAyFPwRXHkb3/t1Er+LSI/Q+4kHUhdID6MJi3XSgTVNNoqDiB1kMzHsvaZjCv7ACSlHriNFWMfLWpm7YEwG3SFeC8g0eX05G/Ptn0kzuAODwQnN7S0DrEjAGpg/OCVNzc9qjJ7rOqWbSzDqBFZO2DxT4JygqbQNtgitwMvXb5FhpnwYA7AIBqqYrILIHVfOxgMhjUzXWHUyUO/KhuaYe4f8PDT0BA+DiMD9XGhdLIDeY58DCa/473AElqHJBF+OU9wAAAABJRU5ErkJggg==');

        buttonSampah.addEventListener('click', function () {
            removeBook(objectBook.id);
        });

        fitur.append(buttonX);
        fitur.append(buttonSampah);
        detailBelum.append(fitur);
    }
    return detailBelum;
}

//untuk membersihkan inputan setelah submit
function clear() {
    const id = generateId();
    const title = document.querySelector('.judulbuku');
    const author = document.querySelector('.penulisbuku');
    const year = document.querySelector('.tahunbuku');
    const isCompleted = document.querySelector('.kotak1');

    title.value = '';
    author.value = '';
    year.value = '';
    isCompleted.checked = false;
}

//fungsi untuk buttonDone 
function moveBookCompleted(bookId) {
    var bookTarget = [];
    bookTarget = findBook(bookId);

    console.log(bookTarget);
    if (bookTarget == null) {
        return;
    };

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

//fungsi untuk buttonX
function movePositionBook(bookId) {
    var bookTarget = [];
    bookTarget = findBook(bookId);

    console.log(bookTarget);
    if (bookTarget == null) {
        return;
    };

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

//fungsi untuk mencari id buku yang sesuai
function findBook(bookId) {
    for (let i = 0; i < books.length; i++) {
        const bookItem = books[i];
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

//fungsi untuk buttonSampah
function removeBook(bookId) {
    var bookTarget = [];
    bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) {
        return;
    }

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

//fungsi untuk mencari index buttonSampah
function findBookIndex(bookId) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === bookId) {
            return i;
        }

    }
    return -1;
}

//untuk simpan data di local storage
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'book-apps';

//fungsi untuk savedata
function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

//fungsi isStorageExist -> ngecek apakah web mendukung local storage apa tidak
function isStorageExist() {
    if (typeof (storage) === undefined) {
        alert('browser tidak mendukung local storage');
        return false;
    }
    return true;
}

//event untuk saved event = mengetahui apakah perubahan data berhasil
document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});

//fungsi untuk agar local storage akan ditampilkan saat dimuat web
function loadDataFromStorage() {
    const local = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(local);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener('DOMContentLoaded', function () {
    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

var detail = [];
document.querySelector('.buttoncari').addEventListener('click', function () {
    const searchBar = document.querySelector('.caribuku');

    const valueCari = searchBar.value;

    const detailBelum = document.querySelectorAll('.detailbelum');

    for (let i = 0; i < books.length; i++) {
        if (valueCari === books[i].title) {
            detail.push(books[i].id);
        }
    }

    for (let i = 0; i < detailBelum.length; i++) {
        if (detail == detailBelum[i].getAttribute('id')) {
            detailBelum[i].style.display = 'block';
        } else {
            detailBelum[i].style.display = 'none';
        }

    }

    console.log(detail);
});

document.querySelector('.buttonHapusCari').addEventListener('click', function (e) {
    e.preventDefault();
    const searchBar = document.querySelector('.caribuku');

    for (let i = 0; i < detail.length; i++) {
        detail.pop();
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
});
