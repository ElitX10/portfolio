import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Autorise les origines de dev autres que localhost. Utile quand le dev
    // server est lancé dans WSL et accédé depuis Windows via l'IP du LAN
    // virtuel (le `next dev` bloque sinon les requêtes HMR cross-origin, ce
    // qui empêche l'hydratation React et casse tous les onClick).
    allowedDevOrigins: ["172.23.0.1", "localhost", "127.0.0.1"],
};

export default nextConfig;
