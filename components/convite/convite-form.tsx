"use client";

import { Copy, Eye, ExternalLink, MessageCircle, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { ConviteFormData, ConvitePreviewData } from "@/types/convite";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { publishConvite } from "@/services/convite.service";
import { ConvitePreview } from "./convite-preview";
import { PhotoUpload } from "./photo-upload";

const defaultValues: ConviteFormData = {
  guestName: "",
  title: "",
  message: "",
  date: "",
  time: "",
  location: "",
  mapsLink: "",
  customSlug: "",
};

export function ConviteForm() {
  const router = useRouter();
  const previewRef = useRef<HTMLDivElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<ConvitePreviewData | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);
  const [publishedLink, setPublishedLink] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ConviteFormData>({ defaultValues });

  function handlePhotoChange(_file: File | null, url: string | null) {
    setPhotoUrl(url);
  }

  function onSubmit(data: ConviteFormData) {
    setPublishError(null);
    setPreview({ ...data, photoUrl });
    requestAnimationFrame(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function handlePublish() {
    setPublishError(null);
    setPublishSuccess(null);
    const isValid = await trigger();

    if (!isValid) return;

    const data = getValues();
    setIsPublishing(true);

    try {
      const convite = await publishConvite({ ...data, photoUrl });
const link = `${window.location.origin}/convite/${convite.slug}`;

setPublishedLink(link);
setPublishSuccess("Convite publicado com sucesso!");
setIsPublishing(false);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Não foi possível publicar o convite. Tente novamente.";
      setPublishError(message);
      setIsPublishing(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          label="Nome da pessoa convidada"
          htmlFor="guestName"
          required
          error={errors.guestName?.message}
        >
          <Input
            id="guestName"
            placeholder="Ex: Maria Silva"
            error={!!errors.guestName}
            {...register("guestName", {
              required: "Informe o nome do convidado",
            })}
          />
        </FormField>
        <FormField
  label="Link personalizado"
  htmlFor="customSlug"
  error={errors.customSlug?.message}
>
  <Input
    id="customSlug"
    placeholder="Ex: jantar-com-a-ana"
    error={!!errors.customSlug}
    {...register("customSlug", {
      pattern: {
        value: /^[a-z0-9-]*$/,
        message: "Use apenas letras minúsculas, números e hífens",
      },
    })}
  />
  <p className="mt-2 text-xs text-stone-500">
    Opcional. Exemplo: convite-especial-lcs.vercel.app/convite/jantar-com-a-ana
  </p>
</FormField>

        <FormField
          label="Título do convite"
          htmlFor="title"
          required
          error={errors.title?.message}
        >
          <Input
            id="title"
            placeholder="Ex: Jantar especial à luz de velas"
            error={!!errors.title}
            {...register("title", {
              required: "Informe o título do convite",
            })}
          />
        </FormField>

        <FormField
          label="Mensagem personalizada"
          htmlFor="message"
          required
          error={errors.message?.message}
        >
          <Textarea
            id="message"
            rows={4}
            placeholder="Escreva uma mensagem carinhosa para o seu convidado..."
            error={!!errors.message}
            {...register("message", {
              required: "Escreva uma mensagem para o convite",
            })}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Data"
            htmlFor="date"
            required
            error={errors.date?.message}
          >
            <Input
              id="date"
              type="date"
              error={!!errors.date}
              {...register("date", { required: "Informe a data" })}
            />
          </FormField>

          <FormField
            label="Horário"
            htmlFor="time"
            required
            error={errors.time?.message}
          >
            <Input
              id="time"
              type="time"
              error={!!errors.time}
              {...register("time", { required: "Informe o horário" })}
            />
          </FormField>
        </div>

        <FormField
          label="Local"
          htmlFor="location"
          required
          error={errors.location?.message}
        >
          <Input
            id="location"
            placeholder="Ex: Restaurante Bella Vista, Rua das Flores, 123"
            error={!!errors.location}
            {...register("location", {
              required: "Informe o local do evento",
            })}
          />
        </FormField>

        <FormField
          label="Link do Google Maps"
          htmlFor="mapsLink"
          error={errors.mapsLink?.message}
        >
          <Input
            id="mapsLink"
            type="url"
            placeholder="https://maps.google.com/..."
            error={!!errors.mapsLink}
            {...register("mapsLink")}
          />
        </FormField>

        <PhotoUpload photoUrl={photoUrl} onPhotoChange={handlePhotoChange} />

        <div className="flex flex-col gap-3">
          <Button type="submit" fullWidth>
            <Eye className="h-5 w-5" />
            Visualizar Convite
          </Button>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            disabled={isPublishing}
            onClick={handlePublish}
          >
            <Send className="h-5 w-5" />
            {isPublishing ? "Publicando..." : "Publicar Convite"}
          </Button>
        </div>

        {publishSuccess && publishedLink && (
  <div
    className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center"
    role="status"
  >
    <p className="text-sm font-medium text-emerald-700">
      {publishSuccess}
    </p>

    <div className="rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs text-stone-600 break-all">
      {publishedLink}
    </div>

    <div className="grid gap-2 sm:grid-cols-3">
      <Button
        type="button"
        variant="secondary"
        onClick={() => navigator.clipboard.writeText(publishedLink)}
      >
        <Copy className="h-4 w-4" />
        Copiar
      </Button>

      <Button
        type="button"
        variant="secondary"
        onClick={() => window.open(publishedLink, "_blank")}
      >
        <ExternalLink className="h-4 w-4" />
        Abrir
      </Button>

      <Button
        type="button"
        onClick={() =>
          window.open(
            `https://wa.me/?text=${encodeURIComponent(
              `Você recebeu um convite especial: ${publishedLink}`
            )}`,
            "_blank"
          )
        }
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </Button>
    </div>
  </div>
)}

        {publishError && (
          <p
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm text-rose-600"
            role="alert"
          >
            {publishError}
          </p>
        )}
      </form>

      {preview && (
        <div ref={previewRef} className="space-y-4 border-t border-rose-100 pt-8">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-rose-500">
              Pré-visualização
            </p>
            <h2 className="font-display mt-1 text-xl font-semibold text-stone-900">
              Assim ficará o seu convite
            </h2>
          </div>
          <ConvitePreview data={preview} />
        </div>
      )}
    </div>
  );
}
