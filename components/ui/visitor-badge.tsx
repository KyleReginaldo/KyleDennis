const SITE_KEY = "kyle-reginaldo-portfolio"

const badgeUrl = `https://komarev.com/ghpvc/?username=${SITE_KEY}&label=Visitors&color=222222&style=flat`

export function VisitorBadge() {
  return (
    <span className="flex items-center overflow-hidden rounded-full border border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={badgeUrl} alt="Visitor count" className="h-[26px] w-auto" />
    </span>
  )
}
