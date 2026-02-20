"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Column, Heading, Text, Row } from "@once-ui-system/core";
import resorts from "@/lib/resorts.json";

interface Resort {
  name: string;
  atoll: string;
  latitude: number;
  longitude: number;
}

const MALE_LAT = 4.1755;
const MALE_LNG = 73.5093;

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

function getDeliveryPrice(distanceKm: number): number {
  return Math.max(Math.ceil((distanceKm / 100) * 500), 100);
}

// "yacht" is the primary / default mode. "island" is the secondary.
type DeliveryMode = "yacht" | "island";

// ─── Shared overlay surface style ─────────────────────────────────────────────
const surface: React.CSSProperties = {
  backgroundColor: "var(--neutral-background-strong)",
  border: "1px solid var(--neutral-alpha-medium)",
  borderRadius: "14px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04) inset",
};

const MapboxLocation = () => {
  const router = useRouter();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  // yacht is default
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("yacht");
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredResorts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return (resorts as Resort[])
      .filter((r) => r.name.toLowerCase().includes(q) || r.atoll.toLowerCase().includes(q))
      .slice(0, 8);
  }, [searchQuery]);

  const distanceKm = useMemo(() => {
    if (selectedResort) return getDistanceKm(MALE_LAT, MALE_LNG, selectedResort.latitude, selectedResort.longitude);
    if (selectedLocation) return getDistanceKm(MALE_LAT, MALE_LNG, selectedLocation.lat, selectedLocation.lng);
    return null;
  }, [selectedResort, selectedLocation]);

  const deliveryPrice = distanceKm !== null ? getDeliveryPrice(distanceKm) : null;

  // Close island search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Initialize dark map
  useEffect(() => {
    if (map.current) return;
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) return;

    mapboxgl.accessToken = accessToken;

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/miguelantonmasero/cmloh66fo004701r2difshea4",
        center: [MALE_LNG - 0.0045, MALE_LAT],
        zoom: 13,
        pitch: 0,
        bearing: 0,
        antialias: true,
      });

      // Brand-cyan marker for Malé base
      new mapboxgl.Marker({ color: "#06b6d4" })
        .setLngLat([MALE_LNG, MALE_LAT])
        .setPopup(new mapboxgl.Popup({ className: "rdp-popup" }).setText("Malé — Base"))
        .addTo(map.current);
    }
  }, []);

  // Track mode in ref so the map click handler (bound once) can read it
  const modeRef = useRef(deliveryMode);
  useEffect(() => {
    modeRef.current = deliveryMode;
    if (map.current) {
      map.current.getCanvas().style.cursor = deliveryMode === "yacht" ? "crosshair" : "";
    }
  }, [deliveryMode]);

  // Map click handler — only active in yacht mode
  useEffect(() => {
    if (!map.current) return;
    const clickHandler = (e: mapboxgl.MapMouseEvent) => {
      if (modeRef.current === "yacht") {
        placeMarker(e.lngLat.lng, e.lngLat.lat);
        setSelectedResort(null);
        setSearchQuery("");
        map.current?.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: 14,
          pitch: 55,
          bearing: -20,
          duration: 2000,
          essential: true,
        });
      }
    };
    map.current.on("click", clickHandler);
    return () => { map.current?.off("click", clickHandler); };
  }, []);

  const handleModeSwitch = (mode: DeliveryMode) => {
    setDeliveryMode(mode);
    setSelectedResort(null);
    setSelectedLocation(null);
    setSearchQuery("");
    setShowDropdown(false);
    if (marker.current) { marker.current.remove(); marker.current = null; }
    map.current?.flyTo({ center: [MALE_LNG - 0.0045, MALE_LAT], zoom: 13, pitch: 0, duration: 1000 });
  };

  const placeMarker = (lng: number, lat: number) => {
    setSelectedLocation({ lng, lat });
    if (map.current) {
      if (!marker.current) {
        marker.current = new mapboxgl.Marker({ color: "#06b6d4" })
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
    placeMarker(resort.longitude, resort.latitude);
    map.current?.flyTo({
      center: [resort.longitude, resort.latitude],
      zoom: 14,
      pitch: 55,
      bearing: -20,
      duration: 2000,
      essential: true,
    });
  };

  const handleNext = () => {
    const locationName =
      selectedResort?.name ||
      `Yacht at ${selectedLocation?.lat.toFixed(4)}, ${selectedLocation?.lng.toFixed(4)}`;
    sessionStorage.setItem("pendingBooking", JSON.stringify({
      place: locationName,
      date: deliveryDate,
      time: deliveryTime,
      coords: selectedLocation,
      mode: deliveryMode,
    }));
    router.push("/login");
  };

  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    return (
      <Column fillWidth padding="xl" horizontal="center" vertical="center" style={{ height: "100vh" }}>
        <Heading>Mapbox Token Missing</Heading>
        <Text>Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to .env.local</Text>
      </Column>
    );
  }

  const hasSelection = !!(selectedResort || selectedLocation);
  const canProceed = hasSelection;

  return (
    <Column fillWidth style={{ height: "100vh", position: "relative" }}>
      <style>{`
        /* Mapbox popup dark style */
        .rdp-popup .mapboxgl-popup-content {
          background: var(--neutral-background-strong);
          color: var(--neutral-on-background-strong);
          font-family: var(--font-body);
          font-size: 12px;
          border-radius: 8px;
          padding: 8px 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
          border: 1px solid var(--neutral-alpha-medium);
        }
        .rdp-popup .mapboxgl-popup-tip {
          border-top-color: var(--neutral-background-strong);
        }
        /* Remove default mapbox controls default styling interference */
        .mapboxgl-ctrl-group {
          background: var(--neutral-background-strong) !important;
          border: 1px solid var(--neutral-alpha-medium) !important;
          border-radius: 10px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4) !important;
        }
        .mapboxgl-ctrl-group button {
          color: var(--neutral-on-background-medium) !important;
        }
        .map-placeholder-input::placeholder {
          color: var(--neutral-on-background-weak);
          opacity: 0.8;
        }
        /* Mode pill button */
        .rdp-pill {
          flex: 1;
          padding: 9px 14px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.18s ease;
          font-family: var(--font-label);
          white-space: nowrap;
        }
        .rdp-pill-active {
          background: var(--brand-solid-strong);
          color: var(--brand-on-solid-strong);
          box-shadow: 0 2px 12px rgba(6,182,212,0.3);
        }
        .rdp-pill-inactive {
          background: transparent;
          color: var(--neutral-on-background-weak);
        }
        .rdp-pill-inactive:hover {
          background: var(--neutral-alpha-weak);
          color: var(--neutral-on-background-medium);
        }
        /* Date/time input overrides */
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(0.7);
          cursor: pointer;
          opacity: 0.6;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover,
        input[type="time"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
      `}</style>

      {/* Map canvas */}
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />

      {/* ── Top overlay: mode toggle + island search ── */}
      <div style={{
        position: "absolute",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(440px, calc(100vw - 2rem))",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}>
        {/* Mode toggle pill row */}
        <div style={{
          ...surface,
          padding: "5px",
          display: "flex",
          gap: "4px",
        }}>
          {/* Yacht — primary / default */}
          <button
            type="button"
            className={`rdp-pill ${deliveryMode === "yacht" ? "rdp-pill-active" : "rdp-pill-inactive"}`}
            onClick={() => handleModeSwitch("yacht")}
          >
            ⚓ Yacht
          </button>
          {/* Island — secondary */}
          <button
            type="button"
            className={`rdp-pill ${deliveryMode === "island" ? "rdp-pill-active" : "rdp-pill-inactive"}`}
            onClick={() => handleModeSwitch("island")}
          >
            🏝 Island
          </button>
        </div>

        {/* Island search — only visible in island mode */}
        {deliveryMode === "island" && (
          <div ref={searchRef} style={{ position: "relative", width: "100%" }}>
            <div style={{
              ...surface,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <span style={{ color: "var(--neutral-on-background-weak)", fontSize: "14px", flexShrink: 0 }}>🔍</span>
              <input
                type="text"
                className="map-placeholder-input"
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
                placeholder="Search for your island or resort..."
                style={{
                  flex: 1,
                  fontSize: "14px",
                  border: "none",
                  backgroundColor: "transparent",
                  outline: "none",
                  color: "var(--neutral-on-background-strong)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  minWidth: 0,
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); setSelectedResort(null); setSelectedLocation(null); setShowDropdown(false); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer", padding: "2px",
                    color: "var(--neutral-on-background-weak)", fontSize: "16px", lineHeight: 1, flexShrink: 0,
                  }}
                >×</button>
              )}
            </div>

            {/* Search results dropdown */}
            {showDropdown && filteredResorts.length > 0 && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                right: 0,
                ...surface,
                borderRadius: "12px",
                overflow: "hidden",
                maxHeight: "300px",
                overflowY: "auto",
                zIndex: 20,
              }}>
                {filteredResorts.map((resort) => (
                  <button
                    key={`${resort.name}-${resort.atoll}`}
                    type="button"
                    onClick={() => handleSelectResort(resort)}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "2px",
                      padding: "11px 16px",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid var(--neutral-alpha-weak)",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.12s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--neutral-alpha-weak)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <span style={{
                      fontSize: "13px", fontWeight: 600,
                      color: "var(--neutral-on-background-strong)",
                      fontFamily: "var(--font-body)",
                    }}>{resort.name}</span>
                    {resort.atoll && (
                      <span style={{
                        fontSize: "11px",
                        color: "var(--neutral-on-background-weak)",
                        fontFamily: "var(--font-body)",
                      }}>{resort.atoll}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom card ── */}
      <div style={{
        position: "absolute",
        bottom: "3rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(400px, calc(100vw - 2rem))",
        zIndex: 10,
        ...surface,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{
            fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: "var(--neutral-on-background-weak)",
            fontFamily: "var(--font-label)",
          }}>
            {deliveryMode === "yacht" ? "⚓ Yacht Delivery" : "🏝 Island Delivery"}
          </div>
          <div style={{
            fontSize: "15px", fontWeight: 600,
            color: "var(--neutral-on-background-strong)",
            fontFamily: "var(--font-heading)",
            lineHeight: 1.3,
          }}>
            {deliveryMode === "yacht"
              ? "Tap the map to drop your pin"
              : "Search for your island above"}
          </div>
        </div>

        {/* Selection details — shown once a location is chosen */}
        {hasSelection && (
          <div style={{
            paddingTop: "16px",
            borderTop: "1px solid var(--neutral-alpha-weak)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {/* Destination */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <div style={{
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: "var(--neutral-on-background-weak)",
                fontFamily: "var(--font-label)",
              }}>Delivery destination</div>
              <div style={{
                fontSize: "14px", fontWeight: 600,
                color: "var(--neutral-on-background-strong)",
                fontFamily: "var(--font-heading)",
              }}>
                {selectedResort?.name || "GPS Pin"}
              </div>
              {selectedResort?.atoll && (
                <div style={{ fontSize: "12px", color: "var(--neutral-on-background-weak)", fontFamily: "var(--font-body)" }}>
                  {selectedResort.atoll}
                </div>
              )}
              {!selectedResort && selectedLocation && (
                <div style={{ fontSize: "12px", color: "var(--neutral-on-background-weak)", fontFamily: "var(--font-code)" }}>
                  {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </div>
              )}
              {deliveryPrice !== null && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "4px",
                  background: "var(--brand-alpha-weak)",
                  border: "1px solid var(--brand-alpha-medium)",
                  borderRadius: "100px",
                  padding: "3px 10px",
                  fontSize: "11px", fontWeight: 600,
                  color: "var(--brand-on-background-strong)",
                  fontFamily: "var(--font-label)",
                  alignSelf: "flex-start",
                }}>
                  ~${deliveryPrice} delivery
                </div>
              )}
            </div>

            {/* Date + Time */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
                <div style={{
                  fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--neutral-on-background-weak)",
                  fontFamily: "var(--font-label)",
                }}>Date</div>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    border: "1px solid var(--neutral-alpha-medium)",
                    borderRadius: "8px",
                    backgroundColor: "var(--neutral-alpha-weak)",
                    color: "var(--neutral-on-background-strong)",
                    fontSize: "12px",
                    fontFamily: "var(--font-code)",
                    outline: "none",
                    transition: "border-color 0.15s ease",
                  }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--brand-alpha-medium)"}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--neutral-alpha-medium)"}
                />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
                <div style={{
                  fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--neutral-on-background-weak)",
                  fontFamily: "var(--font-label)",
                }}>Time</div>
                <input
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    border: "1px solid var(--neutral-alpha-medium)",
                    borderRadius: "8px",
                    backgroundColor: "var(--neutral-alpha-weak)",
                    color: "var(--neutral-on-background-strong)",
                    fontSize: "12px",
                    fontFamily: "var(--font-code)",
                    outline: "none",
                    transition: "border-color 0.15s ease",
                  }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--brand-alpha-medium)"}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--neutral-alpha-medium)"}
                />
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          disabled={!canProceed}
          onClick={handleNext}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "var(--font-label)",
            letterSpacing: "0.02em",
            cursor: canProceed ? "pointer" : "not-allowed",
            transition: "all 0.18s ease",
            background: canProceed ? "var(--brand-solid-strong)" : "var(--neutral-alpha-weak)",
            color: canProceed ? "var(--brand-on-solid-strong)" : "var(--neutral-on-background-weak)",
            opacity: canProceed ? 1 : 0.5,
          }}
          onMouseEnter={e => { if (canProceed) (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
          onMouseLeave={e => { if (canProceed) (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          Continue →
        </button>
      </div>
    </Column>
  );
};

export default MapboxLocation;
