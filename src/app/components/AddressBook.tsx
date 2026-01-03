import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Star } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      street: '123 Oxford Street',
      city: 'London',
      postcode: 'W1D 1BS',
      country: 'United Kingdom',
      phone: '+44 7700 900000',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      street: '456 High Street',
      city: 'Manchester',
      postcode: 'M1 1AD',
      country: 'United Kingdom',
      phone: '+44 7700 900000',
      isDefault: false,
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Address>({
    id: '',
    name: '',
    street: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    phone: '',
    isDefault: false,
  });

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData(address);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter((addr) => addr.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleSave = () => {
    if (editingId) {
      setAddresses(addresses.map((addr) => (addr.id === editingId ? formData : addr)));
      setEditingId(null);
    } else {
      const newAddress = { ...formData, id: Date.now().toString() };
      setAddresses([...addresses, newAddress]);
      setIsAddingNew(false);
    }
    setFormData({
      id: '',
      name: '',
      street: '',
      city: '',
      postcode: '',
      country: 'United Kingdom',
      phone: '',
      isDefault: false,
    });
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      id: '',
      name: '',
      street: '',
      city: '',
      postcode: '',
      country: 'United Kingdom',
      phone: '',
      isDefault: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#111111] mb-2">Address Book</h1>
          <p className="text-gray-600">Manage your shipping and billing addresses</p>
        </div>
        <button
          onClick={() => {
            setIsAddingNew(true);
            setEditingId(null);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Address
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl text-[#111111] mb-4">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="+44 7700 900000"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Street Address</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="123 Oxford Street"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="London"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Postcode</label>
              <input
                type="text"
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
                placeholder="W1D 1BS"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Country</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1ED2AF] transition-colors"
              >
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-5 h-5 text-[#1ED2AF] border-gray-300 rounded focus:ring-[#1ED2AF]"
                />
                <span className="text-gray-700">Set as default address</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-[#1ED2AF] text-white rounded-lg hover:bg-[#111111] transition-colors"
            >
              Save Address
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#111111] hover:text-[#111111] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Addresses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`bg-white rounded-lg shadow-lg p-6 relative ${
              address.isDefault ? 'ring-2 ring-[#1ED2AF]' : ''
            }`}
          >
            {address.isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#1ED2AF] text-white px-3 py-1 rounded-full text-sm">
                <Star className="w-4 h-4 fill-current" />
                Default
              </div>
            )}
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-6 h-6 text-[#1ED2AF] mt-1" />
              <div className="flex-1">
                <h3 className="text-lg text-[#111111] mb-2">{address.name}</h3>
                <p className="text-gray-700">{address.street}</p>
                <p className="text-gray-700">
                  {address.city}, {address.postcode}
                </p>
                <p className="text-gray-700">{address.country}</p>
                <p className="text-gray-600 mt-2">{address.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(address)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-[#1ED2AF] text-[#1ED2AF] rounded-lg hover:bg-[#1ED2AF] hover:text-white transition-colors text-sm"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              {!address.isDefault && (
                <>
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#1ED2AF] hover:text-[#1ED2AF] transition-colors text-sm"
                  >
                    <Star className="w-4 h-4" />
                    Set Default
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
