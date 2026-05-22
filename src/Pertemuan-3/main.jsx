import { createRoot } from "react-dom/client";  
import './tailwind.css';
import TailWindCSS from "./TailWindCSS";
import UserForm from "./UserForm";
import HitungGajiForm from "./HitungGajiForm";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <TailWindCSS/>
            <UserForm/>
            <HitungGajiForm/>
        </div>
)