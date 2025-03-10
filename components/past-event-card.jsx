import Link from "next/link";
export function PastEventCard({ title, date, recapUrl, recapLabel }) {
    return (<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-serif mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <Link href={recapUrl} className="text-primary text-sm hover:underline">
        {recapLabel}
      </Link>
    </div>);
}
