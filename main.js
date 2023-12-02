class ProductManager {

    static ultimoId = 0;

    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

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
        
    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.log("Producto no encontrado")
        }else {
            console.log("Producto encontrado:", product);
        }
        return product;
    }

}



const manager = new ProductManager();

manager.getProducts();

manager.addProduct("Remera", "Remera deportiva", 15000, "sin imagen", "abcd123", 20);
manager.addProduct("Short", "Short deportivo", 25000, "sin imagen", "abcd124", 40);
manager.addProduct("Buzo", "Buzo deportivo color gris", 35000, "sin imagen", "abcd125", 15);

manager.getProducts();

manager.getProductById(2);
manager.getProductById(10);



