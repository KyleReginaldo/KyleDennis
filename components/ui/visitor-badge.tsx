const SITE_KEY = "kyle-reginaldo-portfolio"

const badgeUrl = `https://komarev.com/ghpvc/?username=${SITE_KEY}&label=Visitors&color=222222&style=flat-square`

export function VisitorBadge() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={badgeUrl}
      alt="Visitor count"
      className="h-3.5 w-auto rounded-[3px] opacity-50 grayscale contrast-125 transition-opacity hover:opacity-80"
    />
  )
}
