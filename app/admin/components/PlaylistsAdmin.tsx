'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Playlist, PlaylistItem, Daypart } from '@/lib/types';

export default function PlaylistsAdmin() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const playlistsSnapshot = await getDocs(collection(db, 'playlists'));
        const playlistsData = playlistsSnapshot.docs.map(doc => ({ 
          ...doc.data() 
        } as Playlist));
        setPlaylists(playlistsData);
      } catch (error) {
        console.error('Failed to load playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  const handleSavePlaylist = async () => {
    if (!editingPlaylist) return;

    try {
      await updateDoc(doc(db, 'playlists', editingPlaylist.playlist_id), {
        dayparts: editingPlaylist.dayparts,
        items: editingPlaylist.items
      });

      // Update local state
      setPlaylists(prev => prev.map(p => 
        p.playlist_id === editingPlaylist.playlist_id ? editingPlaylist : p
      ));
      setSelectedPlaylist(editingPlaylist);
      setEditingPlaylist(null);
    } catch (error) {
      console.error('Failed to save playlist:', error);
      alert('Failed to save playlist');
    }
  };

  const updateDaypart = (daypartIndex: number, field: keyof Daypart, value: any) => {
    if (!editingPlaylist) return;

    const updatedDayparts = [...editingPlaylist.dayparts];
    updatedDayparts[daypartIndex] = {
      ...updatedDayparts[daypartIndex],
      [field]: value
    };

    setEditingPlaylist({
      ...editingPlaylist,
      dayparts: updatedDayparts
    });
  };

  const addItem = () => {
    if (!editingPlaylist) return;

    const newItemKey = `item_${Date.now()}`;
    const newItem: PlaylistItem = {
      type: 'video',
      src: '',
      duration: 30,
      cta: {
        open: 'menu'
      }
    };

    setEditingPlaylist({
      ...editingPlaylist,
      items: {
        ...editingPlaylist.items,
        [newItemKey]: newItem
      }
    });
  };

  const updateItem = (itemKey: string, field: keyof PlaylistItem, value: any) => {
    if (!editingPlaylist) return;

    setEditingPlaylist({
      ...editingPlaylist,
      items: {
        ...editingPlaylist.items,
        [itemKey]: {
          ...editingPlaylist.items[itemKey],
          [field]: value
        }
      }
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading playlists...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Playlists</h2>
        <div className="text-sm text-gray-400">
          Total: {playlists.length} playlists
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Playlists List */}
        <div className="space-y-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.playlist_id}
              onClick={() => {
                setSelectedPlaylist(playlist);
                setEditingPlaylist(null);
              }}
              className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-700 ${
                selectedPlaylist?.playlist_id === playlist.playlist_id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <h3 className="font-bold text-lg">{playlist.playlist_id}</h3>
              <div className="text-gray-400 text-sm">
                {playlist.dayparts.length} dayparts • {Object.keys(playlist.items).length} items
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                Targets: {playlist.targets.venues.join(', ') || 'All venues'}
              </div>
            </div>
          ))}

          {playlists.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No playlists found
            </div>
          )}
        </div>

        {/* Playlist Details */}
        <div className="lg:col-span-2">
          {selectedPlaylist && !editingPlaylist ? (
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{selectedPlaylist.playlist_id}</h3>
                <button
                  onClick={() => setEditingPlaylist({ ...selectedPlaylist })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Edit
                </button>
              </div>

              {/* Dayparts */}
              <div>
                <h4 className="font-semibold mb-2">Dayparts</h4>
                <div className="space-y-2">
                  {selectedPlaylist.dayparts.map((daypart, index) => (
                    <div key={index} className="bg-gray-700 rounded p-3 text-sm">
                      <div className="font-medium">
                        {daypart.start} - {daypart.end}
                      </div>
                      <div className="text-gray-400">
                        Items: {daypart.items.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-semibold mb-2">Items</h4>
                <div className="space-y-2">
                  {Object.entries(selectedPlaylist.items).map(([key, item]) => (
                    <div key={key} className="bg-gray-700 rounded p-3 text-sm">
                      <div className="font-medium">{key}</div>
                      <div className="text-gray-400">
                        Source: {item.src || 'Not set'}
                      </div>
                      <div className="text-gray-400">
                        Duration: {item.duration}s • CTA: {item.cta?.open || 'None'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : editingPlaylist ? (
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Edit: {editingPlaylist.playlist_id}</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => setEditingPlaylist(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePlaylist}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Edit Dayparts */}
              <div>
                <h4 className="font-semibold mb-2">Dayparts</h4>
                <div className="space-y-3">
                  {editingPlaylist.dayparts.map((daypart, index) => (
                    <div key={index} className="bg-gray-700 rounded p-3">
                      <div className="grid grid-cols-2 gap-3 mb-2">
                        <input
                          type="time"
                          value={daypart.start}
                          onChange={(e) => updateDaypart(index, 'start', e.target.value)}
                          className="bg-gray-600 text-white px-2 py-1 rounded text-sm"
                        />
                        <input
                          type="time"
                          value={daypart.end}
                          onChange={(e) => updateDaypart(index, 'end', e.target.value)}
                          className="bg-gray-600 text-white px-2 py-1 rounded text-sm"
                        />
                      </div>
                      <input
                        type="text"
                        value={daypart.items.join(', ')}
                        onChange={(e) => updateDaypart(index, 'items', e.target.value.split(', '))}
                        placeholder="item1, item2, item3"
                        className="w-full bg-gray-600 text-white px-2 py-1 rounded text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Items</h4>
                  <button
                    onClick={addItem}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {Object.entries(editingPlaylist.items).map(([key, item]) => (
                    <div key={key} className="bg-gray-700 rounded p-3">
                      <div className="font-medium mb-2 text-sm">{key}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={item.src}
                          onChange={(e) => updateItem(key, 'src', e.target.value)}
                          placeholder="Video URL"
                          className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                        />
                        <input
                          type="number"
                          value={item.duration}
                          onChange={(e) => updateItem(key, 'duration', parseInt(e.target.value))}
                          placeholder="Duration (s)"
                          className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                        />
                      </div>
                      <select
                        value={item.cta?.open || 'menu'}
                        onChange={(e) => updateItem(key, 'cta', { ...item.cta, open: e.target.value as any })}
                        className="w-full mt-2 bg-gray-600 text-white px-2 py-1 rounded text-xs"
                      >
                        <option value="menu">Menu</option>
                        <option value="dine_cart">Dine Cart</option>
                        <option value="property_list">Property List</option>
                        <option value="detail">Detail</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
              Select a playlist to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}