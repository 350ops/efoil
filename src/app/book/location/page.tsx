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
        // We use a mutable ref or state check inside the event listener?
        // Actually, state is captured in closure.
        // We need to use the ref for the changing mode if we want to be safe, but here 
        // we might run into stale closure if useEffect doesn't update.
        // The useEffect below handles cursor update, but listener is added only once.
        // Let's rely on the listener being removed/added or a ref for mode.
      });
      
      // We will handle click logic in a separate effect or use a ref for current mode
    }
  }, []);

  // Use a ref to track current mode for the map click handler which is bound once
  const modeRef = useRef(deliveryMode);
  useEffect(() => {
    modeRef.current = deliveryMode;
    if (map.current) {
      map.current.getCanvas().style.cursor = deliveryMode === "yacht" ? "crosshair" : "";
    }
  }, [deliveryMode]);

  // Add click listener that checks the ref
  useEffect(() => {
    if (!map.current) return;
    
    const clickHandler = (e: mapboxgl.MapMouseEvent) => {
      if (modeRef.current === "yacht") {
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
    };

    map.current.on("click", clickHandler);

    return () => {
      map.current?.off("click", clickHandler);
    };
  }, []);

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
      <style jsx global>{`
        ::placeholder {
          color: var(--neutral-on-background-weak);
          opacity: 0.7;
        }
      `}</style>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />

      {/* Mode toggle & Search */}
      <Column
        position="absolute"
        zIndex={10}
        fillWidth
        horizontal="center"
        padding="m"
        gap="m"
        style={{
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "440px",
        }}
        s={{
          width: "95%",
          top: "0.5rem",
          padding: "s",
        }}
      >
        <Column
          background="surface"
          radius="l"
          padding="4"
          border="neutral-alpha-medium"
          style={{
            backgroundColor: "var(--neutral-background-strong)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.24)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Row>
            <Button
              onClick={() => handleModeSwitch("resort")}
              variant={deliveryMode === "resort" ? "primary" : "tertiary"}
              size="m"
              style={{ flex: 1 }}
            >
              Resort Delivery
            </Button>
            <Button
              onClick={() => handleModeSwitch("yacht")}
              variant={deliveryMode === "yacht" ? "primary" : "tertiary"}
              size="m"
              style={{ flex: 1 }}
            >
              Yacht Delivery
            </Button>
          </Row>
        </Column>

        {/* Resort search (only in resort mode) */}
        {deliveryMode === "resort" && (
          <div ref={searchRef} style={{ width: "100%", position: "relative" }}>
            <Column
              fillWidth
              radius="l"
              border="neutral-alpha-medium"
              paddingX="m"
              paddingY="12"
              style={{
                backgroundColor: "var(--neutral-background-strong)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.24)",
                backdropFilter: "blur(12px)",
              }}
            >
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
                  fontSize: "16px",
                  border: "none",
                  backgroundColor: "transparent",
                  outline: "none",
                  color: "var(--neutral-on-background-strong)",
                  fontFamily: "inherit",
                  fontWeight: 500,
                }}
              />
            </Column>

            {/* Dropdown results */}
            {showDropdown && filteredResorts.length > 0 && (
              <Column
                fillWidth
                style={{
                  top: "100%",
                  marginTop: "8px",
                  maxHeight: "320px",
                  overflowY: "auto",
                  zIndex: 20,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.24)",
                  backgroundColor: "var(--neutral-background-strong)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Column>
                  {filteredResorts.map((resort) => (
                    <Button
                      key={`${resort.name}-${resort.atoll}`}
                      onClick={() => handleSelectResort(resort)}
                      variant="tertiary"
                      size="l"
                      fillWidth
                      style={{ justifyContent: "flex-start", height: "auto", padding: "12px 16px" }}
                    >
                      <Column gap="2" horizontal="start">
                        <Text variant="body-strong-m">{resort.name}</Text>
                        {resort.atoll && (
                          <Text variant="body-default-s" onBackground="neutral-weak">
                            {resort.atoll}
                          </Text>
                        )}
                      </Column>
                    </Button>
                  ))}
                </Column>
              </Column>
            )}
          </div>
        )}
      </Column>

      {/* Bottom card */}
      <Column
        position="absolute"
        background="surface"
        radius="l"
        padding="l"
        gap="l"
        border="neutral-alpha-medium"
        style={{
          bottom: "4rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "400px",
          zIndex: 1,
          boxShadow: "0 4px 24px rgba(0,0,0,0.24)",
          backgroundColor: "var(--neutral-background-strong)",
          backdropFilter: "blur(12px)",
        }}
        s={{
          bottom: "2rem",
          padding: "m",
          gap: "m",
          width: "95%",
        }}
      >
        <Column gap="4">
          <Heading as="h2" variant="heading-strong-m">
            {deliveryMode === "resort" ? "Resort Delivery" : "Yacht Delivery"}
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {deliveryMode === "resort"
              ? "Select your resort from the list above."
              : "Tap anywhere on the map to set your yacht location."}
          </Text>
        </Column>

        {/* Selection + Schedule confirmation */}
        {(selectedResort || selectedLocation) && (
          <Column gap="l" paddingY="m" borderTop="neutral-alpha-weak">
            <Column gap="4">
              <Text
                variant="label-default-s"
                onBackground="neutral-medium"
              >
                DELIVERY DESTINATION
              </Text>
              <Column gap="2">
                <Text variant="heading-strong-s">
                  {selectedResort?.name || "GPS Coordinates Pin"}
                </Text>
                {selectedResort?.atoll && (
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {selectedResort.atoll}
                  </Text>
                )}
                {!selectedResort && selectedLocation && (
                   <Text variant="body-default-s" onBackground="neutral-weak">
                    {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                  </Text>
                )}
              </Column>
            </Column>

            <Row gap="l">
              <Column fillWidth gap="4">
                <Text
                  variant="label-default-s"
                  onBackground="neutral-medium"
                >
                  PREFERRED DATE
                </Text>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 0",
                    border: "none",
                    borderBottom: "1px solid var(--neutral-alpha-strong)",
                    backgroundColor: "transparent",
                    color: "var(--neutral-on-background-strong)",
                    fontSize: "14px",
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
                >
                  TIME
                </Text>
                <input
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 0",
                    border: "none",
                    borderBottom: "1px solid var(--neutral-alpha-strong)",
                    backgroundColor: "transparent",
                    color: "var(--neutral-on-background-strong)",
                    fontSize: "14px",
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
          Select
        </Button>
      </Column>
    </Column>
  );
};

export default MapboxLocation;
