declare module '@mapbox/mapbox-gl-geocoder' {
    import type * as mapboxgl from 'mapbox-gl';

    export interface GeocoderFeature {
        id: string;
        type: 'Feature';
        place_type: string[];
        relevance: number;
        properties: Record<string, string | number | boolean>;
        text: string;
        place_name: string;
        center: [number, number];
        geometry: {
            type: 'Point';
            coordinates: [number, number];
        };
        bbox?: [number, number, number, number];
        context?: Array<{
            id: string;
            text: string;
            short_code?: string;
            wikidata?: string;
        }>;
    }

    export interface GeocoderResultEvent {
        result: GeocoderFeature;
    }

    export interface Options {
        accessToken?: string;
        origin?: string;
        mapboxgl?: typeof mapboxgl;
        zoom?: number;
        flyTo?: boolean | Record<string, unknown>;
        placeholder?: string;
        proximity?: { longitude: number; latitude: number } | 'ip';
        trackProximity?: boolean;
        collapsed?: boolean;
        clearAndBlurOnEsc?: boolean;
        clearOnBlur?: boolean;
        bbox?: number[];
        countries?: string;
        types?: string;
        minLength?: number;
        limit?: number;
        language?: string;
        filter?: (feature: GeocoderFeature) => boolean;
        localGeocoder?: (query: string) => GeocoderFeature[];
        reverseMimeType?: string;
        reverseGeocode?: boolean;
        enableEventLogging?: boolean;
        marker?: boolean | Record<string, unknown>;
        render?: (feature: GeocoderFeature) => string;
        getItemValue?: (feature: GeocoderFeature) => string;
        mode?: 'mapbox.places' | 'mapbox.places-permanent';
        localGeocoderOnly?: boolean;
        autocomplete?: boolean;
        fuzzyMatch?: boolean;
        routing?: boolean;
        worldview?: string;
        externalGeocoder?: (query: string) => Promise<GeocoderFeature[]>;
    }

    export default class MapboxGeocoder implements mapboxgl.IControl {
        constructor(options?: Options);
        addTo(map: mapboxgl.Map | string): this;
        onAdd(map: mapboxgl.Map): HTMLElement;
        onRemove(map: mapboxgl.Map): void;
        on(type: string, listener: (ev: GeocoderResultEvent) => void): this;
        off(type: string, listener: (ev: GeocoderResultEvent) => void): this;
        setInput(searchInput: string): this;
    }
}
