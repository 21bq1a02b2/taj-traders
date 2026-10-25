// ─── Taj Traders · Admin Demo Data ───────────────────────────────────────────
// Realistic mock data: users + orders spanning the last 3 months

const now = new Date();
const daysAgo = (d) => new Date(now - d * 86400000).toISOString();
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ── 50 Indian customers ────────────────────────────────────────────────────────
export const DEMO_USERS = [
  { id: 'u001', name: 'Priya Sharma',      email: 'priya.sharma@gmail.com',     phone: '9876543210', city: 'Hyderabad',  state: 'Telangana',    joinedAt: daysAgo(91), role: 'customer', orders: 6, totalSpent: 14250 },
  { id: 'u002', name: 'Ravi Kumar',        email: 'ravikumar22@gmail.com',       phone: '9845123456', city: 'Bengaluru',  state: 'Karnataka',    joinedAt: daysAgo(88), role: 'customer', orders: 4, totalSpent: 8900  },
  { id: 'u003', name: 'Sunita Reddy',      email: 'sunita.reddy@yahoo.com',      phone: '9741236547', city: 'Vijayawada', state: 'Andhra Pradesh', joinedAt: daysAgo(85), role: 'customer', orders: 9, totalSpent: 22100 },
  { id: 'u004', name: 'Mohammed Farhan',   email: 'farhan.moh@gmail.com',        phone: '9966778899', city: 'Hyderabad',  state: 'Telangana',    joinedAt: daysAgo(83), role: 'customer', orders: 3, totalSpent: 6750  },
  { id: 'u005', name: 'Kavitha Nair',      email: 'kavithanair@hotmail.com',     phone: '9400123789', city: 'Chennai',    state: 'Tamil Nadu',   joinedAt: daysAgo(80), role: 'customer', orders: 7, totalSpent: 18300 },
  { id: 'u006', name: 'Arjun Patel',       email: 'arjun.patel91@gmail.com',     phone: '9512345678', city: 'Surat',      state: 'Gujarat',      joinedAt: daysAgo(78), role: 'customer', orders: 2, totalSpent: 3200  },
  { id: 'u007', name: 'Deepa Menon',       email: 'deepamenon@gmail.com',        phone: '9387654321', city: 'Kochi',      state: 'Kerala',       joinedAt: daysAgo(75), role: 'customer', orders: 5, totalSpent: 11500 },
  { id: 'u008', name: 'Suresh Babu',       email: 'sureshbabu.b@gmail.com',      phone: '9885001122', city: 'Visakhapatnam', state: 'Andhra Pradesh', joinedAt: daysAgo(72), role: 'customer', orders: 8, totalSpent: 19800 },
  { id: 'u009', name: 'Anitha Lakshmi',    email: 'anithalakshmi@gmail.com',     phone: '9963215478', city: 'Tirupati',   state: 'Andhra Pradesh', joinedAt: daysAgo(70), role: 'customer', orders: 4, totalSpent: 9600  },
  { id: 'u010', name: 'Ramesh Chandra',    email: 'ramesh.ch@rediffmail.com',    phone: '9900112233', city: 'Pune',       state: 'Maharashtra',  joinedAt: daysAgo(68), role: 'customer', orders: 3, totalSpent: 7800  },
  { id: 'u011', name: 'Lakshmi Devi',      email: 'lakshmidevi.parlour@gmail.com', phone: '9441223344', city: 'Guntur', state: 'Andhra Pradesh', joinedAt: daysAgo(65), role: 'customer', orders: 11, totalSpent: 28500 },
  { id: 'u012', name: 'Anil Verma',        email: 'anilverma@gmail.com',         phone: '9871234560', city: 'Delhi',      state: 'Delhi',        joinedAt: daysAgo(63), role: 'customer', orders: 2, totalSpent: 4100  },
  { id: 'u013', name: 'Shalini Gupta',     email: 'shalinigupta@gmail.com',      phone: '9811223344', city: 'Jaipur',     state: 'Rajasthan',    joinedAt: daysAgo(60), role: 'customer', orders: 6, totalSpent: 15200 },
  { id: 'u014', name: 'Vinod Pillai',      email: 'vinodpillai@gmail.com',       phone: '9446123456', city: 'Thiruvananthapuram', state: 'Kerala', joinedAt: daysAgo(58), role: 'customer', orders: 5, totalSpent: 12800 },
  { id: 'u015', name: 'Pooja Singh',       email: 'poojasingh.beauty@gmail.com', phone: '9936547891', city: 'Lucknow',    state: 'Uttar Pradesh', joinedAt: daysAgo(55), role: 'customer', orders: 4, totalSpent: 10400 },
  { id: 'u016', name: 'Nagesh Rao',        email: 'nagesh.rao@gmail.com',        phone: '9481234567', city: 'Mysuru',     state: 'Karnataka',    joinedAt: daysAgo(53), role: 'customer', orders: 7, totalSpent: 17900 },
  { id: 'u017', name: 'Swathi Krishnan',   email: 'swathi.k@gmail.com',          phone: '9003456789', city: 'Coimbatore', state: 'Tamil Nadu',   joinedAt: daysAgo(50), role: 'customer', orders: 3, totalSpent: 7200  },
  { id: 'u018', name: 'Gopal Das',         email: 'gopaldas@gmail.com',          phone: '9339871234', city: 'Kolkata',    state: 'West Bengal',  joinedAt: daysAgo(48), role: 'customer', orders: 9, totalSpent: 23400 },
  { id: 'u019', name: 'Meena Iyer',        email: 'meenaiyer@gmail.com',         phone: '9841234560', city: 'Chennai',    state: 'Tamil Nadu',   joinedAt: daysAgo(45), role: 'customer', orders: 6, totalSpent: 16100 },
  { id: 'u020', name: 'Rajesh Khanna',     email: 'rajeshkhanna.salon@gmail.com', phone: '9829345678', city: 'Jodhpur',  state: 'Rajasthan',    joinedAt: daysAgo(43), role: 'customer', orders: 2, totalSpent: 5400  },
  { id: 'u021', name: 'Bhavani Sekhar',    email: 'bhavanisekhar@gmail.com',     phone: '9908712345', city: 'Hyderabad',  state: 'Telangana',    joinedAt: daysAgo(41), role: 'customer', orders: 8, totalSpent: 21600 },
  { id: 'u022', name: 'Nithya Selvan',     email: 'nithyaselvan@gmail.com',      phone: '9751234567', city: 'Madurai',    state: 'Tamil Nadu',   joinedAt: daysAgo(39), role: 'customer', orders: 4, totalSpent: 9800  },
  { id: 'u023', name: 'Hari Prasad',       email: 'hariprasad@gmail.com',        phone: '9440012345', city: 'Nellore',    state: 'Andhra Pradesh', joinedAt: daysAgo(37), role: 'customer', orders: 5, totalSpent: 13200 },
  { id: 'u024', name: 'Rekha Joshi',       email: 'rekhajoshi@gmail.com',        phone: '9826543210', city: 'Indore',     state: 'Madhya Pradesh', joinedAt: daysAgo(35), role: 'customer', orders: 3, totalSpent: 6900  },
  { id: 'u025', name: 'Amaresh Goud',      email: 'amaresh.goud@gmail.com',      phone: '9949812345', city: 'Nizamabad',  state: 'Telangana',    joinedAt: daysAgo(33), role: 'customer', orders: 6, totalSpent: 16800 },
  { id: 'u026', name: 'Savitha Murthy',    email: 'savithamurthy@gmail.com',     phone: '9483456789', city: 'Bengaluru',  state: 'Karnataka',    joinedAt: daysAgo(31), role: 'customer', orders: 7, totalSpent: 19200 },
  { id: 'u027', name: 'Dinesh Agarwal',    email: 'dineshagarwal@gmail.com',     phone: '9867345123', city: 'Mumbai',     state: 'Maharashtra',  joinedAt: daysAgo(29), role: 'customer', orders: 4, totalSpent: 11200 },
  { id: 'u028', name: 'Usha Rani',         email: 'usharani.beauty@gmail.com',   phone: '9955001234', city: 'Warangal',   state: 'Telangana',    joinedAt: daysAgo(27), role: 'customer', orders: 10, totalSpent: 26400 },
  { id: 'u029', name: 'Kiran Shetty',      email: 'kiranshetty@gmail.com',       phone: '9945612378', city: 'Mangaluru',  state: 'Karnataka',    joinedAt: daysAgo(25), role: 'customer', orders: 3, totalSpent: 7600  },
  { id: 'u030', name: 'Padma Latha',       email: 'padmalatha@gmail.com',        phone: '9963489123', city: 'Kurnool',    state: 'Andhra Pradesh', joinedAt: daysAgo(23), role: 'customer', orders: 5, totalSpent: 13800 },
  { id: 'u031', name: 'Sunil Kapoor',      email: 'sunilkapoor@gmail.com',       phone: '9910234567', city: 'Chandigarh', state: 'Punjab',       joinedAt: daysAgo(21), role: 'customer', orders: 2, totalSpent: 4800  },
  { id: 'u032', name: 'Hema Sundaram',     email: 'hemasundaram@gmail.com',      phone: '9042345678', city: 'Trichy',     state: 'Tamil Nadu',   joinedAt: daysAgo(19), role: 'customer', orders: 6, totalSpent: 15600 },
  { id: 'u033', name: 'Prakash Yadav',     email: 'prakashyadav@gmail.com',      phone: '9810987654', city: 'Varanasi',   state: 'Uttar Pradesh', joinedAt: daysAgo(18), role: 'customer', orders: 4, totalSpent: 10000 },
  { id: 'u034', name: 'Saranya Bharath',   email: 'saranyabharath@gmail.com',    phone: '9786543210', city: 'Vellore',    state: 'Tamil Nadu',   joinedAt: daysAgo(16), role: 'customer', orders: 3, totalSpent: 8100  },
  { id: 'u035', name: 'Ramakrishna B',     email: 'ramakrishna.b@gmail.com',     phone: '9440987123', city: 'Ongole',     state: 'Andhra Pradesh', joinedAt: daysAgo(15), role: 'customer', orders: 7, totalSpent: 18700 },
  { id: 'u036', name: 'Chitra Devi',       email: 'chitradevi@gmail.com',        phone: '9489345678', city: 'Bengaluru',  state: 'Karnataka',    joinedAt: daysAgo(13), role: 'customer', orders: 5, totalSpent: 14000 },
  { id: 'u037', name: 'Venkat Naidu',      email: 'venkatnaidu@gmail.com',       phone: '9908534678', city: 'Rajahmundry', state: 'Andhra Pradesh', joinedAt: daysAgo(12), role: 'customer', orders: 8, totalSpent: 22900 },
  { id: 'u038', name: 'Jaya Lakshmi',      email: 'jayalakshmi.salon@gmail.com', phone: '9866001234', city: 'Karimnagar', state: 'Telangana',    joinedAt: daysAgo(10), role: 'customer', orders: 4, totalSpent: 10800 },
  { id: 'u039', name: 'Mahesh Babu R',     email: 'maheshbabur@gmail.com',       phone: '9890234567', city: 'Nagpur',     state: 'Maharashtra',  joinedAt: daysAgo(9),  role: 'customer', orders: 2, totalSpent: 5200  },
  { id: 'u040', name: 'Pushpa Kumari',     email: 'pushpakumari@gmail.com',      phone: '9441567890', city: 'Khammam',    state: 'Telangana',    joinedAt: daysAgo(8),  role: 'customer', orders: 6, totalSpent: 16400 },
  { id: 'u041', name: 'Sridhar Rao',       email: 'sridharrao@gmail.com',        phone: '9393456712', city: 'Hyderabad',  state: 'Telangana',    joinedAt: daysAgo(7),  role: 'customer', orders: 3, totalSpent: 8400  },
  { id: 'u042', name: 'Geetha Suresh',     email: 'geethasuresh@gmail.com',      phone: '9977123450', city: 'Erode',      state: 'Tamil Nadu',   joinedAt: daysAgo(6),  role: 'customer', orders: 5, totalSpent: 13500 },
  { id: 'u043', name: 'Nagarjuna P',       email: 'nagarjunap@gmail.com',        phone: '9849001234', city: 'Amaravati',  state: 'Andhra Pradesh', joinedAt: daysAgo(5), role: 'customer', orders: 9, totalSpent: 24200 },
  { id: 'u044', name: 'Tulasi Krishna',    email: 'tulasikrishna@gmail.com',     phone: '9963001567', city: 'Hyderabad',  state: 'Telangana',    joinedAt: daysAgo(4),  role: 'customer', orders: 4, totalSpent: 11600 },
  { id: 'u045', name: 'Sowmya Iyer',       email: 'sowmyaiyer@gmail.com',        phone: '9043215678', city: 'Puducherry', state: 'Puducherry',   joinedAt: daysAgo(4),  role: 'customer', orders: 3, totalSpent: 7700  },
  { id: 'u046', name: 'Bhaskar Reddy',     email: 'bhaskarreddy@gmail.com',      phone: '9440561234', city: 'Nizamabad',  state: 'Telangana',    joinedAt: daysAgo(3),  role: 'customer', orders: 6, totalSpent: 17400 },
  { id: 'u047', name: 'Madhavi Latha',     email: 'madhavilatha@gmail.com',      phone: '9908123456', city: 'Vijayawada', state: 'Andhra Pradesh', joinedAt: daysAgo(3), role: 'customer', orders: 7, totalSpent: 19600 },
  { id: 'u048', name: 'Ranjith Kumar',     email: 'ranjithkumar@gmail.com',      phone: '9789012345', city: 'Chennai',    state: 'Tamil Nadu',   joinedAt: daysAgo(2),  role: 'customer', orders: 2, totalSpent: 5800  },
  { id: 'u049', name: 'Annapurna Devi',    email: 'annapurnadevi@gmail.com',     phone: '9490345678', city: 'Tirupati',   state: 'Andhra Pradesh', joinedAt: daysAgo(1), role: 'customer', orders: 5, totalSpent: 14100 },
  { id: 'u050', name: 'Karthik Subbu',     email: 'karthiksubbu@gmail.com',      phone: '9677234560', city: 'Bengaluru',  state: 'Karnataka',    joinedAt: daysAgo(0),  role: 'customer', orders: 3, totalSpent: 8300  },
];

