export const sampleTransactions = [
  { id: 1, date: "2024-01-15", type: "income", category: "Sales", description: "Product Sale - Order #1001", amount: 45000, reference: "TXN-001", status: "completed", bank: "Dutch-Bangla Bank" },
  { id: 2, date: "2024-01-14", type: "expense", category: "Rent", description: "Office Rent January", amount: 12000, reference: "TXN-002", status: "completed", bank: "Cash" },
  { id: 3, date: "2024-01-13", type: "income", category: "Service", description: "Consulting Service", amount: 8500, reference: "TXN-003", status: "completed", bank: "bKash" },
  { id: 4, date: "2024-01-12", type: "expense", category: "Utilities", description: "Electricity Bill", amount: 3200, reference: "TXN-004", status: "completed", bank: "Cash" },
  { id: 5, date: "2024-01-11", type: "income", category: "Sales", description: "Bulk Order #1002", amount: 72000, reference: "TXN-005", status: "completed", bank: "BRAC Bank" },
  { id: 6, date: "2024-01-10", type: "expense", category: "Salaries", description: "Staff Salaries", amount: 38000, reference: "TXN-006", status: "completed", bank: "Dutch-Bangla Bank" },
  { id: 7, date: "2024-01-09", type: "income", category: "Sales", description: "Retail Sales", amount: 15500, reference: "TXN-007", status: "pending", bank: "Cash" },
  { id: 8, date: "2024-01-08", type: "expense", category: "Supplies", description: "Office Supplies", amount: 1800, reference: "TXN-008", status: "completed", bank: "Cash" },
  { id: 9, date: "2024-01-07", type: "income", category: "Sales", description: "Wholesale Order #1003", amount: 95000, reference: "TXN-009", status: "completed", bank: "Islami Bank" },
  { id: 10, date: "2024-01-06", type: "expense", category: "Marketing", description: "Digital Marketing", amount: 8500, reference: "TXN-010", status: "completed", bank: "bKash" },
  { id: 11, date: "2024-01-05", type: "expense", category: "Transport", description: "Delivery Cost", amount: 4200, reference: "TXN-011", status: "completed", bank: "Cash" },
  { id: 12, date: "2024-01-04", type: "income", category: "Service", description: "Installation Service", amount: 12000, reference: "TXN-012", status: "pending", bank: "bKash" },
];

export const sampleOrders = [
  { id: "ORD-001", customer: "Rahman Trading", date: "2024-01-15", items: 5, total: 45000, status: "completed", payment: "paid" },
  { id: "ORD-002", customer: "Hossain Enterprises", date: "2024-01-14", items: 3, total: 28500, status: "pending", payment: "partial" },
  { id: "ORD-003", customer: "Karim & Sons", date: "2024-01-13", items: 8, total: 72000, status: "processing", payment: "unpaid" },
  { id: "ORD-004", customer: "Islam Traders", date: "2024-01-12", items: 2, total: 12000, status: "completed", payment: "paid" },
  { id: "ORD-005", customer: "Alam Corporation", date: "2024-01-11", items: 6, total: 56000, status: "completed", payment: "paid" },
  { id: "ORD-006", customer: "Begum Stores", date: "2024-01-10", items: 4, total: 33000, status: "cancelled", payment: "refunded" },
  { id: "ORD-007", customer: "Chowdhury Bros.", date: "2024-01-09", items: 7, total: 89000, status: "completed", payment: "paid" },
  { id: "ORD-008", customer: "Mia Traders", date: "2024-01-08", items: 2, total: 18500, status: "pending", payment: "unpaid" },
];

