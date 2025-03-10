"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
const locations = [
    {
        id: 1,
        name: "Toronto Headquarters",
        address: "200 Bay Street, Suite 3000, Toronto, ON",
        coordinates: [43.6476, -79.3801],
        type: "headquarters",
    },
    {
        id: 2,
        name: "Vancouver Chapter",
        address: "1055 West Georgia Street, Vancouver, BC",
        coordinates: [49.285, -123.1256],
        type: "chapter",
    },
    {
        id: 3,
        name: "Montreal Chapter",
        address: "1250 René-Lévesque Blvd W, Montreal, QC",
        coordinates: [45.4972, -73.5701],
        type: "chapter",
    },
    {
        id: 4,
        name: "Calgary Chapter",
        address: "215 9 Avenue SW, Calgary, AB",
        coordinates: [51.0447, -114.0719],
        type: "chapter",
    },
    {
        id: 5,
        name: "Ottawa Chapter",
        address: "150 Elgin Street, Ottawa, ON",
        coordinates: [45.4215, -75.6972],
        type: "chapter",
    },
];
export default function LocationMap() {
    const mapRef = useRef(null);
    const [activeLocation, setActiveLocation] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    useEffect(() => {
        // This is a placeholder for actual map implementation
        // In a real implementation, you would use a library like Mapbox, Google Maps, or Leaflet
        const loadMap = () => __awaiter(this, void 0, void 0, function* () {
            // Simulate map loading
            yield new Promise((resolve) => setTimeout(resolve, 500));
            setMapLoaded(true);
        });
        loadMap();
    }, []);
    return (<div className="w-full h-full">
      {!mapLoaded ? (<div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-muted-foreground">Loading map...</div>
        </div>) : (<div className="relative w-full h-full">
          {/* Placeholder for actual map */}
          <div ref={mapRef} className="w-full h-full bg-[#f0f0f0] relative" style={{
                backgroundImage: "url('/placeholder.svg?height=600&width=1000')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            {/* Map location markers */}
            {locations.map((location) => (<div key={location.id} className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`} style={{
                    // These would be calculated based on actual map bounds in a real implementation
                    left: `${((location.coordinates[1] + 140) / 70) * 100}%`,
                    top: `${(1 - (location.coordinates[0] - 40) / 20) * 100}%`,
                }} onClick={() => setActiveLocation(location)}>
                <div className={`
                  p-1 rounded-full 
                  ${location.type === "headquarters" ? "bg-primary" : "bg-secondary border border-primary"}
                  group-hover:scale-110 transition-transform
                `}>
                  <MapPin size={location.type === "headquarters" ? 24 : 18} className={location.type === "headquarters" ? "text-primary-foreground" : "text-primary"}/>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap bg-background border px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {location.name}
                </div>
              </div>))}
          </div>

          {/* Location details panel */}
          {activeLocation && (<div className="absolute bottom-4 left-4 right-4 bg-background border p-4 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{activeLocation.name}</h4>
                  <p className="text-sm text-muted-foreground">{activeLocation.address}</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground" onClick={() => setActiveLocation(null)}>
                  ×
                </button>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeLocation.type === "headquarters"
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground"}`}>
                  {activeLocation.type === "headquarters" ? "Headquarters" : "Regional Chapter"}
                </span>
                <a href={`https://maps.google.com/?q=${activeLocation.coordinates[0]},${activeLocation.coordinates[1]}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                  Get Directions
                </a>
              </div>
            </div>)}
        </div>)}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {locations.map((location) => (<button key={location.id} className={`text-left p-3 border rounded hover:bg-secondary transition-colors ${(activeLocation === null || activeLocation === void 0 ? void 0 : activeLocation.id) === location.id ? "border-primary bg-secondary" : ""}`} onClick={() => setActiveLocation(location)}>
            <div className="font-medium text-sm">{location.name}</div>
            <div className="text-xs text-muted-foreground truncate">{location.address}</div>
          </button>))}
      </div>
    </div>);
}
