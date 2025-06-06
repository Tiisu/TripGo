import React, { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";
import { toast } from "react-toastify";

const TourManagement = () => {
  const { apiCall } = useAdmin();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    distance: "",
    price: "",
    maxGroupSize: "",
    desc: "",
    availableDates: "",
    featured: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    const result = await apiCall("/api/tours");
    if (result.success) {
      setTours(result.tours);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.city || !formData.distance || !formData.price || !formData.maxGroupSize || !formData.desc) {
      toast.error("Please fill in all required fields");
      return;
    }

    // For new tours, image is required
    if (!editingTour && !selectedImage) {
      toast.error("Please select an image for the tour");
      return;
    }

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('distance', formData.distance);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('maxGroupSize', formData.maxGroupSize);
    formDataToSend.append('desc', formData.desc);
    formDataToSend.append('featured', formData.featured);

    // Handle available dates
    const availableDatesArray = formData.availableDates.split(",").map(date => date.trim()).filter(date => date);
    formDataToSend.append('availableDates', JSON.stringify(availableDatesArray));

    // Add image if selected
    if (selectedImage) {
      formDataToSend.append('photo', selectedImage);
    }

    let result;
    if (editingTour) {
      result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tours/${editingTour._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formDataToSend
      });
    } else {
      result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tours`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formDataToSend
      });
    }

    const data = await result.json();

    if (data.success) {
      toast.success(editingTour ? "Tour updated successfully!" : "Tour created successfully!");
      setShowModal(false);
      setEditingTour(null);
      resetForm();
      fetchTours();
    } else {
      toast.error(data.message || "Operation failed");
    }
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      city: tour.city,
      distance: tour.distance.toString(),
      price: tour.price.toString(),
      maxGroupSize: tour.maxGroupSize.toString(),
      desc: tour.desc,
      availableDates: tour.availableDates.join(", "),
      featured: tour.featured,
    });
    setSelectedImage(null);
    setImagePreview(tour.photo ? (tour.photo.startsWith('http') ? tour.photo : `${import.meta.env.VITE_BACKEND_URL}${tour.photo}`) : null);
    setShowModal(true);
  };

  const handleDelete = async (tourId) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      const result = await apiCall(`/api/tours/${tourId}`, {
        method: "DELETE"
      });

      if (result.success) {
        toast.success("Tour deleted successfully!");
        fetchTours();
      } else {
        toast.error(result.message || "Delete failed");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      city: "",
      distance: "",
      price: "",
      maxGroupSize: "",
      desc: "",
      availableDates: "",
      featured: false,
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const openAddModal = () => {
    setEditingTour(null);
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading tours...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tour Management</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add New Tour
        </button>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={tour.photo ? (tour.photo.startsWith('http') ? tour.photo : `${import.meta.env.VITE_BACKEND_URL}${tour.photo}`) : "/api/placeholder/400/300"}
              alt={tour.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "/api/placeholder/400/300";
              }}
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{tour.title}</h3>
                {tour.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-2">{tour.city}</p>
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{tour.desc}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-blue-600">₹{tour.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">Max {tour.maxGroupSize} people</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(tour)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tour._id)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingTour ? "Edit Tour" : "Add New Tour"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distance (km) *
                  </label>
                  <input
                    type="number"
                    name="distance"
                    value={formData.distance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Group Size *
                  </label>
                  <input
                    type="number"
                    name="maxGroupSize"
                    value={formData.maxGroupSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tour Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!editingTour}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-24 object-cover rounded-md border"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Dates (comma separated)
                </label>
                <input
                  type="text"
                  name="availableDates"
                  value={formData.availableDates}
                  onChange={handleInputChange}
                  placeholder="5-1-2025, 2-1-2025, 7-2-2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Featured Tour
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  {editingTour ? "Update Tour" : "Create Tour"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourManagement;
