import { FileText, Download, Eye } from 'lucide-react';

interface Invoice {
  id: string;
  orderNumber: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Refunded' | 'Pending';
  downloadUrl: string;
}

export function Invoices() {
  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      orderNumber: '#VBR-2024-001',
      date: '2024-12-15',
      amount: 289.99,
      status: 'Paid',
      downloadUrl: '#',
    },
    {
      id: 'INV-2024-002',
      orderNumber: '#VBR-2024-002',
      date: '2024-12-10',
      amount: 159.99,
      status: 'Paid',
      downloadUrl: '#',
    },
    {
      id: 'INV-2024-003',
      orderNumber: '#VBR-2024-003',
      date: '2024-11-28',
      amount: 449.97,
      status: 'Refunded',
      downloadUrl: '#',
    },
    {
      id: 'INV-2024-004',
      orderNumber: '#VBR-2024-004',
      date: '2024-11-15',
      amount: 199.99,
      status: 'Paid',
      downloadUrl: '#',
    },
  ];

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'Refunded':
        return 'bg-yellow-100 text-yellow-700';
      case 'Pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDownload = (invoice: Invoice) => {
    alert(`Downloading invoice ${invoice.id}`);
  };

  const handleView = (invoice: Invoice) => {
    alert(`Viewing invoice ${invoice.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-[#111111] mb-2">Payment & Invoices</h1>
        <p className="text-gray-600">View and download your invoices and payment history</p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Total Spent</p>
          <p className="text-3xl text-[#111111]">
            £{invoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Paid Invoices</p>
          <p className="text-3xl text-[#111111]">
            {invoices.filter((inv) => inv.status === 'Paid').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Total Refunded</p>
          <p className="text-3xl text-[#111111]">
            £
            {invoices
              .filter((inv) => inv.status === 'Refunded')
              .reduce((sum, inv) => sum + inv.amount, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F3EE]">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-700">Invoice ID</th>
                <th className="px-6 py-4 text-left text-sm text-gray-700">Order Number</th>
                <th className="px-6 py-4 text-left text-sm text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-[#F5F3EE] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#1ED2AF]" />
                      <span className="text-[#111111]">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{invoice.orderNumber}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-[#111111]">£{invoice.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(invoice)}
                        className="p-2 text-[#1ED2AF] hover:bg-[#1ED2AF] hover:text-white rounded transition-colors"
                        title="View Invoice"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDownload(invoice)}
                        className="p-2 text-[#111111] hover:bg-[#111111] hover:text-white rounded transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Information */}
      <div className="bg-[#F5F3EE] rounded-lg p-6">
        <h3 className="text-lg text-[#111111] mb-3">Refund Information</h3>
        <div className="space-y-2 text-gray-700">
          <p>• Refunds are processed within 5-7 business days after return approval</p>
          <p>• Refunds will be credited to your original payment method</p>
          <p>• You will receive an email confirmation once the refund is processed</p>
          <p>• For any questions, please contact our customer service team</p>
        </div>
      </div>
    </div>
  );
}
