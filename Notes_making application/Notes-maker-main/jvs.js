console.log("hello");
show_notes();

let add_btn = document.getElementById('btn_id');
add_btn.addEventListener('click', function (e) {
    let text = document.getElementById('text_id');
    let title = document.getElementById('title_id');
    let notes = localStorage.getItem('notes');
    if (notes == null) notes_obj = [];
    else notes_obj = JSON.parse(notes);
    let temp = {
        text: text.value,
        title: title.value
    }
    notes_obj.push(temp);
    localStorage.setItem('notes', JSON.stringify(notes_obj));
    text.value = "";
    title.value = "";
    show_notes();
});

let search_text = document.getElementById('search_text');
search_text.addEventListener("input", function () {
    let inval = search_text.value.toLowerCase();
    let cards = document.getElementsByClassName('tot_card');
    Array.from(cards).forEach(function (element) {
        let par_text = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let title_text = element.getElementsByTagName('h3')[0].innerText.toLowerCase();
        if (par_text.includes(inval)) {
            element.style.display = 'block';
        }
        else if (title_text.includes(inval)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = "none";
        }
    });
});

function show_notes() {
    let note_id = document.getElementById('note_id');
    let notes = localStorage.getItem('notes');
    let html = "";
    if (notes == null) {
        note_id.innerHTML = `Please add your notes here by entering text above and make things memorable!. Thank You...`
    }
    else {
        let notes_obj = JSON.parse(notes);
        notes_obj.forEach(function (element, index) {
            html += `
            <div class="tot_card card mx-2 my-2" style="width: 15.5rem; background-color: rgb(2, 35, 36);">
            <div class="card-body" style="background-color: rgb(174, 194, 236);">
                <h5 class="card-title">
                    <h3>${element.title}</h3>
                </h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="dlt_fun(this.id)" class="btn btn-primary">Delete</button>
            </div>
        </div> 
        `
        });
        note_id.innerHTML = html;
    }
}

function dlt_fun(index) {
    let notes = localStorage.getItem('notes');
    notes_obj = JSON.parse(notes);
    notes_obj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes_obj));
    if(notes_obj.length==0)localStorage.clear();
    show_notes();
}