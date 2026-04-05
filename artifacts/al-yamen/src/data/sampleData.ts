export const sampleTransactions = [
  { id: 1, date: "2024-01-15", type: "income", category: "Sales", description: "Product Sale - Order #1001", amount: 45000, reference: "TXN-001", status: "completed" },
  { id: 2, date: "2024-01-14", type: "expense", category: "Rent", description: "Office Rent January", amount: 12000, reference: "TXN-002", status: "completed" },
  { id: 3, date: "2024-01-13", type: "income", category: "Service", description: "Consulting Service", amount: 8500, reference: "TXN-003", status: "completed" },
  { id: 4, date: "2024-01-12", type: "expense", category: "Utilities", description: "Electricity Bill", amount: 3200, reference: "TXN-004", status: "completed" },
  { id: 5, date: "2024-01-11", type: "income", category: "Sales", description: "Bulk Order #1002", amount: 72000, reference: "TXN-005", status: "completed" },
  { id: 6, date: "2024-01-10", type: "expense", category: "Salaries", description: "Staff Salaries", amount: 38000, reference: "TXN-006", status: "completed" },
  { id: 7, date: "2024-01-09", type: "income", category: "Sales", description: "Retail Sales", amount: 15500, reference: "TXN-007", status: "pending" },
  { id: 8, date: "2024-01-08", type: "expense", category: "Supplies", description: "Office Supplies", amount: 1800, reference: "TXN-008", status: "completed" },
];

export const sampleOrders = [
  { id: "ORD-001", customer: "Rahman Trading", date: "2024-01-15", items: 5, total: 45000, status: "completed", payment: "paid" },
  { id: "ORD-002", customer: "Hossain Enterprises", date: "2024-01-14", items: 3, total: 28500, status: "pending", payment: "partial" },
  { id: "ORD-003", customer: "Karim & Sons", date: "2024-01-13", items: 8, total: 72000, status: "processing", payment: "unpaid" },
  { id: "ORD-004", customer: "Islam Traders", date: "2024-01-12", items: 2, total: 12000, status: "completed", payment: "paid" },
  { id: "ORD-005", customer: "Alam Corporation", date: "2024-01-11", items: 6, total: 56000, status: "completed", payment: "paid" },
  { id: "ORD-006", customer: "Begum Stores", date: "2024-01-10", items: 4, total: 33000, status: "cancelled", payment: "refunded" },
];

export const sampleCustomers = [
  { id: 1, name: "Rahman Trading Co.", phone: "+880 1711-123456", email: "rahman@trading.com", address: "Dhaka, Bangladesh", totalOrders: 24, totalSpent: 345000, status: "active" },
  { id: 2, name: "Hossain Enterprises", phone: "+880 1812-234567", email: "hossain@ent.com", address: "Chittagong, Bangladesh", totalOrders: 18, totalSpent: 256000, status: "active" },
  { id: 3, name: "Karim & Sons Ltd.", phone: "+880 1913-345678", email: "karim@sons.com", address: "Sylhet, Bangladesh", totalOrders: 32, totalSpent: 498000, status: "active" },
  { id: 4, name: "Islam Traders", phone: "+880 1714-456789", email: "islam@traders.com", address: "Rajshahi, Bangladesh", totalOrders: 12, totalSpent: 145000, status: "inactive" },
  { id: 5, name: "Alam Corporation", phone: "+880 1815-567890", email: "alam@corp.com", address: "Khulna, Bangladesh", totalOrders: 28, totalSpent: 389000, status: "active" },
];

export const sampleProducts = [
  { id: 1, name: "Premium Rice (50kg)", sku: "RICE-001", category: "Food Grain", price: 3200, stock: 150, minStock: 20, unit: "Bag", status: "active" },
  { id: 2, name: "Mustard Oil (5L)", sku: "OIL-002", category: "Cooking Oil", price: 850, stock: 8, minStock: 25, unit: "Bottle", status: "low_stock" },
  { id: 3, name: "Sugar (50kg)", sku: "SUG-003", category: "Sugar", price: 4500, stock: 0, minStock: 15, unit: "Bag", status: "out_of_stock" },
  { id: 4, name: "Wheat Flour (10kg)", sku: "FLR-004", category: "Flour", price: 580, stock: 95, minStock: 30, unit: "Pack", status: "active" },
  { id: 5, name: "Lentils (1kg)", sku: "LNT-005", category: "Pulses", price: 145, stock: 320, minStock: 50, unit: "Pack", status: "active" },
  { id: 6, name: "Salt (1kg)", sku: "SLT-006", category: "Condiments", price: 35, stock: 450, minStock: 100, unit: "Pack", status: "active" },
];

