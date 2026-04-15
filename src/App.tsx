/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

interface InventoryItem {
  id: number;
  name: string;
  category: 'Toner' | 'Cartucho' | 'Chip' | 'Otro';
  sku: string;
  stock: number;
  minStock: number;
  price: number;
}

const INITIAL_DATA: InventoryItem[] = [
  { id: 1, name: 'Toner HP 85A Negro', category: 'Toner', sku: 'CE285A', stock: 45, minStock: 10, price: 850 },
  { id: 2, name: 'Cartucho Canon PG-210 XL', category: 'Cartucho', sku: '2973B001', stock: 12, minStock: 15, price: 450 },
  { id: 3, name: 'Chip Samsung D111S', category: 'Chip', sku: 'CH-D111S', stock: 150, minStock: 50, price: 85 },
  { id: 4, name: 'Toner Brother TN660 High Yield', category: 'Toner', sku: 'TN660', stock: 8, minStock: 10, price: 1200 },
  { id: 5, name: 'Chip HP CF217A', category: 'Chip', sku: 'CH-17A', stock: 25, minStock: 30, price: 120 },
];

export default function App() {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Todas' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = items.filter(item => item.stock <= item.minStock).length;
  const totalValue = items.reduce((acc, item) => acc + (item.stock * item.price), 0);

  return (
    <div className="container-fluid p-0">
      {/* Mobile Header */}
      <header className="navbar sticky-top bg-black-vibrant flex-md-none p-0 shadow d-md-none">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white fw-bold" href="#">
          TONER<span className="text-cyan-vibrant">FLOW</span>
        </a>
        <ul className="navbar-nav flex-row d-md-none">
          <li className="nav-item text-nowrap">
            <button className="nav-link px-3 text-white border-0 bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
              <i className="bi bi-list fs-3"></i>
            </button>
          </li>
        </ul>
      </header>

      <div className="row g-0">
        {/* Sidebar */}
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-black-vibrant sidebar collapse min-vh-100 shadow z-3">
          <div className="position-sticky pt-3 px-0">
            <div className="d-none d-md-flex align-items-center mb-4 px-4 text-white text-decoration-none">
              <i className="bi bi-box-seam fs-3 me-2 text-cyan-vibrant"></i>
              <span className="fs-4 fw-bold tracking-wider">TONER<span className="text-cyan-vibrant">FLOW</span></span>
            </div>
            <ul className="nav flex-column">
              <li className="nav-item mb-1">
                <a className="nav-link sidebar-item-active py-3 px-4 d-flex align-items-center" href="#">
                  <i className="bi bi-speedometer2 me-3"></i> Panel de Control
                </a>
              </li>
              <li className="nav-item mb-1">
                <a className="nav-link text-secondary py-3 px-4 d-flex align-items-center hover:bg-white/5 transition-colors" href="#">
                  <i className="bi bi-list-ul me-3"></i> Inventario Stock
                </a>
              </li>
              <li className="nav-item mb-1">
                <a className="nav-link text-secondary py-3 px-4 d-flex align-items-center hover:bg-white/5 transition-colors" href="#">
                  <i className="bi bi-cpu me-3"></i> Chips & Refacciones
                </a>
              </li>
              <li className="nav-item mb-1">
                <a className="nav-link text-secondary py-3 px-4 d-flex align-items-center hover:bg-white/5 transition-colors" href="#">
                  <i className="bi bi-truck me-3"></i> Proveedores
                </a>
              </li>
              <li className="nav-item mb-1">
                <a className="nav-link text-secondary py-3 px-4 d-flex align-items-center hover:bg-white/5 transition-colors" href="#">
                  <i className="bi bi-cart-plus me-3"></i> Órdenes de Compra
                </a>
              </li>
              <li className="nav-item mb-1">
                <a className="nav-link text-secondary py-3 px-4 d-flex align-items-center hover:bg-white/5 transition-colors" href="#">
                  <i className="bi bi-graph-up me-3"></i> Reportes
                </a>
              </li>
            </ul>
            <hr className="mx-4 text-secondary opacity-25" />
            <div className="dropdown px-4 pb-4">
              <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://picsum.photos/seed/admin/32/32" alt="" width="32" height="32" className="rounded-circle me-2 border border-secondary" referrerPolicy="no-referrer" />
                <span className="small fw-semibold">Admin Almacén</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow border-0">
                <li><a className="dropdown-item" href="#">Perfil</a></li>
                <li><a className="dropdown-item" href="#">Configuración</a></li>
                <li><hr className="dropdown-divider opacity-10" /></li>
                <li><a className="dropdown-item" href="#">Cerrar Sesión</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-5 py-4 bg-bg-vibrant min-vh-100">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4">
            <h1 className="h3 fw-bold text-black-vibrant">Inventario de Refacciones</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <button type="button" className="btn btn-sm bg-cyan-vibrant text-white px-3 py-2 fw-semibold shadow-sm border-0">
                <i className="bi bi-plus-lg me-1"></i> Nueva Entrada
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mb-5">
            <div className="col">
              <div className="stat-card-vibrant border-cyan-vibrant">
                <div className="stat-val">1,240</div>
                <div className="stat-label">Cartuchos Cyan</div>
              </div>
            </div>
            <div className="col">
              <div className="stat-card-vibrant border-magenta-vibrant">
                <div className="stat-val">856</div>
                <div className="stat-label">Cartuchos Magenta</div>
              </div>
            </div>
            <div className="col">
              <div className="stat-card-vibrant border-yellow-vibrant">
                <div className="stat-val text-yellow-vibrant">{lowStockCount}</div>
                <div className="stat-label">Stock Bajo Yellow</div>
              </div>
            </div>
            <div className="col">
              <div className="stat-card-vibrant border-black-vibrant">
                <div className="stat-val">${totalValue.toLocaleString()}</div>
                <div className="stat-label">Valor Total Stock</div>
              </div>
            </div>
          </div>

          {/* Inventory Table Section */}
          <div className="inventory-card-vibrant">
            <div className="card-header bg-white py-4 px-4 border-0">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="mb-0 fw-bold text-black-vibrant">Gestión de Stock</h5>
                </div>
                <div className="col-md-7 d-flex gap-3">
                  <div className="input-group input-group-sm flex-grow-1">
                    <span className="input-group-text bg-light border-0">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control border-0 bg-light py-2" 
                      placeholder="Buscar por modelo, chip o marca..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select 
                    className="form-select form-select-sm w-auto border-0 bg-light py-2"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="Todas">Categorías</option>
                    <option value="Toner">Toner</option>
                    <option value="Cartucho">Cartuchos</option>
                    <option value="Chip">Chips</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4 py-3 border-bottom text-muted small text-uppercase tracking-wider">Modelo / SKU</th>
                      <th className="py-3 border-bottom text-muted small text-uppercase tracking-wider">Categoría</th>
                      <th className="py-3 border-bottom text-muted small text-uppercase tracking-wider">Color</th>
                      <th className="py-3 border-bottom text-muted small text-uppercase tracking-wider">Stock Actual</th>
                      <th className="py-3 border-bottom text-muted small text-uppercase tracking-wider">Precio Unit.</th>
                      <th className="py-3 border-bottom text-muted small text-uppercase tracking-wider">Estado</th>
                      <th className="px-4 py-3 border-bottom text-muted small text-uppercase tracking-wider text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <span className="fw-bold text-black-vibrant">{item.name}</span>
                          <div className="text-muted small">{item.sku}</div>
                        </td>
                        <td className="py-3">
                          <span className="text-muted">{item.category}</span>
                        </td>
                        <td className="py-3">
                          <div className="d-flex align-items-center">
                            <span className={`rounded-circle me-2`} style={{ 
                              width: '10px', 
                              height: '10px', 
                              backgroundColor: item.name.toLowerCase().includes('negro') ? '#263238' : 
                                               item.name.toLowerCase().includes('cyan') ? '#00bcd4' : 
                                               item.name.toLowerCase().includes('magenta') ? '#e91e63' : 
                                               item.name.toLowerCase().includes('yellow') ? '#ffc107' : '#e0e0e0'
                            }}></span>
                            <span className="small">
                              {item.name.toLowerCase().includes('negro') ? 'Negro' : 
                               item.name.toLowerCase().includes('cyan') ? 'Cyan' : 
                               item.name.toLowerCase().includes('magenta') ? 'Magenta' : 
                               item.name.toLowerCase().includes('yellow') ? 'Amarillo' : 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 fw-semibold">{item.stock} unidades</td>
                        <td className="py-3 text-muted">${item.price.toFixed(2)}</td>
                        <td className="py-3">
                          {item.stock <= item.minStock ? (
                            <span className="badge-vibrant-low">Bajo Stock</span>
                          ) : (
                            <span className="badge-vibrant-ok">Disponible</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-end">
                          <button className="btn btn-sm btn-light border-0 me-1" title="Editar">
                            <i className="bi bi-pencil text-cyan-vibrant"></i>
                          </button>
                          <button className="btn btn-sm btn-light border-0" title="Eliminar">
                            <i className="bi bi-trash text-magenta-vibrant"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
