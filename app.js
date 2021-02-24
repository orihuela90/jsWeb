//clase productos internos
class Product{
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

//clase para la interface html
class UI{

    /**
     * Añadimos un producto a la lista mediante un objeto pasado por parametro
     * @param {tipo objeto} producto 
     */
    addProduct(producto){
        //interactuamos con el html
        const productosListas = document.getElementById('producto-lista');
        //creamos un elemento html
        const element = document.createElement('div');

        //diseñamos la tarjeta para visualizar los datos del objeto en el html
        element.innerHTML = `
            <div class= "card text-center mb-4 ">
                <div class= card-body> 
                    <strong> Nombre Productos </strong> : ${producto.name}
                    <strong> Precio Producto </strong> : ${producto.price}
                    <strong> Año Producto </strong> : ${producto.year}
                    <a href="#" class= "btn btn-danger" name="delete">Eliminar</a>
                </div>
            </div>
        `;

        //insertamos mediante un elemento hijo (appendChild) 
        productosListas.appendChild(element);

    }

    /**
     * reseteamos los campos del formulario 
     */
    resetForm(){
        document.getElementById('productoFormulario').reset();
    }

    deleteProducto(elemento){
        if(elemento.name === 'delete'){
            elemento.parentElement.parentElement.remove();
            this.showMessage('Producto Eliminado', 'info')
        }
    }

    /**
     * Funcion para mostrar un mensaje
     */
    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className =  `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));

        //mostrando en el DOM
        const contenedor = document.querySelector('.container');
        const aplicacion = document.querySelector('#app');

        contenedor.insertBefore(div, aplicacion);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        },3000);

    }
}

    /*DOM, EVENT
    Obtenemos un elemento por el id ?? capturamos el evento con addEventListener
    Cuando ejecutemos este evento ejecutamos una funcion
    */
    document.getElementById('productoFormulario').addEventListener('submit', function(e) {
        const name = document.getElementById('name').value
        const pricee = document.getElementById('precio').value
        const anno = document.getElementById('año').value 

        //creacion de un objeto con los datos solicitados
        const oProcudto = new Product(name, pricee, anno);

        //creamos un nuevo objeto de la calse UI para obtener los metodos añadir eleminar etc
        const ui = new UI();

        if(name === ''){
            return ui.showMessage('Debe insertar el nombre', 'danger')
        }else if(pricee === ''){
            return ui.showMessage('Debe insertar el precio', 'danger')
        }else{
            //llamamos al metodo reseteo mediante su clase UI
            ui.addProduct(oProcudto);
        }
        
        //llamamos al metodo reseteo mediante su clase UI
        ui.resetForm();
        //mostramos el mensje una vez guardado el producto y le pasamos los parametros
        ui.showMessage('Producto Guardado Correctamente', 'success');

        //mediante el evento bloqueamos el resfresh
        e.preventDefault();

    });

    document.getElementById("producto-lista").addEventListener('click',function(e) {
        const nuevaUi = new UI();
        nuevaUi.deleteProducto(e.target);

    });