// ── 150 Orders over 90 days ────────────────────────────────────────────────────
const PRODUCTS_SAMPLE = [
  { name: 'Professional Hair Clipper Set', price: 2450 },
  { name: 'Wella Koleston Hair Color 60g', price: 350 },
  { name: 'Salon Hydraulic Chair', price: 8500 },
  { name: 'L\'Oréal Inoa Hair Color Kit', price: 650 },
  { name: 'Glass Wax Warmer Machine', price: 1850 },
  { name: 'Schwarzkopf Bonacure Oil Serum', price: 750 },
  { name: 'Professional Barber Scissors Set', price: 1200 },
  { name: 'Streax Hair Straightener Cream', price: 280 },
  { name: 'Aloe Vera Facial Kit 6-in-1', price: 480 },
  { name: 'Digital Nail Art Printer', price: 12000 },
  { name: 'Threading Machine', price: 3200 },
  { name: 'Rica Brazilian Wax 400g', price: 520 },
  { name: 'Facial Steamer Hood Dryer', price: 4200 },
  { name: 'Marico Parachute Coconut Oil 1L', price: 210 },
  { name: 'Stainless Steel Trolley Cart', price: 2800 },
  { name: 'OPI Nail Polish Set 12pc', price: 1850 },
  { name: 'Professional Blow Dryer 2400W', price: 3100 },
  { name: 'Bio Oxygen Facial Kit', price: 680 },
  { name: 'Gold Facial Kit 5-Step', price: 550 },
  { name: 'Hair Relaxer Kit Professional', price: 890 },
];
const PAYMENT_METHODS = ['Cash on Delivery', 'UPI', 'Bank Transfer', 'Cash on Delivery', 'Cash on Delivery', 'UPI'];
const STATUSES = ['Delivered', 'Delivered', 'Delivered', 'Delivered', 'Shipped', 'Processing', 'Confirmed', 'Pending', 'Cancelled'];
const ORDER_TYPES = ['Retail', 'Wholesale', 'Retail', 'Retail', 'Wholesale'];

