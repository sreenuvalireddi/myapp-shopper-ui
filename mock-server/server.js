// Simple mock server for /myapp/shops/v1.0 and related endpoints
import http from 'http';
import { parse, fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3001;

// Load shops from external JSON file (mock-server/myshoplist.json)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const shopsFile = path.join(__dirname, 'myshoplist.json');

let shops = [];
try {
  const raw = fs.readFileSync(shopsFile, 'utf8');
  const parsed = JSON.parse(raw);
  shops = parsed.shops || [];
} catch (err) {
  console.warn('Could not load myshoplist.json, using empty shops array', err.message);
}

// Load items from external JSON file (mock-server/itemsbyshop.json)
const itemsFile = path.join(__dirname, 'itemsbyshop.json');
let items = [];
try {
  const rawItems = fs.readFileSync(itemsFile, 'utf8');
  const parsedItems = JSON.parse(rawItems);
  items = parsedItems.items || [];
} catch (err) {
  console.warn('Could not load itemsbyshop.json, using inline items array', err.message);
  items = [
    { id: 1, name: 'Laptop', price: 999.99, shopId: 1, category: 'electronics' },
    { id: 2, name: 'T-Shirt', price: 29.99, shopId: 2, category: 'fashion' }
  ];
}

// Load users from external JSON file (mock-server/userlist.json)
const usersFile = path.join(__dirname, 'userlist.json');
let users = [];
try {
  const rawUsers = fs.readFileSync(usersFile, 'utf8');
  const parsedUsers = JSON.parse(rawUsers);
  users = parsedUsers.users || [];
} catch (err) {
  console.warn('Could not load userlist.json, using inline users array', err.message);
  users = [
    { id: 1, email: 'user@example.com', name: 'John Doe' }
  ];
}

const server = http.createServer((req, res) => {
  const parsed = parse(req.url, true);
  const pathname = parsed.pathname;

  // Enable CORS for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  // shops list endpoint
  if (pathname === '/myapp/shops/v1.0' && req.method === 'GET') {
    const body = JSON.stringify({ shops });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(body);
  }

  // items endpoint
  if (pathname === '/myapp/items/v1.0' && req.method === 'GET') {
    const body = JSON.stringify({ items });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(body);
  }

  // users endpoint
  if (pathname === '/myapp/users/v1.0' && req.method === 'GET') {
    const body = JSON.stringify({ users });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(body);
  }

  // default 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});