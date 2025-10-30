'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Unit } from '@/lib/types';

export default function UnitsAdmin() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const unitsSnapshot = await getDocs(collection(db, 'units'));
        const unitsData = unitsSnapshot.docs.map(doc => ({ 
          ...doc.data() 
        } as Unit));
        setUnits(unitsData);
      } catch (error) {
        console.error('Failed to load units:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUnits();
  }, []);

  const handleSaveUnit = async () => {
    if (!editingUnit) return;

    try {
      await updateDoc(doc(db, 'units', editingUnit.unit_id), {
        condition: editingUnit.condition,
        available_from: editingUnit.available_from
      });

      // Update local state
      setUnits(prev => prev.map(u => 
        u.unit_id === editingUnit.unit_id ? editingUnit : u
      ));
      setSelectedUnit(editingUnit);
      setEditingUnit(null);
    } catch (error) {
      console.error('Failed to save unit:', error);
      alert('Failed to save unit');
    }
  };

  const getStatusText = (unit: Unit) => {
    if (unit.condition.for_sale && unit.condition.for_rent) return 'Sale/Rent';
    if (unit.condition.for_sale) return 'For Sale';
    if (unit.condition.for_rent) return 'For Rent';
    return 'Unavailable';
  };

  const getStatusColor = (unit: Unit) => {
    if (unit.condition.for_sale || unit.condition.for_rent) return 'text-green-400';
    return 'text-red-400';
  };

  if (loading) {
    return <div className="text-center py-8">Loading units...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Property Units</h2>
        <div className="text-sm text-gray-400">
          Total: {units.length} units
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Units List */}
        <div className="space-y-4">
          {units.map((unit) => (
            <div
              key={unit.unit_id}
              onClick={() => {
                setSelectedUnit(unit);
                setEditingUnit(null);
              }}
              className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-700 ${
                selectedUnit?.unit_id === unit.unit_id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{unit.project}</h3>
                  <p className="text-gray-400">{unit.room_type}</p>
                  <div className="text-sm text-gray-400">
                    {unit.size_sqm} sqm • Floor {unit.floor}
                  </div>
                </div>
                <div className={`text-sm font-semibold ${getStatusColor(unit)}`}>
                  {getStatusText(unit)}
                </div>
              </div>

              <div className="mt-2 text-sm">
                {unit.condition.selling_price && (
                  <div className="text-blue-400">
                    Sale: ฿{unit.condition.selling_price.toLocaleString()}
                  </div>
                )}
                {unit.condition.rental_price && (
                  <div className="text-green-400">
                    Rent: ฿{unit.condition.rental_price.toLocaleString()}/mo
                  </div>
                )}
              </div>
            </div>
          ))}

          {units.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No units found
            </div>
          )}
        </div>

        {/* Unit Details */}
        <div className="lg:col-span-2">
          {selectedUnit && !editingUnit ? (
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{selectedUnit.project}</h3>
                  <p className="text-gray-400">{selectedUnit.room_type}</p>
                </div>
                <button
                  onClick={() => setEditingUnit({ ...selectedUnit })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Unit ID:</strong><br />
                  {selectedUnit.unit_id}
                </div>
                <div>
                  <strong>Status:</strong><br />
                  <span className={getStatusColor(selectedUnit)}>
                    {getStatusText(selectedUnit)}
                  </span>
                </div>
                <div>
                  <strong>Size:</strong><br />
                  {selectedUnit.size_sqm} sqm
                </div>
                <div>
                  <strong>Floor:</strong><br />
                  {selectedUnit.floor}
                </div>
              </div>

              <div>
                <strong>Pricing:</strong>
                <div className="mt-1 space-y-1 text-sm">
                  {selectedUnit.condition.for_sale && selectedUnit.condition.selling_price && (
                    <div className="text-blue-400">
                      Sale Price: ฿{selectedUnit.condition.selling_price.toLocaleString()}
                    </div>
                  )}
                  {selectedUnit.condition.for_rent && selectedUnit.condition.rental_price && (
                    <div className="text-green-400">
                      Rental Price: ฿{selectedUnit.condition.rental_price.toLocaleString()}/month
                    </div>
                  )}
                </div>
              </div>

              <div>
                <strong>Available From:</strong><br />
                {new Date(selectedUnit.available_from).toLocaleDateString()}
              </div>

              {selectedUnit.images.length > 0 && (
                <div>
                  <strong>Images:</strong>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {selectedUnit.images.slice(0, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedUnit.project} ${selectedUnit.room_type}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : editingUnit ? (
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Edit: {editingUnit.unit_id}</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => setEditingUnit(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveUnit}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Edit Availability */}
              <div>
                <h4 className="font-semibold mb-2">Availability</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingUnit.condition.for_sale}
                        onChange={(e) => setEditingUnit({
                          ...editingUnit,
                          condition: { ...editingUnit.condition, for_sale: e.target.checked }
                        })}
                        className="rounded"
                      />
                      <span>For Sale</span>
                    </label>
                    {editingUnit.condition.for_sale && (
                      <input
                        type="number"
                        value={editingUnit.condition.selling_price || ''}
                        onChange={(e) => setEditingUnit({
                          ...editingUnit,
                          condition: { 
                            ...editingUnit.condition, 
                            selling_price: parseFloat(e.target.value) || undefined 
                          }
                        })}
                        placeholder="Sale price"
                        className="bg-gray-700 text-white px-3 py-1 rounded text-sm w-32"
                      />
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingUnit.condition.for_rent}
                        onChange={(e) => setEditingUnit({
                          ...editingUnit,
                          condition: { ...editingUnit.condition, for_rent: e.target.checked }
                        })}
                        className="rounded"
                      />
                      <span>For Rent</span>
                    </label>
                    {editingUnit.condition.for_rent && (
                      <input
                        type="number"
                        value={editingUnit.condition.rental_price || ''}
                        onChange={(e) => setEditingUnit({
                          ...editingUnit,
                          condition: { 
                            ...editingUnit.condition, 
                            rental_price: parseFloat(e.target.value) || undefined 
                          }
                        })}
                        placeholder="Monthly rent"
                        className="bg-gray-700 text-white px-3 py-1 rounded text-sm w-32"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Available Date */}
              <div>
                <label className="block text-sm font-medium mb-2">Available From</label>
                <input
                  type="date"
                  value={editingUnit.available_from.split('T')[0]}
                  onChange={(e) => setEditingUnit({
                    ...editingUnit,
                    available_from: e.target.value + 'T00:00:00.000Z'
                  })}
                  className="bg-gray-700 text-white px-3 py-2 rounded text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
              Select a unit to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}