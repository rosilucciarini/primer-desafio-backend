const fs = require("fs").promises;


class ProductManager {

    static ultimoId = 0;

    constructor(path){
        this.products = [];
        this.path = path;
    }

    async addProduct(nuevoOjeto) {

        let {title, description, price, thumbnail, code, stock} = nuevoOjeto;


        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if(this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            return;
        }


        const newProduct = {
            id: ++ ProductManager.ultimoId,
            title,
            description,
            price,
            thumbnail, 
            code,
            stock
        }
       
        this.products.push(newProduct);
        

        await this.guardarArchivo(this.products);
        
    }

    getProducts() {
        console.log(this.products);
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if(!buscado) {
                console.log("Producto no encontrado");
            } else{
                console.log("Producto encontrado!");
                return buscado;
            }

        } catch (error) {
            console.log("Error al leer el archivo", error)
            
        }
    
    }



    async leerArchivo() {
        try{
             const respuesta = await fs.readFile(this.path, "utf-8");
             const arrayProductos = JSON.parse(respuesta);
             return arrayProductos;

        }catch (error) {
            console.log("Error al leer archivo", error)

        }
    }
    async guardarArchivo(arrayProductos) {
        try{
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))

        }catch(error) {
            console.log("Error al guardar el archivo", error)

        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if(index !== -1){
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            }else {
                console.log("No se encontro el archivo");
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
            
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if(index !== -1){
               arrayProductos.splice(index, 1);
                await this.guardarArchivo(arrayProductos);
                console.log("Producto eliminado:",deleteProduct)
            }else {
                console.log("Producto no encontrado");
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
            
        }
    }

    

}

//TESTIN

//Instancia ProductManager

const manager = new ProductManager("./productos.json");

//GetProducts que devuelve array vacio

manager.getProducts();

//Creacion de AddProduct

const remera ={
    title: "Remera",
    description: "remera magas cortas",
    price: 20000,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 20
}
manager.addProduct(remera);

//Objeto agregado con ID generado sin repetirse

const pantalon ={
    title: "Pantalon",
    description: "pantalon adidas",
    price: 30000,
    thumbnail: "sin imagen",
    code: "abc124",
    stock: 20
}
manager.addProduct(pantalon);

manager.getProducts();

//Metodo getProductById que devuelve el producto y en caso de no existir devuelve un error.

async function testeamosBusquedaId() {
    const buscado = await manager.getProductById(2);
    console.log(buscado);
}

testeamosBusquedaId();

//Metodo updateProduct intenta cambiar el campo de un producto, se actualiza sin eliminar el Id.

const short ={
    id:1,
    title: "Short",
    description: "short corto hombre",
    price: 30000,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 20
};
async function testeamosActualizar(){
    await manager.updateProduct(1, short);
}
testeamosActualizar();

//Metodo deleteProduct elimina el producto que tenga el Id que se pasa por parametro.
//Esta funcion funciona si no se actualiza el producto antes.


async function testeoDelete(){
    await manager.deleteProduct(1);
}
testeoDelete();



