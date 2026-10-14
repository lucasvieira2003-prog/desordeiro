import { ChevronDown } from 'lucide-react'
export function Accordion({ items }: { items: { title: string; body: string }[] }) {
  return <div className="kit-accordion">{items.map((item, idx) => <details key={idx}><summary>{item.title}<ChevronDown size={18} aria-hidden="true" /></summary><p>{item.body}</p></details>)}</div>
}
