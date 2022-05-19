import './styles.css';                      //Para que aparezcan en el "index.html" en la carpeta "dist"

import {Todo, TodoList} from  './classes'; //Cuando no especificamos el nombre del archivo, busca el nombre "index.js" por defecto
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList(); //Exportamos este objeto

// const tarea = new Todo('Aprender JavaScript');
// todoList.nuevoTodo(tarea);
// console.log(todoList);
// crearTodoHtml(tarea);

// localStorage.setItem('mi-key', 'ABC1234');  //No se borra ni aunque se apague la compu
// sessionStorage.setItem('mi-key', 'ABC1234'); //Se borra cuando se cierra el navegador

// setTimeout(() => {
//     localStorage.removeItem('mi-key');
// });

todoList.todos.forEach(todo => {crearTodoHtml(todo)}); //todoList.todos.forEach(crearTodoHtml); 
