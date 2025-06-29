import { useEffect, useState } from "react";
import CsvExportModal from "@/components/CsvExportModal"; // adjust path as needed

import axios from "axios";
import RevenueVsExpenseChart, { type ChartData } from "@/components/RevenueVsExpenseChart";
import {
  Bell,
  Search,
  User,
  Wallet,
  TrendingUp,
  ArrowDownCircle,
  PiggyBank,
  LayoutDashboard,
  CreditCard,
  BarChart2,
  MessageCircle,
  Settings,
  UserCircle2,
  FolderOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Transaction {
  _id: string;
  date: string;
  amount: number;
  category: "Revenue" | "Expense";
  status: "Paid" | "Pending";
  user_id: string;
  user_profile: string;
}

const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Transactions", icon: <CreditCard size={20} /> },
  { label: "Wallet", icon: <FolderOpen size={20} /> },
  { label: "Analytics", icon: <BarChart2 size={20} /> },
  { label: "Personal", icon: <UserCircle2 size={20} /> },
  { label: "Message", icon: <MessageCircle size={20} /> },
  { label: "Setting", icon: <Settings size={20} /> },
];

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [visibleCount, setVisibleCount] = useState(10);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/transaction", {
          withCredentials: true,
        });

        const txns: Transaction[] = res.data.transactions;
        setTransactions(txns);

        const monthlyMap: { [month: string]: ChartData } = {};
        txns.forEach((t) => {
          const date = new Date(t.date);
          const month = date.toLocaleString("default", { month: "short" });

          if (!monthlyMap[month]) {
            monthlyMap[month] = { month, revenue: 0, expense: 0 };
          }

          if (t.category === "Revenue") monthlyMap[month].revenue += t.amount;
          else monthlyMap[month].expense += t.amount;
        });

        const finalChartData = Object.values(monthlyMap).sort(
          (a, b) =>
            new Date(`01 ${a.month} 2024`).getTime() -
            new Date(`01 ${b.month} 2024`).getTime()
        );
        setChartData(finalChartData);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTxns = transactions
    .filter(
      (txn) =>
        txn.user_id.toLowerCase().includes(search.toLowerCase()) ||
        txn.status.toLowerCase().includes(search.toLowerCase())
    )
    .filter((txn) =>
      filterDate ? txn.date.slice(0, 10) === filterDate : true
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const visibleTxns = filteredTxns.slice(0, visibleCount);

  const totalRevenue = transactions.filter(t => t.category === "Revenue").reduce((a, c) => a + c.amount, 0);
  const totalExpense = transactions.filter(t => t.category === "Expense").reduce((a, c) => a + c.amount, 0);
  const balance = totalRevenue - totalExpense;

  const cardData = [
    { title: "Balance", value: `$${balance.toFixed(2)}`, icon: <Wallet className="text-green-400" /> },
    { title: "Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: <TrendingUp className="text-green-400" /> },
    { title: "Expenses", value: `$${totalExpense.toFixed(2)}`, icon: <ArrowDownCircle className="text-red-400" /> },
    { title: "Savings", value: `$${(balance).toFixed(2)}`, icon: <PiggyBank className="text-yellow-400" /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#1A1c22] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#131418] p-6 hidden md:flex flex-col space-y-8">
        <h1 className="text-2xl font-bold text-green-400">🪙 Penta</h1>
        <nav className="space-y-6 text-base">
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={`/admin-${item.label.toLowerCase()}`}
              className={`flex items-center gap-3 hover:text-green-300 ${item.label === "Dashboard" ? "text-green-400" : "text-gray-400"
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-[#131418] px-6 py-4">
          <h2 className="text-2xl font-bold text-green-400">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#2A2B31] px-4 py-2 rounded-full placeholder-gray-400 border-none focus:outline-none"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <Bell className="w-6 h-6 text-gray-400" />
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
              <User className="text-white" />
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cardData.map((item, idx) => (
              <div key={idx} className="bg-[#2A2B31] p-4 rounded-xl flex items-center gap-4">
                <div className="p-2 rounded-full bg-[#1E1F25]">{item.icon}</div>
                <div>
                  <h3 className="text-sm text-gray-400">{item.title}</h3>
                  <p className="text-xl font-semibold mt-1">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chart and Recent */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="col-span-2">
              <RevenueVsExpenseChart data={chartData} />
            </div>
            <div className="bg-[#2A2B31] p-4 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Recent Transaction</h3>
              <ul className="space-y-4 text-sm">
                {transactions.slice(0, 3).map((tx, i) => (
                  <li key={tx._id}>
                    <div className="flex justify-between items-center pb-2">
                      <div className="flex items-center space-x-2">
                        <img src={tx.user_profile} alt="avatar" className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="text-white text-base font-medium leading-6">{tx.user_id}</p>
                          <p className="text-xs text-gray-400">{tx.category}</p>
                        </div>
                      </div>
                      <span className={`text-sm ${tx.category === "Revenue" ? "text-green-400" : "text-red-400"}`}>
                        {tx.category === "Revenue" ? "+" : "-"}${tx.amount.toFixed(2)}
                      </span>
                    </div>
                    {i < 2 && <hr className="border-[#1E1F25]" />}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-[#2A2B31] p-4 rounded-xl overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Transactions</h3>
              <div className="flex space-x-4 items-center">
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="bg-[#1E1F25] px-4 py-2 rounded-md text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <input
                  type="date"
                  className="bg-[#1E1F25] px-4 py-2 rounded-md text-sm"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
                <select
                  className="bg-[#1E1F25] px-4 py-2 rounded-md text-sm"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                >
                  <option value="desc">Newest</option>
                  <option value="asc">Oldest</option>
                </select>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 ml-2"
                >
                  Export CSV
                </button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-left bg-[#1E1F25]">
                  <th className="px-4 py-4 rounded-l-md">Name</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Amount</th>
                  <th className="px-4 py-4 rounded-r-md">Status</th>
                </tr>
              </thead>
              <tbody>
                {visibleTxns.map((txn) => (
                  <tr key={txn._id} className="border-t border-[#1E1F25] hover:bg-[#1E1F25]">
                    <td className="py-4 px-3 flex items-center gap-2">
                      <img src={txn.user_profile} alt="avatar" className="w-6 h-6 rounded-full" />
                      <span>{txn.user_id}</span>
                    </td>
                    <td className="py-4 px-3">
                      {new Date(txn.date).toLocaleDateString("en-GB", {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className={`py-4 px-3 ${txn.category === "Revenue" ? "text-green-400" : "text-red-400"}`}>
                      {txn.category === "Revenue" ? "+" : "-"}${txn.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${txn.status === "Paid" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                        }`}>
                        {txn.status === "Paid" ? "Complete" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {visibleCount < filteredTxns.length && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setVisibleCount(visibleCount + 10)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600"
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        </div>
        {isModalOpen && (
          <CsvExportModal
            onClose={() => setIsModalOpen(false)}
            transactions={transactions}
          />
        )}

      </main>
    </div>
  );
};

export default Dashboard;
