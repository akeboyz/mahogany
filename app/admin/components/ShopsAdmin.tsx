'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Shop, MenuItem } from '@/lib/types';

export default function ShopsAdmin() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShops = async () => {
      try {
        const shopsSnapshot = await getDocs(collection(db, 'shops'));
        const shopsData = shopsSnapshot.docs.map(doc => ({ 
          ...doc.data() 
        } as Shop));
        setShops(shopsData);
      } catch (error) {
        console.error('Failed to load shops:', error);
      } finally {
        setLoading(false);
      }
    };

    loadShops();
  }, []);

  const handleSaveShop = async () => {
    if (!editingShop) return;

    try {
      await updateDoc(doc(db, 'shops', editingShop.shop_id), {
        name_th: editingShop.name_th,
        name_en: editingShop.name_en,
        menu: editingShop.menu
      });

      // Update local state
      setShops(prev => prev.map(s => 
        s.shop_id === editingShop.shop_id ? editingShop : s
      ));
      setSelectedShop(editingShop);
      setEditingShop(null);
    } catch (error) {
      console.error('Failed to save shop:', error);
      alert('Failed to save shop');
    }
  };

  const addMenuItem = () => {
    if (!editingShop) return;

    const newItem: MenuItem = {
      sku: `SKU-${Date.now()}`,
      name_th: '',
      name_en: '',
      price: 0
    };

    setEditingShop({
      ...editingShop,
      menu: [...editingShop.menu, newItem]
    });
  };

  const updateMenuItem = (index: number, field: keyof MenuItem, value: any) => {
    if (!editingShop) return;

    const updatedMenu = [...editingShop.menu];
    updatedMenu[index] = {
      ...updatedMenu[index],
      [field]: value
    };

    setEditingShop({
      ...editingShop,
      menu: updatedMenu
    });
  };

  const removeMenuItem = (index: number) => {
    if (!editingShop) return;

    setEditingShop({
      ...editingShop,
      menu: editingShop.menu.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading shops...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Shops</h2>
        <div className="text-sm text-gray-400">
          Total: {shops.length} shops
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shops List */}
        <div className="space-y-4">
          {shops.map((shop) => (
            <div
              key={shop.shop_id}
              onClick={() => {
                setSelectedShop(shop);
                setEditingShop(null);
              }}
              className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-700 ${
                selectedShop?.shop_id === shop.shop_id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <h3 className="font-bold text-lg">{shop.name_th}</h3>
              <div className="text-gray-400 text-sm">{shop.name_en}</div>
              <div className="text-gray-400 text-sm">
                {shop.type} • {shop.menu.length} items
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {shop.categories.slice(0, 3).map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-gray-700 text-xs rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {shops.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No shops found
            </div>
          )}
        </div>

        {/* Shop Details */}
        <div className="lg:col-span-2">
          {selectedShop && !editingShop ? (
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{selectedShop.name_th}</h3>
                  <p className="text-gray-400">{selectedShop.name_en}</p>
                </div>
                <button
                  onClick={() => setEditingShop({ ...selectedShop })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Type:</strong> {selectedShop.type}
                </div>
                <div>
                  <strong>Menu Items:</strong> {selectedShop.menu.length}
                </div>
              </div>

              <div>
                <strong>Categories:</strong>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedShop.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-gray-700 text-xs rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Menu Items */}
              <div>
                <h4 className="font-semibold mb-2">Menu Items</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedShop.menu.map((item, index) => (
                    <div key={item.sku} className="bg-gray-700 rounded p-3 text-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{item.name_th}</div>
                          <div className="text-gray-400">{item.name_en}</div>
                          <div className="text-green-400 font-bold">฿{item.price.toFixed(2)}</div>
                        </div>
                        <div className="text-xs text-gray-500">{item.sku}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : editingShop ? (
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Edit: {editingShop.name_th}</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => setEditingShop(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveShop}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Edit Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name (Thai)</label>
                  <input
                    type="text"
                    value={editingShop.name_th}
                    onChange={(e) => setEditingShop({ ...editingShop, name_th: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name (English)</label>
                  <input
                    type="text"
                    value={editingShop.name_en}
                    onChange={(e) => setEditingShop({ ...editingShop, name_en: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm"
                  />
                </div>
              </div>

              {/* Edit Menu Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Menu Items</h4>
                  <button
                    onClick={addMenuItem}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {editingShop.menu.map((item, index) => (
                    <div key={item.sku} className="bg-gray-700 rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <input
                          type="text"
                          value={item.sku}
                          onChange={(e) => updateMenuItem(index, 'sku', e.target.value)}
                          placeholder="SKU"
                          className="bg-gray-600 text-white px-2 py-1 rounded text-xs w-24"
                        />
                        <button
                          onClick={() => removeMenuItem(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          value={item.name_th}
                          onChange={(e) => updateMenuItem(index, 'name_th', e.target.value)}
                          placeholder="Name (Thai)"
                          className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                        />
                        <input
                          type="text"
                          value={item.name_en || ''}
                          onChange={(e) => updateMenuItem(index, 'name_en', e.target.value)}
                          placeholder="Name (English)"
                          className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                        />
                      </div>
                      
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateMenuItem(index, 'price', parseFloat(e.target.value) || 0)}
                        placeholder="Price"
                        className="w-full bg-gray-600 text-white px-2 py-1 rounded text-xs"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
              Select a shop to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}