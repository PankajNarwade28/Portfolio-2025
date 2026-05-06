import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Loading from "../LoadingEmpty/MyLoading";
import Empty from "../LoadingEmpty/MyEmpty";

const API_BASE = process.env.REACT_APP_API_URL;

export default function MyLinks() {
  const [links, setLinks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Dedicated state for image preview
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ✅ Fetch Links
  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/links`);
      setLinks(res.data);
    } catch (err) {
      toast.error("Failed to load links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // ✅ Handle Preview logic for local file selection
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Cleanup memory when component unmounts or file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // ✅ Start Editing
  const handleEdit = (link) => {
    setEditingId(link.id);
    setFormData({ ...link }); // Deep copy to ensure formData is fully populated
    setFile(null);
  };

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle File Selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // ✅ Submit Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let finalImageUrl = formData.logo_image_url;

      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("folder", "Link_Logos");

        const uploadRes = await axios.post(
          `${API_BASE}/api/upload/image`,
          uploadData,
        );
        finalImageUrl = uploadRes.data.url;
      }

      await axios.put(`${API_BASE}/api/links/${editingId}`, {
        display_text: formData.display_text,
        link_url: formData.link_url,
        logo_image_url: finalImageUrl,
      });

      toast.success("Link Updated Successfully ✅");
      setEditingId(null);
      setFile(null);
      fetchLinks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update link ❌");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loading message="Fetching Social Links..." />;
  if (links.length === 0)
    return <Empty message="No links found!" onRetry={fetchLinks} />;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-6 font-bold tracking-tight">
        Social & Contact Links
      </h2>

      <div className="grid gap-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-[#0b0f1a] rounded-xl border border-gray-800 overflow-hidden"
          >
            {editingId === link.id ? (
              <form
                onSubmit={handleSubmit}
                className="p-5 space-y-4 border-l-4 border-blue-500"
              >
                <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
                  <div className="relative w-16 h-16 bg-[#111827] rounded-lg flex items-center justify-center border border-gray-700 overflow-hidden">
                    {file ||
                    formData.logo_image_url ||
                    (formData.icon_path && formData.icon_path.includes("/")) ? (
                      <img
                        src={
                          previewUrl ||
                          formData.logo_image_url ||
                          formData.icon_path
                        }
                        alt="preview"
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/40";
                        }}
                      />
                    ) : (
                      // Render as text if it's an emoji
                      <span className="text-3xl">
                        {formData.icon_path || "🔗"}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Edit {link.platform}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Update display info and branding
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Change Logo Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full mt-1 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Display Name
                    </label>
                    <input
                      name="display_text"
                      value={formData.display_text || ""}
                      onChange={handleChange}
                      className="w-full mt-1 p-2.5 rounded-lg bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Link URL
                    </label>
                    <input
                      name="link_url"
                      value={formData.link_url || ""}
                      onChange={handleChange}
                      className="w-full mt-1 p-2.5 rounded-lg bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-bold disabled:opacity-50"
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 flex items-center justify-between group hover:bg-[#111827]/50 transition-colors">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-[#111827] rounded-xl flex items-center justify-center border border-gray-800 shadow-inner">
                    {link.logo_image_url ||
                    (link.icon_path && link.icon_path.includes("/")) ? (
                      <img
                        src={link.logo_image_url || link.icon_path}
                        alt={link.platform}
                        className="w-7 h-7 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/30";
                        }}
                      />
                    ) : (
                      // Fallback to the emoji stored in icon_path
                      <span className="text-xl">{link.icon_path || "🔗"}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-100">
                      {link.display_text}
                    </p>
                    <p className="text-sm text-gray-400 font-mono tracking-tighter truncate max-w-[150px] md:max-w-xs">
                      {link.link_url}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(link)}
                  className="px-4 py-2 rounded-lg bg-[#111827] border border-gray-700 text-sm font-semibold hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
