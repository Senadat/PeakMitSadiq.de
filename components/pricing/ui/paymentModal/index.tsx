"use client";

import { useState } from "react";
import { useApp } from "@/context";
import FormInput from "@/components/input";
import { SheetsPayload } from "@/types/sheets";
import { gymOptions, homeOptions, personalOptions } from "@/lib/data/pricing";

interface BookingData {
  name: string;
  phone: string;
  email: string;
  location: string;
  description: string;
  available_dates: string[] | null;
}

interface DateTimeSelection {
  date: string;
  time: string;
}

export default function BookingPayment() {
  const { selectedPricing, setShowSuccess, formData } = useApp();
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    phone: "",
    email: "",
    location: "",
    description: "",
    available_dates: [],
  });
  const [locationDebounceTimer, setLocationDebounceTimer] =
    useState<NodeJS.Timeout | null>(null);

  const [dateTimeSelections, setDateTimeSelections] = useState<
    DateTimeSelection[]
  >([
    { date: "", time: "" },
    { date: "", time: "" },
    { date: "", time: "" },
  ]);

  const [locationError, setLocationError] = useState("");
  const [isValidatingLocation, setIsValidatingLocation] = useState(false);
  const [error, setError] = useState("");

  const pricingOptions = [...gymOptions, ...personalOptions, ...homeOptions];
  const selectedPackage = pricingOptions.find(
    (opt) => opt.id === selectedPricing,
  );

  // Generate available time slots (30-min intervals)
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];

    const startHour = 6; // 06:00
    const endHour = 23; // 23:00 (exclusive)

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }

    return slots;
  };

  const showLocation = [
    "home-muscle-gain",
    "home-pain-free",
    "home-weight-loss",
    "personal-home-60",
    "personal-home-30",
  ].includes(selectedPackage?.id ?? "");

  // Get min and max date (today to 2 weeks from now)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    const twoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    return twoWeeks.toISOString().split("T")[0];
  };

  // Format date to DD.MM.YYYY
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  // Update date/time selection and sync with available_dates
  const updateDateTime = (
    index: number,
    field: "date" | "time",
    value: string,
  ) => {
    const newSelections = [...dateTimeSelections];
    newSelections[index][field] = value;
    setDateTimeSelections(newSelections);

    // Update available_dates array
    const formattedDates = newSelections
      .filter((sel) => sel.date && sel.time)
      .map((sel) => `${formatDate(sel.date)} - ${sel.time}`);

    setBookingData({ ...bookingData, available_dates: formattedDates });
  };

  // Get available time slots based on selected date
  const getTimeSlotsForDate = (dateString: string): string[] => {
    if (!dateString) return [];
    const date = new Date(dateString);
    return generateTimeSlots();
  };

  // Haversine formula for distance calculation
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Validate location using free Nominatim API (OpenStreetMap)
  const validateLocation = async (address: string): Promise<boolean> => {
    // if (selectedPricing && selectedPricing?.plan !== "home") {
    //   return true;
    // }

    setIsValidatingLocation(true);
    const iserlohnLat = 51.3761;
    const iserlohnLon = 7.7006;

    try {
      // Add delay to respect Nominatim usage policy (1 request per second)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Try searching with the exact address first
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address,
        )}&limit=1&countrycodes=de`,
        {
          headers: {
            "User-Agent": "PeakMitSadiq-Booking-App",
          },
        },
      );

      const data = await response.json();

      if (data && data.length > 0) {
        const userLat = parseFloat(data[0].lat);
        const userLon = parseFloat(data[0].lon);
        const distance = calculateDistance(
          iserlohnLat,
          iserlohnLon,
          userLat,
          userLon,
        );

        console.log(
          "Found location:",
          data[0].display_name,
          "Distance:",
          distance.toFixed(1),
          "km",
        );

        if (distance > 30) {
          setLocationError(
            `Der Standort ist ${distance.toFixed(
              1,
            )} km entfernt. Der maximale Umkreis beträgt 30 km von Iserlohn.`,
          );
          setIsValidatingLocation(false);
          return false;
        }

        setLocationError("");
        setIsValidatingLocation(false);
        return true;
      } else {
        setLocationError(
          "Der Standort konnte nicht gefunden werden. Bitte geben Sie eine vollständige Adresse in Deutschland ein.",
        );
        setIsValidatingLocation(false);
        return false;
      }
    } catch (error) {
      console.error("Location validation error:", error);
      setLocationError(
        "Bei der Standortüberprüfung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      );
      setIsValidatingLocation(false);
      return false;
    }
  };

  const handleLocationBlur = async () => {
    if (bookingData.location && bookingData.location.length > 5) {
      await validateLocation(bookingData.location);
    }
  };

  // Debounced validation for onChange
  const handleLocationChange = (value: string) => {
    setBookingData({ ...bookingData, location: value });

    // Clear existing timer
    if (locationDebounceTimer) {
      clearTimeout(locationDebounceTimer);
    }

    // Set new timer to validate after 1.5 seconds of no typing
    if (value && value.length > 5) {
      const timer = setTimeout(() => {
        validateLocation(value);
      }, 1500);
      setLocationDebounceTimer(timer);
    } else {
      // Clear error if input is too short
      setLocationError("");
    }
  };

  const handleSubmit = async () => {
    if (loading || !isFormValid) return;

    const payload: SheetsPayload = {
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      address: bookingData.location ?? null,
      available_dates: bookingData.available_dates
        ? bookingData.available_dates.join(", ")
        : null,
      package_name: selectedPackage?.package ?? null,
      package_price: selectedPricing ? `€${selectedPackage?.price}` : null,
      session_duration: selectedPricing
        ? `${selectedPackage?.duration} Minuten`
        : null,
      message: bookingData.description ?? null,
      goal: formData.a ?? null,
      gender: formData.b ?? null,
      age: formData.c ?? null,
      commitment: formData.d ?? null,
    };

    setLoading(true);
    setError("");

    try {
      //Notify the trainer
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingData.name,
          email: bookingData.email,
          message: bookingData.description,
          isBooking: true,
          payload,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error("Indienen mislukt");
      }

      try {
        await fetch("/api/saveForm", {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            ...payload,
            token: process.env.NEXT_PUBLIC_FORM_TOKEN,
          }),
        });
      } catch (e) {
        console.error(e);
      }

      setShowSuccess(true);
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      setError(err.message);
    }
  };

  const isFormValid =
    bookingData.name &&
    bookingData.phone &&
    bookingData.email &&
    (!showLocation || bookingData.location) &&
    bookingData.available_dates &&
    bookingData.available_dates.length > 0 &&
    !locationError &&
    !isValidatingLocation;

  if (!selectedPackage) {
    return (
      <div className="flex items-center justify-center h-full p-6 text-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-primary mb-3">
            Kein Paket ausgewählt
          </h2>
          <p className="text-gray-300 mb-6">
            Es wurde kein gültiges Paket gefunden. Bitte gehe zurück und wähle
            erneut ein Trainingspaket aus.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-primary text-white px-5 py-3 rounded-xl hover:bg-primary/90"
          >
            Zurück zur Paketauswahl
          </button>
        </div>
      </div>
    );
  }

  const formattedPrice = selectedPackage.price;

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-y-auto bg-background">
      {/* Section 1: Package Info */}
      <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
          Jetzt direkt einen Termin buchen
        </h2>
        <p className="mb-8 text-sm md:text-base text-white">
          Wähle deine bevorzugten Termine aus und buche deinen Wunschtermin
          direkt in meinem Kalender.
        </p>

        {/* Package Details */}
        <div className="bg-[#3B3B3B] rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-primary mb-4">
            Dein ausgewähltes Paket:
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white">Paket:</span>
              <span className="font-semibold text-white">
                {selectedPackage?.package}
              </span>
            </div>
            {/* <div className="flex justify-between items-center">
              <span className="text-white">Plan:</span>
              <span className="font-semibold text-white">
                {selectedPricing?.plan}
              </span>
            </div> */}
            <div className="flex justify-between items-center">
              <span className="text-white">Dauer pro Session:</span>
              <span className="font-semibold text-white">
                {selectedPackage?.duration ?? 60} Minuten
              </span>
            </div>
            <div className="border-t border-gray-600 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-white text-lg">Gesamtpreis:</span>
                <span className="text-3xl font-bold text-primary">
                  €{formattedPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-1 bg-[#3B3B3B]" />
      <div className="block lg:hidden h-px bg-[#3B3B3B] mx-6" />

      {/* Section 2: Checkout */}
      <div className="flex-1 p-6 md:p-8 lg:p-10 bg-background overflow-y-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-center mb-6">
          Terminanfrage
        </h2>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          <FormInput
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="#B9B9B9"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
              </svg>
            }
            placeholder="Vollständiger Name"
            value={bookingData.name}
            onChange={(value) =>
              setBookingData({ ...bookingData, name: value })
            }
            required
          />

          <FormInput
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="#B9B9B9"
              >
                <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
              </svg>
            }
            placeholder="Telefonnummer"
            value={bookingData.phone}
            onChange={(value) =>
              setBookingData({ ...bookingData, phone: value })
            }
            type="tel"
            required
          />

          <FormInput
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="#B9B9B9"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
            }
            placeholder="E-Mail-Adresse"
            value={bookingData.email}
            onChange={(value) =>
              setBookingData({ ...bookingData, email: value })
            }
            type="email"
            required
          />

          {showLocation && (
            <FormInput
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="#B9B9B9"
                >
                  <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                </svg>
              }
              placeholder="Adresse (z.B. Musterstraße 1, 58636 Iserlohn)"
              value={bookingData.location}
              onChange={handleLocationChange}
              onBlur={handleLocationBlur}
              error={locationError}
              required
            />
          )}

          {isValidatingLocation && (
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Standort wird überprüft...
            </p>
          )}

          {/* Date/Time Selections */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg text-center font-semibold text-primary">
              Wähle bis zu 3 Wunschtermine (mindestens 1 erforderlich)
            </h3>

            {dateTimeSelections.map((selection, index) => (
              <div
                key={index}
                className="bg-[#3B3B3B] rounded-lg p-4 space-y-3"
              >
                <label className="block text-white font-medium">
                  {index + 1}. Terminoption{" "}
                  {index === 0 && <span className="text-red-500">*</span>}
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Date Picker */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Datum
                    </label>
                    <input
                      type="date"
                      value={selection.date}
                      min={getMinDate()}
                      max={getMaxDate()}
                      onChange={(e) =>
                        updateDateTime(index, "date", e.target.value)
                      }
                      className="w-full px-4 py-3 text-white bg-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Time Picker */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Uhrzeit
                    </label>
                    <select
                      value={selection.time}
                      onChange={(e) =>
                        updateDateTime(index, "time", e.target.value)
                      }
                      disabled={!selection.date}
                      className="w-full px-4 py-3 text-white bg-[#2A2A2A] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Zeit wählen</option>
                      {getTimeSlotsForDate(selection.date).map((time) => (
                        <option key={time} value={time}>
                          {time} Uhr
                        </option>
                      ))}
                      {selection.date &&
                        getTimeSlotsForDate(selection.date).length === 0 && (
                          <option value="" disabled>
                            Sonntag geschlossen
                          </option>
                        )}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <p className="text-sm text-gray-400">Öffnungszeiten </p>
          </div>

          <div className="relative">
            <textarea
              placeholder="Zusätzliche Anmerkungen (Optional)"
              value={bookingData.description}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  description: e.target.value,
                })
              }
              className="w-full p-4 text-white bg-[#3B3B3B] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center ">
          <button
            onClick={handleSubmit}
            disabled={loading || !isFormValid}
            className="bg-primary/90 hover:bg-primary text-white py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Wird gesendet..." : "Termin anfragen"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <p className="text-sm text-center w-full mt-6">
          © {new Date().getFullYear()} PeakMitSadiq. Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  );
}
