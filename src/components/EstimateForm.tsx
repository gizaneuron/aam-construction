import { useState } from "react";
import { supabase } from "../lib/supabase";

function convertTo24(time: string) {
  const [hourMin, period] = time.split(" ");
  let [hour, min] = hourMin.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return `${hour.toString().padStart(2, "0")}:${min}:00`;
}

export default function EstimateForm({ isOpen, onClose }: any) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [success, setSuccess] = useState(false);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const fetchBookedTimes = async (date: string) => {
  const { data, error } = await supabase
      .from("estimates")
      .select("preferred_time, preferred_date");
    console.log("DB RAW:", data);

    if (!error && data) {
      const filtered = data.filter((item) => {
        const dbDate = item.preferred_date;
        return dbDate === date;
      });

      console.log("FILTERED:", filtered);
      setBookedTimes(filtered.map((item) => item.preferred_time));
    }
  };

  const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isAvailableDay = (day: Date) => {
    const today = new Date();
    return day >= new Date(today.setHours(0,0,0,0));
  };

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    service: "",
    property_type: "",
    location: "",
    budget: "",
    timeline: "",
    message: "",
    preferred_date: "",
    preferred_time: "",
    contact_method: "",
    reference_images: [] as File[],
  });

  if (!isOpen) return null;

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canStep1 =
    formData.full_name && formData.email && formData.phone;

  const canStep2 =
    formData.service.trim() !== "" &&
    formData.property_type.trim() !== "" &&
    formData.location.trim() !== "" &&
    formData.budget.trim() !== "" &&
    formData.timeline.trim() !== "" &&
    formData.reference_images.length >= 1 &&
    formData.reference_images.length <= 5;
    
  const canStep3 =
    formData.preferred_date &&
    formData.preferred_time &&
    formData.contact_method;

  const handleSubmit = async () => {
    setLoading(true);
    const { data: existing, error: checkError } = await supabase
      .from("estimates")
      .select("*")
      .eq("preferred_date", formData.preferred_date)
      .eq("preferred_time", formData.preferred_time);

    if (checkError) {
      console.error("CHECK ERROR:", checkError);
    }

    if (existing && existing.length > 0) {
      alert("This time is already booked. Please choose another one.");
      setLoading(false);
      return;
    }

    let imageUrls: string[] = [];

    for (const file of formData.reference_images) {
      const formDataCloud = new FormData();
      formDataCloud.append("file", file);
      formDataCloud.append("upload_preset", "aam_unsigned_upload");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dzxicjtja/image/upload",
          {
            method: "POST",
            body: formDataCloud,
          }
        );

        const data = await res.json();

        if (data.secure_url) {
          imageUrls.push(data.secure_url);
        } else {
          console.error("CLOUDINARY ERROR:", data);
        }

      } catch (err) {
        console.error("UPLOAD ERROR:", err);
      }
    }
    const { data, error } = await supabase.from("estimates").insert([
  {
        ...formData,
        reference_images: imageUrls,
        status: "pending",
      },
    ]);

    if (error) {
      if (error.code === "23505") {
        alert("This time is already booked. Please choose another one.");
      } else {
        alert("Error saving data");
      }

      setLoading(false);
      return; // 🚨 ESTO ES LO IMPORTANTE
    }

    // 🔹 1. CREAR EVENTO EN CALENDAR
      await fetch("https://iguwadxsykrbfaxzaylj.supabase.co/functions/v1/create-calendar-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndXdhZHhzeWtyYmZheHpheWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjg4OTQsImV4cCI6MjA4NzgwNDg5NH0.ZdklIV1jAVe3VNtTHjRuHXcPyVwU0AsAEqBjeq1qOec"
        },
        body: JSON.stringify({
          title: formData.service,
          description: `
            Name: ${formData.full_name}
            Phone: ${formData.phone}
            Email: ${formData.email}
            Location: ${formData.location}
            Message: ${formData.message}
          `,
          start: `${formData.preferred_date}T${convertTo24(formData.preferred_time)}`,
          end: `${formData.preferred_date}T${convertTo24(formData.preferred_time)}`
        })
      });

      // 🔹 2. ENVIAR EMAIL
      await fetch("https://iguwadxsykrbfaxzaylj.supabase.co/functions/v1/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndXdhZHhzeWtyYmZheHpheWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjg4OTQsImV4cCI6MjA4NzgwNDg5NH0.ZdklIV1jAVe3VNtTHjRuHXcPyVwU0AsAEqBjeq1qOec"
        },
        body: JSON.stringify({
          ...formData,
          images: imageUrls // 👈 ESTE ES EL CAMBIO CLAVE
        })
      });

    if (error) {
      console.error("SUPABASE ERROR:", error);
      alert("Error saving data");
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
  };

  const timeSlots = [
    "8:00 AM",
    "9:30 AM",
    "11:00 AM",
    "12:30 PM",
    "2:00 PM",
    "3:30 PM",
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-4xl p-10 md:p-14 overflow-y-auto max-h-[90vh]">

        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-4 right-4">✕</button>

        {/* STEP INDICATOR */}
        <div className="flex gap-2 mb-8">
          {[1,2,3].map((s) => (
            <div key={s} className={`h-1 flex-1 ${step >= s ? "bg-black" : "bg-gray-200"}`} />
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <h2 className="col-span-1 md:col-span-2 text-3xl font-light text-[#1a1a1a] mb-4">
            Your Info
          </h2>

          {/* FULL NAME */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-2">Full Name</label>
            <input
              className="px-5 py-3 rounded-full border border-gray-300 focus:border-[#1a1a1a] outline-none"
              onChange={(e)=>updateField("full_name", e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-2">Email</label>
            <input
              className="px-5 py-3 rounded-full border border-gray-300 focus:border-[#1a1a1a] outline-none"
              onChange={(e)=>updateField("email", e.target.value)}
            />
          </div>

          {/* PHONE */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm text-gray-600 mb-2">Phone</label>
            <input
              className="px-5 py-3 rounded-full border border-gray-300 focus:border-[#1a1a1a] outline-none"
              onChange={(e)=>updateField("phone", e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={!canStep1}
            onClick={()=>setStep(2)}
            className={`md:col-span-2 mt-4 py-3 rounded-full text-sm tracking-[0.2em] uppercase transition-all
              ${canStep1
                ? "bg-[#1a1a1a] text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            Next
          </button>
        </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h2 className="col-span-1 md:col-span-2 text-3xl font-light text-[#1a1a1a] mb-4">
                Project Details
              </h2>

              {/* SERVICE */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Service</label>
                <select
                  className="px-5 py-3 rounded-full border border-gray-300"
                  onChange={(e)=>updateField("service", e.target.value)}
                >
                  <option value="">Select service</option>
                  <option value="kitchen-cabinets">Kitchen Cabinets</option>
                  <option value="bathroom-cabinets">Bathroom Cabinets</option>
                  <option value="outdoor-kitchen">Outdoor Kitchen</option>
                  <option value="pergolas">Pergolas</option>
                  <option value="backyard">Backyard Design</option>
                  <option value="pool-cage">Pool Cage</option>
                  <option value="carpenter-design">Carpenter Design</option>
                </select>
              </div>

              {/* PROPERTY */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Property Type</label>
                <select
                  className="px-5 py-3 rounded-full border border-gray-300"
                  onChange={(e)=>updateField("property_type", e.target.value)}
                >
                  <option value="">Select property type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              {/* LOCATION */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Location</label>
                <input
                  className="px-5 py-3 rounded-full border border-gray-300"
                  onChange={(e)=>updateField("location", e.target.value)}
                />
              </div>

              {/* BUDGET */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Budget</label>
                     <select
                      className="px-5 py-3 rounded-full border border-gray-300"
                      onChange={(e)=>updateField("budget", e.target.value)}
                    >
                      <option value="">Select budget</option>
                      <option value="10k-25k">$10k - $25k</option>
                      <option value="25k-50k">$25k - $50k</option>
                      <option value="50k-100k">$50k - $100k</option>
                      <option value="100k+">$100k+</option>
                    </select>
              </div>

              {/* TIMELINE */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm text-gray-600 mb-2">Timeline</label>
                <select
                  className="px-5 py-3 rounded-full border border-gray-300"
                  onChange={(e)=>updateField("timeline", e.target.value)}
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1-3 months">1–3 Months</option>
                  <option value="3-6 months">3–6 Months</option>
                  <option value="6+ months">6+ Months</option>
                </select>
              </div>

              {/* MESSAGE */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm text-gray-600 mb-2">Project Details</label>
                <textarea
                  className="px-5 py-4 rounded-2xl border border-gray-300"
                  onChange={(e)=>updateField("message", e.target.value)}
                />
              </div>

              {/* IMAGES */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm text-gray-600 mb-2">Reference Images</label>
                <input
                  type="file"
                  multiple
                  className="border border-gray-300 p-3 rounded-xl"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 5) {
                      alert("Maximum 5 images allowed");
                      return;
                    }
                    updateField("reference_images", files);
                  }}
                />
              </div>

              {/* BUTTON */}
          <button
            disabled={!canStep2}
              onClick={()=>setStep(3)}
              className={`md:col-span-2 mt-4 py-3 rounded-full text-sm tracking-[0.2em] uppercase transition-all
                ${canStep2
                  ? "bg-[#1a1a1a] text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"}
              `}
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">

              <h2 className="text-3xl font-light text-[#1a1a1a] mb-4">
                Schedule
              </h2>

              {/* DATE */}
              <div>
              <label className="text-sm text-gray-600 mb-4 block">
                Select Date
              </label>

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() =>
                    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
                  }
                >
                  ◀
                </button>

                <span className="text-sm font-medium">
                  {currentDate.toLocaleString("en-US", { month: "long" })}
                  {currentDate.getFullYear()}
                </span>

                <button
                  onClick={() =>
                    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
                  }
                >
                  ▶
                </button>
              </div>

              {/* DAYS HEADER */}
              <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-2">
                {daysOfWeek.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              {/* DAYS GRID */}
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentDate).map((day, i) => {
                    if (!day) return <div key={i}></div>;

                    const isAvailable = isAvailableDay(day);
                    const isSelected =
                      formData.preferred_date === day.toISOString().split("T")[0];

                    return (
                      <button
                        key={i}
                        disabled={!isAvailable}
                        onClick={() => {
                          const selectedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
                          updateField("preferred_date", selectedDate);
                          fetchBookedTimes(selectedDate);
                        }}
                        className={`py-2 rounded-md text-sm transition-all
                          ${
                            isSelected
                              ? "bg-[#1a1a1a] text-white"
                              : isAvailable
                              ? "bg-white border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }
                        `}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* TIME SLOTS */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Available Times</label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((t) => {
                    const isBooked = bookedTimes.includes(t);
                    return (
                      <button
                        key={t}
                        disabled={!formData.preferred_date || isBooked}
                        onClick={() => {
                          if (!formData.preferred_date || isBooked) return;
                          updateField("preferred_time", t);
                        }}
                        className={`px-5 py-2 rounded-full border transition-all text-sm
                          ${
                            isBooked
                              ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
                              : !formData.preferred_date
                              ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                              : formData.preferred_time === t
                              ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                              : "bg-white text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                          }
                        `}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CONTACT METHOD */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-2">Contact Method</label>
                <select
                  className="px-5 py-3 rounded-full border border-gray-300"
                  onChange={(e)=>updateField("contact_method", e.target.value)}
                >
                  <option value="">Select contact method</option>
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="In-person">In-person meeting</option>
                </select>
              </div>

              {/* SUBMIT */}
              <button
                disabled={!canStep3 || loading}
                onClick={handleSubmit}
                className={`mt-4 w-full py-3 rounded-full text-sm tracking-[0.2em] uppercase
                  ${canStep3
                    ? "bg-[#1a1a1a] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"}
                `}
              >
                {loading ? "Sending..." : "Submit"}
              </button>

            </div>
          )}
      </div>
          {success && (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center">

        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <div className="relative bg-white px-10 py-8 rounded-lg text-center max-w-md">

          <h2 className="text-2xl font-light mb-4 text-[#1a1a1a]">
            Success
          </h2>

          <p className="text-gray-600 mb-6">
            Your information has been successfully submitted. Our team will contact you shortly.
          </p>

          <button
            onClick={() => {
              setSuccess(false);
              onClose();
            }}
            className="px-6 py-3 bg-[#1a1a1a] text-white rounded-full text-sm uppercase tracking-[0.2em]"
          >
            Close
          </button>

        </div>

      </div>
    )}
    </div>
  );
}