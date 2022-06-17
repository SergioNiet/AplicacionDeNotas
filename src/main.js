const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer?.querySelector(".add-note");

getNotes().forEach(note => {
     const noteElement = createNoteElement(note.id, note.content);
     notesContainer?.insertBefore(noteElement, addNoteButton);
});

addNoteButton?.addEventListener("click", () => addNote())

function getNotes(){
     return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");

}
// Nos va a devolver todas las notas previas que hayamos hecho cuando lo iniciemos

function saveNotes(notes){
     localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}
// Nos va a permitir guardar las notas nuevas en nuestro almacenamiento local

function createNoteElement(id, content){
     const element = document.createElement("textarea");
     
     element.classList.add("note");
     element.value = content;
     element.placeholder = "Nota vacía";

     element.addEventListener("change", () =>{
          updateNote(id, element.value);
     });

     element.addEventListener("dblclick", () =>{
          const doDelete = confirm("Estás seguro de querer eliminar esta nota?");

          if(doDelete){
               deleteNote(id, element);
          }
     });

     return element;
}
// nos va a permitir añadir html, nos va a permitir añadir notas

function addNote(){
     const notes = getNotes();
     const noteObject ={
          id: Math.floor(Math.random() * 100000),
          content: ""
     };

     const noteElement = createNoteElement(noteObject.id, noteObject.content);
     notesContainer?.insertBefore(noteElement, addNoteButton);

     notes.push(noteObject);
     saveNotes(notes)

}
// No solo nos va a permitir añadir notas, también nos va a permitir guardalo en nuestro almacenamiento local

function updateNote(id, newContent){
     const notes = getNotes();
     const targetNote = notes.filter(note => note.id == id)[0];
     targetNote.content = newContent;
     saveNotes(notes);
}
// Nos va a permitir modificar la nota en vez de añadir una nueva

function deleteNote(id, element){
     const notes = getNotes().filter(note => note.id != id);

     saveNotes(notes);
     notesContainer?.removeChild(element);
}
// Nos permite borrar la nota