export const DEMO_ORDERS = DEMO_USERS.flatMap((user, ui) => {
  return Array.from({ length: Math.min(user.orders, 4) }, (_, oi) => {
    const prod1 = PRODUCTS_SAMPLE[(ui * 3 + oi) % PRODUCTS_SAMPLE.length];
    const prod2 = PRODUCTS_SAMPLE[(ui * 3 + oi + 7) % PRODUCTS_SAMPLE.length];
    const qty1 = rand(1, 3);
    const qty2 = rand(1, 2);
    const subtotal = prod1.price * qty1 + prod2.price * qty2;
    const shipping = subtotal > 2000 ? 0 : 80;
    const total = subtotal + shipping;
    const dayOffset = rand(1, 90);
    const statusIndex = oi === 0 && dayOffset < 5 ? rand(5, 8) : (dayOffset > 30 ? 0 : rand(0, 4));

    return {
      _id: `ord-${user.id}-${oi + 1}`,
      orderNumber: `TT${String(ui * 10 + oi + 1001).padStart(5, '0')}`,
      customerName: user.name,
      email: user.email,
      phone: user.phone,
      userId: user.id,
      city: user.city,
      state: user.state,
      address: `${rand(1, 99)}-${rand(1, 9)}, ${['MG Road', 'Gandhi Nagar', 'Ameerpet', 'Banjara Hills', 'Jubilee Hills', 'Kukatpally', 'SR Nagar'][ui % 7]}`,
      pincode: String(500000 + ui * 17 + oi),
      items: [
        { name: prod1.name, price: prod1.price, quantity: qty1 },
        { name: prod2.name, price: prod2.price, quantity: qty2 },
      ],
      totalAmount: total,
      subtotal,
      shipping,
      paymentMethod: PAYMENT_METHODS[(ui + oi) % PAYMENT_METHODS.length],
      orderType: ORDER_TYPES[(ui + oi) % ORDER_TYPES.length],
      status: STATUSES[statusIndex],
      notes: oi === 2 ? 'Please deliver before 6 PM.' : '',
      createdAt: daysAgo(dayOffset),
    };
  });
});

