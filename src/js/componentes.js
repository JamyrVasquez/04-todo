import { Todo } from "../classes";
import {todoList} from "../index"; //importamos el objeto de "index.js"

//Referencia en el HTML -----------------------------------------------------------------------------------------
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

//---------------------------------------------------------------------------------------------------------------
export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement('div'); //Necesito crear un elemento que contenga esa lista ordenada
    div.innerHTML = htmlTodo;  //"innerHTML" es differente de "innerText", prestar atención a como se toman los caracteres.

    // console.log(div.innerHTML);
    // console.log(div.firstElementChild);
    divTodoList.append(div.firstElementChild); //Insertamos el primer hijo (el li o lista ordenada) en vez del div
    

    return div;
}

//==============================================================================================================
txtInput.addEventListener('keyup', (event) => { //Nos da info de la tacla que se presionó
    // console.log(event);
    // console.log(event.keyCode);

    if(event.keyCode === 13 && txtInput.value.length > 0) { //Significa que la persona presionó enter
        // console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo(nuevoTodo);
        console.log(`Imprimiendo desde "componentes" -> "textInput.addEventListener":`, todoList);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

//---------------------------------------------------------------------------------------------------------------
divTodoList.addEventListener('click', (event) => {
    // console.log('click -------------------------------');
    //  console.log(event.target.localName);

    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement; //Necesitamos la referencia al "li"

    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.parentElement);
    // console.log(`Imprimiendo elemento ANTES de dar click en el botón "check": `, todoElemento); //La clase pasa muy rapido a completed, no funciona muy bien

    const todoId = todoElemento.getAttribute('data-id');
    // console.log({todoId});

    if(nombreElemento.includes('input')){ //click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); //Se refiere a la clase del "li", esta pasa a completed
        console.log(`Imprimiendo elemendo DESPUÉS de dar click en el botón "check":`, todoElemento);
    }else if(nombreElemento.includes('button')){ //Si se da click en la x, hay que borrar el todo
        todoList.eliminarTodo(todoId);

        //Eliminando la referencia del HTML
        divTodoList.removeChild(todoElemento);
        console.log(`Elemento eliminado con id: ${todoId}`);

    }
    console.log(`Imprimiendo desde "componentes" -> "divTodoList.addEventListener":`, todoList);
});

//---------------------------------------------------------------------------------------------------------------
btnBorrar.addEventListener('click', () => {
    
    todoList.eliminarCompletados();

    //Eliminando la referencia del HTML
    for(let i = divTodoList.children.length-1; i >= 0; i--){ //Eliminando de atras hacia adelante
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

    console.log(`Imprimiendo desde "componentes" -> "btnBorrar.addEventListener":`, todoList);
});

//---------------------------------------------------------------------------------------------------------------
ulFiltros.addEventListener('click', (event) => {
    console.log(event.target);
    // console.log(event.target.localName); //a
    console.log(event.target.text);      //Todos, Pendientes, Completados

    const filtro = event.target.text;
    if(!filtro){
        return ;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        // console.log(elemento);
        
        elemento.classList.remove('hidden'); //La clase "hidden" está personalizada en el archivo "styles.css"
        const completado = elemento.classList.contains('completed'); //True or false

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');          
                }
                // else{
                //     console.log(elemento);
                // }
            break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                // else{
                //     console.log(elemento);
                // }
            break;
            // default:
            //     console.log(elemento);
        }
    }

});

