function App() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [completedSale, setCompletedSale] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fdfafb] text-slate-900">
      <div className="flex min-h-screen min-w-0">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="min-w-0 flex-1">
          <Header setOpen={setOpen} />
          <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route
                path="/"
                element={
                  <SalePage
                    cart={cart}
                    setCart={setCart}
                    setCompletedSale={setCompletedSale}
                  />
                }
              />
              <Route
                path="/sale"
                element={
                  <SalePage
                    products={products}
                    setProducts={setProducts}
                    cart={cart}
                    setCart={setCart}
                    setCompletedSale={setCompletedSale}
                  />
                }
              />
              <Route
                path="/sales"
                element={
                  <PlaceholderPage title="Sales history" icon={FileText} />
                }
              />
              <Route
                path="/products"
                element={<PlaceholderPage title="Products" icon={Package} />}
              />
              <Route
                path="/customers"
                element={<PlaceholderPage title="Customers" icon={Users} />}
              />
              <Route
                path="/inventory"
                element={
                  <PlaceholderPage title="Inventory" icon={ShoppingBag} />
                }
              />
              <Route
                path="/reports"
                element={
                  <PlaceholderPage title="Reports" icon={FileBarChart} />
                }
              />
              <Route
                path="/settings"
                element={<PlaceholderPage title="Settings" icon={Settings} />}
              />
            </Routes>
          </main>
        </div>
      </div>
      <CompletedBanner
        sale={completedSale}
        onClose={() => setCompletedSale(null)}
      />
    </div>
  );
}
