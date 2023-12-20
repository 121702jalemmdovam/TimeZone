const productList = document.getElementById('productList');
const pagi = document.getElementById('pagi');
let page = 1
let limit = 3

async function getProducts() {
    let skip = (page-1)*limit;
    try{
        const response = await axios.get(`https://65680f199927836bd97406d3.mockapi.io/username/products?page=${page}&limit=${limit}&skip=${skip}`)
        db=response.data
        db.forEach(item => {
            const box = document.createElement('div')
            box.className='boxDiv'
            box.innerHTML=`
            <img src="${item.image}" alt="${item.title}">
            <p class="title">${item.name}</p>
            <span class="price">${item.price}</span>
            <button onclick="addToBasket(${item.id})">Add to Card</button>
            `;
            productList.appendChild( box )
            
        });
        page++;
    }catch(error){
        console.error('Error fetching products', error);
    }
    
    
}


function addToBasket (id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(db.find(item=>item.id==id))
    localStorage.setItem('cart',JSON.stringify(cart))
    
    
}
getProducts()