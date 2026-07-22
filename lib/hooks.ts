"use client";

import { useEffect, useState } from "react";

/**
 * `true` apenas em dispositivos com ponteiro preciso capaz de hover
 * (mouse/trackpad). Usado para ativar micro-interações — tilt 3D e efeito
 * magnético — que não fazem sentido (e atrapalham) no toque.
 *
 * Começa `false` para casar com a renderização do servidor e evitar
 * mismatch de hidratação; atualiza no cliente após montar.
 */
export function usePointerFine(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine;
}
