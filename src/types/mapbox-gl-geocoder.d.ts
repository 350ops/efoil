declare module '@mapbox/mapbox-gl-geocoder' {
    import * as mapboxgl from 'mapbox-gl';

    export interface Options {
        accessToken?: string;
        origin?: string;
        mapboxgl?: typeof mapboxgl;
        zoom?: number;
        flyTo?: boolean | object;
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
        filter?: (feature: any) => boolean;
        localGeocoder?: (query: string) => any[];
        reverseMimeType?: string;
        reverseGeocode?: boolean;
        enableEventLogging?: boolean;
        marker?: boolean | object;
        render?: (feature: any) => string;
        getItemValue?: (feature: any) => string;
        mode?: 'mapbox.places' | 'mapbox.places-permanent';
        localGeocoderOnly?: boolean;
        autocomplete?: boolean;
        fuzzyMatch?: boolean;
        routing?: boolean;
        worldview?: string;
        externalGeocoder?: any; // Add more specific type if known
        flyTo?: boolean | object;
    }

    export default class MapboxGeocoder implements mapboxgl.IControl {
        constructor(options?: Options);
        addTo(map: mapboxgl.Map | string): any;
        onAdd(map: mapboxgl.Map): HTMLElement;
        onRemove(map: mapboxgl.Map): any;
        on(type: string, listener: (ev: any) => void): any;
        off(type: string, listener: (ev: any) => void): any;
        setInput(searchInput: string): any;
        // Add more methods as needed
    }
}
