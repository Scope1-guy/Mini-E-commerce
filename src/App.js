import { useState } from "react";
import cart from "./asset/cart.png";
import { productList, categoriesList } from "./products.js";

export default function App() {
  const [cart, setCart] = useState([]);

  const [quantityForProduct, setQuantityForProduct] = useState(1);

  function handleQuantityReduction() {
    setQuantityForProduct(quantityForProduct - 1);
  }

  function handleQuantityAddition() {
    setQuantityForProduct(quantityForProduct + 1);
  }

  function handleAddToCart(product) {
    // console.log(`${product.name} was selected`);
    // console.log(product);

    // setCart([...cart, product]);
    // or
    // setCart((prevCart) => [...prevCart, product]); //This add new product to cart even if the product exist

    const existingProduct = cart.find((item) => item.id === product.id); // finding the product in the cart

    if (existingProduct) {
      setCart(
        cart.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              // quantity: item.quantity + 1,
              quantity: quantityForProduct + 1,
            };
          }

          return item;
        })
      );
    } else {
      setCart([...cart, { ...product, quantity: quantityForProduct }]);
    }

    console.log(quantityForProduct);
  }

  function handleDelete(id) {
    console.log(id);
    // setCart(
    //   cart.filter((item) => item.id !== id)
    // )

    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function handleWhatsappCheckout() {
    const phoneNumber = "2348141396108";

    const message = cart
      .map((item) => {
        return `- ${item.name} X ${item.quantity} = $${
          item.price * item.quantity
        }`;
      })
      .join("\n");

    const total = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const fullMessage = `Hello, I want to place an order: \n\n${message}\n\nTotal: $${total}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;

    // window.open(url, "_blank");
    console.log(url, fullMessage);
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
        handleWhatsappCheckout={handleWhatsappCheckout}
        quantityForProduct={quantityForProduct}
        setQuantityForProduct={setQuantityForProduct}
        handleQuantityReduction={handleQuantityReduction}
        handleQuantityAddition={handleQuantityAddition}
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
          <li
            onClick={() => {
              document
                .getElementById("shop")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop
          </li>
          <li
            onClick={() => {
              document
                .getElementById("categories")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Categories
          </li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </nav>

      <div className="right-header">
        <h4>Cart</h4>
        <button
          onClick={() => {
            document
              .getElementById("shop")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          I Want To Buy These
        </button>
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
    <div className="categories-section" id="categories">
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

function ProductPlusCart({
  handleAddToCart,
  cart,
  handleDelete,
  handleWhatsappCheckout,
  quantityForProduct,
  setQuantityForProduct,
  handleQuantityReduction,
  handleQuantityAddition,
}) {
  return (
    <div className="product-plus-cart">
      <ProductList handleAddToCart={handleAddToCart} />
      <Cart
        cart={cart}
        handleDelete={handleDelete}
        handleWhatsappCheckout={handleWhatsappCheckout}
        quantityForProduct={quantityForProduct}
        setQuantityForProduct={setQuantityForProduct}
        handleQuantityReduction={handleQuantityReduction}
        handleQuantityAddition={handleQuantityAddition}
      />
    </div>
  );
}
function ProductList({ handleAddToCart }) {
  return (
    <div className="product-list-box" id="shop">
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

function Cart({
  cart,
  handleDelete,
  handleWhatsappCheckout,
  quantityForProduct,
  setQuantityForProduct,
  handleQuantityReduction,
  handleQuantityAddition,
}) {
  console.log(cart);

  const subTotalCalc = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  return (
    <div className={cart.length === 0 ? "empty-cart" : "cart"}>
      <header className="cart-header">
        <h1>
          Cart Space <span>({cart.length})</span>
        </h1>
        <p>Delete</p>
      </header>

      <div>
        {cart.map((item) => (
          <div className="product-selected" key={item.id}>
            <div className="product-selected-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="product-selected-infos">
              <div className="product-name-delete">
                <h3>{item.name}</h3>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>

              <p className="product-selected-quantity">
                Quantity: {console.log(item.quantity)}
              </p>

              <p className="product-selected-price">
                ${item.price * item.quantity}
              </p>

              <div className="quantity-selection"></div>
              <div>
                <div className="steps-count">
                  <button onClick={handleQuantityReduction}>-</button>
                  <p>{quantityForProduct}</p>
                  <button onClick={handleQuantityAddition}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="subtotal-div">
          <h2>Subtotal</h2>
          <p>{subTotalCalc}</p>
        </div>

        <button className="product-buy-button" onClick={handleWhatsappCheckout}>
          I Want To Buy These
        </button>
        <div className="whatsapp-text">
          This will open Whatsapp with your order details.
        </div>
      </div>
    </div>
  );
}
