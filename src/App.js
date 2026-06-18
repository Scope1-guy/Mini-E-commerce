import { useState } from "react";
import cartIcon from "./asset/cart.png";
import { productList, categoriesList, aboutInfo } from "./products.js";

export default function App() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  function handleAddToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      setCartOpen(true);
    }
  }

  function handleQuantityReduction(id) {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  }

  function handleQuantityAddition(id) {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDelete(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function handleWhatsappCheckout() {
    const phoneNumber = "2348141396108";
    const message = cart
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} = ₦${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const fullMessage = `Hello! I'd like to place an order:\n\n${message}\n\nTotal: ₦${total.toLocaleString()}`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`,
      "_blank"
    );
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="page">
      <Nav
        totalItems={totalItems}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
      <Hero />
      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="product-plus-cart" id="shop">
        <ProductList
          handleAddToCart={handleAddToCart}
          activeCategory={activeCategory}
        />
        <Cart
          cart={cart}
          handleDelete={handleDelete}
          handleWhatsappCheckout={handleWhatsappCheckout}
          handleQuantityReduction={handleQuantityReduction}
          handleQuantityAddition={handleQuantityAddition}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
      </div>
      <AboutSection />
      <Footer />
    </div>
  );
}

function Nav({ totalItems, menuOpen, setMenuOpen, cartOpen, setCartOpen }) {
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <h2 className="logo">ShopEase</h2>

      <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        <ul>
          <li
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMenuOpen(false);
            }}
          >
            Home
          </li>
          <li onClick={() => scrollTo("shop")}>Shop</li>
          <li onClick={() => scrollTo("categories")}>Categories</li>
          <li onClick={() => scrollTo("about-section")}>About</li>
          <li onClick={() => scrollTo("footer")}>Contact</li>
        </ul>
      </nav>

      <div className="nav-actions">
        <button
          className="cart-toggle-btn"
          onClick={() => setCartOpen(!cartOpen)}
        >
          🛒Cart{" "}
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
        <button
          className="cta-btn desktop-only"
          onClick={() => scrollTo("shop")}
        >
          Shop Now
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="hero">
      <div className="hero-text">
        <p className="hero-eyebrow">🛍️ Shop Smart, Shop Easy</p>
        <h1>Your favourite products, just a message away.</h1>
        <p className="hero-sub">
          Browse, select and send your order directly to us on WhatsApp — no
          stress, no hassle.
        </p>
        <div className="hero-buttons">
          <button className="cta-btn" onClick={() => scrollTo("shop")}>
            Start Shopping
          </button>
          <button
            className="cta-outline"
            onClick={() => scrollTo("categories")}
          >
            Browse Categories
          </button>
        </div>
      </div>
      <div className="hero-image">
        <img src={cartIcon} alt="shopping cart" />
      </div>
    </section>
  );
}

function Categories({ activeCategory, setActiveCategory }) {
  return (
    <div className="categories-section" id="categories">
      <div className="section-header">
        <h2>Shop by Category</h2>
        <p>Tap a category to filter products</p>
      </div>
      <div className="category-list">
        {categoriesList.map((cat) => (
          <button
            key={cat.name}
            className={`category-btn ${
              activeCategory === cat.name ? "category-active" : ""
            }`}
            onClick={() => {
              setActiveCategory(cat.name);
              document
                .getElementById("shop")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-label">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductList({ handleAddToCart, activeCategory }) {
  const filtered =
    activeCategory === "All"
      ? productList
      : productList.filter((p) => p.category === activeCategory);

  return (
    <div className="product-list-box">
      <header className="product-list-header">
        <h2>
          {activeCategory === "All" ? "All Products" : activeCategory}
          <span className="product-count"> ({filtered.length})</span>
        </h2>
        <p className="view-all" onClick={() => {}}>
          {activeCategory !== "All" ? "View All" : ""}
        </p>
      </header>

      {filtered.length === 0 ? (
        <div className="empty-products">
          <p>No products in this category yet.</p>
        </div>
      ) : (
        <div className="product-list">
          {filtered.map((product) => (
            <div className="product" key={product.id}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.name} />
                <span className="product-category-tag">{product.category}</span>
              </div>
              <h3>{product.name}</h3>
              <p className="product-price">₦{product.price.toLocaleString()}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Cart({
  cart,
  handleDelete,
  handleWhatsappCheckout,
  handleQuantityReduction,
  handleQuantityAddition,
  cartOpen,
  setCartOpen,
}) {
  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`cart-panel ${cartOpen ? "cart-visible" : ""} ${
        cart.length === 0 && !cartOpen ? "cart-hidden" : ""
      }`}
    >
      <div className="cart-header">
        <h2>
          Cart <span>({cart.length})</span>
        </h2>
        <button className="cart-close" onClick={() => setCartOpen(false)}>
          ✕
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty-state">
          <p>🛒</p>
          <p>Your cart is empty</p>
          <small>Add items from the product list</small>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <h4>{item.name}</h4>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                  <p className="cart-item-price">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityReduction(item.id)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityAddition(item.id)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <strong>₦{subTotal.toLocaleString()}</strong>
            </div>
            <button className="checkout-btn" onClick={handleWhatsappCheckout}>
              <span>💬</span> Order via WhatsApp
            </button>
            <p className="whatsapp-note">
              Opens WhatsApp with your full order details
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function AboutSection() {
  return (
    <section className="about-section" id="about-section">
      <div className="section-header">
        <h2>Why Shop With Us?</h2>
        <p>We make buying easy, safe and enjoyable</p>
      </div>
      <div className="about-grid">
        {aboutInfo.map((item) => (
          <div className="about-card" key={item.type}>
            <div className="about-icon">{item.icon}</div>
            <h3>{item.type}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>ShopEase</h3>
          <p>
            Your one-stop shop for quality products. Browse, select, and order
            via WhatsApp — fast, easy, and trusted.
          </p>
          <a
            href="https://wa.me/2348141396108"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-link"
          >
            💬 Chat With Us on WhatsApp
          </a>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Home
            </li>
            <li
              onClick={() =>
                document
                  .getElementById("shop")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop
            </li>
            <li
              onClick={() =>
                document
                  .getElementById("categories")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Categories
            </li>
            <li
              onClick={() =>
                document
                  .getElementById("about-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              About Us
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Categories</h4>
          <ul>
            <li>Shoes</li>
            <li>Bags</li>
            <li>Watches</li>
            <li>Clothing</li>
            <li>Perfumes</li>
            <li>Gadgets</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>📍 Lagos, Nigeria</p>
          <p>📞 +234 814 139 6108</p>
          <p>📧 shopease@gmail.com</p>
          <div className="social-icons">
            <a
              href="https://wa.me/2348141396108"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a href="#footer">Instagram</a>
            <a href="#footer">Facebook</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ShopEase. All rights reserved. Built with
          ❤️ in Nigeria.
        </p>
      </div>
    </footer>
  );
}