// ── Aggregate revenue by month (last 3 months) ────────────────────────────────
export function getMonthlyRevenue() {
  const months = [{}, {}, {}];
  const labels = [];
  for (let i = 2; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    labels.push(d.toLocaleString('en-IN', { month: 'short', year: '2-digit' }));
  }
  const buckets = [0, 0, 0];
  DEMO_ORDERS.forEach((o) => {
    if (o.status === 'Cancelled') return;
    const oDate = new Date(o.createdAt);
    const monthDiff = (now.getFullYear() - oDate.getFullYear()) * 12 + (now.getMonth() - oDate.getMonth());
    if (monthDiff < 3) buckets[2 - monthDiff] += o.totalAmount;
  });
  return labels.map((label, i) => ({ label, revenue: Math.round(buckets[i]) }));
}

export const DEMO_STATS = {
  totalUsers: DEMO_USERS.length,
  totalOrders: DEMO_ORDERS.length,
  totalRevenue: DEMO_ORDERS.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.totalAmount, 0),
  deliveredOrders: DEMO_ORDERS.filter(o => o.status === 'Delivered').length,
  pendingOrders: DEMO_ORDERS.filter(o => o.status === 'Pending').length,
  cancelledOrders: DEMO_ORDERS.filter(o => o.status === 'Cancelled').length,
  avgOrderValue: Math.round(DEMO_ORDERS.reduce((s, o) => s + o.totalAmount, 0) / DEMO_ORDERS.length),
  launchDate: daysAgo(91),
};
