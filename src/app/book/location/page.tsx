"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button, Column, Heading, Text, Row } from "@once-ui-system/core";
import resorts from "@/lib/resorts.json";

interface Resort {
  name: string;
  atoll: string;
  latitude: number;
  longitude: number;
}

// Malé coordinates
const MALE_LAT = 4.1755;
const MALE_LNG = 73.5093;

// Haversine formula to calculate distance in km between two coordinates
function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Calculate delivery price: $500 per 100km, minimum $100
function getDeliveryPrice(distanceKm: number): number {
  const price = Math.ceil((distanceKm / 100) * 500);
  return Math.max(price, 100);
}

type DeliveryMode = "resort" | "yacht";

const MapboxLocation = () => {
  const router = useRouter();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("resort");
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter resorts based on search query
  const filteredResorts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return (resorts as Resort[])
      .filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.atoll.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [searchQuery]);

  // Calculate distance and price
  const distanceKm = useMemo(() => {
    if (selectedResort) {
      return getDistanceKm(MALE_LAT, MALE_LNG, selectedResort.latitude, selectedResort.longitude);
    }
    if (selectedLocation) {
      return getDistanceKm(MALE_LAT, MALE_LNG, selectedLocation.lat, selectedLocation.lng);
    }
    return null;
  }, [selectedResort, selectedLocation]);

  const deliveryPrice = distanceKm !== null ? getDeliveryPrice(distanceKm) : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize map
  useEffect(() => {
    if (map.current) return;

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("Mapbox access token required");
      return;
    }

    mapboxgl.accessToken = accessToken;

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [MALE_LNG - 0.0045, MALE_LAT],
        zoom: 13,
        pitch: 0,
        bearing: 0,
        antialias: true,
      });

      map.current.on("style.load", () => {
        // Add 3D buildings layer
        const layers = map.current?.getStyle().layers;
        const labelLayerId = layers?.find(
          (layer) => layer.type === "symbol" && (layer.layout as Record<string, unknown>)?.["text-field"]
        )?.id;

        map.current?.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 14,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                14, 0,
                14.5, ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                14, 0,
                14.5, ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.7,
            },
          },
          labelLayerId
        );
      });

      // Add Malé marker
      new mapboxgl.Marker({ color: "#ef4444" })
        .setLngLat([MALE_LNG, MALE_LAT])
        .setPopup(new mapboxgl.Popup().setText("Malé — Base"))
        .addTo(map.current);

      // Handle map click (only for yacht mode)
      map.current.on("click", (e) => {
        if (deliveryMode === "yacht") {
          placeMarker(e.lngLat.lng, e.lngLat.lat);
          setSelectedResort(null);
          setSearchQuery("");
          // Cinematic 3D flyTo for yacht pin
          map.current?.flyTo({
            center: [e.lngLat.lng, e.lngLat.lat],
            zoom: 17,
            pitch: 72,
            bearing: -30,
            duration: 2500,
            essential: true,
          });
        }
      });
    }
  }, [deliveryMode]);

  // Update click handler when delivery mode changes
  useEffect(() => {
    if (!map.current) return;
    const canvas = map.current.getCanvas();
    canvas.style.cursor = deliveryMode === "yacht" ? "crosshair" : "";
  }, [deliveryMode]);

  // Reset selection when switching modes
  const handleModeSwitch = (mode: DeliveryMode) => {
    setDeliveryMode(mode);
    setSelectedResort(null);
    setSelectedLocation(null);
    setSearchQuery("");
    setShowDropdown(false);
    if (marker.current) {
      marker.current.remove();
      marker.current = null;
    }
    // Reset map view
    map.current?.flyTo({ center: [MALE_LNG - 0.0045, MALE_LAT], zoom: 13, duration: 1000 });
  };

  const placeMarker = (lng: number, lat: number) => {
    setSelectedLocation({ lng, lat });
    if (map.current) {
      if (!marker.current) {
        marker.current = new mapboxgl.Marker({ color: "#0ea5e9" })
          .setLngLat([lng, lat])
          .addTo(map.current);
      } else {
        marker.current.setLngLat([lng, lat]);
      }
    }
  };

  const handleSelectResort = (resort: Resort) => {
    setSelectedResort(resort);
    setSelectedLocation({ lng: resort.longitude, lat: resort.latitude });
    setSearchQuery(resort.name);
    setShowDropdown(false);

    // Fly to resort with cinematic 3D view
    placeMarker(resort.longitude, resort.latitude);
    map.current?.flyTo({
      center: [resort.longitude, resort.latitude],
      zoom: 17,
      pitch: 72,
      bearing: -30,
      duration: 2500,
      essential: true,
    });
  };

  const handleNext = () => {
    const locationName =
      selectedResort?.name ||
      `Yacht at ${selectedLocation?.lat.toFixed(4)}, ${selectedLocation?.lng.toFixed(4)}`;
    const bookingData = {
      place: locationName,
      date: deliveryDate,
      time: deliveryTime,
      coords: selectedLocation,
      mode: deliveryMode,
    };

    // Store in session to persist across login redirect
    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));

    // Proceed to login/signup step
    router.push("/login");
  };

  const hasToken = !!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (!hasToken) {
    return (
      <Column fillWidth padding="xl" horizontal="center" vertical="center" style={{ height: "100vh" }}>
        <Heading>Mapbox Token Missing</Heading>
        <Text>Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to .env.local</Text>
      </Column>
    );
  }

  return (
    <Column fillWidth style={{ height: "100vh", position: "relative" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />

      {/* Mode toggle */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          width: "90%",
          maxWidth: "440px",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "4px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            width: "100%",
          }}
        >
          <button
            type="button"
            onClick={() => handleModeSwitch("resort")}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              backgroundColor: deliveryMode === "resort" ? "#0c4a6e" : "transparent",
              color: deliveryMode === "resort" ? "white" : "#666",
            }}
          >
            🏨 Resort Delivery
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch("yacht")}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              backgroundColor: deliveryMode === "yacht" ? "#0c4a6e" : "transparent",
              color: deliveryMode === "yacht" ? "white" : "#666",
            }}
          >
            🛥️ Yacht Delivery
          </button>
        </div>

        {/* Resort search (only in resort mode) */}
        {deliveryMode === "resort" && (
          <div ref={searchRef} style={{ width: "100%", position: "relative" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
                if (!e.target.value.trim()) {
                  setSelectedResort(null);
                  setSelectedLocation(null);
                }
              }}
              onFocus={() => searchQuery.trim() && setShowDropdown(true)}
              placeholder="Search for your resort..."
              style={{
                width: "100%",
                padding: "14px 16px 14px 44px",
                fontSize: "15px",
                border: "none",
                borderRadius: "12px",
                backgroundColor: "white",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                outline: "none",
                color: "#1a1a1a",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
            {/* Search icon */}
            <svg
              style={{
                position: "absolute",
                left: "14px",
                top: "14px",
                pointerEvents: "none",
                opacity: 0.4,
              }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-label="Search icon"
              role="img"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {/* Dropdown results */}
            {showDropdown && filteredResorts.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  marginTop: "4px",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                  overflow: "hidden",
                  maxHeight: "320px",
                  overflowY: "auto",
                  zIndex: 20,
                }}
              >
                {filteredResorts.map((resort) => (
                  <button
                    key={`${resort.name}-${resort.atoll}`}
                    type="button"
                    onClick={() => handleSelectResort(resort)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      padding: "12px 16px",
                      border: "none",
                      borderBottom: "1px solid #f0f0f0",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background-color 0.15s",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f0f9ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <span
                      style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}
                    >
                      {resort.name}
                    </span>
                    {resort.atoll && (
                      <span
                        style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}
                      >
                        {resort.atoll}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom card */}
      <Column
        position="absolute"
        background="surface"
        padding="m"
        radius="l"
        gap="m"
        style={{
          bottom: "6rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "400px",
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <Heading as="h2" variant="heading-strong-m">
          {deliveryMode === "resort" ? "Resort Delivery" : "Yacht Delivery"}
        </Heading>
        {/* Selection + Schedule confirmation */}
        {(selectedResort || selectedLocation) && (
          <Column gap="l" paddingY="m" style={{ borderTop: "1px solid var(--neutral-alpha-medium)" }}>
            <Column gap="4">
              <Text
                variant="label-default-s"
                onBackground="neutral-medium"
                style={{ letterSpacing: "1px", fontWeight: 600, fontSize: "10px" }}
              >
                DELIVERY DESTINATION
              </Text>
              <Column gap="2">
                <Text variant="heading-default-xs" onBackground="neutral-strong" style={{ fontWeight: 600 }}>
                  {selectedResort?.name || "GPS Coordinates Pin"}
                </Text>
                {selectedResort?.atoll && (
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {selectedResort.atoll}
                  </Text>
                )}
              </Column>
            </Column>

            <Row gap="l">
              <Column fillWidth gap="4">
                <Text
                  variant="label-default-s"
                  onBackground="neutral-medium"
                  style={{ letterSpacing: "1px", fontWeight: 600, fontSize: "10px" }}
                >
                  PREFERED DATE
                </Text>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    border: "none",
                    borderBottom: "1px solid var(--neutral-alpha-strong)",
                    backgroundColor: "transparent",
                    color: "var(--neutral-on-background-strong)",
                    fontSize: "15px",
                    fontFamily: "inherit",
                    outline: "none",
                    borderRadius: 0,
                  }}
                />
              </Column>
              <Column fillWidth gap="4">
                <Text
                  variant="label-default-s"
                  onBackground="neutral-medium"
                  style={{ letterSpacing: "1px", fontWeight: 600, fontSize: "10px" }}
                >
                  DELIVERY TIME
                </Text>
                <input
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    border: "none",
                    borderBottom: "1px solid var(--neutral-alpha-strong)",
                    backgroundColor: "transparent",
                    color: "var(--neutral-on-background-strong)",
                    fontSize: "15px",
                    fontFamily: "inherit",
                    outline: "none",
                    borderRadius: 0,
                  }}
                />
              </Column>
            </Row>
          </Column>
        )}

        <Button
          variant="primary"
          size="l"
          fillWidth
          disabled={!selectedResort && !selectedLocation}
          onClick={handleNext}
        >
          {selectedResort || selectedLocation
            ? "Confirm Booking"
            : "Select a location"}
        </Button>
      </Column>
    </Column>
  );
};

export default MapboxLocation;