export const sampleCustomers = [
  { id: 1, name: "Rahman Trading Co.", phone: "+880 1711-123456", email: "rahman@trading.com", address: "Dhaka, Bangladesh", totalOrders: 24, totalSpent: 345000, status: "active", joinDate: "2022-03-10" },
  { id: 2, name: "Hossain Enterprises", phone: "+880 1812-234567", email: "hossain@ent.com", address: "Chittagong, Bangladesh", totalOrders: 18, totalSpent: 256000, status: "active", joinDate: "2022-07-15" },
  { id: 3, name: "Karim & Sons Ltd.", phone: "+880 1913-345678", email: "karim@sons.com", address: "Sylhet, Bangladesh", totalOrders: 32, totalSpent: 498000, status: "active", joinDate: "2021-11-20" },
  { id: 4, name: "Islam Traders", phone: "+880 1714-456789", email: "islam@traders.com", address: "Rajshahi, Bangladesh", totalOrders: 12, totalSpent: 145000, status: "inactive", joinDate: "2023-01-05" },
  { id: 5, name: "Alam Corporation", phone: "+880 1815-567890", email: "alam@corp.com", address: "Khulna, Bangladesh", totalOrders: 28, totalSpent: 389000, status: "active", joinDate: "2022-05-18" },
  { id: 6, name: "Begum Stores", phone: "+880 1916-678901", email: "begum@stores.com", address: "Barisal, Bangladesh", totalOrders: 9, totalSpent: 98000, status: "active", joinDate: "2023-04-22" },
  { id: 7, name: "Chowdhury Bros.", phone: "+880 1717-789012", email: "chowdhury@bros.com", address: "Comilla, Bangladesh", totalOrders: 41, totalSpent: 612000, status: "active", joinDate: "2021-08-30" },
];

export const sampleProducts = [
  { id: 1, name: "Premium Rice (50kg)", sku: "RICE-001", category: "Food Grain", price: 3200, purchasePrice: 2800, stock: 150, minStock: 20, unit: "Bag", supplier: "Agro Foods Ltd.", status: "active" },
  { id: 2, name: "Mustard Oil (5L)", sku: "OIL-002", category: "Cooking Oil", price: 850, purchasePrice: 720, stock: 8, minStock: 25, unit: "Bottle", supplier: "Pure Oil Co.", status: "low_stock" },
  { id: 3, name: "Sugar (50kg)", sku: "SUG-003", category: "Sugar", price: 4500, purchasePrice: 3900, stock: 0, minStock: 15, unit: "Bag", supplier: "Sweet Mills", status: "out_of_stock" },
  { id: 4, name: "Wheat Flour (10kg)", sku: "FLR-004", category: "Flour", price: 580, purchasePrice: 490, stock: 95, minStock: 30, unit: "Pack", supplier: "Flour House", status: "active" },
  { id: 5, name: "Lentils (1kg)", sku: "LNT-005", category: "Pulses", price: 145, purchasePrice: 118, stock: 320, minStock: 50, unit: "Pack", supplier: "Daal Mart", status: "active" },
  { id: 6, name: "Salt (1kg)", sku: "SLT-006", category: "Condiments", price: 35, purchasePrice: 28, stock: 450, minStock: 100, unit: "Pack", supplier: "Salt Corp", status: "active" },
  { id: 7, name: "Soybean Oil (5L)", sku: "SOY-007", category: "Cooking Oil", price: 920, purchasePrice: 800, stock: 62, minStock: 20, unit: "Bottle", supplier: "Pure Oil Co.", status: "active" },
  { id: 8, name: "Chickpeas (1kg)", sku: "CHK-008", category: "Pulses", price: 160, purchasePrice: 135, stock: 14, minStock: 30, unit: "Pack", supplier: "Daal Mart", status: "low_stock" },
];

