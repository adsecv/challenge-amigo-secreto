let namesList = [];
let results = [];
let canDraw = true; 

/* Se verifica que el campo no esté vacío o el valor ingresado esté duplicado 
y lo agrega a la lista si es válido. */
function agregar() {
    let name = document.getElementById("amigo").value;
    
    if (name != "") {
        if (namesList.includes(name)) {
            alert("Este nombre ya está en la lista, ingrese un nombre diferente.");
        } else {
            namesList.push(name); 
            actualizar(); 
        }
    } else {
        alert("Ingrese un nombre.");
    }
    
    document.getElementById("amigo").value = "";
}

// Refresca la lista de amigos en la interfaz, mostrando todos los nombres agregados.
function actualizar() {
    let names = document.getElementById("listaAmigos");
    names.textContent = ""; 
    for (let i = 0; i < namesList.length; i++) {
        let name = namesList[i];
        let li = document.createElement("li"); 
        let span = document.createElement("span");
        span.textContent = name;
        li.appendChild(span);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.onclick = function() {
            eliminar(name);
        };      
        li.appendChild(deleteButton); 
        names.appendChild(li);  
    }
}

// Elimina un nombre previamente agregado a la lista
function eliminar(name) {
    namesList = namesList.filter(item => item !== name); 
    actualizar(); 
}

/* Realiza el sorteo de manera aleatoria, requiriendo un minimo de dos amigos,
lo muestra en la interfaz y verifica si el sorteo ha finalizado. */
function sortear() {
    if (canDraw && namesList.length < 2) {
        alert('Ingrese al menos dos nombres para realizar el sorteo.');
        return; 
    }
    canDraw = false;
    document.querySelector(".button-draw").disabled = true;
    document.querySelector(".input-name").removeEventListener("keypress", controlKeypress);

    if (namesList.length > 0) {
        let resultado = document.getElementById("resultado");
        let amigoSecreto = namesList[Math.floor(Math.random() * namesList.length)]; 
        results.push(amigoSecreto);
        namesList = namesList.filter(name => name !== amigoSecreto); 
        resultado.innerHTML = `El amigo secreto sorteado es: ${amigoSecreto}`;
        
        setTimeout(() => {
            resultado.innerHTML = "";
            document.querySelector(".button-draw").disabled = false;
        }, 2000);
          
        if (namesList.length == 0) {
            setTimeout(() => {
                resultado.innerHTML = "¡El sorteo ha finalizado!";            
                document.querySelector(".button-new-draw").style.display = "block"; 
                document.querySelector(".button-new-draw").disabled = false; 
            }, 2000);
        }
    }
       
    document.getElementById("listaAmigos").style.display = "none";
    document.querySelector(".button-add").disabled = true;
}

// Reinicia el sorteo para realizar uno nuevo, habilitando las interacciones 
function nuevoSorteo() {
    namesList = [];
    results = [];  
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("listaAmigos").style.display = "block";
    document.getElementById("amigo").value = "";
    document.querySelector(".button-add").disabled = false;
    document.querySelector(".button-draw").disabled = false;
    document.querySelector(".button-new-draw").disabled = true;
    document.querySelector(".button-new-draw").style.display = "none";
    document.querySelector(".input-name").addEventListener("keypress", controlKeypress);
    canDraw = true;
    actualizar();   
}

// Ejecuta la funcion designada si la tecla especificada es presionada
function controlKeypress(e) {
    if (e.key === "Enter") {
        agregar(); 
    }
}

// Agrega evento de escucha en el campo de entrada
document.querySelector(".input-name").addEventListener("keypress", controlKeypress);