export const sampleEmployees = [
  { id: "EMP-001", name: "Md. Abdullah", position: "Manager", department: "Sales", salary: 35000, joinDate: "2020-03-15", phone: "+880 1711-111111", email: "abdullah@alyamen.com", status: "active" },
  { id: "EMP-002", name: "Fatima Begum", position: "Accountant", department: "Finance", salary: 28000, joinDate: "2021-06-01", phone: "+880 1812-222222", email: "fatima@alyamen.com", status: "active" },
  { id: "EMP-003", name: "Md. Karim", position: "Sales Rep", department: "Sales", salary: 22000, joinDate: "2022-01-10", phone: "+880 1913-333333", email: "karim@alyamen.com", status: "active" },
  { id: "EMP-004", name: "Nasrin Akter", position: "HR Officer", department: "HR", salary: 25000, joinDate: "2021-09-20", phone: "+880 1714-444444", email: "nasrin@alyamen.com", status: "active" },
  { id: "EMP-005", name: "Md. Hasan", position: "Store Keeper", department: "Inventory", salary: 18000, joinDate: "2022-04-05", phone: "+880 1815-555555", email: "hasan@alyamen.com", status: "inactive" },
];

export const sampleAttendance = [
  { employeeId: "EMP-001", employeeName: "Md. Abdullah", date: "2024-01-15", checkIn: "09:02", checkOut: "18:05", status: "present" },
  { employeeId: "EMP-002", employeeName: "Fatima Begum", date: "2024-01-15", checkIn: "09:15", checkOut: "18:00", status: "present" },
  { employeeId: "EMP-003", employeeName: "Md. Karim", date: "2024-01-15", checkIn: "-", checkOut: "-", status: "absent" },
  { employeeId: "EMP-004", employeeName: "Nasrin Akter", date: "2024-01-15", checkIn: "09:00", checkOut: "14:00", status: "leave" },
  { employeeId: "EMP-005", employeeName: "Md. Hasan", date: "2024-01-15", checkIn: "08:55", checkOut: "18:10", status: "present" },
];

export const sampleDailyLedger = [
  { id: 1, date: "2024-01-15", particulars: "Opening Balance", debit: 0, credit: 125000, balance: 125000 },
  { id: 2, date: "2024-01-15", particulars: "Sales Revenue", debit: 0, credit: 45000, balance: 170000 },
  { id: 3, date: "2024-01-15", particulars: "Office Rent", debit: 12000, credit: 0, balance: 158000 },
  { id: 4, date: "2024-01-15", particulars: "Utility Bills", debit: 3200, credit: 0, balance: 154800 },
  { id: 5, date: "2024-01-15", particulars: "Staff Salaries", debit: 38000, credit: 0, balance: 116800 },
  { id: 6, date: "2024-01-15", particulars: "Service Income", debit: 0, credit: 8500, balance: 125300 },
];

export const monthlyData = [
  { month: "Jul", revenue: 185000, expense: 112000, profit: 73000 },
  { month: "Aug", revenue: 210000, expense: 128000, profit: 82000 },
  { month: "Sep", revenue: 198000, expense: 118000, profit: 80000 },
  { month: "Oct", revenue: 235000, expense: 135000, profit: 100000 },
  { month: "Nov", revenue: 220000, expense: 130000, profit: 90000 },
  { month: "Dec", revenue: 268000, expense: 148000, profit: 120000 },
  { month: "Jan", revenue: 245000, expense: 142000, profit: 103000 },
];

export const categoryExpenses = [
  { name: "Salaries", value: 38000, color: "#38bdf8" },
  { name: "Rent", value: 12000, color: "#34d399" },
  { name: "Utilities", value: 5200, color: "#fbbf24" },
  { name: "Supplies", value: 3800, color: "#a78bfa" },
  { name: "Marketing", value: 8500, color: "#f87171" },
  { name: "Other", value: 4500, color: "#fb923c" },
];