export const sampleSuppliers = [
  { id: 1, name: "Agro Foods Ltd.", contact: "Rahim Uddin", phone: "+880 1711-100001", email: "agro@foods.com", address: "Gazipur, Dhaka", totalPurchase: 580000, outstanding: 45000, status: "active" },
  { id: 2, name: "Pure Oil Co.", contact: "Korim Khan", phone: "+880 1812-200002", email: "pure@oil.com", address: "Narayanganj, Dhaka", totalPurchase: 340000, outstanding: 0, status: "active" },
  { id: 3, name: "Sweet Mills", contact: "Jamal Hossain", phone: "+880 1913-300003", email: "sweet@mills.com", address: "Chittagong", totalPurchase: 215000, outstanding: 28000, status: "active" },
  { id: 4, name: "Flour House", contact: "Babul Ahmed", phone: "+880 1714-400004", email: "flour@house.com", address: "Sylhet", totalPurchase: 128000, outstanding: 0, status: "active" },
  { id: 5, name: "Daal Mart", contact: "Sumon Mia", phone: "+880 1815-500005", email: "daal@mart.com", address: "Rajshahi", totalPurchase: 95000, outstanding: 12000, status: "inactive" },
];

export const samplePurchases = [
  { id: "PUR-001", supplier: "Agro Foods Ltd.", date: "2024-01-15", items: 3, total: 84000, status: "received", payment: "paid" },
  { id: "PUR-002", supplier: "Pure Oil Co.", date: "2024-01-13", items: 2, total: 36000, status: "pending", payment: "partial" },
  { id: "PUR-003", supplier: "Sweet Mills", date: "2024-01-10", items: 5, total: 195000, status: "received", payment: "unpaid" },
  { id: "PUR-004", supplier: "Flour House", date: "2024-01-08", items: 1, total: 49000, status: "received", payment: "paid" },
  { id: "PUR-005", supplier: "Daal Mart", date: "2024-01-05", items: 4, total: 57600, status: "ordered", payment: "unpaid" },
  { id: "PUR-006", supplier: "Pure Oil Co.", date: "2024-01-03", items: 2, total: 41400, status: "received", payment: "paid" },
];

export const sampleEmployees = [
  { id: "EMP-001", name: "Md. Abdullah", position: "Manager", department: "Sales", salary: 35000, joinDate: "2020-03-15", phone: "+880 1711-111111", email: "abdullah@alyamen.com", status: "active", nid: "1234567890" },
  { id: "EMP-002", name: "Fatima Begum", position: "Accountant", department: "Finance", salary: 28000, joinDate: "2021-06-01", phone: "+880 1812-222222", email: "fatima@alyamen.com", status: "active", nid: "2345678901" },
  { id: "EMP-003", name: "Md. Karim", position: "Sales Rep", department: "Sales", salary: 22000, joinDate: "2022-01-10", phone: "+880 1913-333333", email: "karim@alyamen.com", status: "active", nid: "3456789012" },
  { id: "EMP-004", name: "Nasrin Akter", position: "HR Officer", department: "HR", salary: 25000, joinDate: "2021-09-20", phone: "+880 1714-444444", email: "nasrin@alyamen.com", status: "active", nid: "4567890123" },
  { id: "EMP-005", name: "Md. Hasan", position: "Store Keeper", department: "Inventory", salary: 18000, joinDate: "2022-04-05", phone: "+880 1815-555555", email: "hasan@alyamen.com", status: "inactive", nid: "5678901234" },
  { id: "EMP-006", name: "Rafiqul Islam", position: "Driver", department: "Logistics", salary: 15000, joinDate: "2023-02-12", phone: "+880 1916-666666", email: "rafiq@alyamen.com", status: "active", nid: "6789012345" },
  { id: "EMP-007", name: "Sumaiya Khatun", position: "Cashier", department: "Finance", salary: 20000, joinDate: "2023-05-01", phone: "+880 1717-777777", email: "sumaiya@alyamen.com", status: "active", nid: "7890123456" },
];

