"use client";

import { useState } from "react";
import { useApp } from "@/context";
import Image from "next/image";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PopupModal } from "react-calendly";
import FormInput from "@/components/input";

interface BookingData {
  name: string;
  phone: string;
  email: string;
  location: string;
  description: string;
}

export default function BookingPayment() {
  const { selectedPricing, setOpenPricingModal } = useApp();
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    phone: "",
    email: "",
    location: "",
    description: "",
  });

  const [locationError, setLocationError] = useState("");
  const [isValidatingLocation, setIsValidatingLocation] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  // Haversine formula for distance calculation
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
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
    if (selectedPricing && selectedPricing?.plan !== "home") {
      true;
    }

    setIsValidatingLocation(true);
    const iserlohnLat = 51.3761;
    const iserlohnLon = 7.7006;

    try {
      // Add delay to respect Nominatim usage policy (1 request per second)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Try searching with the exact address first
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&limit=1&countrycodes=de`,
        {
          headers: {
            "User-Agent": "PeakMitSadiq-Booking-App",
          },
        }
      );

      const data = await response.json();

      if (data && data.length > 0) {
        const userLat = parseFloat(data[0].lat);
        const userLon = parseFloat(data[0].lon);
        const distance = calculateDistance(
          iserlohnLat,
          iserlohnLon,
          userLat,
          userLon
        );

        console.log(
          "Found location:",
          data[0].display_name,
          "Distance:",
          distance.toFixed(1),
          "km"
        );

        if (distance > 30) {
          setLocationError(
            `Standort ist ${distance.toFixed(
              1
            )}km entfernt. Maximal 30km von Iserlohn erlaubt.`
          );
          setIsValidatingLocation(false);
          return false;
        }
        setLocationError("");
        setIsValidatingLocation(false);
        return true;
      } else {
        setLocationError(
          "Standort konnte nicht gefunden werden. Bitte vollständige Adresse eingeben."
        );
        setIsValidatingLocation(false);
        return false;
      }
    } catch (error) {
      console.error("Location validation error:", error);
      setLocationError("Fehler bei der Standortüberprüfung.");
      setIsValidatingLocation(false);
      return false;
    }
  };

  const handleLocationBlur = async () => {
    if (bookingData.location && bookingData.location.length > 5) {
      await validateLocation(bookingData.location);
    }
  };

  function generatePaymentRef() {
    return `PMT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }

  const paymentRef = generatePaymentRef();

  const isFormValid =
    bookingData.name &&
    bookingData.phone &&
    bookingData.email &&
    bookingData.location &&
    !locationError &&
    !isValidatingLocation;

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-y-auto bg-background">
      {/* Section 1: Package Info */}
      <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-3">
          Möchtest du direkt einen Termin buchen?
        </h2>
        <p className="mb-8 text-sm md:text-base text-white">
          Zahle jetzt sicher über PayPal und buche anschließend deinen
          Wunschtermin direkt in meinem Kalender.
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
                {selectedPricing?.package}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Plan:</span>
              <span className="font-semibold text-white">
                {selectedPricing?.plan}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Dauer pro Session:</span>
              <span className="font-semibold text-white">
                {selectedPricing?.duration ?? 60} Minuten
              </span>
            </div>
            <div className="border-t border-gray-600 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-white text-lg">Gesamtpreis:</span>
                <span className="text-3xl font-bold text-primary">
                  €{selectedPricing?.price}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-[#2A2A2A] rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            So funktioniert's:
          </h3>
          <ol className="space-y-3 text-white text-sm">
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                1
              </span>
              <span>Fülle das Formular aus und bezahle mit PayPal</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span>Nach erfolgreicher Zahlung öffnet sich mein Kalender</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                3
              </span>
              <span>Wähle deinen Wunschtermin (bis zu 2 Wochen im Voraus)</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                4
              </span>
              <span>Du erhältst eine Bestätigung per E-Mail</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-1 bg-[#3B3B3B]" />
      <div className="block lg:hidden h-px bg-[#3B3B3B] mx-6" />

      {/* Section 2: Checkout */}
      <div className="flex-1 p-6 md:p-8 lg:p-10 bg-background overflow-y-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-center mb-6">
          Kasse
        </h2>

        {/* PayPal Logo */}
        <div className="mb-6 flex justify-center p-4 rounded-lg">
          <div className="relative w-32 h-12">
            <Image
              src="/paypal.svg"
              alt="PayPal"
              fill
              className="object-contain"
            />
          </div>
        </div>

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
          {selectedPricing?.plan === "home" && (
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
              onChange={(value) =>
                setBookingData({ ...bookingData, location: value })
              }
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

        {/* PayPal Integration */}
        <div className="mt-6">
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
              currency: "EUR",
            }}
          >
            <PayPalButtons
              disabled={!isFormValid}
              style={{
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "paypal",
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      description: `${selectedPricing?.package} - ${bookingData.name}`,
                      amount: {
                        value: selectedPricing?.price.toString() || "0",
                        currency_code: "EUR",
                      },
                      custom_id: paymentRef,
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order!.capture().then((details) => {
                  console.log("Payment Details:", details);
                  console.log("Booking Data:", bookingData);

                  // Store payment details
                  setPaymentDetails(details);

                  // Open Calendly modal
                  setShowCalendly(true);

                  // Optional: Send payment data to your backend
                  // await fetch('/api/bookings', {
                  //   method: 'POST',
                  //   body: JSON.stringify({ details, bookingData })
                  // });
                });
              }}
              onError={(err) => {
                console.error("PayPal Error:", err);
                alert(
                  "Es gab ein Problem mit der Zahlung. Bitte versuchen Sie es erneut."
                );
              }}
            />
          </PayPalScriptProvider>
        </div>

        <p className="text-sm text-center w-full mt-6">
          © {new Date().getFullYear()} PeakMitSadiq. Alle Rechte vorbehalten.
        </p>
      </div>

      {/* Calendly Modal */}
      {showCalendly && (
        <PopupModal
          url={process.env.NEXT_PUBLIC_CALENDLY_URL || ""}
          onModalClose={() => {
            setShowCalendly(false);
            setOpenPricingModal(false);
          }}
          open={showCalendly}
          rootElement={document.getElementById("root") as HTMLElement}
          prefill={{
            email: bookingData.email,
            firstName: bookingData.name.split(" ")[0],
            lastName: bookingData.name.split(" ").slice(1).join(" "),
            customAnswers: {
              a1: bookingData.phone,
              a2: bookingData.location,
              a3: bookingData.description,
            },
          }}
          utm={{
            utmCampaign: selectedPricing?.package,
            utmSource: "website",
            utmMedium: "payment",
          }}
        />
      )}
    </div>
  );
}
