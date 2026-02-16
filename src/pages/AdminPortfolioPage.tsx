import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import { getPortfolioItems, savePortfolioItem, deletePortfolioItem, updatePortfolioItem } from '../lib/localDb';
import Swal from 'sweetalert2';
import { PortfolioItem } from '../types/portfolio';
import { X, Image as ImageIcon, Video, Plus, Trash2, Edit2, ArrowLeft } from 'lucide-react';

// Check if we're in development mode
const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Bridal' as PortfolioItem['category'],
    tags: '',
    caption: '',
    mediaType: 'image' as 'image' | 'video',
    mediaUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const portfolioItems = await getPortfolioItems();
    setItems(portfolioItems);
  };

  const categoryOptions = [
    { value: 'Bridal', label: 'Bridal' },
    { value: 'Sider', label: 'Sider' },
    { value: 'Engagement', label: 'Engagement' },
    { value: 'Baby Shower', label: 'Baby Shower' },
    { value: 'Party', label: 'Party' },
    { value: 'Pre-Wedding', label: 'Pre-Wedding' },
    { value: 'Photoshoot', label: 'Photoshoot' },
    { value: 'Other', label: 'Other' },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB for images, 50MB for videos)
    const maxSize = type === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      Swal.fire({
        icon: 'warning',
        title: 'File Too Large',
        text: `Maximum size: ${type === 'image' ? '5MB' : '50MB'}`,
        confirmButtonColor: '#E11D48'
      });
      return;
    }

    // Validate file type
    if (type === 'image' && !file.type.startsWith('image/')) {
      Swal.fire('Oops!', 'Please select an image file', 'warning');
      return;
    }
    if (type === 'video' && !file.type.startsWith('video/')) {
      Swal.fire('Oops!', 'Please select a video file', 'warning');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData({ ...formData, mediaUrl: base64String, mediaType: type });
    };
    reader.onerror = () => {
      alert('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlInput = (url: string) => {
    setFormData({ ...formData, mediaUrl: url });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.caption.trim()) newErrors.caption = 'Caption is required';
    if (!formData.mediaUrl.trim()) newErrors.mediaUrl = 'Media is required';
    if (!formData.tags.trim()) newErrors.tags = 'At least one tag is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      tags: item.tags.join(', '),
      caption: item.caption,
      mediaType: item.mediaType,
      mediaUrl: item.mediaUrl,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

      if (editingItem) {
        await updatePortfolioItem(editingItem.id, {
          title: formData.title,
          category: formData.category,
          tags: tagsArray,
          caption: formData.caption,
          mediaType: formData.mediaType,
          mediaUrl: formData.mediaUrl,
        });

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Portfolio item updated successfully!',
          timer: 1500,
          showConfirmButton: false,
          background: '#FFF5F7',
          color: '#4A0E2E',
          iconColor: '#E11D48'
        });
      } else {
        await savePortfolioItem({
          title: formData.title,
          category: formData.category,
          tags: tagsArray,
          caption: formData.caption,
          mediaType: formData.mediaType,
          mediaUrl: formData.mediaUrl,
        });

        Swal.fire({
          icon: 'success',
          title: 'Uploaded!',
          text: 'Portfolio item added successfully!',
          timer: 1500,
          showConfirmButton: false,
          background: '#FFF5F7',
          color: '#4A0E2E',
          iconColor: '#E11D48'
        });
      }

      await loadItems();
      resetForm();

      if (!editingItem) {
        setSuccessMessage('✅ Portfolio item added successfully! It will now appear on the website.');
        setTimeout(() => setSuccessMessage(''), 5000);
      }

      // Scroll to top to show the new item
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save portfolio item. Please try again.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#E11D48'
      });
      if (isDev) {
        console.error('Error saving portfolio item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Bridal',
      tags: '',
      caption: '',
      mediaType: 'image',
      mediaUrl: '',
    });
    setErrors({});
    setShowForm(false);
    setEditingItem(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E11D48',
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deletePortfolioItem(id);
        await loadItems();
        Swal.fire({
          title: 'Deleted!',
          text: 'Item has been removed.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        });
      } catch (error) {
        Swal.fire('Error', 'Failed to delete item', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-soft-blush py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center text-rose-accent hover:text-rose-600 font-medium mb-6 group transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-deep-plum mb-2">Portfolio Management</h1>
            <p className="text-sm sm:text-base text-gray-600">Upload and manage portfolio images and videos</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              💡 Uploaded items appear immediately on the Portfolio page and Featured Looks section
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Card className="mb-6 bg-green-50 border-2 border-green-200">
            <p className="text-green-800 font-semibold text-center">{successMessage}</p>
            <p className="text-green-700 text-sm text-center mt-2">
              Visit the <a href="/portfolio" target="_blank" className="underline font-semibold">Portfolio page</a> to see your new item!
            </p>
          </Card>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-deep-plum">
                {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-deep-plum">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  error={errors.title}
                  placeholder="Ex: Traditional Marathi Bridal Look"
                  required
                />
                <Select
                  label="Category *"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as PortfolioItem['category'] })}
                  options={categoryOptions}
                  required
                />
              </div>

              <Input
                label="Tags (comma-separated) *"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                error={errors.tags}
                placeholder="e.g., Bridal, Traditional, HD Makeup"
                required
              />

              <Textarea
                label="Caption *"
                rows={3}
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                error={errors.caption}
                required
              />

              {/* Media Type Selection */}
              <div>
                <label className="block text-sm font-medium text-deep-plum mb-2">
                  Media Type *
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mediaType: 'image', mediaUrl: '' })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${formData.mediaType === 'image'
                      ? 'border-rose-accent bg-soft-blush'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <ImageIcon size={20} />
                    Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mediaType: 'video', mediaUrl: '' })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${formData.mediaType === 'video'
                      ? 'border-rose-accent bg-soft-blush'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <Video size={20} />
                    Video
                  </button>
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-sm font-medium text-deep-plum mb-2">
                  {formData.mediaType === 'image' ? 'Image' : 'Video'} *
                </label>
                <div className="space-y-4">
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Upload {formData.mediaType === 'image' ? 'Image' : 'Video'} File:
                    </label>
                    <input
                      ref={formData.mediaType === 'image' ? fileInputRef : videoInputRef}
                      type="file"
                      accept={formData.mediaType === 'image' ? 'image/*' : 'video/*'}
                      onChange={(e) => handleFileChange(e, formData.mediaType)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-accent file:text-white hover:file:bg-rose-600"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max size: {formData.mediaType === 'image' ? '5MB' : '50MB'}
                    </p>
                  </div>

                  {/* OR URL Input */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>

                  <Input
                    label={`Enter ${formData.mediaType === 'image' ? 'Image' : 'Video'} URL`}
                    type="url"
                    value={formData.mediaUrl.startsWith('data:') ? '' : formData.mediaUrl}
                    onChange={(e) => handleUrlInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Preview */}
                {formData.mediaUrl && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-deep-plum mb-2">Preview:</label>
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                      {formData.mediaType === 'image' ? (
                        <div className="relative w-full h-full">
                          <img
                            src={formData.mediaUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const container = target.parentElement?.parentElement;
                              if (container) {
                                container.innerHTML = `
                                  <div class="flex flex-col items-center justify-center p-6 text-center">
                                    <div class="text-red-500 mb-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                    </div>
                                    <p class="text-sm font-semibold text-gray-800">Preview Failed</p>
                                    <p class="text-xs text-gray-500 mt-1">This URL is not a direct image link or is blocked by security.</p>
                                    <div class="mt-4 p-2 bg-rose-50 rounded text-[10px] text-rose-800 text-left">
                                      <strong>Note:</strong> Shared links (Google Photos, Drive, etc.) are pages, not images. 
                                      Please <strong>Upload the File</strong> instead for best results.
                                    </div>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <video
                          src={formData.mediaUrl}
                          controls
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}

                {errors.mediaUrl && <p className="mt-1 text-sm text-red-500">{errors.mediaUrl}</p>}
              </div>

              <div className="flex gap-4">
                <Button type="submit" size="lg">
                  {editingItem ? 'Update Item' : 'Add Item'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Portfolio Items Grid */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-deep-plum mb-4">
            Portfolio Items ({items.length})
          </h2>

          {items.length === 0 ? (
            <Card>
              <p className="text-gray-600 text-center py-8">No portfolio items yet. Add your first item above!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {items
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((item) => (
                  <Card key={item.id} hover className="p-0 overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      {item.mediaType === 'image' ? (
                        <img
                          src={item.mediaUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={item.mediaUrl}
                          className="w-full h-full object-cover"
                          muted
                        />
                      )}
                      <div className="absolute top-3 right-3 flex gap-2 z-30">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(item);
                          }}
                          className="p-2.5 bg-white/90 text-rose-accent rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 border border-rose-100"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className="p-2.5 bg-white/90 text-red-500 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 border border-red-100"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="absolute top-2 left-2 flex gap-2 flex-wrap">
                        {item.tags.map((tag, i) => (
                          <Tag key={i}>{tag}</Tag>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-deep-plum">{item.title}</h3>
                        <span className="text-xs text-gray-500 bg-soft-blush px-2 py-1 rounded">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{item.caption}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