export const sampleAttendance = [
  { employeeId: "EMP-001", employeeName: "Md. Abdullah", date: "2024-01-15", checkIn: "09:02", checkOut: "18:05", hours: "9h 03m", status: "present" },
  { employeeId: "EMP-002", employeeName: "Fatima Begum", date: "2024-01-15", checkIn: "09:15", checkOut: "18:00", hours: "8h 45m", status: "present" },
  { employeeId: "EMP-003", employeeName: "Md. Karim", date: "2024-01-15", checkIn: "-", checkOut: "-", hours: "-", status: "absent" },
  { employeeId: "EMP-004", employeeName: "Nasrin Akter", date: "2024-01-15", checkIn: "09:00", checkOut: "14:00", hours: "5h 00m", status: "leave" },
  { employeeId: "EMP-005", employeeName: "Md. Hasan", date: "2024-01-15", checkIn: "08:55", checkOut: "18:10", hours: "9h 15m", status: "present" },
  { employeeId: "EMP-006", employeeName: "Rafiqul Islam", date: "2024-01-15", checkIn: "08:30", checkOut: "17:30", hours: "9h 00m", status: "present" },
  { employeeId: "EMP-007", employeeName: "Sumaiya Khatun", date: "2024-01-15", checkIn: "-", checkOut: "-", hours: "-", status: "absent" },
];

export const samplePayroll = [
  { employeeId: "EMP-001", employeeName: "Md. Abdullah", department: "Sales", basicSalary: 35000, bonus: 5000, overtime: 2500, deduction: 1500, netSalary: 41000, month: "January 2024", status: "paid" },
  { employeeId: "EMP-002", employeeName: "Fatima Begum", department: "Finance", basicSalary: 28000, bonus: 3000, overtime: 0, deduction: 1000, netSalary: 30000, month: "January 2024", status: "paid" },
  { employeeId: "EMP-003", employeeName: "Md. Karim", department: "Sales", basicSalary: 22000, bonus: 4000, overtime: 1500, deduction: 800, netSalary: 26700, month: "January 2024", status: "pending" },
  { employeeId: "EMP-004", employeeName: "Nasrin Akter", department: "HR", basicSalary: 25000, bonus: 2500, overtime: 0, deduction: 900, netSalary: 26600, month: "January 2024", status: "paid" },
  { employeeId: "EMP-005", employeeName: "Md. Hasan", department: "Inventory", basicSalary: 18000, bonus: 1500, overtime: 800, deduction: 600, netSalary: 19700, month: "January 2024", status: "paid" },
  { employeeId: "EMP-006", employeeName: "Rafiqul Islam", department: "Logistics", basicSalary: 15000, bonus: 1000, overtime: 1200, deduction: 500, netSalary: 16700, month: "January 2024", status: "pending" },
  { employeeId: "EMP-007", employeeName: "Sumaiya Khatun", department: "Finance", basicSalary: 20000, bonus: 2000, overtime: 0, deduction: 700, netSalary: 21300, month: "January 2024", status: "paid" },
];

export const sampleDailyLedger = [
  { id: 1, date: "2024-01-15", particulars: "Opening Balance", voucherNo: "VCH-001", debit: 0, credit: 125000, balance: 125000, type: "balance" },
  { id: 2, date: "2024-01-15", particulars: "Sales Revenue - ORD-001", voucherNo: "VCH-002", debit: 0, credit: 45000, balance: 170000, type: "income" },
  { id: 3, date: "2024-01-15", particulars: "Office Rent", voucherNo: "VCH-003", debit: 12000, credit: 0, balance: 158000, type: "expense" },
  { id: 4, date: "2024-01-15", particulars: "Utility Bills", voucherNo: "VCH-004", debit: 3200, credit: 0, balance: 154800, type: "expense" },
  { id: 5, date: "2024-01-15", particulars: "Staff Salaries", voucherNo: "VCH-005", debit: 38000, credit: 0, balance: 116800, type: "expense" },
  { id: 6, date: "2024-01-15", particulars: "Service Income", voucherNo: "VCH-006", debit: 0, credit: 8500, balance: 125300, type: "income" },
  { id: 7, date: "2024-01-15", particulars: "Purchase Payment", voucherNo: "VCH-007", debit: 84000, credit: 0, balance: 41300, type: "expense" },
  { id: 8, date: "2024-01-15", particulars: "Consulting Revenue", voucherNo: "VCH-008", debit: 0, credit: 15000, balance: 56300, type: "income" },
];

