export const STANDARD_VARIANT_ID = "43946996957227";
export const VIP_VARIANT_ID = "43962297974827";

export type UTMParams = {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
};

export const DEFAULT_UTM: UTMParams = {
  source: "direct",
  medium: "landing",
  campaign: "belgium-june-2026",
};

export function readUTMFromLocation(search: string): UTMParams {
  const params = new URLSearchParams(search);
  const pick = (key: string, fallback: string) =>
    (params.get(key) || fallback).slice(0, 120);
  return {
    source: pick("utm_source", DEFAULT_UTM.source),
    medium: pick("utm_medium", DEFAULT_UTM.medium),
    campaign: pick("utm_campaign", DEFAULT_UTM.campaign),
    content: params.get("utm_content")?.slice(0, 120) || undefined,
  };
}

export function buildCheckoutUrl({
  variantId,
  quantity,
  utm,
}: {
  variantId: string;
  quantity: number;
  utm: UTMParams;
}): string {
  const qs = new URLSearchParams({
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
  });
  if (utm.content) qs.set("utm_content", utm.content);
  return `https://musicalbasics.com/cart/${variantId}:${quantity}?${qs.toString()}`;
}
