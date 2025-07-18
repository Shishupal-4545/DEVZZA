// 🔐 Enforce Admin Login
if (!sessionStorage.getItem('adminToken')) {
  window.location = 'login.html';
}

// 🌐 Generic Fetch Wrapper
async function fetchJson(url, opts) {
  const res = await fetch(url, opts);
  return res.json();
}

// 📦 Load and Render Orders
async function loadOrders() {
  let orders = await fetchJson('/api/admin/orders');
  const filter = document.getElementById('orderFilter')?.value;
  if (filter && filter !== 'All') {
    orders = orders.filter(o => o.status === filter);
  }
  const tbody = document.querySelector('#ordersTable tbody');
  tbody.innerHTML = '';
  orders.forEach(o => {
    const items = JSON.parse(o.cart || '[]')
      .map(i => `${i.name}(x${i.qty || 1})`).join(', ');
    const date = new Date(o.created_at).toLocaleString();
    tbody.innerHTML += `
      <tr>
        <td>${o.id}</td>
        <td>${o.phone}</td>
        <td>${o.location}</td>
        <td>${items}</td>
        <td>${date}</td>
        <td>
          <select onchange="updateStatus(${o.id}, this.value)">
            ${['Pending','Preparing','Out for delivery','Delivered','Cancelled']
              .map(s => `<option value="${s}" ${o.status === s ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </td>
      </tr>`;
  });
}

// 👤 Load and Render Users
let usersCache = [];
async function loadUsers() {
  usersCache = await fetchJson('/api/admin/users');
  renderUsers(usersCache);
}
function renderUsers(list) {
  const tbody = document.querySelector('#usersTable tbody');
  tbody.innerHTML = '';
  list.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.phone}</td>
        <td>${u.name || '-'}</td>
        <td>${u.email || '-'}</td>
        <td>${u.blocked ? 'Blocked' : 'Active'}</td>
        <td>
          <button onclick="toggleBlock(${u.id}, ${u.blocked})">
            ${u.blocked ? 'Unblock' : 'Block'}
          </button>
        </td>
      </tr>`;
  });
}

// 💬 Load and Render Contacts (Feedback)
let contactCache = [];
async function loadContacts() {
  contactCache = await fetchJson('/api/admin/contacts');
  renderContacts(contactCache);
}
function renderContacts(list) {
  const tbody = document.querySelector('#feedbackTable tbody');
  tbody.innerHTML = '';
  list.forEach(m => {
    const date = new Date(m.created_at).toLocaleString();
    tbody.innerHTML += `
      <tr>
        <td>${m.id}</td>
        <td>${m.name}</td>
        <td>${m.email}</td>
        <td>${m.message}</td>
        <td>${date}</td>
      </tr>`;
  });
}

// 🍕 Load and Render Pizza Menu
async function loadMenu() {
  const menu = await fetchJson('/api/admin/pizzas');
  const tbody = document.querySelector('#menuTable tbody');
  tbody.innerHTML = '';
  menu.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.discount}</td>
        <td>${p.category}</td>
        <td>${p.stock}</td>
        <td><img src="${p.image_url}" width="50" /></td>
        <td>
          <button onclick="editPizza(${p.id})">Edit</button>
          <button onclick="deletePizza(${p.id})">Delete</button>
        </td>
      </tr>`;
  });
}

// ✅ Update Order Status
async function updateStatus(id, status) {
  await fetch('/api/admin/update-status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: id, status })
  });
  loadOrders();
}

// 🚫 Block/Unblock Users
async function toggleBlock(id, blocked) {
  await fetch(`/api/admin/customers/${id}/block`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ block: !blocked })
  });
  loadUsers();
}

// // ✏️ Menu Form Controls
// function showAddForm() {
//   document.getElementById('formSection').style.display = 'block';
//   document.getElementById('formTitle').innerText = 'Add Pizza';
//   document.getElementById('pizzaForm').reset();
//   document.getElementById('imagePreview').style.display = 'none';
// }
// ✏️ Menu Form Controls
function showAddForm() {
  const form = document.getElementById('pizzaForm');
  form.reset();
  form.querySelector('input[name="id"]').value = ''; // ⛳ Clear hidden ID
  document.getElementById('formTitle').innerText = 'Add Pizza';
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('formSection').style.display = 'block';
}

function hideForm() {
  document.getElementById('formSection').style.display = 'none';
}

// 📸 Image Preview Handler
function previewImage(input) {
  const preview = document.getElementById('imagePreview');
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    preview.src = '';
    preview.style.display = 'none';
  }
}

// // 📝 Submit Pizza Form (Safe for FormData)
// async function submitPizza(e) {
//   e.preventDefault();
//   const form = document.getElementById('pizzaForm');
//   const data = new FormData(form);
//   const id = form.id.value;

//   const url = id ? `/api/admin/pizzas/update/${id}` : '/api/admin/pizzas';
//   const res = await fetch(url, { method: 'POST', body: data });

//   if (res.ok) {
//     const message = id ? '✅ Pizza updated successfully!' : '✅ Pizza added successfully!';
//     showToast(message); // 🎉 Show toast
//     hideForm();
//     loadMenu();
//   } else {
//     showToast('❌ Failed to save pizza.'); // ❗ On error
//   }
// }



// // 🛠️ Edit Pizza
// async function editPizza(id) {
//   // ✅ FIXED: Removed destructuring because the backend returns a single object, not an array
//   const p = await fetchJson(`/api/admin/pizzas/${id}`);
  
//   // 🎯 Get the pizza form
//   const f = document.getElementById('pizzaForm');

//   // 🔄 Populate the form fields with the pizza data
//   f.id.value = p.id;
//   f.name.value = p.name || '';
//   f.price.value = p.price || '';
//   f.discount.value = p.discount || '';
//   f.category.value = p.category || '';
//   f.stock.value = p.stock || '';
//   f.description.value = p.description || '';

//   // ✅ Set image preview if available
//   const preview = document.getElementById('imagePreview');
//   preview.src = p.image_url || '';
//   preview.style.display = p.image_url ? 'block' : 'none';

//   // 🔄 Show the form and change title
//   showAddForm();
//   document.getElementById('formTitle').innerText = 'Edit Pizza';
// }

// ✅ Submit Pizza Form (Safe for FormData)
async function submitPizza(e) {
  e.preventDefault();
  const form = document.getElementById('pizzaForm');
  const data = new FormData(form);

  // ⛳ Fix: get correct hidden ID value
  const id = form.querySelector('input[name="id"]').value;

  const url = id ? `/api/admin/pizzas/update/${id}` : '/api/admin/pizzas';
  const res = await fetch(url, { method: 'POST', body: data });

  if (res.ok) {
    const message = id ? `✅ Updated "${form.name.value}" successfully!` : `✅ Added "${form.name.value}" successfully!`;
    showToast(message);
    hideForm();
    loadMenu();
  } else {
    showToast('❌ Failed to save pizza. Please check all fields.');
  }
}

// 🛠️ Edit Pizza
async function editPizza(id) {
  try {
    const p = await fetchJson(`/api/admin/pizzas/${id}`);
    const form = document.getElementById('pizzaForm');

    // ✅ Pre-fill form with existing pizza data
    form.querySelector('input[name="id"]').value = p.id;
    form.name.value = p.name || '';
    form.price.value = p.price || '';
    form.discount.value = p.discount || '';
    form.category.value = p.category || '';
    form.stock.value = p.stock || '';
    form.description.value = p.description || '';

    // ✅ Preview current image
    const preview = document.getElementById('imagePreview');
    preview.src = p.image_url || '';
    preview.style.display = p.image_url ? 'block' : 'none';

    // 🔍 Update form title to show what is being edited
    document.getElementById('formTitle').innerText = `Edit Pizza: ${p.name}`;
    document.getElementById('formSection').style.display = 'block';
  } catch (err) {
    showToast('❌ Error loading pizza for edit.');
    console.error(err);
  }
}


// ❌ Delete Pizza
async function deletePizza(id) {
  if (confirm('Delete this pizza?')) {
    await fetch(`/api/admin/pizzas/${id}`, { method: 'DELETE' });
    loadMenu();
  }
}

// 🚀 Initialize Page Scripts
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.endsWith('dashboard.html')) loadOrders();
  if (path.endsWith('orders.html')) {
    document.getElementById('orderFilter').onchange = loadOrders;
    loadOrders();
  }
  if (path.endsWith('users.html')) {
    document.getElementById('userSearch').oninput = e =>
      renderUsers(
        usersCache.filter(u =>
          (u.name || '').toLowerCase().includes(e.target.value.toLowerCase()) ||
          u.phone.includes(e.target.value)
        )
      );
    loadUsers();
  }
  if (path.endsWith('contact.html')) {
    document.getElementById('contactSearch').oninput = e =>
      renderContacts(
        contactCache.filter(m =>
          m.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          m.email.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    loadContacts();
  }
  if (path.endsWith('menu.html')) {
    document.getElementById('pizzaForm').addEventListener('submit', submitPizza);
    document.querySelector('input[name="image"]').addEventListener('change', function () {
      previewImage(this);
    });
    loadMenu();
  }
});

// 🔓 Admin Logout
function logout() {
  sessionStorage.clear();
  window.location = 'login.html';
}

// 🔔 Toast Message Function
function showToast(msg) {
  const toast = document.createElement('div');
  toast.innerText = msg;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.padding = '10px 20px';
  toast.style.backgroundColor = '#333';
  toast.style.color = 'white';
  toast.style.borderRadius = '8px';
  toast.style.zIndex = 1000;
  toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000); // ⏳ Remove after 3 seconds
}
