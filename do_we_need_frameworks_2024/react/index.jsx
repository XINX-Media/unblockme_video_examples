import React from 'react';
import { createRoot } from 'react-dom/client';

import VisualCard from './visualCard';

const root = createRoot(document.getElementById("app"));
root.render(<VisualCard title="bob" image="https://cdn.discordapp.com/avatars/427237425388060672/73a1e60503533723720386bada228e5e.webp?size=240"/>);