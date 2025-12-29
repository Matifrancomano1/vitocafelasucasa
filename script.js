// =======================
// DATOS DEL MENÚ
// =======================
// Si vas a publicar un Apps Script como Web App, pega aquí la URL pública
const MENU_API_URL = 'https://docs.google.com/spreadsheets/d/1i7YN_nA2RCG1_Uh-Hu2H8RM2r1qhkwQlimbHqe7I4wc/edit?usp=sharing';// e.g. 'https://script.google.com/macros/s/AKfycbxxx/exec'

// Control: si MENU_API_URL está vacío usaremos los datos locales definidos abajo

let menuItems = [
    // ANTIPASTI - ENTRADAS
    {
        id: 1,
        name: "Bruschetta Classica",
        description: "Pan tostado con tomate fresco, albahaca y aceite de oliva virgen extra",
        price : 8.500,
        category: "antipasti"
    },
    {
        id: 2,
        name: "Antipasto della Casa",
        description: "Selección de embutidos italianos, quesos y encurtidos",
        price: 12000,
        category: "antipasti"
    },
    {
        id: 3,
        name: "Caprese",
        description: "Mozzarella di bufala, tomate y albahaca con aceite de oliva",
        price: 10500,
        category: "antipasti"
    },
    // PRIMI - PASTAS
    {
        id: 4,
        name: "Spaghetti Carbonara",
        description: "Pasta con huevo, queso pecorino, panceta y pimienta negra",
        price: 14000,
        category: "primi"
    },
    {
        id: 5,
        name: "Lasagna della Nonna",
        description: "Lasaña tradicional con carne, bechamel y queso gratinado",
        price: 16500,
        category: "primi"
    },
    {
        id: 6,
        name: "Risotto ai Porcini",
        description: "Arroz cremoso con setas porcini y parmesano",
        price: 15000,
        category: "primi"
    },
    {
        id: 7,
        name: "Fettuccine Alfredo",
        description: "Pasta fresca con salsa cremosa de parmesano y mantequilla",
        price: 13000,
        category: "primi"
    },
    // SECONDI - CARNES
    {
        id: 8,
        name: "Osso Buco alla Milanese",
        description: "Estofado de jarrete de ternera con verduras y gremolata",
        price: 22500,
        category: "secondi"
    },
    {
        id: 9,
        name: "Pollo Parmigiana",
        description: "Pollo empanado con salsa de tomate y queso mozzarella",
        price: 18000,
        category: "secondi"
    },
    {
        id: 10,
        name: "Bistecca alla Fiorentina",
        description: "Chuleta de ternera a la parrilla con hierbas aromáticas",
        price: 28500,
        category: "secondi"
    },
    // PIZZAS
    {
        id: 11,
        name: "Margherita",
        description: "Salsa de tomate, mozzarella, albahaca fresca",
        price: 12000,
        category: "pizza"
    },
    {
        id: 12,
        name: "Quattro Stagioni",
        description: "Tomate, mozzarella, jamón, champiñones, alcachofas, aceitunas",
        price: 12000,
        category: "pizza"
    },
    {
        id: 13,
        name: "Diavola",
        description: "Tomate, mozzarella, salami picante, guindilla",
        price: 10000,
        category: "pizza"
    },
    // DOLCI - POSTRES
    {
        id: 14,
        name: "Tiramisù",
        description: "Postre tradicional con café, mascarpone y cacao",
        price: 7500,
        category: "dolci"
    },
    {
        id: 15,
        name: "Panna Cotta",
        description: "Crema italiana con salsa de frutos rojos",
        price: 6900,
        category: "dolci"
    },
    {
        id: 16,
        name: "Cannoli Siciliani",
        description: "Tubos crujientes rellenos de ricotta dulce",
        price: 8500,
        category: "dolci"
    },
    // BEBIDAS
    {
        id: 17,
        name: "Vino de la Casa (Copa)",
        description: "Selección de vino tinto o blanco",
        price: 4000,
        category: "bebidas"
    },
    {
        id: 18,
        name: "Cerveza Italiana",
        description: "Birra Moretti o Peroni",
        price: 5500,
        category: "bebidas"
    },
    {
        id: 19,
        name: "Café Espresso",
        description: "Auténtico café italiano",
        price: 2450,
        category: "bebidas"
    },
    {
        id: 20,
        name: "Limoncello",
        description: "Licor tradicional de limón",
        price: 2000,
        category: "bebidas"
    }
];

const categoryNames = {
    "antipasti": "Entradas",
    "primi": "Pastas",
    "secondi": "Carnes",
    "pizza": "Pizzas",
    "dolci": "Postres",
    "bebidas": "Bebidas"
};

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupCategoryFilters();
    renderMenuItems();
    if (MENU_API_URL && MENU_API_URL.trim() !== '') {
        fetchMenuFromApi(MENU_API_URL).catch(err => console.error('Error cargando menú desde API:', err));
    }
});

function setupEventListeners() {
    document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);
}

function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active', 'bg-red-600', 'text-white'));
            this.classList.add('active', 'bg-red-600', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            const category = this.getAttribute('data-category');
            filterMenuByCategory(category);
        });
    });
}

function renderMenuItems() {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';
    menuItems.forEach(item => {
        const menuItemElement = createMenuItemElement(item);
        menuGrid.appendChild(menuItemElement);
    });
}

function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item bg-white rounded-lg shadow-md overflow-hidden p-6';
    div.setAttribute('data-category', item.category);
    div.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-semibold text-gray-800">${item.name}</h3>
            <span class="text-2xl font-bold text-red-600">$${item.price.toFixed(2)}</span>
        </div>
        <p class="text-gray-600 mb-4">${item.description}</p>
        <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
            ${categoryNames[item.category] || item.category}
        </span>
    `;
    return div;
}

function filterMenuByCategory(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// =======================
// FETCH desde API (Google Apps Script / Sheets)
// =======================
async function fetchMenuFromApi(url) {
    const menuGrid = document.getElementById('menu-grid');
    showLoading(menuGrid);
    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Respuesta no es un array');
        // Mapear campos si vienen con cabeceras diferentes
        menuItems = data.map((row, idx) => {
            // Soportar tanto objetos con keys como arrays indexados
            if (Array.isArray(row)) return row;
            const price = Number(row.price ?? row.precio ?? row.Price ?? 0) || 0;
            return {
                id: row.id ?? row.ID ?? idx + 1,
                name: row.name ?? row.nombre ?? row.Name ?? 'Sin nombre',
                description: row.description ?? row.descripcion ?? row.Descripcion ?? '',
                price: price,
                category: (row.category ?? row.categoria ?? row.Category ?? 'other').toString().toLowerCase()
            };
        });
        renderMenuItems();
    } catch (err) {
        showError(menuGrid, 'No se pudo cargar el menú. Usando datos locales.');
        console.error(err);
        renderMenuItems();
    }
}

function showLoading(container) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500">Cargando menú...</div>`;
}

function showError(container, message) {
    container.innerHTML = `<div class="col-span-full text-center py-6 text-red-500">${message}</div>`;
}