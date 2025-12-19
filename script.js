const API_URL = "https://jsonplaceholder.typicode.com/users";

const container = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const modal = document.getElementById("modal");
const userDetails = document.getElementById("userDetails");
const closeBtn = document.getElementById("closeBtn");

let users = [];
let ascending = true;

container.innerHTML = '<p style="text-align: center; color: #fff; font-size: 18px; margin-top: 50px;">Loading users...</p>';

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    console.log("Users fetched:", data); 
    users = data;
    renderUsers(users);
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
    container.innerHTML = '<p style="text-align: center; color: #e74c3c; font-size: 18px; background: white; padding: 20px; border-radius: 12px; margin: 50px auto; max-width: 500px;">Unable to fetch users. Please check your internet connection.</p>';
  });

function renderUsers(data) {
  container.innerHTML = "";
  data.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p>📧 ${user.email}</p>
    `;
    card.onclick = () => showDetails(user);
    container.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(value) ||
    user.email.toLowerCase().includes(value)
  );
  renderUsers(filtered);
});

sortBtn.addEventListener("click", () => {
  users.sort((a, b) =>
    ascending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );
  ascending = !ascending;
  sortBtn.textContent = ascending ? "A–Z" : "Z–A";
  renderUsers(users);
});

function showDetails(user) {
  modal.style.display = "block";
  userDetails.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Company:</strong> ${user.company.name}</p>
    <p><strong>City:</strong> ${user.address.city}</p>
  `;
}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
}
