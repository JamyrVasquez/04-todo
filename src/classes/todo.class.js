export class Todo{

    static fromJson({id, tarea, completado, creado}){//Usamos desestructuracion de objetos
        const tempTodo = new Todo(tarea);

        tempTodo.id = id;
        tempTodo.completado = completado,
        tempTodo.creado = creado;

        return tempTodo; //Retornamos la instancia
    }
    
    constructor(tarea){
        this.tarea  = tarea;

        this.id         = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();
    }
}