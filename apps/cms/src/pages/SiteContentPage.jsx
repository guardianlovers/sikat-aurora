import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from "@sikat-aurora/shared";
import {
  Image as ImageIcon,
  BookOpen,
  Video,
  HelpCircle,
  Link as LinkIcon,
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Save,
  Loader2,
  MoreVertical,
  X,
  Sparkles,
  Home,
  Info,
  ExternalLink,
  Play,
  GripVertical,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";

export default function SiteContentPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  // Page parameter: 'home', 'about', 'programs'
  const activePage = searchParams.get("page") || "home";

  // Kebab & Modal state
  const [activeKebabId, setActiveKebabId] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteCategory, setDeleteCategory] = useState("");

  // Universal Modal Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'program', 'faq', 'partner', 'testimonial'

  // ---------------------------------------------------------------------------
  // 1. HERO SLIDES & VIDEO (Home Page)
  // ---------------------------------------------------------------------------
  const [heroSlides, setHeroSlides] = useState([]);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [savingVideo, setSavingVideo] = useState(false);

  // ---------------------------------------------------------------------------
  // 2. PROGRAMS & PARTNERS (Programs Page)
  // ---------------------------------------------------------------------------
  const [programs, setPrograms] = useState([]);
  const [editingProgram, setEditingProgram] = useState(null);
  const [programForm, setProgramForm] = useState({ name: "", short_name: "", desc: "", center: "", duration: "" });

  const [partners, setPartners] = useState([]);
  const [editingPartner, setEditingPartner] = useState(null);
  const [partnerForm, setPartnerForm] = useState({ name: "", url: "", location: "" });

  // ---------------------------------------------------------------------------
  // 3. FAQ & TESTIMONIALS (About Page)
  // ---------------------------------------------------------------------------
  const [faqs, setFaqs] = useState([]);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "" });

  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({ quote: "", name: "", designation: "", photo_url: "" });

  useEffect(() => {
    fetchAllContent();
  }, []);

  async function fetchAllContent() {
    if (!supabase) return;
    fetchHeroSlides();
    fetchVideoSetting();
    fetchPrograms();
    fetchPartners();
    fetchFaqs();
    fetchTestimonials();
  }

  const [previewHeroIndex, setPreviewHeroIndex] = useState(0);
  const [draggedSlideIdx, setDraggedSlideIdx] = useState(null);

  // ------------------------------- Hero ----------------------------------
  async function fetchHeroSlides() {
    const { data } = await supabase.from("hero_slides").select("*").order("sort_order", { ascending: true });
    setHeroSlides(data || []);
  }

  async function moveHeroSlide(fromIdx, toIdx) {
    if (toIdx < 0 || toIdx >= heroSlides.length || fromIdx === toIdx) return;
    const updated = [...heroSlides];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);

    const reordered = updated.map((slide, idx) => ({ ...slide, sort_order: idx + 1 }));
    setHeroSlides(reordered);

    try {
      for (const item of reordered) {
        await supabase.from("hero_slides").update({ sort_order: item.sort_order }).eq("id", item.id);
      }
      toast.success("Slide position updated!");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleHeroUpload(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (heroSlides.length + files.length > 10) {
      toast.error(`Hero banner allows max 10 photos. You currently have ${heroSlides.length}.`);
      return;
    }

    setUploadingHero(true);
    for (const file of files) {
      try {
        const filePath = `hero/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const { error: uploadErr } = await supabase.storage.from("blog-media").upload(filePath, file, { upsert: true });
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage.from("blog-media").getPublicUrl(filePath);

        await supabase.from("hero_slides").insert({
          image_url: urlData?.publicUrl || filePath,
          sort_order: heroSlides.length + 1,
        });
      } catch (err) {
        toast.error(err.message);
      }
    }
    setUploadingHero(false);
    toast.success("Hero slide(s) uploaded!");
    fetchHeroSlides();
  }

  // ------------------------------- Video ---------------------------------
  async function fetchVideoSetting() {
    const { data } = await supabase.from("site_settings").select("value").eq("key", "volunteer_video_url").single();
    if (data?.value) setVideoUrl(data.value);
  }

  async function handleSaveVideo(e) {
    e.preventDefault();
    setSavingVideo(true);
    try {
      await supabase.from("site_settings").upsert({ key: "volunteer_video_url", value: videoUrl.trim() });
      toast.success("Volunteer action video link saved!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingVideo(false);
    }
  }

  // ------------------------------- Programs ------------------------------
  async function fetchPrograms() {
    const { data } = await supabase.from("programs").select("*").order("sort_order", { ascending: true });
    setPrograms(data || []);
  }

  function openProgramModal(p = null) {
    setEditingProgram(p);
    setProgramForm(p ? { name: p.name, short_name: p.short_name || "", desc: p.desc || "", center: p.center || "", duration: p.duration || "" } : { name: "", short_name: "", desc: "", center: "", duration: "" });
    setModalType("program");
    setModalOpen(true);
  }

  async function handleSaveProgram(e) {
    e.preventDefault();
    if (!programForm.name.trim()) return;
    try {
      const payload = {
        name: programForm.name.trim(),
        short_name: programForm.short_name.trim() || programForm.name.trim(),
        desc: programForm.desc.trim(),
        center: programForm.center.trim(),
        duration: programForm.duration.trim(),
      };
      if (editingProgram?.id) {
        await supabase.from("programs").update(payload).eq("id", editingProgram.id);
        toast.success("Program updated successfully!");
      } else {
        await supabase.from("programs").insert({ ...payload, sort_order: programs.length + 1 });
        toast.success("New core program added!");
      }
      setModalOpen(false);
      fetchPrograms();
    } catch (err) {
      toast.error(err.message);
    }
  }

  // ------------------------------- Partners ------------------------------
  async function fetchPartners() {
    const { data } = await supabase.from("partner_communities").select("*").order("sort_order", { ascending: true });
    setPartners(data || []);
  }

  function openPartnerModal(p = null) {
    setEditingPartner(p);
    setPartnerForm(p ? { name: p.name, url: p.url || "", location: p.location || "" } : { name: "", url: "", location: "" });
    setModalType("partner");
    setModalOpen(true);
  }

  async function handleSavePartner(e) {
    e.preventDefault();
    if (!partnerForm.name.trim()) return;
    try {
      const payload = { name: partnerForm.name.trim(), url: partnerForm.url.trim() || null, location: partnerForm.location.trim() || null };
      if (editingPartner?.id) {
        await supabase.from("partner_communities").update(payload).eq("id", editingPartner.id);
        toast.success("Partner community updated!");
      } else {
        await supabase.from("partner_communities").insert({ ...payload, sort_order: partners.length + 1 });
        toast.success("Partner community added!");
      }
      setModalOpen(false);
      fetchPartners();
    } catch (err) {
      toast.error(err.message);
    }
  }

  // ------------------------------- FAQ -----------------------------------
  async function fetchFaqs() {
    const { data } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
    setFaqs(data || []);
  }

  function openFaqModal(f = null) {
    setEditingFaq(f);
    setFaqForm(f ? { question: f.question, answer: f.answer } : { question: "", answer: "" });
    setModalType("faq");
    setModalOpen(true);
  }

  async function handleSaveFaq(e) {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;
    try {
      if (editingFaq?.id) {
        await supabase.from("faqs").update({ question: faqForm.question.trim(), answer: faqForm.answer.trim() }).eq("id", editingFaq.id);
        toast.success("FAQ question updated!");
      } else {
        await supabase.from("faqs").insert({ question: faqForm.question.trim(), answer: faqForm.answer.trim(), sort_order: faqs.length + 1 });
        toast.success("New FAQ question added!");
      }
      setModalOpen(false);
      fetchFaqs();
    } catch (err) {
      toast.error(err.message);
    }
  }

  // ------------------------------- Testimonials --------------------------
  async function fetchTestimonials() {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
    setTestimonials(data || []);
  }

  function openTestimonialModal(t = null) {
    setEditingTestimonial(t);
    setTestimonialForm(t ? { quote: t.quote, name: t.name, designation: t.designation || "", photo_url: t.photo_url || "" } : { quote: "", name: "", designation: "", photo_url: "" });
    setModalType("testimonial");
    setModalOpen(true);
  }

  async function handleSaveTestimonial(e) {
    e.preventDefault();
    if (!testimonialForm.name.trim() || !testimonialForm.quote.trim()) return;
    try {
      const payload = {
        name: testimonialForm.name.trim(),
        quote: testimonialForm.quote.trim(),
        designation: testimonialForm.designation.trim() || "Volunteer",
        photo_url: testimonialForm.photo_url || null,
      };
      if (editingTestimonial?.id) {
        await supabase.from("testimonials").update(payload).eq("id", editingTestimonial.id);
        toast.success("Volunteer voice updated!");
      } else {
        await supabase.from("testimonials").insert({ ...payload, sort_order: testimonials.length + 1 });
        toast.success("Volunteer voice added!");
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      toast.error(err.message);
    }
  }

  // Delete Prompt
  function promptDeleteItem(item, cat) {
    setItemToDelete(item);
    setDeleteCategory(cat);
    setConfirmModalOpen(true);
  }

  async function confirmDelete() {
    if (!itemToDelete) return;
    try {
      if (deleteCategory === "hero") {
        await supabase.from("hero_slides").delete().eq("id", itemToDelete.id);
        fetchHeroSlides();
      } else if (deleteCategory === "program") {
        await supabase.from("programs").delete().eq("id", itemToDelete.id);
        fetchPrograms();
      } else if (deleteCategory === "faq") {
        await supabase.from("faqs").delete().eq("id", itemToDelete.id);
        fetchFaqs();
      } else if (deleteCategory === "partner") {
        await supabase.from("partner_communities").delete().eq("id", itemToDelete.id);
        fetchPartners();
      } else if (deleteCategory === "testimonial") {
        await supabase.from("testimonials").delete().eq("id", itemToDelete.id);
        fetchTestimonials();
      }
      toast.success("Item removed successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setConfirmModalOpen(false);
      setItemToDelete(null);
    }
  }

  // Section sub-tabs
  const [homeSectionTab, setHomeSectionTab] = useState("hero"); // 'hero' | 'video'
  const [aboutSectionTab, setAboutSectionTab] = useState("faq"); // 'faq' | 'testimonials'
  const [programSectionTab, setProgramSectionTab] = useState("programs"); // 'programs' | 'partners'

  const pageTitles = {
    home: { title: "Home Page Content", desc: "Edit hero carousel slides and volunteer video link." },
    about: { title: "About Page Content", desc: "Edit FAQ accordion questions and volunteer voice quotes." },
    programs: { title: "Programs Page Content", desc: "Edit core community programs and partner links." },
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
          {/* ─────────────────── PAGE 1: HOME PAGE EDITOR ─────────────────── */}
          {activePage === "home" && (
            <div className="space-y-6">
              {/* Home Sub-section Tabs */}
              <div className="inline-flex gap-1.5 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xs">
                <button
                  onClick={() => setHomeSectionTab("hero")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                    homeSectionTab === "hero" ? "bg-navy text-white shadow-xs" : "text-gray-600 hover:bg-gray-100 hover:text-navy"
                  }`}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>Hero Carousel Banner ({heroSlides.length}/10)</span>
                </button>
                <button
                  onClick={() => setHomeSectionTab("video")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                    homeSectionTab === "video" ? "bg-navy text-white shadow-xs" : "text-gray-600 hover:bg-gray-100 hover:text-navy"
                  }`}
                >
                  <Video className="h-4 w-4" />
                  <span>Volunteer Action Video</span>
                </button>
              </div>

              {/* Sub-section 1: Hero Banner */}
              {homeSectionTab === "hero" && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
                  {/* Header & Upload Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-base font-medium text-navy flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-primary" /> Hero Carousel Banner ({heroSlides.length} / 10 Photos)
                      </h2>
                      <p className="text-xs text-gray-500">Upload background photos, drag or shift position to re-order, or delete slides.</p>
                    </div>

                    <label className={`inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark transition-all ${heroSlides.length >= 10 ? "opacity-50 pointer-events-none" : ""}`}>
                      {uploadingHero ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      <span>Upload Slide Photo</span>
                      <input type="file" accept="image/*" multiple onChange={handleHeroUpload} disabled={uploadingHero || heroSlides.length >= 10} className="hidden" />
                    </label>
                  </div>

                  {/* Inline Live Carousel Preview Box */}
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 h-56 sm:h-64 shadow-inner flex items-center justify-center">
                    {heroSlides.length > 0 ? (
                      <>
                        <img
                          src={heroSlides[previewHeroIndex % heroSlides.length]?.image_url}
                          alt="Hero Live Preview"
                          className="absolute inset-0 h-full w-full object-cover opacity-85 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="relative z-10 text-center p-4 text-white space-y-1">
                          <span className="inline-block rounded-full bg-primary/90 px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider">
                            Live Slideshow Preview
                          </span>
                          <h3 className="text-sm font-semibold">Slide #{ (previewHeroIndex % heroSlides.length) + 1 } of {heroSlides.length}</h3>
                          <p className="text-[0.7rem] text-slate-300">Drag items below to re-order slideshow sequence</p>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                          onClick={() => setPreviewHeroIndex((prev) => (prev > 0 ? prev - 1 : heroSlides.length - 1))}
                          className="absolute left-3 z-10 rounded-full bg-black/40 p-2 text-white hover:bg-black/70 backdrop-blur-xs transition-all"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setPreviewHeroIndex((prev) => (prev + 1) % heroSlides.length)}
                          className="absolute right-3 z-10 rounded-full bg-black/40 p-2 text-white hover:bg-black/70 backdrop-blur-xs transition-all"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>

                        {/* Slide Indicators */}
                        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                          {heroSlides.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setPreviewHeroIndex(i)}
                              className={`h-2 rounded-full transition-all ${i === (previewHeroIndex % heroSlides.length) ? "w-6 bg-primary" : "w-2 bg-white/60"}`}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="py-12 text-center text-slate-400 space-y-1">
                        <ImageIcon className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                        <p className="text-xs font-semibold text-slate-300">No Hero Photos Uploaded Yet</p>
                        <p className="text-[0.7rem] text-slate-500">Upload your first photo above to view live hero slideshow preview.</p>
                      </div>
                    )}
                  </div>

                  {/* Uploaded Photos Grid with Drag & Position Controls */}
                  {heroSlides.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                        <span>Uploaded Hero Photos ({heroSlides.length}) — Drag cards or use arrows to change position</span>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                        {heroSlides.map((slide, idx) => (
                          <div
                            key={slide.id}
                            draggable="true"
                            onDragStart={() => setDraggedSlideIdx(idx)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              if (draggedSlideIdx !== null) {
                                moveHeroSlide(draggedSlideIdx, idx);
                                setDraggedSlideIdx(null);
                              }
                            }}
                            className={`group relative flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2.5 shadow-2xs transition-all hover:border-gray-300 hover:shadow-xs ${
                              draggedSlideIdx === idx ? "opacity-40 border-primary border-dashed" : ""
                            }`}
                          >
                            <div className="cursor-grab text-gray-400 hover:text-gray-600">
                              <GripVertical className="h-4 w-4" />
                            </div>

                            <img src={slide.image_url} alt="" className="h-14 w-20 rounded-lg object-cover border border-gray-100 shrink-0" />

                            <div className="min-w-0 flex-1">
                              <span className="inline-block rounded-md bg-navy/10 px-2 py-0.5 text-[0.65rem] font-semibold text-navy">
                                Slide #{idx + 1}
                              </span>

                              {/* Action Buttons: Move Left/Right & Delete */}
                              <div className="mt-2 flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => moveHeroSlide(idx, idx - 1)}
                                  disabled={idx === 0}
                                  title="Move Left"
                                  className="rounded-md border border-gray-200 p-1 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                >
                                  <ArrowLeft className="h-3 w-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveHeroSlide(idx, idx + 1)}
                                  disabled={idx === heroSlides.length - 1}
                                  title="Move Right"
                                  className="rounded-md border border-gray-200 p-1 text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                                >
                                  <ArrowRight className="h-3 me-3 w-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => promptDeleteItem(slide, "hero")}
                                  title="Delete Slide"
                                  className="ml-auto rounded-md border border-red-100 bg-red-50/50 p-1 text-red-600 hover:bg-red-100"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sub-section 2: Volunteer Action Video */}
              {homeSectionTab === "video" && (
                <form onSubmit={handleSaveVideo} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-base font-medium text-navy flex items-center gap-2">
                        <Video className="h-4 w-4 text-primary" /> Volunteer Action Video Link
                      </h2>
                      <p className="text-xs text-gray-500">Paste your YouTube video embed URL, Vimeo link, or direct MP4 video URL.</p>
                    </div>

                    <button
                      type="submit"
                      disabled={savingVideo}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark transition-all"
                    >
                      {savingVideo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>Save Video Link</span>
                    </button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-[1fr_320px]">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-700">Video Embed URL</label>
                        <input
                          type="url"
                          required
                          placeholder="e.g. https://www.youtube.com/embed/dQw4w9WgXcQ"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[0.7rem] text-gray-400">Supported formats: YouTube embeds (`/embed/...`), Vimeo, or direct `.mp4` URLs.</span>
                        <button
                          type="submit"
                          disabled={savingVideo}
                          className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-xs font-medium text-white hover:bg-navy-deep transition-all"
                        >
                          {savingVideo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>

                    {/* Video Live Preview Box */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-700">Live Video Preview</label>
                      <div className="overflow-hidden rounded-xl border border-gray-200 bg-slate-900 p-1 flex items-center justify-center min-h-[160px] shadow-inner">
                        {videoUrl ? (
                          videoUrl.includes("youtube.com") || videoUrl.includes("vimeo.com") ? (
                            <iframe src={videoUrl} title="Video Preview" className="h-36 w-full rounded-lg" allowFullScreen />
                          ) : (
                            <a href={videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-white underline">
                              <Play className="h-4 w-4 text-primary" /> Open Video Preview
                            </a>
                          )
                        ) : (
                          <div className="text-center p-4 text-slate-400 text-xs">
                            <Video className="mx-auto h-7 w-7 mb-1.5 text-slate-500" />
                            <span>No video URL saved yet</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ─────────────────── PAGE 2: ABOUT PAGE EDITOR ─────────────────── */}
          {activePage === "about" && (
            <div className="space-y-6">
              {/* About Sub-section Tabs */}
              <div className="inline-flex gap-1.5 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xs">
                <button
                  onClick={() => setAboutSectionTab("faq")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                    aboutSectionTab === "faq" ? "bg-navy text-white shadow-xs" : "text-gray-600 hover:bg-gray-100 hover:text-navy"
                  }`}
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Frequently Asked Questions ({faqs.length})</span>
                </button>
                <button
                  onClick={() => setAboutSectionTab("testimonials")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                    aboutSectionTab === "testimonials" ? "bg-navy text-white shadow-xs" : "text-gray-600 hover:bg-gray-100 hover:text-navy"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Volunteer Voices ({testimonials.length})</span>
                </button>
              </div>

              {/* Sub-section 1: FAQs */}
              {aboutSectionTab === "faq" && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h2 className="text-base font-medium text-navy flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary" /> Frequently Asked Questions ({faqs.length})
                      </h2>
                      <p className="text-xs text-gray-500">Manage Q&amp;A accordion items displayed on the About page.</p>
                    </div>
                    <button onClick={() => openFaqModal(null)} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark">
                      <Plus className="h-4 w-4" /> Add FAQ
                    </button>
                  </div>

                  <div className="space-y-3">
                    {faqs.map((f) => (
                      <div key={f.id} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-xs">Q: {f.question}</h4>
                          <p className="mt-1 text-xs leading-relaxed text-gray-600">A: {f.answer}</p>
                        </div>
                        <div className="relative inline-block text-left shrink-0">
                          <button onClick={() => setActiveKebabId(activeKebabId === f.id ? null : f.id)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-200">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {activeKebabId === f.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setActiveKebabId(null)} />
                              <div className="absolute right-0 z-20 mt-1 w-32 rounded-xl border border-gray-200 bg-white py-1 shadow-lg text-xs font-medium">
                                <button onClick={() => { setActiveKebabId(null); openFaqModal(f); }} className="flex w-full items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50"><Edit2 className="h-3.5 w-3.5" /> Edit</button>
                                <button onClick={() => { setActiveKebabId(null); promptDeleteItem(f, "faq"); }} className="flex w-full items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-section 2: Volunteer Voices */}
              {aboutSectionTab === "testimonials" && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h2 className="text-base font-medium text-navy flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" /> Volunteer Voices / Testimonials ({testimonials.length})
                      </h2>
                      <p className="text-xs text-gray-500">Manage volunteer quotes and testimonial cards.</p>
                    </div>
                    <button onClick={() => openTestimonialModal(null)} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark">
                      <Plus className="h-4 w-4" /> Add Volunteer Voice
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {testimonials.map((t) => (
                      <div key={t.id} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 flex justify-between items-start">
                        <div>
                          <p className="text-xs italic text-gray-700">"{t.quote}"</p>
                          <p className="mt-2 text-xs font-semibold text-gray-900">{t.name} <span className="font-normal text-gray-500">— {t.designation}</span></p>
                        </div>
                        <div className="relative inline-block text-left shrink-0">
                          <button onClick={() => setActiveKebabId(activeKebabId === t.id ? null : t.id)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-200">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {activeKebabId === t.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setActiveKebabId(null)} />
                              <div className="absolute right-0 z-20 mt-1 w-32 rounded-xl border border-gray-200 bg-white py-1 shadow-lg text-xs font-medium">
                                <button onClick={() => { setActiveKebabId(null); openTestimonialModal(t); }} className="flex w-full items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50"><Edit2 className="h-3.5 w-3.5" /> Edit</button>
                                <button onClick={() => { setActiveKebabId(null); promptDeleteItem(t, "testimonial"); }} className="flex w-full items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─────────────────── PAGE 3: PROGRAMS PAGE EDITOR ─────────────────── */}
          {activePage === "programs" && (
            <div className="space-y-6">
              {/* Programs Sub-section Tabs */}
              <div className="inline-flex gap-1.5 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xs">
                <button
                  onClick={() => setProgramSectionTab("programs")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                    programSectionTab === "programs" ? "bg-navy text-white shadow-xs" : "text-gray-600 hover:bg-gray-100 hover:text-navy"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Core Programs ({programs.length})</span>
                </button>
                <button
                  onClick={() => setProgramSectionTab("partners")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                    programSectionTab === "partners" ? "bg-navy text-white shadow-xs" : "text-gray-600 hover:bg-gray-100 hover:text-navy"
                  }`}
                >
                  <LinkIcon className="h-4 w-4" />
                  <span>Partner Communities ({partners.length})</span>
                </button>
              </div>

              {/* Sub-section 1: Core Programs */}
              {programSectionTab === "programs" && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h2 className="text-base font-medium text-navy flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" /> Core Programs ({programs.length})
                      </h2>
                      <p className="text-xs text-gray-500">Manage program descriptions, participation centers, and durations.</p>
                    </div>
                    <button onClick={() => openProgramModal(null)} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark">
                      <Plus className="h-4 w-4" /> Add Program
                    </button>
                  </div>

                  <div className="space-y-3">
                    {programs.map((p) => (
                      <div key={p.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-xs">{p.name} ({p.short_name})</h4>
                          <p className="text-xs text-gray-500 line-clamp-1">{p.desc}</p>
                        </div>
                        <div className="relative inline-block text-left">
                          <button onClick={() => setActiveKebabId(activeKebabId === p.id ? null : p.id)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-200">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {activeKebabId === p.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setActiveKebabId(null)} />
                              <div className="absolute right-0 z-20 mt-1 w-32 rounded-xl border border-gray-200 bg-white py-1 shadow-lg text-xs font-medium">
                                <button onClick={() => { setActiveKebabId(null); openProgramModal(p); }} className="flex w-full items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50"><Edit2 className="h-3.5 w-3.5" /> Edit</button>
                                <button onClick={() => { setActiveKebabId(null); promptDeleteItem(p, "program"); }} className="flex w-full items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-section 2: Partner Communities */}
              {programSectionTab === "partners" && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h2 className="text-base font-medium text-navy flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-primary" /> Partner Communities &amp; Links ({partners.length})
                      </h2>
                      <p className="text-xs text-gray-500">Manage partner community badges and links.</p>
                    </div>
                    <button onClick={() => openPartnerModal(null)} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark">
                      <Plus className="h-4 w-4" /> Add Partner Link
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {partners.map((p) => (
                      <div key={p.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/60 p-3.5">
                        <div>
                          <p className="font-semibold text-xs text-gray-900">{p.name}</p>
                          {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="text-[0.7rem] text-primary truncate block">{p.url}</a>}
                        </div>
                        <div className="relative inline-block text-left shrink-0">
                          <button onClick={() => setActiveKebabId(activeKebabId === p.id ? null : p.id)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-200">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {activeKebabId === p.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setActiveKebabId(null)} />
                              <div className="absolute right-0 z-20 mt-1 w-32 rounded-xl border border-gray-200 bg-white py-1 shadow-lg text-xs font-medium">
                                <button onClick={() => { setActiveKebabId(null); openPartnerModal(p); }} className="flex w-full items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50"><Edit2 className="h-3.5 w-3.5" /> Edit</button>
                                <button onClick={() => { setActiveKebabId(null); promptDeleteItem(p, "partner"); }} className="flex w-full items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

      {/* ─────────────────── POPUP MODAL DIALOG ─────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h2 className="text-base font-medium text-gray-900">
                  {modalType === "program" && (editingProgram ? "Edit Program" : "Add Core Program")}
                  {modalType === "faq" && (editingFaq ? "Edit FAQ Question" : "Add FAQ Question")}
                  {modalType === "partner" && (editingPartner ? "Edit Partner Link" : "Add Partner Link")}
                  {modalType === "testimonial" && (editingTestimonial ? "Edit Volunteer Voice" : "Add Volunteer Voice")}
                </h2>
              </div>
              <button onClick={() => setModalOpen(false)} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            {modalType === "program" && (
              <form onSubmit={handleSaveProgram} className="p-5 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Program Name</label>
                  <input type="text" required placeholder="e.g. Abot Ko Ang Libro" value={programForm.name} onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Short Name / Code</label>
                  <input type="text" placeholder="e.g. ABKL" value={programForm.short_name} onChange={(e) => setProgramForm({ ...programForm, short_name: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Description</label>
                  <textarea rows={3} placeholder="Program overview & mission..." value={programForm.desc} onChange={(e) => setProgramForm({ ...programForm, desc: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Center of Participation</label>
                    <input type="text" placeholder="e.g. Baler, Aurora" value={programForm.center} onChange={(e) => setProgramForm({ ...programForm, center: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Duration</label>
                    <input type="text" placeholder="e.g. 5 Saturdays" value={programForm.duration} onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
                  <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white hover:bg-primary-dark">Save Program</button>
                </div>
              </form>
            )}

            {modalType === "faq" && (
              <form onSubmit={handleSaveFaq} className="p-5 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Question</label>
                  <input type="text" required placeholder="e.g. How can I volunteer?" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Answer</label>
                  <textarea rows={4} required placeholder="Detailed answer..." value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
                  <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white hover:bg-primary-dark">Save FAQ</button>
                </div>
              </form>
            )}

            {modalType === "partner" && (
              <form onSubmit={handleSavePartner} className="p-5 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Partner Community Name</label>
                  <input type="text" required placeholder="e.g. Brgy. Zabali, Baler" value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Website or Page Link (URL)</label>
                  <input type="url" placeholder="https://..." value={partnerForm.url} onChange={(e) => setPartnerForm({ ...partnerForm, url: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
                  <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white hover:bg-primary-dark">Save Partner</button>
                </div>
              </form>
            )}

            {modalType === "testimonial" && (
              <form onSubmit={handleSaveTestimonial} className="p-5 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Quote</label>
                  <textarea rows={3} required placeholder="Volunteer quote or story..." value={testimonialForm.quote} onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Volunteer Name</label>
                    <input type="text" required placeholder="e.g. Patricia Reyes" value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Designation / Role</label>
                    <input type="text" placeholder="e.g. Abot Ko Ang Libro Volunteer" value={testimonialForm.designation} onChange={(e) => setTestimonialForm({ ...testimonialForm, designation: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-primary" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
                  <button type="submit" className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white hover:bg-primary-dark">Save Voice</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        title="Remove Item?"
        message="Are you sure you want to remove this item from the website?"
        confirmLabel="Remove Item"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModalOpen(false)}
      />
    </div>
  );
}
