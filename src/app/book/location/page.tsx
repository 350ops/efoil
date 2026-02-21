"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Column, Heading, Text } from "@once-ui-system/core";
import resorts from "@/lib/resorts.json";
import { Tabs, TabsTrigger } from "@/components/ui/Tabs";
import {
  Card,
  CardPill,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardSeparator,
} from "@/components/ui/Card";
import { Input, Label, FieldGroup, Field } from "@/components/ui/Input";
import { ShadButton } from "@/components/ui/ShadButton";
import { MapPin, Search } from "lucide-react";

interface Resort {
  name: string;
  atoll: string;
  latitude: number;
  longitude: number;
}

const MALE_LAT = 4.2088;
const MALE_LNG = 73.5244;

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
  const price = Math.ceil((distanceKm / 100) * 500);
  return Math.max(price, 100);
}

type DeliveryMode = "resort" | "yacht";

const MapboxLocation = () => {
  const router = useRouter();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("yacht");
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Pre-fill date/time from booking draft set in HeroCTA
  useEffect(() => {
    const raw = sessionStorage.getItem("bookingDraft");
    if (raw) {
      try {
        const draft = JSON.parse(raw);
        if (draft.date) setDeliveryDate(draft.date);
        if (draft.startTime) setDeliveryTime(draft.startTime);
      } catch {
        // ignore malformed data
      }
    }
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        style: "mapbox://styles/mapbox/dark-v11",
        center: [MALE_LNG - 0.0045, MALE_LAT],
        zoom: 13,
        pitch: 0,
        bearing: 0,
        antialias: true,
      });

      map.current.on("style.load", () => {
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

      map.current.on("click", () => {
        // Handled by separate effect below
      });
    }
  }, []);

  const modeRef = useRef(deliveryMode);
  useEffect(() => {
    modeRef.current = deliveryMode;
    if (map.current) {
      map.current.getCanvas().style.cursor = deliveryMode === "yacht" ? "crosshair" : "";
    }
  }, [deliveryMode]);

  useEffect(() => {
    if (!map.current) return;

    const clickHandler = (e: mapboxgl.MapMouseEvent) => {
      if (modeRef.current === "yacht") {
        placeMarker(e.lngLat.lng, e.lngLat.lat);
        setSelectedResort(null);
        setSearchQuery("");
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

  const handleModeSwitch = (mode: string) => {
    setDeliveryMode(mode as DeliveryMode);
    setSelectedResort(null);
    setSelectedLocation(null);
    setSearchQuery("");
    setShowDropdown(false);
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
    map.current?.flyTo({ center: [MALE_LNG - 0.0045, MALE_LAT], zoom: 13, duration: 1000 });
  };

  const placeMarker = (lng: number, lat: number) => {
    setSelectedLocation({ lng, lat });
    if (map.current) {
      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker({ color: "#0ea5e9" })
          .setLngLat([lng, lat])
          .addTo(map.current);
      } else {
        markerRef.current.setLngLat([lng, lat]);
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

    sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));
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
    <div style={{ width: "100%", height: "100vh", position: "relative", borderRadius: "24px", overflow: "hidden" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />

      {/* Top: Tabs + Search */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "440px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Tabs value={deliveryMode} onValueChange={handleModeSwitch}>
          <TabsTrigger value="yacht">Yacht</TabsTrigger>
          <TabsTrigger value="resort">Island</TabsTrigger>
        </Tabs>

        {deliveryMode === "resort" && (
          <div ref={searchRef} style={{ position: "relative" }}>
            <CardPill style={{ padding: 0 }}>
              <div style={{ display: "flex", alignItems: "center", padding: "4px 12px", gap: "8px" }}>
                <Search size={16} style={{ color: "var(--neutral-on-background-weak, #94a3b8)", flexShrink: 0 }} />
                <Input
                  inputSize="lg"
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
                  style={{ border: "none", padding: "10px 0", borderRadius: 0 }}
                />
              </div>
            </CardPill>

            {showDropdown && filteredResorts.length > 0 && (
              <Card
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  right: 0,
                  maxHeight: "320px",
                  overflowY: "auto",
                  zIndex: 20,
                  padding: "4px",
                  borderRadius: "20px",
                }}
              >
                {filteredResorts.map((resort) => (
                  <ShadButton
                    key={`${resort.name}-${resort.atoll}`}
                    variant="ghost"
                    onClick={() => handleSelectResort(resort)}
                    style={{ flexDirection: "column", alignItems: "flex-start", gap: "2px" }}
                  >
                    <span style={{ fontWeight: 600, fontSize: "14px" }}>{resort.name}</span>
                    {resort.atoll && (
                      <span style={{ fontSize: "12px", color: "var(--neutral-on-background-weak, #94a3b8)" }}>
                        {resort.atoll}
                      </span>
                    )}
                  </ShadButton>
                ))}
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Bottom card */}
      <div
        style={{
          position: "absolute",
          bottom: "4rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "400px",
          zIndex: 1,
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {deliveryMode === "resort" ? "Island" : "Yacht"}
            </CardTitle>
            <CardDescription>
              {deliveryMode === "resort"
                ? "Search and select your island resort above."
                : "Tap anywhere on the map to drop your yacht pin."}
            </CardDescription>
          </CardHeader>

          {(selectedResort || selectedLocation) && (
            <>
              <CardSeparator />
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <Label>Delivery Destination</Label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                      <MapPin size={16} style={{ color: "var(--brand-on-background-strong, #22d3ee)", flexShrink: 0 }} />
                      <div>
                        <p style={{
                          margin: 0,
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "var(--neutral-on-background-strong, #e2e8f0)",
                        }}>
                          {selectedResort?.name || "GPS Coordinates Pin"}
                        </p>
                        {selectedResort?.atoll && (
                          <p style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "var(--neutral-on-background-weak, #94a3b8)",
                          }}>
                            {selectedResort.atoll}
                          </p>
                        )}
                        {!selectedResort && selectedLocation && (
                          <p style={{
                            margin: 0,
                            fontSize: "12px",
                            color: "var(--neutral-on-background-weak, #94a3b8)",
                          }}>
                            {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <FieldGroup>
                    <Field>
                      <Label htmlFor="delivery-date">Preferred Date</Label>
                      <Input
                        id="delivery-date"
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="delivery-time">Time</Label>
                      <Input
                        id="delivery-time"
                        type="time"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                      />
                    </Field>
                  </FieldGroup>
                </div>
              </CardContent>
            </>
          )}

          <CardFooter>
            <ShadButton
              variant="primary"
              size="lg"
              disabled={!selectedResort && !selectedLocation}
              onClick={handleNext}
            >
              Select
            </ShadButton>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MapboxLocation;
