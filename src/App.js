import { useState } from "react";
import cart from "./asset/cart.png";
import { productList, categoriesList } from "./products.js";

export default function App() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(product) {
    // console.log(`${product.name} was selected`);
    // console.log(product);

    // setCart([...cart, product]);
    // or
    setCart((prevCart) => [...prevCart, product]);

    // console.log(cart);
  }

  function handleDelete(id) {
    console.log(id);
    // setCart(
    //   cart.filter((item) => item.id !== id)
    // )

    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  return (
    <div className="page">
      <Nav />
      <Hero />
      <Categories />
      <ProductPlusCart
        handleAddToCart={handleAddToCart}
        cart={cart}
        handleDelete={handleDelete}
      />
    </div>
  );
}

function Nav() {
  return (
    <header className="left-header">
      <h2>ShopeEase</h2>

      <nav className="middle-header-nav">
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>Categories</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </nav>

      <div className="right-header">
        <h4>Cart</h4>
        <button>I Want To Buy These</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Your favorite products, just a message away.</h1>
        <p>Browse, select and send your order directly to us on Whatsapp</p>
        <button>Start Shopping</button>
      </div>

      <div className="hero-image">
        <img src={cart} alt="shopping cart" />
      </div>
    </section>
  );
}

function Categories() {
  return (
    <div className="categories-section">
      <h1>Shop by Category</h1>

      <div className="category-list">
        {categoriesList.map((cat) => (
          <div className="categories-items" key={cat.name}>
            <img src={cat.image} alt={cat.name} />

            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductPlusCart({ handleAddToCart, cart, handleDelete }) {
  return (
    <div className="product-plus-cart">
      <ProductList handleAddToCart={handleAddToCart} />
      <Cart cart={cart} handleDelete={handleDelete} />
    </div>
  );
}
function ProductList({ handleAddToCart }) {
  return (
    <div className="product-list-box">
      <header className="product-list-header">
        <h1>Featured Products</h1>
        <p>View All</p>
      </header>

      <div className="product-list">
        {productList.map((product) => {
          return (
            <div className="product" key={product.id}>
              <img src={product.image} alt="pic" />

              <h2>{product.name}</h2>
              <p>{product.price}</p>

              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Cart({ cart, handleDelete }) {
  console.log(cart);
  return (
    <div className={cart.length === 0 ? "empty-cart" : "cart"}>
      <header className="cart-header">
        <h1>
          Cart Space <span>({cart.length})</span>
        </h1>
        <p>Delete</p>
      </header>

      <div>
        {cart.map((item, index) => (
          <div className="product-selected" key={item.id}>
            <div className="product-selected-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="product-selected-infos">
              <div className="product-name-delete">
                <h3>{item.name}</h3>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>

              <p>{item.price}</p>

              <button>1+2</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