export const monthlyData = [
  { month: "Jul", revenue: 185000, expense: 112000, profit: 73000, purchase: 65000 },
  { month: "Aug", revenue: 210000, expense: 128000, profit: 82000, purchase: 78000 },
  { month: "Sep", revenue: 198000, expense: 118000, profit: 80000, purchase: 71000 },
  { month: "Oct", revenue: 235000, expense: 135000, profit: 100000, purchase: 88000 },
  { month: "Nov", revenue: 220000, expense: 130000, profit: 90000, purchase: 82000 },
  { month: "Dec", revenue: 268000, expense: 148000, profit: 120000, purchase: 95000 },
  { month: "Jan", revenue: 245000, expense: 142000, profit: 103000, purchase: 89000 },
];

export const categoryExpenses = [
  { name: "Salaries", value: 38000, color: "#38bdf8" },
  { name: "Rent", value: 12000, color: "#34d399" },
  { name: "Utilities", value: 5200, color: "#fbbf24" },
  { name: "Supplies", value: 3800, color: "#a78bfa" },
  { name: "Marketing", value: 8500, color: "#f87171" },
  { name: "Transport", value: 4200, color: "#fb923c" },
  { name: "Other", value: 4500, color: "#94a3b8" },
];

export const topProducts = [
  { name: "Premium Rice (50kg)", sales: 48, revenue: 153600, growth: 12 },
  { name: "Mustard Oil (5L)", sales: 35, revenue: 29750, growth: -5 },
  { name: "Wheat Flour (10kg)", sales: 29, revenue: 16820, growth: 8 },
  { name: "Lentils (1kg)", sales: 25, revenue: 3625, growth: 22 },
  { name: "Soybean Oil (5L)", sales: 20, revenue: 18400, growth: 15 },
];

export const bankAccounts = [
  { id: 1, bank: "Dutch-Bangla Bank", accountNo: "1234567890", branch: "Dhanmondi", balance: 285000, type: "current" },
  { id: 2, bank: "BRAC Bank", accountNo: "0987654321", branch: "Gulshan", balance: 145000, type: "savings" },
  { id: 3, bank: "Islami Bank", accountNo: "1122334455", branch: "Motijheel", balance: 98000, type: "current" },
  { id: 4, bank: "Cash in Hand", accountNo: "-", branch: "-", balance: 42500, type: "cash" },
];

export const sampleNotifications = [
  { id: 1, type: "warning", title: "Low Stock Alert", message: "Mustard Oil (5L) is running low (8 units)", time: "5 mins ago", read: false },
  { id: 2, type: "success", title: "Order Received", message: "New order ORD-009 from Mia Traders", time: "23 mins ago", read: false },
  { id: 3, type: "info", title: "Payment Received", message: "৳28,500 received from Hossain Enterprises", time: "1 hr ago", read: false },
  { id: 4, type: "warning", title: "Out of Stock", message: "Sugar (50kg) is out of stock", time: "2 hrs ago", read: true },
  { id: 5, type: "success", title: "Payroll Processed", message: "January payroll for 5 employees completed", time: "3 hrs ago", read: true },
];

export const salesByCategory = [
  { category: "Food Grain", sales: 158000, percentage: 38 },
  { category: "Cooking Oil", sales: 98500, percentage: 24 },
  { category: "Pulses", sales: 72000, percentage: 17 },
  { category: "Flour", sales: 58000, percentage: 14 },
  { category: "Others", sales: 28000, percentage: 7 },
];

export const weeklyActivity = [
  { day: "Sat", orders: 8, revenue: 45000 },
  { day: "Sun", orders: 12, revenue: 68000 },
  { day: "Mon", orders: 6, revenue: 32000 },
  { day: "Tue", orders: 15, revenue: 89000 },
  { day: "Wed", orders: 10, revenue: 56000 },
  { day: "Thu", orders: 18, revenue: 102000 },
  { day: "Fri", orders: 4, revenue: 21000 },
];
