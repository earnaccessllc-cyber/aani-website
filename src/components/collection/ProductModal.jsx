import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ShoppingBag, Upload, Edit2, Check, Play, Trash2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ProductModal({ product: initialProduct, onClose, onUpdated, readOnly = false }) {
  const [product, setProduct] = useState(initialProduct);
  const [imgIndex, setImgIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: initialProduct.name || "",
    color: initialProduct.color || "",
    description: initialProduct.description || "",
    price: initialProduct.price || "",
    in_stock: initialProduct.in_stock !== false
  });

  useEffect(() => {
    base44.entities.Product.filter({ id: initialProduct.id }).then((results) => {
      if (results?.[0]) setProduct(results[0]);
    });
  }, [initialProduct.id]);
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [saving, setSaving] = useState(false);

  const images = product.images || [];
  const videoUrl = product.video_url || null;

  const prev = (e) => {e.stopPropagation();setImgIndex((i) => (i - 1 + images.length) % images.length);};
  const next = (e) => {e.stopPropagation();setImgIndex((i) => (i + 1) % images.length);};

  const handleUploadImages = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const urls = await Promise.all(files.map((file) => base44.integrations.Core.UploadFile({ file }).then((r) => r.file_url)));
    const newImages = [...(product.images || []), ...urls];
    await base44.entities.Product.update(product.id, { images: newImages });
    setUploading(false);
    setImgIndex(newImages.length - 1);
    onUpdated({ ...product, images: newImages });
  };

  const handleDeleteImage = async (e, idx) => {
    e.stopPropagation();
    const newImages = images.filter((_, i) => i !== idx);
    await base44.entities.Product.update(product.id, { images: newImages });
    setImgIndex(Math.min(imgIndex, newImages.length - 1));
    onUpdated({ ...product, images: newImages });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingVideo(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    await base44.entities.Product.update(product.id, { video_url: file_url });
    setUploadingVideo(false);
    onUpdated({ ...product, video_url: file_url });
  };

  const handleDeleteVideo = async () => {
    await base44.entities.Product.update(product.id, { video_url: null });
    onUpdated({ ...product, video_url: null });
  };

  const handleSave = async () => {
    setSaving(true);
    await base44.entities.Product.update(product.id, {
      ...form,
      price: form.price ? parseFloat(form.price) : null
    });
    setSaving(false);
    setEditing(false);
    onUpdated({ ...product, ...form, price: form.price ? parseFloat(form.price) : null });
  };

  return (
    <>
      {zoomed &&
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-md cursor-zoom-out"
        onClick={() => setZoomed(false)}>

          <button onClick={() => setZoomed(false)} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <img
          src={images[imgIndex]}
          alt={product.name}
          className="max-w-[90vw] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()} />

        </div>
      }

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" onClick={onClose}>
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 bg-card border border-border rounded-sm w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}>

          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/60 hover:bg-background transition-colors">
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 min-h-0 flex-1 overflow-y-auto md:overflow-hidden">
            {/* Media Panel */}
            <div className="flex flex-col bg-[#f5f3f0] md:overflow-y-auto">
              {/* Main image/video view */}
              <div className="relative aspect-square md:min-h-[500px] flex-shrink-0">
                {showVideo && videoUrl ?
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain p-4" /> :

                images.length > 0 ?
                <>
                    <img
                    src={images[imgIndex]}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 cursor-zoom-in"
                    onClick={() => setZoomed(true)} />

                    {images.length > 1 &&
                  <>
                        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                  }
                    {editing && !readOnly &&
                  <button
                    onClick={(e) => handleDeleteImage(e, imgIndex)}
                    className="absolute top-3 left-3 w-7 h-7 flex items-center justify-center rounded-full bg-destructive/80 hover:bg-destructive transition-colors">

                        <Trash2 className="w-3 h-3 text-white" />
                      </button>
                  }
                  </> :

                <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground opacity-30" />
                  </div>
                }
              </div>

              {/* Thumbnail strip */}
              {(images.length > 0 || videoUrl) &&
              <div className="flex gap-2 p-3 overflow-x-auto border-t border-border/30">
                  {images.map((img, i) =>
                <button
                  key={i}
                  onClick={() => {setImgIndex(i);setShowVideo(false);}}
                  className={`flex-shrink-0 w-14 h-14 rounded-sm overflow-hidden border-2 transition-colors ${i === imgIndex && !showVideo ? "border-foreground" : "border-transparent"}`}>

                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                )}
                  {videoUrl &&
                <button
                  onClick={() => setShowVideo(true)}
                  className={`flex-shrink-0 w-14 h-14 rounded-sm overflow-hidden border-2 transition-colors flex items-center justify-center bg-foreground/10 ${showVideo ? "border-foreground" : "border-transparent"}`}>

                      <Play className="w-5 h-5 text-foreground" />
                    </button>
                }
                </div>
              }

              {!readOnly &&
              <div className="flex gap-2 p-3 border-t border-border/30">
                  <label className="flex-1 cursor-pointer">
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleUploadImages} />
                    <div className="flex items-center justify-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-sm hover:bg-background transition-colors">
                      {uploading ?
                    <div className="w-3 h-3 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" /> :

                    <Upload className="w-3 h-3" />
                    }
                      <span className="font-sans text-xs">Add Photos</span>
                    </div>
                  </label>

                  {!videoUrl ?
                <label className="flex-1 cursor-pointer">
                      <input type="file" accept="video/mp4,video/*" className="hidden" onChange={handleUploadVideo} />
                      <div className="flex items-center justify-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-sm hover:bg-background transition-colors">
                        {uploadingVideo ?
                    <div className="w-3 h-3 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" /> :

                    <Play className="w-3 h-3" />
                    }
                        <span className="font-sans text-xs">Add Video</span>
                      </div>
                    </label> :

                <button
                  onClick={handleDeleteVideo}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-background/80 border border-border px-3 py-2 rounded-sm hover:bg-destructive/10 transition-colors">

                      <Trash2 className="w-3 h-3 text-destructive" />
                      <span className="font-sans text-xs text-destructive">Remove Video</span>
                    </button>
                }
                </div>
              }
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col md:overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  {editing ?
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="font-serif text-2xl font-light bg-transparent border-b border-border focus:outline-none focus:border-foreground w-full mb-1" /> :


                  <h2 className="font-serif text-2xl font-light text-foreground">{product.name}</h2>
                  }
                  {editing ?
                  <input
                    value={form.color}
                    onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                    placeholder="Color"
                    className="font-sans text-xs tracking-widest uppercase bg-transparent border-b border-border focus:outline-none focus:border-foreground w-full mt-1 text-muted-foreground" /> :


                  product.color && <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-1">{product.color}</p>
                  }
                </div>
                {!readOnly &&
                <button onClick={() => setEditing(!editing)} className="ml-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
                  <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                }
              </div>

              <div className="w-8 h-px bg-primary mb-6" />

              {/* Price */}
              <div className="mb-6">
                {editing ?
                <div className="flex items-center gap-2">
                    <span className="font-sans text-sm text-muted-foreground">$</span>
                    <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="Price"
                    className="font-sans text-2xl font-light bg-transparent border-b border-border focus:outline-none focus:border-foreground w-32" />

                  </div> :

                product.price && <p className="font-sans text-2xl font-light text-foreground">${Number(product.price).toLocaleString()}</p>
                }
              </div>

              {/* Description */}
              {editing ?
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Add a description..."
                rows={5}
                className="font-sans text-sm leading-relaxed text-muted-foreground bg-transparent border border-border rounded-sm p-3 focus:outline-none focus:border-foreground resize-none mb-6 flex-1" /> :


              <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-6 flex-1">
                  {product.description || <span className="opacity-40 italic">No description yet. Click edit to add one.</span>}
                </p>
              }

              {/* Stock toggle */}
              {editing &&
              <div className="flex items-center gap-3 mb-6">
                  <button
                  onClick={() => setForm((f) => ({ ...f, in_stock: !f.in_stock }))}
                  className={`w-10 h-5 rounded-full transition-colors ${form.in_stock ? "bg-primary" : "bg-muted"} relative`}>

                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.in_stock ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                  <span className="font-sans text-xs text-muted-foreground">{form.in_stock ? "In Stock" : "Sold Out"}</span>
                </div>
              }

              <div className="mt-auto space-y-3">
                {editing &&
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-sans text-xs tracking-widest uppercase py-3 hover:opacity-90 transition-opacity">

                    {saving ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    Save Changes
                  </button>
                }
                {!editing && product.in_stock !== false &&
                <button className="w-full flex items-center justify-center gap-2 bg-foreground text-background font-sans text-xs tracking-widest uppercase py-3 hover:opacity-90 transition-opacity">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Enquire to Purchase
                  </button>
                }
                {!editing && product.in_stock === false &&
                <div className="w-full text-center font-sans text-xs tracking-widest uppercase text-muted-foreground py-3 border border-border">
                    Sold Out
                  </div>
                }
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>);

}