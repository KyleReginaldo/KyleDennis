export type BookOrigin = {
  top: number
  left: number
  width: number
  height: number
  /** The card's position number, so the modal's cover shows the same one even
   *  when the grid is filtered and the index differs from the full list. */
  index: number
}

/**
 * The book has to start opening from the exact on-screen rect of the card the
 * user clicked — but the card and the modal sit on opposite sides of a route
 * change (`/projects` → intercepted `/projects/[id]`).
 *
 * Module scope is the cheapest handoff that survives a client-side navigation:
 * same bundle, same tab, no provider, no config flag. Read with `peek` (not a
 * destructive take) so React's dev double-render sees the same value twice; the
 * modal clears it on unmount so a stale rect can't leak into a later open that
 * didn't come from a card.
 */
let pending: BookOrigin | null = null

export function setBookOrigin(rect: BookOrigin) {
  pending = rect
}

export function peekBookOrigin(): BookOrigin | null {
  return pending
}

export function clearBookOrigin() {
  pending = null
}
