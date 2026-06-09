"use client";

import { useState } from "react";
import { confirmInviteResponse } from "@/lib/supabase";

type ConfirmPresenceButtonProps = {
  slug: string;
  initiallyConfirmed?: boolean;
};

export function ConfirmPresenceButton({
  slug,
  initiallyConfirmed = false,
}: ConfirmPresenceButtonProps) {
  const [confirmed, setConfirmed] = useState(initiallyConfirmed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setError(null);
    setLoading(true);

    try {
      await confirmInviteResponse(slug);
      setConfirmed(true);
    } catch {
      setError("Não foi possível confirmar a presença. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (confirmed) {
    return (
      <div className="rounded-full bg-rose-50 px-6 py-4 text-center text-base font-semibold text-rose-600 ring-1 ring-rose-100">
        Presença confirmada! Te esperamos com carinho ❤️
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleConfirm}
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-rose-200/60 transition hover:from-rose-600 hover:to-pink-600 hover:shadow-xl hover:shadow-rose-200/70 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Confirmando..." : "Confirmar Presença ❤️"}
      </button>

      {error && (
        <p className="text-center text-sm text-rose-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
